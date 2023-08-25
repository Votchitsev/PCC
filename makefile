dev-server:
	cd backend && uvicorn main:app --reload

server:
	cd backend && uvicorn main:app

dev-client:
	cd frontend && npm start