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
