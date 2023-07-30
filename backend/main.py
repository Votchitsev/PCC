from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from db.database import database
from modules.router import router as api_router


app = FastAPI()
app.mount('/static', StaticFiles(directory='../frontend/dist'))

frontend = Jinja2Templates(directory="templates")


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get('/')
def root(request: Request):
    return frontend.TemplateResponse(
        "index.html", {
            "request": request,
        }
    )


@app.exception_handler(404)
def redirect_to_client(request: Request, _):
    return frontend.TemplateResponse(
        "index.html", {
            "request": request,
        }
    )   


app.include_router(api_router);
