from datetime import date
from fastapi import APIRouter

from ..utils.inspection_analytics import InspectionAnalytics
from ..schemas import SDateInterval


router = APIRouter(
  prefix="/inspections",
)


@router.get('/', summary="Получение списка проверок с результатами")
async def get_inspection_analytics(type: str, date_from: date, date_to: date):
    report = InspectionAnalytics(_from=date_from, to=date_to)
    return await report.build_report(type)
