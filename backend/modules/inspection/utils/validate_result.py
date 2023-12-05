
from sqlalchemy import select

from ..schemas.schemas import SInspectionQuestionChange
from db.database import database
from modules.check_list.models.tables import questions

async def validate_result(result: list[SInspectionQuestionChange]):
    """
    Validates the result of an inspection question change.
    Args:
        result (list[SInspectionQuestionChange]): The list of SInspectionQuestionChange objects to validate.
    Returns:
        bool: True if the result is valid, False otherwise.
    """

    questions_ids = [i.question_id for i in result]
    
    questions_query = (
        questions.select()
            .where(questions.c.id.in_(questions_ids))
    )

    questions_list = await database.fetch_all(questions_query)

    for r in result:
        question = list(filter(lambda q: q.id == r.question_id, questions_list))[0]

        if question.parent_question_id != None:
            
            rel_question = list(filter(lambda q: q.question_id == question.parent_question_id, result))[0]

            if r.result != None and rel_question.result != None:
                return False
    
    return True
