# Django database setting

## Default sqlite3
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
```

## MySQL
* pip install mysql-connector-python
````
DATABASES = {
    'default': {
        'ENGINE': 'mysql.connector.django',
        'NAME': "trading_platform",
        "USER": "springfield",
        "PASSWORD": os.environ.get("mysqlme_password"),
        "HOST": "localhost",
        'OPTIONS': {
            'autocommit': True,
        },
    }
}
````

## PostgreSQL
* pip install psycopg2-binary
* pip install dj-database-url
    * import to settings.py
      > import dj_database_url
```
DATABASES = {'default': dj_database_url.config(
    conn_max_age=600, ssl_require=True)}
```
