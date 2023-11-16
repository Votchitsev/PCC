from datetime import date
from sqlalchemy import select, func

from modules.inspection.models.tables import inspection, inspection_question
from modules.check_list.models.tables import questions
from db.database import database


class QuestionAnalytics:
    def __init__(self, _from: date, to: date) -> None:
            self._from = _from
            self.to = to

    async def get_questions(self):
        """Получает список вопросов с количеством случаев их невыполнения"""

        query = (
            select(
                questions.c.text,
                func.count(inspection_question.c.id).label("count"),
            )
            .join(inspection_question, questions.c.id == inspection_question.c.question_id)
            .join(inspection, inspection_question.c.inspection_id == inspection.c.id)
            .where(
                inspection.c.date.between(self._from, self.to),
                inspection_question.c.result == False,
            )
            .group_by(
                questions.c.text,
            )
        )

        return await database.fetch_all(query)

    async def add_percent(self, questions: list):
        """Добавляет процент невыполнения вопроса из общего числа случаев"""

        total_count = 0

        for question in questions:
            total_count += question["count"]
        
        result = []
    
        for question in questions:
            question["percent"] = round(question["count"] / total_count * 100, 2)
            result.append(question) 

        return result
    
    def to_dict(self, records):
        """Преобразует содержимое списка в словарь"""

        result = []

        for record in records:
            result.append(dict(record))

        return result

    def create_table(self, data):
        """Обрабатывает общие данные для добавления в таблицу на клиенте"""
        
        result = {
            "head": [
                'Вопрос',
                'Количество',
                'Процент невыполнения',
            ],
            "body": []
        }

        for question in data:
            list_a = [
                question["text"],
                question["count"],
                question["percent"],
            ]

            result["body"].append(list_a)

        return result

    async def build_report(self):
        """Подготавливает конечный результат отчёта"""

        questions_list = await self.get_questions()
        print(self.to_dict(questions_list))
        with_percent = await self.add_percent(self.to_dict(questions_list))

        raw_data = sorted(with_percent, key=lambda x: x["percent"], reverse=True)

        result = self.create_table(raw_data)

        return result
