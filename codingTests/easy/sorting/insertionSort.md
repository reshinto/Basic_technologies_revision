# Insertion Sort
Sample Input
```array = [8, 5, 2, 9, 5, 6, 3]```
Sample Output
```[2, 3, 5, 5, 6, 8, 9]```
```python
# solution 1
def insertionSort(array):
    # Write your code here.
    i = 0
	while i < len(array) - 1:
		for j in range(i + 1, -1, -1):
			if j > 0 and array[j] < array[j - 1]:
				array[j], array[j - 1] = array[j - 1], array[j]
		i += 1
	return array
  
  
# solution 2
def insertionSort(array):
    # Write your code here.
    for i in range(1, len(array)):
		j = i
		while j > 0 and array[j] < array[j - 1]:
			array[j], array[j-1] = array[j-1], array[j]
			j -= 1
	return array
```
```javascript
// solution 1
function insertionSort(array) {
  // Write your code here.
	let i = 0;
	while (i < array.length - 1) {
		for (let j=i+1; j>=0; j--) {
			if (j > 0 && array[j] < array[j-1]) {
				[array[j], array[j-1]] = [array[j-1], array[j]];
			}
		}
		i++;
	}
	return array;
}

// solution 2
function insertionSort(array) {
  // Write your code here.
	for (let i=1; i<array.length; i++) {
		let j = i;
		while (j > 0 && array[j] < array[j-1]) {
			[array[j], array[j-1]] = [array[j-1], array[j]];
			j--;
		}
	}
	return array;
}
```
