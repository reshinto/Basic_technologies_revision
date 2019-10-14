import os
import mysql.connector as sql
from faker import Faker

fake = Faker()

connection = sql.connect(
    user="springfield",
    password=os.environ.get("mysqlme_password"),
    host="localhost",
    database="join_us"
)


def query(queries=None, _table=None, _key_list=None, _data_tuple=None):
    cursor = connection.cursor(dictionary=True)
    many = False
    if _data_tuple is not None:
        query_keys = ", ".join(_key_list)
        if isinstance(_data_tuple, tuple):
            query_data = ", ".join(["%s"] * len(_data_tuple))
        else:
            many = True
            query_data = ", ".join(["%s"] * len(_data_tuple[0]))
        queries = """INSERT INTO %s (%s) VALUES (%s)""" % (
            _table, query_keys, query_data)
        if many is True:
            cursor.executemany(queries, _data_tuple)
        else:
            cursor.execute(queries, _data_tuple)
        connection.commit()
        cursor.close()
        return None
    cursor.execute(queries)
    result = cursor.fetchall()
    cursor.close()
    return result


q = "SELECT * FROM users"
print(query(q))


# insert multiple data for 1 user
key_list = ["email", "created_at"]
data_tuple = (fake.email(), fake.date_time())  # pylint: disable=no-member
# query(_table="users", _key_list=key_list, _data_tuple=data_tuple)

# insert multiple data for multiple users
key_list = ["email", "created_at"]
data_tuple = []
for i in range(500):
    # pylint: disable=no-member
    data_tuple.append((fake.email(), fake.date_time()))

query(_table="users", _key_list=key_list, _data_tuple=data_tuple)

q = "SELECT COUNT(*) AS total FROM users"
print(query(q))

connection.close()
