FROM node:18 as frontend_app
WORKDIR /app
COPY frontend/package*.json /app/
RUN npm install
COPY frontend /app
RUN npm run build

FROM python:3.10
WORKDIR /app
COPY --from=frontend_app /app/ /app/frontend
RUN mkdir -p /app/backend
COPY backend /app/backend
ENV PYTHONUNBUFFERED=1
RUN cd /app/backend && python -m pip install --upgrade pip
RUN cd /app/backend && pip install -r requirements.txt
RUN cd /app/backend && chmod +x run.sh
