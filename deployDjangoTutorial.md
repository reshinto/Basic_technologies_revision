1. Ensure gunicorn is installed
    > pip install gunicorn
2. Install whitenoise for static files
    > pip install whitenoise
    * Add middleware and static_root to settings.py
    ```python
    MIDDLEWARE = [
        'whitenoise.middleware.WhiteNoiseMiddleware',
    ]

    # not required if creating django rest api
    PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

    STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
    ```
3. Ensure environment variables are preset in settings.py
    ```python
    SECRET_KEY = os.environ.get('SECRET_KEY')

    DEBUG = (os.environ.get('DEBUG_VALUE') == 'True')
    ```
4. Create Procfile
    > vim Procfile
    * Add the following to Procfile
      * project name is the folder containing the settings.py
    > web: gunicorn [project_name].wsgi --log-file -
    * example
    > web: gunicorn experiment_project.wsgi --log-file -
5. Ensure pipfile or requirement.txt is already in project folder
6. Setup .gitignore file
7. Init with git, ignore if already done
    > git init
8. Add and commit
    > git add . && git commit -m "initial commit"
9. Login to Heroku
    > heroku login
10. Create heroku project (project name will be the url)
    > heroku create project_name
    * url will be https://project_name.herokuapp.com
    * if project_name is not given, random name will be given
11. Add allowed host in settings.py
    ```python
    ALLOWED_HOSTS = ['project_name.herokuapp.com']
    ```
    > git add . && git commit -m "add allowed host"
12. Set buildpack to ensure heroku understands project setup (maybe not be required)
    > heroku buildpacks:set heroku/python
13. Set heroku environment variables
    * view all configs
    > heroku config
    * set environment variable
      * example 1
      > heroku config:set DEBUG_VALUE='False'
      * example 2
      > heroku config:set SECRET_KEY=xxx
    * generate new secret key if don't have
    ```python
    # use python 3
    import secrets
    print(secrets.token_hex(24))
    ```
14. Push to heroku
    > git push heroku master
15. Setup database if required (TO BE UPDATED)
16. User heroku BASH to create superuser and migrate
    * Run bash
    > heroku run bash
    * Migrate
    > python manage.py migrate
    * Create super user
    > python manage.py createsuperuser
17. Open website
    > heroku open
18. Check releases for version to rollback if required
    > heroku releases
19. Rollback if neccessary
    > heroku rollback vxxx
    * example
    > heroku rollback v2
