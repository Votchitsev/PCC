from datetime import date


def format_date(raw_date: date) -> str:
    day = raw_date.day
    month = raw_date.month
    year = raw_date.year

    return "{day}.{month}.{year}".format(day=day, month=month, year=year)
    