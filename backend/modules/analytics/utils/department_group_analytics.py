from datetime import date
import math
from sqlalchemy import select, func, desc

from modules.departments.models.tables import department_group, department
from modules.inspection.models.tables import inspection
from db.database import database    


class DepartmentGroupAnalytics:
    def __init__ (self, _from: date, to: date) -> None:
        self._from = _from
        self.to = to
    
    def create_table(self, data):
        """Обрабатывает данные для добавления в таблицу на клиенте"""

        result = {
            "head": [
                "Группа объектов",
                "Средний балл",
            ],
            "body": []
        }

        for department_group in data:
            list_a = [
                department_group["department_group"],
                math.ceil(department_group["average"]),
            ]

            result["body"].append(list_a)

        return result


    async def get_departments_group(self):
        """Получает средний балл по каждой группе подразделений"""

        query = (
            select(
                department_group.c.name.label("department_group"),
                func.avg(inspection.c.total_result).label("average"),
            )
            .join(department, inspection.c.department_id == department.c.id)
            .join(department_group, department.c.department_group_id == department_group.c.id)
            .where(inspection.c.date.between(self._from, self.to))
            .group_by(department_group.c.name)
            .order_by(desc("average"))
        )

        return await database.fetch_all(query)

    async def build_report(self):
        """Подготавливает конечный результат отчёта"""

        raw_report = await self.get_departments_group()
        return self.create_table(raw_report)
