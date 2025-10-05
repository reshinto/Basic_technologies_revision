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
