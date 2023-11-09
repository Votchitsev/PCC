run:
	cd backend && . env/bin/activate && export PYTHONDONTWRITEBYTECODE=1 && uvicorn main:app --reload &
	cd frontend && npm start