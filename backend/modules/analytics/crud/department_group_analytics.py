from datetime import date
from fastapi import APIRouter
from ..utils.department_group_analytics import DepartmentGroupAnalytics



router = APIRouter(
    prefix="/department_group"
)


@router.get('/', summary="Получение рейтинга по группам подразделений")
async def get_department_group_analytics(date_from: date, date_to: date):
    print(date_from, date_to)
    department_group_report = DepartmentGroupAnalytics(_from=date_from, to=date_to)
    return await department_group_report.build_report()
