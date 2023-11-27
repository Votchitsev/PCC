from datetime import date
from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from ..utils.question_analytics import QuestionAnalytics
from ..download_report.make_file import XLSXFile


router = APIRouter(
  prefix="/questions",
)


@router.get("/", summary="Наиболее часто встречающиеся нарушения")
async def get_questions_analytics(date_from: date, date_to: date, download=False):  
    report = QuestionAnalytics(_from=date_from, to=date_to)

    if download:
        file = XLSXFile(report.build_report())

        headers = {
            'Content-Disposition': 'attachment; filename="report.xlsx"',
        }

        return StreamingResponse(file.make_file(), headers=headers)

    return await report.build_report()
