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
