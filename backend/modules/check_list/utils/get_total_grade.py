from ..models.tables import questions, check_list
from db.database import database


async def update_check_list_total_grade(check_list_id: int):
    """Get total grade of check list"""
    
    questions_query = (
        questions.select()
            .where(questions.c.check_list_id == check_list_id)
    )

    questions_list = await database.fetch_all(questions_query)
        
    total_grade = 0

    for question in questions_list:
        if question.parent_question_id is None:
            total_grade += question["grade"]

    check_list_query = (
        check_list.update()
            .where(check_list.c.id == check_list_id)
            .values(total_grade=total_grade)
    )

    await database.execute(check_list_query)
