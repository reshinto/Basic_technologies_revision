# Two Number Sum
Write a function that takes in a non-empty array of distinct integers and an
integer representing a target sum. If any two numbers in the input array sum
up to the target sum, the function should return them in an array, in any
order. If no two numbers sum up to the target sum, the function should return
an empty array.

Note that the target sum has to be obtained by summing two different integers
in the array; you can't add a single integer to itself in order to obtain the
target sum.

You can assume that there will be at most one pair of numbers summing up to
the target sum.

Sample Input
```array = [3, 5, -4, 8, 11, 1, -1, 6]```
```targetSum = 10```
Sample Output
```[-1, 11]```

```python
# solution 1
def twoNumberSum(array, targetSum):
	# Write your code here.
	arrLength = len(array)
	for i in range(arrLength - 1):
		firstNum = array[i]
		for j in range(i + 1, arrLength):
			secondNum = array[j]
			if firstNum + secondNum == targetSum:
				return [firstNum, secondNum]
	return []


# solution 2
def twoNumberSum(array, targetSum):
	# Write your code here.
	nums = {}
	for num in array:
		potentialNum = targetSum - num
		if potentialNum in nums:
			return [potentialNum, num]
		nums[num] = True
	return []
  
 
# solution 3
def twoNumberSum(array, targetSum):
	# Write your code here.
	array.sort()
	left = 0
	right = len(array) - 1
	while left < right:
		currentSum = array[left] + array[right]
		if currentSum == targetSum:
			return [array[left], array[right]]
		elif currentSum < targetSum:
			left += 1
		elif currentSum > targetSum:
			right -= 1
	return []
```
```javascript
// solution 1
function twoNumberSum(array, targetSum) {
	// Write your code here.
	for (let i=0; i<array.length-1; i++) {
		const firstNum = array[i];
		for (let j=i+1; j<array.length; j++) {
		  const secondNum = array[j];
			if (firstNum + secondNum === targetSum) {
			  return [firstNum, secondNum];
			}
		}
	}
	return [];
}

// solution 2
function twoNumberSum(array, targetSum) {
	// Write your code here.
	const nums = {};
	for (let i=0; i<array.length; i++) {
		let potentialNum = targetSum - array[i];
		if (nums[potentialNum]) {
			return [potentialNum, array[i]];
		}
		nums[array[i]] = true;
	}
	return [];
}

// solution 3
function twoNumberSum(array, targetSum) {
	// Write your code here.
	array.sort((a,b) => a - b);
	let left = 0;
	let right = array.length - 1;
	while (left < right) {
		let currentSum = array[left] + array[right];
		if (currentSum === targetSum) {
			return [array[left], array[right]];
		}
		else if (currentSum < targetSum) {
		  left++;
		}
		else if (currentSum > targetSum) {
			right--;
		}
	}
	return [];
}
```
