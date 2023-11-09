from sqlalchemy import select, func
from math import ceil

from ..models.tables import inspection, inspection_question
from modules.employees.models.tables import responsibility_department_group, position, profile, responsibility_question
from modules.check_list.models.tables import questions, check_list
from db.database import database


class ResultCalculation:
    """Рассчитывает общий результат проверки"""

    def __init__(self, inspection_id: int):
        self.inspection_id = inspection_id

    async def get_inspection_result(self):
        """Получает объект с результатом проверки"""

        inspection_result_query = (
            select(
                questions.c.id,
                questions.c.text,
                questions.c.grade,
                inspection_question.c.result,
            )
            .join(questions, inspection_question.c.question_id == questions.c.id)
            .join(inspection, inspection_question.c.inspection_id == inspection.c.id)
            .where(inspection.c.id == self.inspection_id)
            .group_by(
                questions.c.id,
                questions.c.text,
                questions.c.grade,
                inspection_question.c.result,
            )
            .order_by(
                questions.c.id
            )
        )

        inspection_result = await database.fetch_all(inspection_result_query)

        if not inspection_result:
            inspection_result = []

        return inspection_result

    async def get_check_list_total(self):
        """Считает суммарное количество баллов по чек-листу"""

        query = (
            select(
                check_list.c.total_grade
            )
            .join(inspection, inspection.c.check_list_id == check_list.c.id)
            .where(inspection.c.id == self.inspection_id)
        )

        return await database.execute(query)

    async def get_points_scored(self):
        """Считает количество баллов по выполненным пунктам"""

        query = (
            select(
                func.sum(questions.c.grade)
            )
            .join(inspection_question, inspection_question.c.question_id == questions.c.id)
            .where(
                inspection_question.c.inspection_id == self.inspection_id,
                inspection_question.c.result == True,
            )
        )

        return await database.execute(query)

    async def get_not_checked_questions(self):
        """Считает количество баллов не проверенных вопросов"""

        subquery = (
            select(
                questions.c.id
            )
            .join(inspection_question, inspection_question.c.question_id == questions.c.id)
            .where(
                inspection_question.c.inspection_id == self.inspection_id,
                inspection_question.c.result != None,
            )
        )

        query = (
            select(
                func.sum(questions.c.grade),
            ).where(
                questions.c.id.not_in(subquery),
            )
        )

        response = await database.execute(query)

        if (response is None):
            return 0
        
        return response

    async def get_result(self):
        """рассчитывает результат по проверке"""

        total_points = await self.get_check_list_total()
        points_scored = await self.get_points_scored()
        not_checked_questions = await self.get_not_checked_questions()

        if total_points > 0:
            result = (points_scored / (total_points - not_checked_questions)) * 100
        else:
            result = 0

        return ceil(result)
