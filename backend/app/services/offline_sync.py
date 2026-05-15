"""
Offline Sync Manager

Manages data synchronization between offline (IndexedDB/local) and
online (PostgreSQL) states. Enables the classroom to work fully offline
and sync when connectivity is restored.
"""

import logging
from datetime import datetime
from dataclasses import dataclass, field
from enum import Enum

logger = logging.getLogger(__name__)


class SyncStatus(str, Enum):
    PENDING = "pending"
    SYNCED = "synced"
    CONFLICT = "conflict"
    FAILED = "failed"


@dataclass
class SyncRecord:
    id: str
    table: str
    action: str  # "create", "update", "delete"
    data: dict
    timestamp: datetime = field(default_factory=datetime.utcnow)
    status: SyncStatus = SyncStatus.PENDING
    retries: int = 0


class OfflineSyncManager:
    """Manages offline-first data synchronization."""

    def __init__(self):
        self.queue: list[SyncRecord] = []
        self.last_sync: datetime | None = None

    def enqueue(self, table: str, action: str, data: dict) -> SyncRecord:
        record = SyncRecord(
            id=f"{table}_{datetime.utcnow().timestamp()}",
            table=table, action=action, data=data
        )
        self.queue.append(record)
        logger.info(f"Enqueued sync: {action} on {table}")
        return record

    async def process_queue(self) -> dict:
        results = {"synced": 0, "failed": 0, "conflicts": 0}
        for record in self.queue:
            if record.status == SyncStatus.PENDING:
                try:
                    # In production, this would push to PostgreSQL
                    record.status = SyncStatus.SYNCED
                    results["synced"] += 1
                except Exception as e:
                    record.retries += 1
                    if record.retries >= 3:
                        record.status = SyncStatus.FAILED
                        results["failed"] += 1
                    logger.error(f"Sync failed for {record.id}: {e}")

        self.last_sync = datetime.utcnow()
        self.queue = [r for r in self.queue if r.status == SyncStatus.PENDING]
        logger.info(f"Sync complete: {results}")
        return results

    def get_status(self) -> dict:
        return {
            "pending": len([r for r in self.queue if r.status == SyncStatus.PENDING]),
            "last_sync": self.last_sync.isoformat() if self.last_sync else "Never",
            "queue_size": len(self.queue),
        }
