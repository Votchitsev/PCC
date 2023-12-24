#!/bin/bash

run_uvicorn () {
  uvicorn main:app --host 0.0.0.0 --port 8000 --reload
}

while true; do
  run_uvicorn
  sleep 1
done
