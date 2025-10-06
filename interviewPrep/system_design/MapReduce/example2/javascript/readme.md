# Javascript Example

## Synchronous

```javascript
// Goal: count occurrences of each word in a list of text lines, synchronously.

// 1) Input data
const inputTextLines = [
  "to be or not to be",
  "to be is to do",
  "do be do be do",
];

// 2) MAP: turn each line into small pieces (word, 1)
function mapWordsToCounts(textLine) {
  const wordList = textLine.split(/\s+/);
  return wordList.map((wordText) => ({ wordText, countOne: 1 }));
}

// 3) SHUFFLE/GROUP: group all counts by word
function groupByWord(mappedWordCounts) {
  const grouped = {};
  for (const wordCount of mappedWordCounts) {
    const word = wordCount.wordText;
    if (!grouped[word]) grouped[word] = [];
    grouped[word].push(wordCount.countOne);
  }
  return grouped;
}

// 4) REDUCE: add up all the 1s for each word
function reduceCounts(groupedCounts) {
  const finalWordCounts = {};
  for (const wordKey of Object.keys(groupedCounts)) {
    const listOfOnes = groupedCounts[wordKey];
    const totalForWord = listOfOnes.reduce(
      (runningTotal, one) => runningTotal + one,
      0
    );
    finalWordCounts[wordKey] = totalForWord;
  }
  return finalWordCounts;
}

// Wire the steps together
const allMapped = inputTextLines.flatMap(mapWordsToCounts);
const grouped = groupByWord(allMapped);
const result = reduceCounts(grouped);
console.log(result);
// Example output: { to: 4, be: 5, or: 1, not: 1, is: 1, do: 4 }
```

## Asynchronous

```javascript
// Same goal as above, but pretend each step could be slow (e.g., disk or network).
// We'll simulate delay with setTimeout wrapped in a Promise.

function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), 0));
}

async function mapWordsToCountsAsync(textLine) {
  const wordList = textLine.split(/\s+/);
  const mapped = wordList.map((wordText) => ({ wordText, countOne: 1 }));
  return delay(mapped);
}

async function groupByWordAsync(mappedWordCounts) {
  const grouped = {};
  for (const wordCount of mappedWordCounts) {
    const word = wordCount.wordText;
    if (!grouped[word]) grouped[word] = [];
    grouped[word].push(wordCount.countOne);
  }
  return delay(grouped);
}

async function reduceCountsAsync(groupedCounts) {
  const finalWordCounts = {};
  for (const wordKey of Object.keys(groupedCounts)) {
    const listOfOnes = groupedCounts[wordKey];
    const totalForWord = listOfOnes.reduce(
      (runningTotal, one) => runningTotal + one,
      0
    );
    finalWordCounts[wordKey] = totalForWord;
  }
  return delay(finalWordCounts);
}

async function runAsyncMapReduce() {
  const inputTextLines = [
    "to be or not to be",
    "to be is to do",
    "do be do be do",
  ];

  // MAP many lines in parallel
  const mappedBatches = await Promise.all(
    inputTextLines.map(mapWordsToCountsAsync)
  );
  const allMapped = mappedBatches.flat();

  // SHUFFLE/GROUP
  const grouped = await groupByWordAsync(allMapped);

  // REDUCE
  const result = await reduceCountsAsync(grouped);
  console.log(result);
}

runAsyncMapReduce();
// Example output: { to: 4, be: 5, or: 1, not: 1, is: 1, do: 4 }
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
