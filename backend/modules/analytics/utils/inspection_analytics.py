from datetime import date
from sqlalchemy import select

from modules.inspection.models.tables import inspection
from modules.departments.models.tables import department, department_group
from modules.inspection.utils.employee_result import EmployeeResultCalculation
from db.database import database


class InspectionAnalytics:
    def __init__(self, _from: date, to: date) -> None:
        self._from = _from
        self.to = to

    async def get_inspections(self):
        """Получение списка проверок в заданном интервале времени"""
        
        inspection_query = (
            select(
                inspection.c.id,
                inspection.c.date,
                department.c.name.label("department"),
                department_group.c.name.label("department_group"),
                inspection.c.total_result,
            )
            .join(department, inspection.c.department_id == department.c.id)
            .join(department_group, department.c.department_group_id == department_group.c.id)
            .where(inspection.c.date.between(self._from, self.to))
        )

        return await database.fetch_all(inspection_query)
    
    async def get_employees_result(self, inspection_id: int):
        employee_result = EmployeeResultCalculation(inspection_id)
        return await employee_result.get_result()
    
    async def add_employees_result(self, inspection_records):
        """К проверкам в списке проверок добавляет результаты сотрудников"""

        inspections_list = list(inspection_records)

        result = []

        for inspection in inspections_list:
            employees_result = await self.get_employees_result(inspection.id)
            inspection_dict = dict(inspection)
            inspection_dict["result"] = list(employees_result)

            result.append(inspection_dict)

        return result
    
    def create_common_table(self, data):
        """Обрабатывает общие данные для добавления в таблицу на клиенте"""
        
        result = {
            "head": [
                "Дата",
                "Объект",
                "Группа объектов",
                "Итоговый балл",

            ],
            "body": []
        }

        for inspection in data:
            list_a = [
                inspection["date"],
                inspection["department"],
                inspection["department_group"],
                inspection["total_result"],
            ]

            result["body"] = list_a

        return result
    
    def create_employee_table(self, data):
        """Обрабатывает данные с оценками по сотрудникам для добавления в таблицу на клиенте"""

        result = {
            "head": [
                "Сотрудник",
                "Оценка",
                "Проверка"
            ],
            "body": []
        }

        for inspection in data:
            for inspection_result in inspection["result"]:
                employee = "{first_name} {last_name} ({position})".format(
                    first_name=inspection_result["first_name"],
                    last_name=inspection_result["last_name"],
                    position=inspection_result["position"],
                )

                inspection_info = "{date} {department} {department_group}".format(
                    date=inspection["date"],
                    department=inspection["department"],
                    department_group=inspection["department_group"],
                )

                result["body"].append([
                    employee,
                    inspection_result["result"],
                    inspection_info,
                ])

        return result

    async def build_report(self, type: str):
        """Подготавливает конечный результат отчёта"""

        inspections_records = await self.get_inspections()
        with_employees_result = await self.add_employees_result(inspections_records)

        if type == "common":
            return self.create_common_table(with_employees_result)
        
        if type == "employee":
            return self.create_employee_table(with_employees_result)
