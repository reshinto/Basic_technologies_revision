import requests
import os
import time

url = "https://jsonplaceholder.typicode.com/posts/"
post_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
results = []


def run_tasks():
    for post_id in post_ids:
        response = requests.get(f"{url}{post_id}")
        results.append(response.json())


print("Timer started...")
start = time.time()
run_tasks()
end = time.time()
total_time = end - start
print(f"It took {total_time} seconds to make {len(post_ids)} API calls")
