run:
	cd backend && . env/bin/activate && export PYTHONDONTWRITEBYTECODE=1 && uvicorn main:app --reload &
	cd frontend && npm start

build:
	docker-compose up --build -d

dev:
	docker-compose up -d

down:
	docker-compose down