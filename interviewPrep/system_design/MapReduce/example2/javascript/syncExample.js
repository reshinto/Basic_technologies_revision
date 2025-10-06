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
