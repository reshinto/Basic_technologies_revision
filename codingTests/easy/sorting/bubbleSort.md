# Bubble Sort
Sample Input
```array = [8, 5, 2, 9, 5, 6, 3]```
Sample Output
```[2, 3, 5, 5, 6, 8, 9]```
```python
def bubbleSort(array):
    # Write your code here.
	isSorted = False
	counter = 0
	while not isSorted:
		isSorted = True
		for i in range(len(array) - 1 - counter):
			v1 = array[i]
			v2 = array[i+1]
			if v1 > v2:
				array[i], array[i+1] = array[i+1], array[i]
				isSorted = False
		counter += 1
	return array
```
```javascript
function bubbleSort(array) {
  // Write your code here.
	let isSorted = false;
	let counter = 0;
	while (!isSorted) {
		isSorted = true;
		for (let i = 0; i < array.length - 1 - counter; i++) {
			const v1 = array[i];
			const v2 = array[i+1];
			if (v1 > v2) {
				[array[i], array[i+1]] = [array[i+1], array[i]];
				isSorted = false;
			}
		}
		counter++;
	}
	return array;
}
```
