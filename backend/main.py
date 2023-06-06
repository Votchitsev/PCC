from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


app = FastAPI()
app.mount('/static', StaticFiles(directory='../frontend/dist'))

frontend = Jinja2Templates(directory="templates")


@app.get('/')
def root(request: Request):
    return frontend.TemplateResponse(
        "index.html", {
            "request": request,
        }
    )
