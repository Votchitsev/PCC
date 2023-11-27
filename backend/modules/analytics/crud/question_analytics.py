from datetime import date
import tempfile
from fastapi import APIRouter
from fastapi.responses import FileResponse

from ..utils.question_analytics import QuestionAnalytics
from ..download_report.make_file import XLSXFile


router = APIRouter(
  prefix="/questions",
)


@router.get("/", summary="Наиболее часто встречающиеся нарушения")
async def get_questions_analytics(date_from: date, date_to: date, download: bool=False):  
    report = QuestionAnalytics(_from=date_from, to=date_to)
    table = await report.build_report()

    if download == True:
        file = XLSXFile(table)

        with tempfile.NamedTemporaryFile(delete=False) as f:
            f.write(file.make_file().getbuffer())

            return FileResponse(f.name, filename='report.xlsx')

    return table
