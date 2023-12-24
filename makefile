run:
	cd backend && . env/bin/activate && export PYTHONDONTWRITEBYTECODE=1 && uvicorn main:app --reload &
	cd frontend && npm start

build:
	docker-compose up --build -d

start:
	docker-compose up -d

dev:
	docker-compose -f docker-compose.dev.yml up --build

down:
	docker-compose down