import json
from flask import Flask, render_template

app = Flask(__name__, static_folder="static")


@app.route('/')
def home():
    return render_template('MainPage1.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=2000)
