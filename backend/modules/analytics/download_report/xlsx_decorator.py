import io
import xlsxwriter

def xlsx_file(function):
    def decorate_function(start_date=None, finish_date=None):
        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output)
        worksheet = workbook.add_worksheet()

        function(workbook, worksheet, start_date, finish_date)

        workbook.close()
        output.seek(0)

        return output

    return decorate_function
    