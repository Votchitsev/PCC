from datetime import date
import tempfile
from fastapi import APIRouter
from fastapi.responses import FileResponse

from ..utils.department_group_analytics import DepartmentGroupAnalytics
from ..download_report.make_file import XLSXFile


router = APIRouter(
    prefix="/department_group"
)


@router.get('/', summary="Получение рейтинга по группам подразделений")
async def get_department_group_analytics(date_from: date, date_to: date, download: bool=False):
    department_group_report = DepartmentGroupAnalytics(_from=date_from, to=date_to)
    table = await department_group_report.build_report()

    if download == True:
        file = XLSXFile(table)

        with tempfile.NamedTemporaryFile(delete=False) as f:
            f.write(file.make_file().getbuffer())

            return FileResponse(f.name, filename='report.xlsx')

    return table
