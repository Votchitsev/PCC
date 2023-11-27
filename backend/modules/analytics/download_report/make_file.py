import io
import xlsxwriter


class XLSXFile:
    def __init__(self, table_data):
        self.table_data = table_data

    def make_file(self):
        output = io.BytesIO()
        workbook = xlsxwriter.Workbook(output)
        worksheet = workbook.add_worksheet()

        head = self.table_data['head']
        body = self.table_data['body']

        for h in range(len(head)):
            worksheet.write(0, h, head[h])

        for r in range(len(body)):
            for c in range(len(body[r])):
                worksheet.write(r + 1, c, str(body[r][c]))

        workbook.close()
        output.seek(0)

        return output
