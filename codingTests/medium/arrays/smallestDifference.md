# Smallest Difference

  Write a function that takes in two non-empty arrays of integers, finds the
  pair of numbers (one from each array) whose absolute difference is closest to
  zero, and returns an array containing these two numbers, with the number from
  the first array in the first position.
  
  Note that the absolute difference of two integers is the distance between
  them on the real number line. For example, the absolute difference of -5 and 5
  is 10, and the absolute difference of -5 and -4 is 1.
  
  You can assume that there will only be one pair of numbers with the smallest
  difference.
  
  Sample Input
  ```arrayOne = [-1, 5, 10, 20, 28, 3]```
  ```arrayTwo = [26, 134, 135, 15, 17]```
  Sample Output
  ```[28, 26]```
```python
# solution 1
def smallestDifference(arrayOne, arrayTwo):
	# Write your code here.
	result = []
	diff = None
	for v1 in arrayOne:
		for v2 in arrayTwo:
			v = abs(v1 - v2)
			if diff is None or v < diff:
				diff = v
				result = [v1, v2]
	return result


# solution 2
def smallestDifference(arrayOne, arrayTwo):
	# Write your code here.
	arrayOne.sort()
	arrayTwo.sort()
	L1 = 0
	L2 = 0
	R1 = len(arrayOne)
	R2 = len(arrayTwo)
	diff = None
	result = []
	while L1 < R1 and L2 < R2:
		v1 = arrayOne[L1]
		v2 = arrayTwo[L2]
		v = abs(v1 - v2)
		if diff is None or v < diff:
			diff = v
			result = [v1, v2]
		if v1 < v2:
			L1 += 1
		elif v2 < v1:
			L2 += 1
		else:
			return [v1, v2]
	return result
```
```javascript
function smallestDifference(arrayOne, arrayTwo) {
	// Write your code here.
	arrayOne.sort((a, b) => a - b);
	arrayTwo.sort((a, b) => a - b);
	let L1 = 0;
	let L2 = 0;
	let diff;
	let result = [];
	while (L1 < arrayOne.length && L2 < arrayTwo.length) {
		const v1 = arrayOne[L1];
		const v2 = arrayTwo[L2];
		const v = Math.abs(v1 - v2);
		if (!diff || v < diff) {
			diff = v;
			result = [v1, v2];
		}
		if (v1 < v2) {
			L1++;
		} else if (v2 < v1) {
			L2++;
		} else {
			return [v1, v2];
		}
	}
	return result;
}
```
