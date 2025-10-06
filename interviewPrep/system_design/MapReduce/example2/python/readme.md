# Python Example

## Synchronous

```python
# Goal: count occurrences of each word in a list of text lines, synchronously.

# 1) Input data
input_text_lines = [
    "to be or not to be",
    "to be is to do",
    "do be do be do",
]

# 2) MAP: turn each line into small pieces (word, 1)
def map_words_to_counts(text_line):
    word_list = text_line.split()
    return [{"word_text": word_text, "count_one": 1} for word_text in word_list]

# 3) SHUFFLE/GROUP: group all counts by word
def group_by_word(mapped_word_counts):
    grouped = {}
    for word_count in mapped_word_counts:
        word = word_count["word_text"]
        if word not in grouped:
            grouped[word] = []
        grouped[word].append(word_count["count_one"])
    return grouped

# 4) REDUCE: add up all the 1s for each word
def reduce_counts(grouped_counts):
    final_word_counts = {}
    for word_key, list_of_ones in grouped_counts.items():
        total_for_word = sum(list_of_ones)
        final_word_counts[word_key] = total_for_word
    return final_word_counts

# Wire the steps together
all_mapped = []
for text_line in input_text_lines:
    all_mapped.extend(map_words_to_counts(text_line))

grouped = group_by_word(all_mapped)
result = reduce_counts(grouped)
print(result)
# Example output: {'to': 4, 'be': 5, 'or': 1, 'not': 1, 'is': 1, 'do': 4 }
```

## Asynchronous

```python
# Same goal, but pretend each step could be slow (e.g., disk or network).
# We'll simulate delay with asyncio.sleep(0) to yield control.

import asyncio

async def map_words_to_counts_async(text_line):
    await asyncio.sleep(0)  # simulate asynchronous work
    word_list = text_line.split()
    return [{"word_text": word_text, "count_one": 1} for word_text in word_list]

async def group_by_word_async(mapped_word_counts):
    await asyncio.sleep(0)  # simulate asynchronous work
    grouped = {}
    for word_count in mapped_word_counts:
        word = word_count["word_text"]
        if word not in grouped:
            grouped[word] = []
        grouped[word].append(word_count["count_one"])
    return grouped

async def reduce_counts_async(grouped_counts):
    await asyncio.sleep(0)  # simulate asynchronous work
    final_word_counts = {}
    for word_key, list_of_ones in grouped_counts.items():
        final_word_counts[word_key] = sum(list_of_ones)
    return final_word_counts

async def run_async_map_reduce():
    input_text_lines = [
        "to be or not to be",
        "to be is to do",
        "do be do be do",
    ]

    # MAP many lines concurrently
    mapped_batches = await asyncio.gather(*[
        map_words_to_counts_async(text_line) for text_line in input_text_lines
    ])
    all_mapped = [item for batch in mapped_batches for item in batch]

    # SHUFFLE/GROUP
    grouped = await group_by_word_async(all_mapped)

    # REDUCE
    result = await reduce_counts_async(grouped)
    print(result)

asyncio.run(run_async_map_reduce())
# Example output: {'to': 4, 'be': 5, 'or': 1, 'not': 1, 'is': 1, 'do': 4 }
```

## Explanation

Why this is MapReduce (in plain words)

- Map: break big data into many tiny labeled pieces → here, each word becomes a tiny record ("word", 1).
- Shuffle/Group: put together all tiny records that talk about the same word.
- Reduce: combine each group into a final answer → add the 1s to get the word’s total count.

If you imagine a school project:

- Everyone (mappers) counts words in one page each.
- A helper (shuffle) gathers all slips about the same word.
- A finisher (reducer) adds up slips for each word and writes the totals.
