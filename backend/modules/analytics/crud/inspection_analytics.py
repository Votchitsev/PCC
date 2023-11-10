from fastapi import APIRouter

from ..utils.inspection_analytics import InspectionAnalytics
from ..schemas import SDateInterval


router = APIRouter(
  prefix="/inspections",
)


@router.post('/', summary="Получение списка проверок с результатами")
async def get_inspection_analytics(type: str, interval: SDateInterval):
    report = InspectionAnalytics(_from=interval.date_from, to=interval.date_to)
    return await report.build_report(type)
