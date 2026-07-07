import httpx
import re
import urllib.parse
import logging

logger = logging.getLogger("brightmind.search")


class WebSearchService:
    def __init__(self):
        self.headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            )
        }

    async def search(self, query: str, n: int = 5) -> list[str]:
        """
        Queries DuckDuckGo's HTML search interface and parses result snippets.
        Fails gracefully on network issues, rate limits, or parse errors.
        """
        url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
        logger.info(f"Querying DuckDuckGo for: '{query}'")
        try:
            async with httpx.AsyncClient() as client:
                resp = await client.get(url, headers=self.headers, timeout=8.0)
                if resp.status_code != 200:
                    logger.warning(f"DuckDuckGo search failed with HTTP status {resp.status_code}")
                    return []

                html = resp.text
                snippets = re.findall(
                    r'<a class="result__snippet"[^>]*>(.*?)</a>', html, re.DOTALL
                )

                results = []
                for snippet in snippets:
                    clean_snippet = re.sub(r"<[^>]+>", "", snippet).strip()
                    if clean_snippet:
                        results.append(clean_snippet)

                logger.info(f"Successfully retrieved {len(results)} snippets from DuckDuckGo")
                return results[:n]
        except Exception as e:
            logger.error(f"DuckDuckGo search encountered an exception: {e}")
            return []
