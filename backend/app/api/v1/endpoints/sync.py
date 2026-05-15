from fastapi import APIRouter, Request
from pydantic import BaseModel

router = APIRouter()


class SyncRequest(BaseModel):
    table: str
    action: str
    data: dict


@router.post("/enqueue")
async def enqueue_sync(request_body: SyncRequest, request: Request):
    """Enqueue a record for sync when connectivity is available."""
    sync_mgr = request.app.state.services["sync"]
    record = sync_mgr.enqueue(request_body.table, request_body.action, request_body.data)
    return {"id": record.id, "status": record.status}


@router.post("/process")
async def process_sync(request: Request):
    """Process all pending sync records (called when internet is restored)."""
    sync_mgr = request.app.state.services["sync"]
    results = await sync_mgr.process_queue()
    return results


@router.get("/status")
async def sync_status(request: Request):
    """Get current sync queue status."""
    sync_mgr = request.app.state.services["sync"]
    return sync_mgr.get_status()
