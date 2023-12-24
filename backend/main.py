from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware

from db.database import database
from modules.router import router as api_router


app = FastAPI(
    title="Public Catering Check API",
    version="0.0.1",
)

app.mount('/static', StaticFiles(directory='../frontend/dist'))

frontend = Jinja2Templates(directory="templates")

origins = [
    'http://localhost',
    'http://localhost:8000',
    'http://45.140.146.226:8000/',
    'https://45.140.146.226/',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get('/', include_in_schema=False)
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
