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
        self.inspection_result = None

    async def get_inspection_result(self):
        """Получает объект с результатом проверки"""

        inspection_result_query = (
            select(
                questions.c.id,
                questions.c.text,
                questions.c.grade,
                questions.c.parent_question_id,
                inspection_question.c.result,
            )
            .join(questions, inspection_question.c.question_id == questions.c.id)
            .join(inspection, inspection_question.c.inspection_id == inspection.c.id)
            .where(inspection.c.id == self.inspection_id)
            .group_by(
                questions.c.id,
                questions.c.text,
                questions.c.grade,
                questions.c.parent_question_id,
                inspection_question.c.result,
            )
            .order_by(
                questions.c.order
            )
        )

        inspection_result = await database.fetch_all(inspection_result_query)

        if not inspection_result:
            inspection_result = []

        self.inspection_result = inspection_result

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
                questions.c.id,
                questions.c.parent_question_id,
                questions.c.grade,
            )
            .join(inspection_question, inspection_question.c.question_id == questions.c.id)
            .where(
                questions.c.id.not_in(subquery),
            )
            .group_by(
                questions.c.id,
                questions.c.parent_question_id,
                questions.c.grade,
            )
        )

        response = await database.fetch_all(query)

        if self.inspection_result == None:
            inspection_result = await self.get_inspection_result()
        else:
            inspection_result = self.inspection_result
        
        grade = 0

        if (response is None):
            return grade

        for question in response:
            children = list(filter(lambda x: x.parent_question_id == question.id, inspection_result))
            
            if len(children) > 0:
                is_non_checked = True

                for child in children:
                    if child.result != None:
                        is_non_checked = False
                
                if is_non_checked:
                    grade += question.grade
            elif question.parent_question_id != None:
                continue
            else:
                grade += question.grade
        
        return grade

    async def get_result(self):
        """рассчитывает результат по проверке"""

        total_points = await self.get_check_list_total()
        points_scored = await self.get_points_scored()
        not_checked_questions = await self.get_not_checked_questions()

        if points_scored is None:
            points_scored = 0

        if total_points > 0 and points_scored > 0:
            result = (points_scored / (total_points - not_checked_questions)) * 100
        else:
            result = 0

        return ceil(result)
