# Python Example

## Single Thread

### Synchronous

```python
import requests
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


def run_tasks():
    for post_id in post_ids:
        print(f"Working on post id {post_id}")
        response = requests.get(f"{url}{post_id}")
        results.append(response.json())


if __name__ == '__main__':
    print("Timer started...")
    start = time.time()
    run_tasks()
    end = time.time()
    total_time = end - start
    print(f"It took {total_time} seconds to make {len(post_ids)} API calls")
```

### Asynchronous

```python
import asyncio
import requests
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


if __name__ == '__main__':
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
```

## Multi-Thread

### Asyncio

- version 1

```python
import asyncio
import aiohttp
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


def get_tasks(session):
    tasks = []
    for post_id in post_ids:
        print(f"Working on post id {post_id}")
        tasks.append(session.get(f"{url}{post_id}"))
    return tasks


async def run_tasks():
    async with aiohttp.ClientSession() as session:
        tasks = get_tasks(session)
        responses = await asyncio.gather(*tasks)
        for response in responses:
            results.append(await response.json())


if __name__ == '__main__':
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
```

- version 2

```python
import asyncio
import aiohttp
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


def get_tasks(session):
    tasks = []
    for post_id in post_ids:
        print(f"Working on post id {post_id}")
        tasks.append(asyncio.create_task(session.get(f"{url}{post_id}")))
    return tasks


async def run_tasks():
    async with aiohttp.ClientSession() as session:
        tasks = get_tasks(session)
        responses = await asyncio.gather(*tasks)
        for response in responses:
            results.append(await response.json())


if __name__ == '__main__':
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
```

## Multi-Processing

```python
import multiprocessing
import requests
import time

url = "https://jsonplaceholder.typicode.com/posts/"
post_ids = [
    1, 2, 3,  4, 5, 6, 7, 8, 9, 10,
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


def make_request(post_id, results):
    response = requests.get(f"{url}{post_id}")
    results.append(response.json())


def run_tasks():
    manager = multiprocessing.Manager()
    results = manager.list()
    processes = []
    for post_id in post_ids:
        print(f"Working on post id {post_id}")
        p = multiprocessing.Process(target=make_request, args=[post_id, results])
        processes.append(p)
        p.start()

    for process in processes:
        process.join()

    print(results)


if __name__ == '__main__':
    print("Timer started...")
    start = time.time()
    run_tasks()
    end = time.time()
    total_time = end - start
    print(f"It took {total_time} seconds to make {len(post_ids)} API calls")
```

## Multi-Concurrency

- version 1: not in order

```python
import concurrent.futures
import requests
import time

url = "https://jsonplaceholder.typicode.com/posts/"
post_ids = [
    1, 2, 3,  4, 5, 6, 7, 8, 9, 10,
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


def make_request(post_id):
    response = requests.get(f"{url}{post_id}")
    return response.json()


def run_tasks():
    futures = []
    # with concurrent.futures.ThreadPoolExecutor() as executor:  # change to this to use threads
    with concurrent.futures.ProcessPoolExecutor() as executor:
        for post_id in post_ids:
            print(f"Working on post id {post_id}")
            f = executor.submit(make_request, post_id)
            futures.append(f)

        for future in concurrent.futures.as_completed(futures):
            print(future.result())

if __name__ == '__main__':
    print("Timer started...")
    start = time.time()
    run_tasks()
    end = time.time()
    total_time = end - start
    print(f"It took {total_time} seconds to make {len(post_ids)} API calls")
```

- version 2: in order

```python
import concurrent.futures
import requests
import time

url = "https://jsonplaceholder.typicode.com/posts/"
post_ids = [
    1, 2, 3,  4, 5, 6, 7, 8, 9, 10,
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


def make_request(post_id):
    response = requests.get(f"{url}{post_id}")
    return response.json()


def run_tasks():
    # with concurrent.futures.ThreadPoolExecutor() as executor:  # change to this to use threads
    with concurrent.futures.ProcessPoolExecutor() as executor:
        futures = executor.map(make_request, post_ids)

        for future in futures:
            print(future)

if __name__ == '__main__':
    print("Timer started...")
    start = time.time()
    run_tasks()
    end = time.time()
    total_time = end - start
    print(f"It took {total_time} seconds to make {len(post_ids)} API calls")
```
