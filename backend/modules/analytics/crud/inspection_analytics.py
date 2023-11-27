from datetime import date
import tempfile
from fastapi import APIRouter
from fastapi.responses import FileResponse

from ..utils.inspection_analytics import InspectionAnalytics
from ..download_report.make_file import XLSXFile


router = APIRouter(
  prefix="/inspections",
)


@router.get('/', summary="Получение списка проверок с результатами")
async def get_inspection_analytics(type: str, date_from: date, date_to: date, download: bool=False):
    report = InspectionAnalytics(_from=date_from, to=date_to)
    table = await report.build_report(type)

    if download == True:
        file = XLSXFile(table)

        with tempfile.NamedTemporaryFile(delete=False) as f:
            f.write(file.make_file().getbuffer())

            return FileResponse(f.name, filename='report.xlsx')

    return table
