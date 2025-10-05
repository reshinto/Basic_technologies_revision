# Handling PIP

## Create requirements file

> `pip freeze > requirements.txt`

## Uninstall packages installed from requirements.txt

> `pip uninstall -r requirements.txt -y`

## Uninstall all packages without any reference

> `pip uninstall -y -r <(pip freeze)`
