"""
BrightMind - RAG Service
Provides offline-first retrieval-augmented generation using:
  PRIMARY  : ChromaDB + sentence-transformers (semantic search)
  FALLBACK : TF-IDF keyword search (works 100% offline, zero model download)

Documents are auto-ingested from ./educational-kb on startup.
"""

import glob
import hashlib
import logging
import os
from pathlib import Path
from typing import Optional

logger = logging.getLogger("brightmind.rag")

# ─── Try sentence-transformers (semantic embeddings) ──────────────────────────
try:
    from sentence_transformers import SentenceTransformer
    import chromadb
    from chromadb.config import Settings as ChromaSettings

    _ST_AVAILABLE = True
    logger.info("sentence-transformers available — using semantic embeddings")
except ImportError:
    _ST_AVAILABLE = False
    logger.warning(
        "sentence-transformers not installed — falling back to TF-IDF keyword search"
    )

# ─── TF-IDF keyword search (scikit-learn with pure Python fallback) ───────────
import numpy as np

try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    _SKLEARN_AVAILABLE = True
except ImportError:
    _SKLEARN_AVAILABLE = False
    import math
    import re

    class PurePythonTfidfVectorizer:
        def __init__(self, max_features=10000, ngram_range=(1, 2), stop_words="english"):
            self.stop_words = {
                "a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any", "are", "arent", "as", "at",
                "be", "because", "been", "before", "being", "below", "between", "both", "but", "by", "cant", "cannot", "could",
                "couldnt", "did", "didnt", "do", "does", "doesnt", "doing", "dont", "down", "during", "each", "few", "for", "from",
                "further", "had", "hadnt", "has", "hasnt", "have", "havent", "having", "he", "hed", "hell", "hes", "her", "here",
                "heres", "hers", "herself", "him", "himself", "his", "how", "hows", "i", "id", "ill", "im", "ive", "if", "in",
                "into", "is", "isnt", "it", "its", "itself", "lets", "me", "more", "most", "mustnt", "my", "myself", "no", "nor",
                "not", "of", "off", "on", "once", "only", "or", "other", "ought", "our", "ours", "ourselves", "out", "over", "own",
                "same", "shant", "she", "shed", "shell", "shes", "should", "shouldnt", "so", "some", "such", "than", "that",
                "thats", "the", "their", "theirs", "them", "themselves", "then", "there", "theres", "these", "they", "theyd",
                "theyll", "theyre", "theyve", "this", "those", "through", "to", "too", "under", "until", "up", "very", "was",
                "wasnt", "we", "wed", "well", "were", "weve", "werent", "what", "whats", "when", "whens", "where", "wheres",
                "which", "while", "who", "whos", "whom", "why", "whys", "with", "wont", "would", "wouldnt", "you", "youd",
                "youll", "youre", "youve", "your", "yours", "yourself", "yourselves"
            }
            self.max_features = max_features
            self.ngram_range = ngram_range
            self.idf = {}
            self.vocab = {}
            self.num_docs = 0

        def _tokenize(self, text: str) -> list[str]:
            words = re.findall(r'\b\w+\b', text.lower())
            tokens = []
            if self.ngram_range[0] <= 1:
                for w in words:
                    if w not in self.stop_words:
                        tokens.append(w)
            if self.ngram_range[1] >= 2:
                for i in range(len(words) - 1):
                    bg = f"{words[i]} {words[i+1]}"
                    tokens.append(bg)
            return tokens

        def fit_transform(self, raw_documents: list[str]):
            self.num_docs = len(raw_documents)
            df = {}
            doc_tokens = []
            for doc in raw_documents:
                tokens = self._tokenize(doc)
                doc_tokens.append(tokens)
                for token in set(tokens):
                    df[token] = df.get(token, 0) + 1

            self.idf = {}
            for token, count in df.items():
                self.idf[token] = math.log((1 + self.num_docs) / (1 + count)) + 1

            sorted_features = sorted(df.keys(), key=lambda k: df[k], reverse=True)[:self.max_features]
            self.vocab = {feat: idx for idx, feat in enumerate(sorted_features)}

            matrix = []
            for tokens in doc_tokens:
                vec = [0.0] * len(self.vocab)
                tf = {}
                for t in tokens:
                    tf[t] = tf.get(t, 0) + 1
                for token, freq in tf.items():
                    if token in self.vocab:
                        vec[self.vocab[token]] = freq * self.idf[token]
                norm = math.sqrt(sum(v**2 for v in vec))
                if norm > 0:
                    vec = [v / norm for v in vec]
                matrix.append(vec)
            return np.array(matrix)

        def transform(self, raw_documents: list[str]):
            matrix = []
            for doc in raw_documents:
                tokens = self._tokenize(doc)
                vec = [0.0] * len(self.vocab)
                tf = {}
                for t in tokens:
                    tf[t] = tf.get(t, 0) + 1
                for token, freq in tf.items():
                    if token in self.vocab:
                        vec[self.vocab[token]] = freq * self.idf[token]
                norm = math.sqrt(sum(v**2 for v in vec))
                if norm > 0:
                    vec = [v / norm for v in vec]
                matrix.append(vec)
            return np.array(matrix)

    TfidfVectorizer = PurePythonTfidfVectorizer



class RAGService:
    def __init__(self):
        self.is_ready: bool = False
        self.document_count: int = 0
        self._use_embeddings: bool = False

        # ChromaDB state
        self._chroma_client = None
        self._collection = None
        self._embedder = None

        # TF-IDF fallback state
        self._tfidf_vectorizer: Optional[TfidfVectorizer] = None
        self._tfidf_corpus: list[str] = []    # raw text chunks
        self._tfidf_ids: list[str] = []       # corresponding doc IDs
        self._tfidf_matrix = None             # fitted sparse matrix

    # ─── Initialise (called once at startup) ─────────────────────────────────
    def _init_chroma(self, db_path: str):
        """Set up persistent ChromaDB and sentence-transformer embedder."""
        os.makedirs(db_path, exist_ok=True)
        self._chroma_client = chromadb.PersistentClient(
            path=db_path,
            settings=ChromaSettings(anonymized_telemetry=False),
        )
        self._collection = self._chroma_client.get_or_create_collection(
            name="brightmind_kb",
            metadata={"hnsw:space": "cosine"},
        )
        self._embedder = SentenceTransformer("all-MiniLM-L6-v2")
        self._use_embeddings = True
        logger.info(f"ChromaDB initialised at {db_path}")

    def _init_tfidf(self):
        """Initialise TF-IDF vectorizer (offline fallback)."""
        self._tfidf_vectorizer = TfidfVectorizer(
            max_features=10_000,
            ngram_range=(1, 2),
            stop_words="english",
        )
        self._use_embeddings = False
        logger.info("TF-IDF search initialised (offline fallback mode)")

    # ─── Text Chunking ────────────────────────────────────────────────────────
    @staticmethod
    def _chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
        """Split text into overlapping word-count chunks."""
        words = text.split()
        chunks = []
        step = chunk_size - overlap
        for i in range(0, len(words), step):
            chunk = " ".join(words[i : i + chunk_size])
            if chunk.strip():
                chunks.append(chunk.strip())
        return chunks

    @staticmethod
    def _doc_id(file_path: str, chunk_index: int) -> str:
        """Generate a stable, unique ID for each chunk."""
        base = Path(file_path).stem
        return f"{base}_chunk_{chunk_index:04d}"

    # ─── Ingest ───────────────────────────────────────────────────────────────
    async def ingest_directory(self, kb_path: str):
        """
        Scans kb_path for .txt and .md files and ingests all chunks.
        Safe to call multiple times — skips already-indexed chunks.
        """
        from app.config import settings

        # Lazy init based on what's available
        if _ST_AVAILABLE and self._collection is None:
            try:
                self._init_chroma(settings.CHROMA_DB_PATH)
            except Exception as e:
                logger.warning(f"ChromaDB init failed ({e}), switching to TF-IDF")
                self._init_tfidf()
        elif not _ST_AVAILABLE and self._tfidf_vectorizer is None:
            self._init_tfidf()

        kb_path_obj = Path(kb_path)
        if not kb_path_obj.exists():
            logger.warning(
                f"Educational KB directory not found: {kb_path}. "
                "Create it and add .txt / .md files for RAG to work."
            )
            self.is_ready = True
            return

        files = list(kb_path_obj.glob("**/*.txt")) + list(kb_path_obj.glob("**/*.md"))
        if not files:
            logger.warning(f"No .txt or .md files found in {kb_path}")
            self.is_ready = True
            return

        total_chunks = 0
        for fpath in files:
            try:
                text = fpath.read_text(encoding="utf-8", errors="ignore")
                chunks = self._chunk_text(
                    text, settings.RAG_CHUNK_SIZE, settings.RAG_CHUNK_OVERLAP
                )
                total_chunks += await self._index_chunks(str(fpath), chunks)
            except Exception as e:
                logger.error(f"Failed to ingest {fpath}: {e}")

        # Fit TF-IDF matrix if in fallback mode
        if not self._use_embeddings and self._tfidf_corpus:
            self._tfidf_matrix = self._tfidf_vectorizer.fit_transform(
                self._tfidf_corpus
            )
            logger.info(
                f"TF-IDF matrix fitted on {len(self._tfidf_corpus)} chunks"
            )

        self.document_count = total_chunks
        self.is_ready = True
        logger.info(
            f"✅ RAG ready — {total_chunks} chunks from {len(files)} file(s) "
            f"({'semantic' if self._use_embeddings else 'TF-IDF'} mode)"
        )

    async def _index_chunks(self, file_path: str, chunks: list[str]) -> int:
        """Index chunks into ChromaDB or TF-IDF corpus. Returns count added."""
        added = 0
        if self._use_embeddings:
            # ChromaDB: batch upsert (skip already existing IDs)
            existing_ids = set(self._collection.get()["ids"])
            new_ids, new_docs, new_embeddings = [], [], []

            for i, chunk in enumerate(chunks):
                doc_id = self._doc_id(file_path, i)
                if doc_id in existing_ids:
                    continue
                embedding = self._embedder.encode(chunk, normalize_embeddings=True)
                new_ids.append(doc_id)
                new_docs.append(chunk)
                new_embeddings.append(embedding.tolist())

            if new_ids:
                self._collection.upsert(
                    ids=new_ids,
                    documents=new_docs,
                    embeddings=new_embeddings,
                )
                added = len(new_ids)
        else:
            # TF-IDF: append to corpus list
            for i, chunk in enumerate(chunks):
                doc_id = self._doc_id(file_path, i)
                if doc_id not in self._tfidf_ids:
                    self._tfidf_ids.append(doc_id)
                    self._tfidf_corpus.append(chunk)
                    added += 1

        return added

    # ─── Search ───────────────────────────────────────────────────────────────
    async def search(self, query: str, n: int = 5) -> list[str]:
        """
        Returns the top-n most relevant text chunks for the query.
        Uses semantic search if available, TF-IDF otherwise.
        Returns empty list if the knowledge base is empty.
        """
        if not self.is_ready or self.document_count == 0:
            return []

        try:
            if self._use_embeddings:
                return await self._semantic_search(query, n)
            else:
                return self._tfidf_search(query, n)
        except Exception as e:
            logger.error(f"RAG search failed: {e}")
            return []

    async def _semantic_search(self, query: str, n: int) -> list[str]:
        """ChromaDB cosine-similarity search."""
        q_embedding = self._embedder.encode(query, normalize_embeddings=True)
        results = self._collection.query(
            query_embeddings=[q_embedding.tolist()],
            n_results=min(n, self._collection.count()),
            include=["documents"],
        )
        docs = results.get("documents", [[]])[0]
        return [d for d in docs if d and d.strip()]

    def _tfidf_search(self, query: str, n: int) -> list[str]:
        """TF-IDF cosine-similarity keyword search."""
        if self._tfidf_matrix is None or not self._tfidf_corpus:
            return []

        q_vec = self._tfidf_vectorizer.transform([query])
        # Cosine similarities between query and all corpus chunks
        if _SKLEARN_AVAILABLE:
            scores = (self._tfidf_matrix @ q_vec.T).toarray().flatten()
        else:
            scores = (self._tfidf_matrix @ q_vec.T).flatten()
        top_indices = np.argsort(scores)[::-1][:n]
        return [
            self._tfidf_corpus[i]
            for i in top_indices
            if scores[i] > 0
        ]
