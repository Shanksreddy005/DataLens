from fastapi import APIRouter, UploadFile, File
from services.profiler import profile_dataset

router = APIRouter()

@router.post("/api/upload")
async def upload_dataset(file: UploadFile = File(...)):
    if not file.filename.endswith('.csv'):
        return {"status": "error", "message": "Only CSV files are supported"}
    
    contents = await file.read()
    profile_results = profile_dataset(contents, file.filename)
    
    return profile_results
