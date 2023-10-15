FROM python:3.10
WORKDIR /app
COPY ./frontend/requirements.txt /app/requirements.txt
COPY ./frontend/ /app/
RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt
COPY . .

# Set the environment variable for Gunicorn to use
ENV PYTHONUNBUFFERED=TRUE


USER 1001

ENTRYPOINT ["python3"]

CMD ["main.py"]