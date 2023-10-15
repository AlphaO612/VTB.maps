import datetime, codecs, json, os, math
from other import NumpyArrayEncoder
from ML.busy_analysis import Prediction

from pyairtable import *
from flask import Flask

API_KEY = os.getenv('API_KEY')
TABLE_BASE_ID = os.getenv('TABLE_BASE_ID')
TABLE_OFFICES = os.getenv('TABLE_OFFICES')

app = Flask(__name__)
#
# answer = {
#     "status": False,  # true - всё нормально, false - ошибка
#     "response": {
#
#     }
# }
def get_stats(table: Table, **kwargs) -> list[tuple[str, str, str]]:
    result_data: list[tuple[str]] = []
    for i in table.iterate(**kwargs):
        for a in i:
            result_data.append(a['fields'])
    return result_data

@app.get("/getOffices")
def system(detail: bool = False):
    result = []
    for columns in Api(API_KEY).table(TABLE_BASE_ID, TABLE_OFFICES).all():
        result.append({
        i:columns['fields'][i] if i!="pointin" else list(map(float,columns['fields'][i][1:-1].split(",")))
        for i in {
            True: "id, name, address, pointIn, lpOpenHours, individualOpenHours, rko, salePointFormat, "
                  "suoAvailability, hasRamp, metroStation, kep",
            False: "name, address, pointin"
        }[detail].split(", ")
    })
    return json.dumps(dict(data=result), ensure_ascii=False)

@app.route('/prediction/<w>')
def prediction(w):
    p = Prediction()
    data = {"load":p.getPredict(w)}
    data = json.dumps(data, cls=NumpyArrayEncoder)
    return data

if __name__ == "__main__":
    app.run("0.0.0.0", port=5000)
