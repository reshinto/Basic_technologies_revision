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
@app.route("/get/<id>")
def get_data(id):
    return f"param id is {id}"
```
