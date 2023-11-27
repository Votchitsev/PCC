from datetime import date
from fastapi import APIRouter
from fastapi.responses import FileResponse
from ..utils.department_group_analytics import DepartmentGroupAnalytics
from ..download_report.make_file import XLSXFile


router = APIRouter(
    prefix="/department_group"
)


@router.get('/', summary="Получение рейтинга по группам подразделений")
async def get_department_group_analytics(date_from: date, date_to: date, download=False):
    department_group_report = DepartmentGroupAnalytics(_from=date_from, to=date_to)

    if download:
        file = XLSXFile(department_group_report.build_report())

        headers = {
            'Content-Disposition': 'attachment; filename="report.xlsx"',
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        }

        return FileResponse('../download_report/report.xlsx', headers=headers, media_type='multipart/form-data')

    return await department_group_report.build_report()
