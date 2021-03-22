# Flask
## How to run
### method 1
- app.py file
```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "hello"
```
- mac
> export FLASK_ENV=development && export FLASK_APP=app && flask run
- windows
> cmd /C "set FLASK_ENV=development && set FLASK_APP=app && flask run"
### method 2
- app/\_\_init\_\_.py file
```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "hello"
```
- mac
> export FLASK_ENV=development && export FLASK_APP=app && flask run
- windows
> cmd /C "set FLASK_ENV=development && set FLASK_APP=app && flask run"
### method 3
- app.py file
```python
from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "hello"
   
if __name__ == "__main__":
    app.run(debug=True)
```
- mac
> python3 app.py
- windows
> python app.py
## Get parameter data from url
```python
from flask import Flask, jsonify

app = Flask(__name__)


# method 1
@app.route("/get/<id>")
def get_data(id):
    return jsonify({"id": id})
    

# method 2
@app.route("/gets/<id>", methods=["GET"])
def gets_data(id):
    return jsonify({"id": id})
```
## Post data
```python
from flask import Flask, request

app = Flask(__name__)


class Model():
    def __init__(self, name):
        self.id = 1
        self.name = name


@app.route("/post", methods=["POST"])
def post_data():
    new_item = Model(request.json["name"])
    return { "id": new_item.id }
```
