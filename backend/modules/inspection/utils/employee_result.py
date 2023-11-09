from sqlalchemy import select, func
from math import ceil

from modules.check_list.models.tables import check_list
from ..models.tables import inspection, inspection_question
from modules.employees.models.tables import responsibility_department_group, position, profile, responsibility_question
from modules.departments.models.tables import department, department_group
from modules.check_list.models.tables import questions
from db.database import database


class EmployeeResultCalculation:
    """Производит расчёт баллов по сотрудникам"""

    def __init__(self, inspection_id):
        self.inspection_id = inspection_id

    async def get_check_list_id(self):
        """Получает id чек-листа"""

        check_list_instance = await database.fetch_one(
            select(inspection).where(inspection.c.id == self.inspection_id)
        )

        return check_list_instance["check_list_id"]
    
    async def get_employees(self):
        """Получает список сотрудников, ответственных за проверку"""

        check_list_id = await self.get_check_list_id()

        inspection_query = (
            select(
                inspection.c.id,
                department.c.department_group_id,
                responsibility_department_group.c.position_id,
                position.c.id.label("position_id"),
                position.c.name.label("position"),
                profile.c.id.label("profile_id"),
                profile.c.first_name.label("first_name"),
                profile.c.last_name.label("last_name"),
            )
            .join(department, inspection.c.department_id == department.c.id)
            .join(department_group, department.c.department_group_id == department_group.c.id)
            .join(responsibility_department_group, department_group.c.id == responsibility_department_group.c.department_group_id)
            .join(position, responsibility_department_group.c.position_id == position.c.id)
            .join(profile, position.c.id == profile.c.position_id)
            .where(inspection.c.id == self.inspection_id)
            .group_by(
                profile.c.id,
                inspection.c.id,
                department.c.department_group_id,
                responsibility_department_group.c.position_id,
                position.c.id.label("position_id"),
                profile.c.first_name.label("first_name"),
                profile.c.last_name.label("last_name"),
                position.c.name.label("position"),
            )
        )

        employees = await database.fetch_all(inspection_query)

        format_employees = []

        for employee in employees:
            format_employee = {
                "id": employee["profile_id"],
                "first_name": employee["first_name"],
                "last_name": employee["last_name"],
                "position": employee["position"],
                "result_questions": [],
            }

            questions_query = (
                select(
                    responsibility_question.c.question_id,
                )
                .join(questions, responsibility_question.c.question_id == questions.c.id)
                .where(responsibility_question.c.position_id == employee["position_id"], questions.c.check_list_id == check_list_id)
            )

            questions_response = await database.fetch_all(questions_query)

            for question in questions_response:
                format_employee["result_questions"].append(question.question_id)

            format_employees.append(format_employee)
        
        return format_employees

    async def get_check_list_total(self, questions_list: list[int]):
        """Считает суммарное количество баллов по чек-листу"""

        query = select(
            func.sum(questions.c.grade)
        ).where(questions.c.id.in_(questions_list))

        return await database.execute(query)
    
    async def get_points_scored(self, inspection_id: int, profile_id: int):
        """Считает количество баллов по выполненным пунктам"""

        query = (
            select(
                func.sum(questions.c.grade)
            )
            .join(inspection_question, inspection_question.c.question_id == questions.c.id)
            .join(responsibility_question, responsibility_question.c.question_id == questions.c.id)
            .join(position, position.c.id == responsibility_question.c.position_id)
            .join(profile, position.c.id == profile.c.position_id)
            .where(
                inspection_question.c.inspection_id == self.inspection_id,
                inspection_question.c.result == True,
                responsibility_question.c.position_id == position.c.id,
                profile.c.id == profile_id,
            )
        )

        return await database.execute(query)

    async def get_not_checked_questions(self, questions_list: list[int]):
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
                questions.c.id.in_(questions_list),
                questions.c.id.not_in(subquery),
            )
        )

        response = await database.execute(query)

        if (response is None):
            return 0
        
        return response
    
    def calculate_result(self, total_points: int, points_scored: int, not_checked_questions: int):
        """рассчитывает результат по конкретному сотруднику"""

        if not total_points or not points_scored:
            return 0

        if total_points > 0:
            result = (points_scored / (total_points - not_checked_questions)) * 100
        else:
            result = 0

        return ceil(result)

    async def get_result(self):
        """рассчитывает общий результат по всем сотрудникам"""

        employees = await self.get_employees()

        total_result = []

        for employee in employees:
            total_points = await self.get_check_list_total(employee["result_questions"])
            points_scored = await self.get_points_scored(self.inspection_id, employee["id"])
            not_checked_questions = await self.get_not_checked_questions(employee["result_questions"])
            result = self.calculate_result(total_points, points_scored, not_checked_questions)
            total_result.append({
                "first_name": employee["first_name"],
                "last_name": employee["last_name"],
                "position": employee["position"],
                "result": result,
            })

        return total_result
