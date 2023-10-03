run:
	cd backend && . env/bin/activate && uvicorn main:app --reload &
	cd frontend && npm start