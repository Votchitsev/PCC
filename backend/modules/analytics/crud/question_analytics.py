from fastapi import APIRouter
from datetime import date

from ..utils.question_analytics import QuestionAnalytics
from ..schemas import SDateInterval


router = APIRouter(
  prefix="/questions",
)


@router.get("/", summary="Наиболее часто встречающиеся нарушения")
async def get_questions_analytics(date_from: date, date_to: date):  
    report = QuestionAnalytics(_from=date_from, to=date_to)
    return await report.build_report()
