# Python
## Table of Contents
- [Hello World](#hello-world)
- [Comments](#comments)
- [Program Entry Point](#program-entry-point)
- [Collections](#collections)
  - [List](#list)
  - [Dictionary](#dictionary)
  - [Set](#set)
  - [Tuple](#tuple)
  - [Range](#range)
  - [Enumerate](#enumerate)
  - [Iterator](#iterator)
  - [Generator](#generator)
- [Types](#types)
  - [Type](#type)
  - [String](#string)
  - [Regular Expression](#regular-expression)
  - [Format](#format)
  - [Numbers](#numbers)
  - [Combinatorics](#combinatorics)
  - [Datetime](#datetime)
- [Syntax](#syntax)
  - [Args](#args)
  - [Inline](#inline)
  - [Closure](#closure)
  - [Decorator](#decorator)
  - [Class](#class)
  - [Duck Type](#duck-type)
  - [Enum](#enum)
  - [Exception](#exception)
- [System](#System)
  - [Exit](#exit)
  - [Print](#print)
  - [Input](#input)
  - [Command Line Arguments](#command-line-arguments)
  - [Open](#open)
  - [Path](#path)
  - [OS Commands](#os-commands)
- [Data](#data)
  - [JSON](#json)
  - [Pickle](#pickle)
  - [CSV](#csv)
  - [SQLite](#sqlite)
  - [Bytes](#bytes)
  - [Struct](#struct)
  - [Array](#array)
  - [Memory View](#memory-view)
  - [Deque](#deque)
- [Advanced](#advanced)
  - [Threading](#threading)
  - [Operator](#operator)
  - [Introspection](#introspection)
  - [Metaprogramming](#metaprogramming)
  - [Eval](#eval)
  - [Coroutine](#coroutine)
- [Libraries](#libraries)
  - [Progress Bar](#progress-bar)
  - [Plot](#plot)
  - [Table](#table)
  - [Curses](#curses)
  - [Logging](#logging)
  - [Scraping](#scraping)
  - [Web](#web)
  - [Profile](#profile)
  - [NumPy](#numpy)
  - [Image](#image)
  - [Audio](#audio)
  - [Games](#games)
  - [Pandas](#pandas)
  - [Plotly](#plotly)
  - [Cython](#Cython)

## Hello World
#### python 2
```python
print "Hello World"
```
#### python 3
```python
print("Hello World")  # "Hello World\n"
print("Hello", "World", sep="/")  # "Hello/World"
print("Hello World", end="")  # "Hello World"
```

[back to top](#table-of-contents)

## Comments
```python
# Single line comment
    
"""
multi-line comments
"""
```

[back to top](#table-of-contents)

## Program Entry Point
```python
if __name__ === "__main__":
    # do something
```

[back to top](#table-of-contents)

## Collections
### List
```python
import itertools
import functools

<list> = <list>[from_inclusive : to_exclusive : ±step_size]

<list>.append(<el>)  # Or: <list> += [<el>]
<list>.extend(<collection>)  # Or: <list> += <collection>

<list>.sort()
<list>.reverse()
<list> = sorted(<collection>)
<iter> = reversed(<list>)

sum_of_elements  = sum(<collection>)
elementwise_sum  = [sum(pair) for pair in zip(list_a, list_b)]

sorted_by_second = sorted(<collection>, key=lambda el: el[1])
sorted_by_both   = sorted(<collection>, key=lambda el: (el[1], el[0]))

# Flatten list
list_example = [[1, 2, 3], [4, 5, 6], [7], [8, 9]]
flatter_list = list(itertools.chain.from_iterable(list_example))  # [1, 2, 3, 4, 5, 6, 7, 8, 9]

product_of_elems = functools.reduce(lambda out, el: out * el, <collection>)

list_of_chars    = list(<str>)

<int> = <list>.count(<el>)  # Returns number of occurrences, also works on strings

index = <list>.index(<el>)  # Returns index of first occurrence or raises ValueError

<list>.insert(index, <el>)  # Inserts item at index and moves the rest to the right

<el> = <list>.pop([index])  # Removes and returns item at index or from the end

<list>.remove(<el>)  # Removes first occurrence of item or raises ValueError

<list>.clear()  # Removes all items, also works on dictionary and set
```

[back to top](#table-of-contents)

### Dictionary
```python
<view> = <dict>.keys()  # Coll. of keys that reflects changes
<view> = <dict>.values()  # Coll. of values that reflects changes
<view> = <dict>.items()  # Coll. of key-value tuples that reflects chgs

value  = <dict>.get(key, default=None)  # Returns default if key is missing
value  = <dict>.setdefault(key, default=None)  # Returns and writes default if key is missing
<dict> = collections.defaultdict(<type>)  # Creates a dict with default value of type
<dict> = collections.defaultdict(lambda: 1)  # Creates a dict with default value 1

<dict> = dict(<collection>)  # Creates a dict from coll. of key-value pairs
<dict> = dict(zip(keys, values))  # Creates a dict from two collections
<dict> = dict.fromkeys(keys [, value])  # Creates a dict from collection of keys

<dict>.update(<dict>)  # Adds items. Replaces ones with matching keys
value = <dict>.pop(key)  # Removes item or raises KeyError
{k for k, v in <dict>.items() if v == value}  # Returns set of keys that point to the value
{k: v for k, v in <dict>.items() if k in keys}  # Returns a dictionary, filtered by keys
```
- Counter
```python
from collections import Counter

colors = ['blue', 'blue', 'blue', 'red', 'red']
counter = Counter(colors)
counter['yellow'] += 1  # Counter({'blue': 3, 'red': 2, 'yellow': 1})

counter.most_common()[0]  # ('blue', 3)
```

[back to top](#table-of-contents)

### Set
```python
<set> = set()

<set>.add(<el>)  # Or: <set> |= {<el>}
<set>.update(<collection>)  # Or: <set> |= <set>

<set>  = <set>.union(<coll.>)  # Or: <set> | <set>
<set>  = <set>.intersection(<coll.>)  # Or: <set> & <set>
<set>  = <set>.difference(<coll.>)  # Or: <set> - <set>
<set>  = <set>.symmetric_difference(<coll.>)  # Or: <set> ^ <set>
<bool> = <set>.issubset(<coll.>)  # Or: <set> <= <set>
<bool> = <set>.issuperset(<coll.>)  # Or: <set> >= <set>

<el> = <set>.pop()  # Raises KeyError if empty
<set>.remove(<el>)  # Raises KeyError if missing
<set>.discard(<el>)  # Doesn't raise an error
```
- Frozen Set
  - Is immutable and hashable
  - That means it can be used as a key in a dictionary or as an element in a set
```python
<frozenset> = frozenset(<collection>)
```

[back to top](#table-of-contents)

### Tuple
- Tuple is an immutable and hashable list
```python
<tuple> = ()
<tuple> = (<el>, )
<tuple> = (<el_1>, <el_2> [, ...])
```
- Named Tuple
  - Tuple's subclass with named elements
```python
from collections import namedtuple

Point = namedtuple('Point', 'x y')

p = Point(1, y=2)  # Point(x=1, y=2)
p[0]  # 1

p.x  # 1

getattr(p, 'y')  # 2

p._fields  # ('x', 'y')
Point._fields  # ('x', 'y')
```

[back to top](#table-of-contents)

### Range
```python
<range> = range(to_exclusive)
<range> = range(from_inclusive, to_exclusive)
<range> = range(from_inclusive, to_exclusive, ±step_size)

from_inclusive = <range>.start
to_exclusive   = <range>.stop
```

[back to top](#table-of-contents)

### Enumerate
```python
for i, el in enumerate(<collection> [, i_start]):
    ...
```

[back to top](#table-of-contents)

### Iterator
```python
<iter> = iter(<collection>)  # `iter(<iter>)` returns unmodified iterator
<iter> = iter(<function>, to_exclusive)  # A sequence of return values until 'to_exclusive'
<el>   = next(<iter> [, default])  # Raises StopIteration or returns 'default' on end
<list> = list(<iter>)  # Returns a list of iterator's remaining elements
```
- Itertools
```python
from itertools import count, repeat, cycle, chain, islice

<iter> = count(start=0, step=1)  # Returns updated value endlessly. Accepts floats
<iter> = repeat(<el> [, times])  # Returns element endlessly or 'times' times
<iter> = cycle(<collection>)  # Repeats the sequence endlessly

<iter> = chain(<coll_1>, <coll_2> [, ...])  # Empties collections in order
<iter> = chain.from_iterable(<collection>)  # Empties collections inside a collection in order

<iter> = islice(<collection>, to_exclusive)
<iter> = islice(<collection>, from_inclusive, to_exclusive [, +step_size])
```

[back to top](#table-of-contents)

### Generator
- Any function that contains a yield statement returns a generator
- Generators and iterators are interchangeable
```python
def count(start, step):
    while True:
        yield start
        start += step


counter = count(10, 2)
next(counter), next(counter), next(counter)  # (10, 12, 14)
```

[back to top](#table-of-contents)

## Types
### Type
- Everything is an object
- Every object has a type
- Type and class are synonymous
```python
<type> = type(<el>)  # Or: <el>.__class__
<bool> = isinstance(<el>, <type>)  # Or: issubclass(type(<el>), <type>)

type('a'), 'a'.__class__, str  # (<class 'str'>, <class 'str'>, <class 'str'>)
```
- Some types do not have built-in names, so they must be imported
```python
from types import FunctionType, MethodType, LambdaType, GeneratorType
```
- Abstract Base Classes
  - Each abstract base class specifies a set of virtual subclasses
  - These classes are then recognized by isinstance() and issubclass() as subclasses of the ABC, although they are really not
```python
from collections.abc import Sequence, Collection, Iterable

isinstance([1, 2, 3], Iterable)  # True
```

||Sequence|Collection|Iterable|
|-|-|-|-|
|list, range, str|&#9745;|&#9745;|&#9745;|
|dict, set||&#9745;|&#9745;|
|iter|||&#9745;|

```python
from numbers import Integral, Rational, Real, Complex, Number

isinstance(123, Number)  # True
```

||Integral|Rational|Real|Complex|Number|
|-|-|-|-|-|-|
|int|&#9745;|&#9745;|&#9745;|&#9745;|&#9745;|
|fractions.Fraction||&#9745;|&#9745;|&#9745;|&#9745;|
|float|||&#9745;|&#9745;|&#9745;|
|complex||||&#9745;|&#9745;|
|decimal.Decimal|||||&#9745;|

[back to top](#table-of-contents)

### String
```python
str1 = "test string"
str1.capitalize()  # "Test string"
str1.upper()  # "TEST STRING"
str1.lower()  # "test string"
str1.title()  # "Test String"


<str> = <str>.strip()  # Strips all whitespace characters from both ends
<str> = <str>.strip('<chars>')  # Strips all passed characters from both ends
<str> = <str>.lstrip()  # Strips all whitespace characters from left end
<str> = <str>.rstrip()  # Strips all whitespace characters from right end

<list> = <str>.split()  # Splits on one or more whitespace characters
<list> = <str>.split(sep=None, maxsplit=-1)  # Splits on 'sep' str at most 'maxsplit' times.
<list> = <str>.splitlines(keepends=False)  # Splits on \n,\r,\r\n. Keeps them if 'keepends'
<str>  = <str>.join(<coll_of_strings>)  # Joins elements using string as separator

<bool> = <sub_str> in <str>  # Checks if string contains a substring
<bool> = <str>.startswith(<sub_str>)  # Pass tuple of strings for multiple options
<bool> = <str>.endswith(<sub_str>)  # Pass tuple of strings for multiple options
<int> = <str>.find(<sub_str>)  # Returns start index of first match or -1
<int> = <str>.index(<sub_str>)  # Same but raises ValueError if missing

<str> = <str>.replace(old, new [, count])   # Replaces 'old' with 'new' at most 'count' times

txt = "Hello Sam!"
mytable = txt.maketrans("S", "P")  # Create a mapping table
# use mapping table in the translate() method to replace any "S" characters with a "P" character
txt.translate(mytable)  # "Hello Pam!"

<str> = chr(<int>)  # Converts int to Unicode char
<int> = ord(<str>)  # Converts Unicode char to int
```
- Property Methods

||!#$%...|a-zA-Z|1/4 1/2 3/4|<sup>2</sup><sup>3</sup><sup>1</sup>|0-9|
|-|-|-|-|-|-|
|isprintable()|&#9745;|&#9745;|&#9745;|&#9745;|&#9745;|
|isalnum()||&#9745;|&#9745;|&#9745;|&#9745;|
|isnumeric()|||&#9745;|&#9745;|&#9745;|
|isdigit()||||&#9745;|&#9745;|
|isdecimal()|||||&#9745;|

```python
str1 = ""
str1.isspace()  # False

str2 = " t "
str2.isspace()  # False

str3 = " "
str3.isspace()  # True

# checks for \t\n\r\f\v...
str4 = " \n"
str4.isspace()  # True
```

[back to top](#table-of-contents)

### Regular Expression
```python

```

[back to top](#table-of-contents)

### Format
```python

```

[back to top](#table-of-contents)

### Numbers
```python

```

[back to top](#table-of-contents)

### Combinatorics
```python

```

[back to top](#table-of-contents)

### Datetime
```python

```

[back to top](#table-of-contents)

## Syntax
### Args
```python

```

[back to top](#table-of-contents)

### Inline
```python

```

[back to top](#table-of-contents)

### Closure
```python

```

[back to top](#table-of-contents)

### Decorator
```python

```

[back to top](#table-of-contents)

### Class
```python

```

[back to top](#table-of-contents)

### Duck Type
```python

```

[back to top](#table-of-contents)

### Enum
```python

```

[back to top](#table-of-contents)

### Exception
```python

```

[back to top](#table-of-contents)

## System
### Exit
```python

```

[back to top](#table-of-contents)

### Print
```python

```

[back to top](#table-of-contents)

### Input
```python

```

[back to top](#table-of-contents)

### Command Line Arguments
```python

```

[back to top](#table-of-contents)

### Open
```python

```

[back to top](#table-of-contents)

### Path
```python

```

[back to top](#table-of-contents)

### OS Commands
```python

```

[back to top](#table-of-contents)

## Data
### JSON
```python

```

[back to top](#table-of-contents)

### Pickle
```python

```

[back to top](#table-of-contents)

### CSV
```python

```

[back to top](#table-of-contents)

### SQLite
```python

```

[back to top](#table-of-contents)

### Bytes
```python

```

[back to top](#table-of-contents)

### Struct
```python

```

[back to top](#table-of-contents)

### Array
```python

```

[back to top](#table-of-contents)

### Memory View
```python

```

[back to top](#table-of-contents)

### Deque
```python

```

[back to top](#table-of-contents)

## Advanced
### Threading
```python

```

[back to top](#table-of-contents)

### Operator
```python

```

[back to top](#table-of-contents)

### Introspection
```python

```

[back to top](#table-of-contents)

### Metaprogramming
```python

```

[back to top](#table-of-contents)

### Eval
```python

```

[back to top](#table-of-contents)

### Coroutine
```python

```

[back to top](#table-of-contents)

## Libraries
### Progress Bar
```python

```

[back to top](#table-of-contents)

### Plot
```python

```

[back to top](#table-of-contents)

### Table
```python

```

[back to top](#table-of-contents)

### Curses
```python

```

[back to top](#table-of-contents)

### Logging
```python

```

[back to top](#table-of-contents)

### Scraping
```python

```

[back to top](#table-of-contents)

### Web
```python

```

[back to top](#table-of-contents)

### Profile
```python

```

[back to top](#table-of-contents)

### NumPy
```python

```

[back to top](#table-of-contents)

### Image
```python

```

[back to top](#table-of-contents)

### Audio
```python

```

[back to top](#table-of-contents)

### Games
```python

```

[back to top](#table-of-contents)

### Pandas
```python

```

[back to top](#table-of-contents)

### Plotly
```python

```

[back to top](#table-of-contents)

### Cython
```python

```

[back to top](#table-of-contents)
