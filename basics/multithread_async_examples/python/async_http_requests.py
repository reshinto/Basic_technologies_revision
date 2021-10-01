import asyncio
import requests
import os
import time

url = "https://jsonplaceholder.typicode.com/posts/"
post_ids = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
    31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
    91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
]
results = []


# normally requires await  to run code
async def run_tasks():
    for post_id in post_ids:
        print(f"Working on post id {post_id}")
        response = requests.get(f"{url}{post_id}")
        results.append(response.json())


print("Timer started...")
start = time.time()

# method 1
# loop = asyncio.get_event_loop()
# loop.run_until_complete(run_tasks())
# loop.close()

# method 2
asyncio.run(run_tasks())

end = time.time()
total_time = end - start
print(f"It took {total_time} seconds to make {len(post_ids)} API calls")
