FROM python:3.10

WORKDIR /code

COPY ./backend/api/requirements.txt /code/requirements.txt
COPY ./backend/api/ /code/

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

USER 1001

ENTRYPOINT ["python3"]

CMD ["main.py"]
