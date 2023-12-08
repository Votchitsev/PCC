
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

    for question in questions_list:
        if question.parent_question_id != None:
            parent_question = list(filter(lambda q: q.question_id == question.parent_question_id, result))[0]
            
            other_children = list(
                filter(lambda q: q.parent_question_id == question.parent_question_id and q.question_id != question.id, questions_list)
            )

            questions_with_result = []

            for child in other_children:

                child_result = list(filter(lambda q: q.question_id == child.id, result))[0]
    
                if child_result.result != None and parent_question.result != None:
                    return False

                elif len(questions_with_result) == 1 and child_result.result != None:
                    return False
                
                else:
                    questions_with_result.append(child.id)
    
    return True
