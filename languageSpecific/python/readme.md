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
  - [Arguments](#arguments)
  - [Splat Operator](#splat-operator)
  - [Inline](#inline)
  - [Closure](#closure)
  - [Decorator](#decorator)
  - [Class](#class)
  - [Duck Type](#duck-type)
  - [Enum](#enum)
  - [Exception](#exception)
- [System](#system)
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
  - [Cython](#cython)

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
- Argument `flags=re.IGNORECASE` can be used with all functions
- Argument `flags=re.MULTILINE` makes `^` and `$` match the start/end of each line
- Argument `flags=re.DOTALL` makes dot also accept the `\n`
- Use r`\1` or `\\1` for backreference
- Add `?` after an operator to make it non-greedy
```python
import re

<str> = re.sub(<regex>, new, text, count=0)  # Substitutes all occurrences with 'new'
<list> = re.findall(<regex>, text)  # Returns all occurrences as strings
<list> = re.split(<regex>, text, maxsplit=0)  # Use brackets in regex to include the matches

# Search() and match() return None if they can't find a match
<Match> = re.search(<regex>, text)  # Searches for first occurrence of the pattern
<Match> = re.match(<regex>, text)  # Searches only at the beginning of the text

<iter> = re.finditer(<regex>, text)  # Returns all occurrences as match objects
```
- Match Object
```python
<str> = <Match>.group()  # Returns the whole match, also group(0)
<str> = <Match>.group(1)  # Returns part in the first bracket
<tuple> = <Match>.groups()  # Returns all bracketed parts
<int> = <Match>.start()  # Returns start index of the match
<int> = <Match>.end()  # Returns exclusive end index of the match
```
- Special Sequences
  - By default digits, alphanumerics and whitespaces from all alphabets are matched, unless `flags=re.ASCII` argument is used
  - Use a capital letter for negation
```python
'\d' == '[0-9]'  # Matches any digit
'\w' == '[a-zA-Z0-9_]'  # Matches any alphanumeric
'\s' == '[\t\n\r\f\v]'  # Matches any whitespace
```

[back to top](#table-of-contents)

### Format
```python
<str> = f'{<el_1>}, {<el_2>}'
<str> = '{}, {}'.format(<el_1>, <el_2>)
```
- Attributes
```python
from collections import namedtuple

Person = namedtuple('Person', 'name height')
person = Person('Jean-Luc', 187)
f'{person.height}'  # '187'
'{p.height}'.format(p=person)  # '187'
```
- General Options
```python
str = "test
f"{str:<10}"  # 'test      '
f"{str:^10}"  # '   test   '
f"{str:>10}"  # '      test'
f"{str:.<10}"  # 'test......'
f"{str:<0}"  # 'test'
```
- Strings
  - `!r` calls object's repr() method, instead of str(), to get a string
```python
f"{'abcde'!r:10}"  # "'abcde'   "
f"{'abcde':10.3}"  # 'abc       '
f"{'abcde':.3}"  # 'abc'
```
- Numbers
```python
f"{123456:10,}"  # '   123,456'
f"{123456:10_}"  # '   123_456'
f"{123456:+10}"  # '   +123456'
f"{-123456:=10}"  # '-   123456'
f"{123456:}"  # '123456'
f"{-123456:}"  # '-123456'
```
- Floats
```python
f"{1.23456:10.3}"  # '      1.23'
f"{1.23456:10.3f}"  # '     1.235'
f"{1.23456:10.3e}"  # ' 1.235e+00'
f"{1.23456:10.3%}"  # '  123.456%'
```
|               |    `f"{<float>}"`    |   `f"{<float>:f}"`   |   `f"{<float>:e}"`   |   `f"{<float>:%}"`   |
|-|-|-|-|-|
|   0.000056789 |    '5.6789e-05' |     '0.000057'  |  '5.678900e-05' |     '0.005679%' |
|   0.00056789  |    '0.00056789' |     '0.000568'  |  '5.678900e-04' |     '0.056789%' |
|   0.0056789   |    '0.0056789'  |     '0.005679'  |  '5.678900e-03' |     '0.567890%' |
|   0.056789    |    '0.056789'   |     '0.056789'  |  '5.678900e-02' |     '5.678900%' |
|   0.56789     |    '0.56789'    |     '0.567890'  |  '5.678900e-01' |    '56.789000%' |
|   5.6789      |    '5.6789'     |     '5.678900'  |  '5.678900e+00' |   '567.890000%' |
|  56.789       |   '56.789'      |    '56.789000'  |  '5.678900e+01' |  '5678.900000%' |
| 567.89        |  '567.89'       |   '567.890000'  |  '5.678900e+02' | '56789.000000%' |

|               |   `f"{<float>:.2}"`|  `f"{<float>:.2f}"`  |  `f"{<float>:.2e}"`  |  `f"{<float>:.2%"`  |
|-|-|-|-|-|
|   0.000056789 |    '5.7e-05'    |       '0.00'    |    '5.68e-05'   |       '0.01%'   |
|   0.00056789  |    '0.00057'    |       '0.00'    |    '5.68e-04'   |       '0.06%'   |
|   0.0056789   |    '0.0057'     |       '0.01'    |    '5.68e-03'   |       '0.57%'   |
|   0.056789    |    '0.057'      |       '0.06'    |    '5.68e-02'   |       '5.68%'   |
|   0.56789     |    '0.57'       |       '0.57'    |    '5.68e-01'   |      '56.79%'   |
|   5.6789      |    '5.7'        |       '5.68'    |    '5.68e+00'   |     '567.89%'   |
|  56.789       |    '5.7e+01'    |      '56.79'    |    '5.68e+01'   |    '5678.90%'   |
| 567.89        |    '5.7e+02'    |     '567.89'    |    '5.68e+02'   |   '56789.00%'   |

- Ints
```python
f"{90:c}"  # 'Z'
f"{90:b}"  # '1011010'
f"{90:X}"  # '5A'
```

[back to top](#table-of-contents)

### Numbers
- Types
  - `int(<str>)` and `float(<str>)` raise ValueError on malformed strings
  - Decimal numbers can be represented exactly, unlike foats where `1.1 + 2.2 != 3.3`
  - Precision of decimal operations is set with: `decimal.getcontext().prec = <int>`
```python
<int> = int(<float/str/bool>)  # Or: math.floor(<float>)
<float> = float(<int/str/bool>)  # Or: <real>e±<int>
<complex> = complex(real=0, imag=0)  # Or: <real> ± <real>j
<Fraction> = fractions.Fraction(0, 1)  # Or: Fraction(numerator=0, denominator=1)
<Decimal> = decimal.Decimal(<str/int>)  # Or: Decimal((sign, digits, exponent))
```
- Basic Functions
```python
<num> = pow(<num>, <num>)  # Or: <num> ** <num>
<num> = abs(<num>)  # <float> = abs(<complex>)
<num> = round(<num> [, ±ndigits])  # `round(126, -1) == 130`
```
- Math
```python
from math import e, pi, inf, nan, isinf, isnan
from math import cos, acos, sin, asin, tan, atan, degrees, radians
from math import log, log10, log2
```
- Statistics
```python
from statistics import mean, median, variance, stdev, pvariance, pstdev
```
- Random
```python
from random import random, randint, choice, shuffle

<float> = random()
<int> = randint(from_inclusive, to_inclusive)
<el> = choice(<list>)
shuffle(<list>)
```
- Bin, Hex
```python
<int> = ±0b<bin>  # Or: ±0x<hex>
<int> = int('±<bin>', 2)  # Or: int('±<hex>', 16)
<int> = int('±0b<bin>', 0)  # Or: int('±0x<hex>', 0)
'[-]0b<bin>' = bin(<int>)  # Or: hex(<int>)
```
- Bitwise Operators
```python
<int> = <int> & <int>  # And
<int> = <int> | <int>  # Or
<int> = <int> ^ <int>  # Xor (0 if both bits equal)
<int> = <int> << n_bits  # Shift left (>> for right)
<int> = ~<int>  # Not (also: -<int> - 1)
```

[back to top](#table-of-contents)

### Combinatorics
- Every function returns an iterator
- If you want to print the iterator, you need to pass it to the list() function first!
```python
from itertools import product, combinations, combinations_with_replacement, permutations

product([0, 1], repeat=3)  # <itertools.product object at 0x10b08ffc0>
list(product([0, 1], repeat=3))  # [(0, 0, 0), (0, 0, 1), (0, 1, 0), (0, 1, 1), (1, 0, 0), (1, 0, 1), (1, 1, 0), (1, 1, 1)]

list(product('ab', '12'))  # [('a', '1'), ('a', '2'), ('b', '1'), ('b', '2')]

list(combinations('abc', 2))  # [('a', 'b'), ('a', 'c'), ('b', 'c')]

list(combinations_with_replacement('abc', 2))  # [('a', 'a'), ('a', 'b'), ('a', 'c'), ('b', 'b'), ('b', 'c'), ('c', 'c')]

list(permutations('abc', 2))  # [('a', 'b'), ('a', 'c'), ('b', 'a'), ('b', 'c'), ('c', 'a'), ('c', 'b')]
```

[back to top](#table-of-contents)

### Datetime
- Module 'datetime' provides 'date', 'time', 'datetime' and 'timedelta' classes
  - All are immutable and hashable
- Time and datetime objects can be 'aware' (have defined timezone), or 'naive' (don't have defined timezone)
- If object is naive, it is presumed to be in the system's timezone
#### python 2
```python
from datetime import date, time, datetime, timedelta
from dateutil.tz import UTC, tzlocal, gettz, resolve_imaginary  # included in python 2
```
#### python 3
- `pip install python-dateutil`
```python
from datetime import date, time, datetime, timedelta
from dateutil.tz import UTC, tzlocal, gettz, resolve_imaginary  # needs to install 3rd party library
```
- Constructors
  - Use `<date/datetime>.weekday()` to get the day of the week (Mon == 0)
  - 'fold=1' means the second pass in case of time jumping back for one hour
  - `<datetime aware> = resolve_imaginary(<datetime aware>)` fixes datetimes that fall into the missing hour
```python
<date>  = date(year, month, day)
<time>  = time(hour=0, minute=0, second=0, microsecond=0, tzinfo=None, fold=0)
<datetime> = datetime(year, month, day, hour=0, minute=0, second=0, ...)
<timedelta> = timedelta(days=0, seconds=0, microseconds=0, milliseconds=0,
                        minutes=0, hours=0, weeks=0)
```
- Now
  - To extract time use `<datetime naive>.time()`, `<datetime aware>.time()` or `<datetime aware>.timetz()`
```python
<date/datetime naive>  = date/datetime.today()  # Current local date or naive datetime
<datetime naive> = datetime.utcnow()  # Naive datetime from current UTC time
<datetime aware> = datetime.now(<tzinfo>)  # Aware datetime from current tz time
```
- Timezone
```python
<tzinfo> = UTC  # UTC timezone. London without DST
<tzinfo> = tzlocal()  # Local timezone, also gettz()
<tzinfo> = gettz('<Continent>/<City>')  # 'Continent/City_Name' timezone or None
<datetime aware>    = <datetime>.astimezone(<tzinfo>)  # Datetime, converted to passed timezone
<time aware/datetime aware> = <time/datetime>.replace(tzinfo=<tzinfo>)  # Unconverted object with new timezone
```
- Encode
  - ISO strings come in following forms: `'YYYY-MM-DD', 'HH:MM:SS.ffffff[±<offset>]'`, or both separated by an arbitrary character
    - Offset is formatted as: `HH:MM`
  - Epoch on Unix systems is: `'1970-01-01 00:00 UTC', '1970-01-01 01:00 CET', ...`
```python
<date/time/datetime> = date/time/datetime.fromisoformat('<iso>')  # Object from ISO string. Raises ValueError
<datetime> = datetime.strptime(<str>, '<format>')  # Datetime from str, according to format
<date/datetime naive> = date/datetime.fromordinal(<int>)  # date/datetime naive from days since Christ, at midnight
<datetime naive> = datetime.fromtimestamp(<real>)  # Local time datetime naive from seconds since Epoch
<datetime aware> = datetime.fromtimestamp(<real>, <tz.>)  # Aware datetime from seconds since Epoch
```
- Decode
```python
<str> = <date/time/datetime>.isoformat(sep='T')  # Also timespec='auto/hours/minutes/seconds'
<str> = <date/time/datetime>.strftime('<format>')  # Custom string representation
<int> = <date/datetime>.toordinal()  # Days since Christ, ignoring time and tz
<float> = <datetime naive>.timestamp()  # Seconds since Epoch, from datetime naive in local tz
<float> = <datetime aware>.timestamp()  # Seconds since Epoch, from datetime aware
```
- Format
  - When parsing, `%z` also accepts `±HH:MM`
  - For abbreviated weekday and month use `%a` and `%b`
```python
from datetime import datetime

dt = datetime.strptime('2015-05-14 23:39:00.00 +0200', '%Y-%m-%d %H:%M:%S.%f %z')
dt.strftime("%A, %dth of %B '%y, %I:%M%p %Z")  # "Thursday, 14th of May '15, 11:39PM UTC+02:00"
```
- Arithmetics
```python
<date/datetime> = <date/datetime> ± <timedelta>  # Returned datetime can fall into missing hour
<timedelta> = <date/datetime naive> - <date/datetime naive>  # Returns the difference, ignoring time jumps
<timedelta> = <datetime aware> - <datetime aware>  # Ignores time jumps if they share tzinfo object
<timedelta> = <datetime_UTC> - <datetime_UTC>  # Convert datetimes to UTC to get the actual delta
```

[back to top](#table-of-contents)

## Syntax
### Arguments
- Inside Function Call
```python
<function>(<positional_args>)  # f(0, 0)
<function>(<keyword_args>)  # f(x=0, y=0)
<function>(<positional_args>, <keyword_args>)  # f(0, y=0)
```
- Inside Function Definition
```python
def f(<nondefault_args>):  # def f(x, y):
    ...

def f(<default_args>):  # def f(x=0, y=0):
    ...


def f(<nondefault_args>, <default_args>):  # def f(x, y=0):
    ...
```

[back to top](#table-of-contents)

### Splat Operator
- Inside Function Call
  - Splat expands a collection into positional arguments, while splatty-splat expands a dictionary into keyword arguments
```python
# method 1
args = (1, 2)
kwargs = {'x': 3, 'y': 4, 'z': 5}
functionName(*args, **kwargs)

# method 2
functionName(1, 2, x=3, y=4, z=5)
```
- Inside Function Definition
  - Splat combines zero or more positional arguments into a tuple, while splatty-splat combines zero or more keyword arguments into a dictionary
```python
def add(*a):
    return sum(a)


add(1, 2, 3)  # 6
```
- Legal argument combinations
```python
def f(x, y, z):  # f(x=1, y=2, z=3) | f(1, y=2, z=3) | f(1, 2, z=3) | f(1, 2, 3)
def f(*, x, y, z):  # f(x=1, y=2, z=3)
def f(x, *, y, z):  # f(x=1, y=2, z=3) | f(1, y=2, z=3)
def f(x, y, *, z):  # f(x=1, y=2, z=3) | f(1, y=2, z=3) | f(1, 2, z=3)

def f(*args):  # f(1, 2, 3)
def f(x, *args):  # f(1, 2, 3)
def f(*args, z):  # f(1, 2, z=3)
def f(x, *args, z):  # f(1, 2, z=3)


def f(**kwargs):  # f(x=1, y=2, z=3)
def f(x, **kwargs):  # f(x=1, y=2, z=3) | f(1, y=2, z=3)
def f(*, x, **kwargs):  # f(x=1, y=2, z=3)

def f(*args, **kwargs):  # f(x=1, y=2, z=3) | f(1, y=2, z=3) | f(1, 2, z=3) | f(1, 2, 3)
def f(x, *args, **kwargs):  # f(x=1, y=2, z=3) | f(1, y=2, z=3) | f(1, 2, z=3) | f(1, 2, 3)
def f(*args, y, **kwargs):  # f(x=1, y=2, z=3) | f(1, y=2, z=3)
def f(x, *args, z, **kwargs):  # f(x=1, y=2, z=3) | f(1, y=2, z=3) | f(1, 2, z=3)
```
- Other Uses
```python
<list>  = [*<collection> [, ...]]
<set>   = {*<collection> [, ...]}
<tuple> = (*<collection>, [...])
<dict>  = {**<dict> [, ...]}

head, *body, tail = <collection>
```

[back to top](#table-of-contents)

### Inline
- Lambda
```python
<function> = lambda: <return_value>
<function> = lambda <argument_1>, <argument_2>: <return_value>
```
- Comprehensions
```python
<list> = [i+1 for i in range(10)]  # [1, 2, ..., 10]
<set>  = {i for i in range(10) if i > 5}  # {6, 7, 8, 9}
<iter> = (i+5 for i in range(10))  # (5, 6, ..., 14)
<dict> = {i: i*2 for i in range(10)}  # {0: 0, 1: 2, ..., 9: 18}

# method 1
out = [i+j for i in range(10) for j in range(10)]

# method 2
out = []
for i in range(10):
    for j in range(10):
        out.append(i+j)
```
- Map, Filter, Reduce
```python
from functools import reduce

<iter> = map(lambda x: x + 1, range(10))  # [1, 2, ..., 10]
<iter> = filter(lambda x: x > 5, range(10))  # {6, 7, 8, 9}
<obj>  = reduce(lambda out, x: out + x, range(10))  # 45
```
- Any, All
```python
<bool> = any(<collection>)                          # False if empty
<bool> = all(el[1] for el in <collection>)          # True if empty
```
- If - Else
```python
<obj> = <expression_if_true> if <condition> else <expression_if_false>

[a if a else 'zero' for a in (0, 1, 2, 3)]  # ['zero', 1, 2, 3]
```
- Namedtuple, Enum, Dataclass
```python
from collections import namedtuple
from enum import Enum
from dataclasses import make_dataclass


Point = namedtuple('Point', 'x y')
point = Point(0, 0)

Direction = Enum('Direction', 'n e s w')
direction = Direction.n

Creature = make_dataclass('Creature', ['location', 'direction'])
creature = Creature(Point(0, 0), Direction.n)
```

[back to top](#table-of-contents)

### Closure
- have a closure in Python when:
  - A nested function references a value of its enclosing function
  - and the enclosing function returns the nested function
  - If multiple nested functions within enclosing function reference the same value, that value gets shared
  - To dynamically access function's first free variable use `<function>.__closure__[0].cell_contents`
```python
def get_multiplier(a):
    def out(b):
        return a * b
    return out


multiply_by_3 = get_multiplier(3)
multiply_by_3(10)  # 30
```
- Partial
  - Partial is also useful in cases when function needs to be passed as an argument
    - because it enables us to set its arguments beforehand
  - e.g.: `defaultdict(<function>)`, `iter(<function>, to_exclusive)` and dataclass's `field(default_factory=<function>)`
```python
from functools import partial
import operator as op


<function> = partial(<function> [, <arg_1>, <arg_2>, ...])

multiply_by_3 = partial(op.mul, 3)
multiply_by_3(10)  # 30
```
- Non-Local
  - If variable is being assigned to anywhere in the scope, it is regarded as a local variable
  - unless it is declared as a `global` or a `nonlocal`
```python
def get_counter(): i= 0
    def out():
        nonlocal i
        i += 1
        return i
    return out


counter = get_counter()
counter(), counter(), counter()  # (1, 2, 3)
```

[back to top](#table-of-contents)

### Decorator
- A decorator takes a function, adds some functionality and returns it
```python
@decorator_name
def function_that_gets_passed_to_decorator():
    ...
```
- Debugger Example
  - Wraps is a helper decorator that copies the metadata of the passed function (func) to the function it is wrapping (out)
  - Without it `add.__name__` would return 'out'
```python
from functools import wraps


def debug(func):
    @wraps(func)
    def out(*args, **kwargs):
        print(func.__name__)
        return func(*args, **kwargs)
    return out


@debug
def add(x, y):
    return x + y
```
- LRU Cache
  - Decorator that caches function's return values
  - All function's arguments must be hashable
  - CPython interpreter limits recursion depth to 1000 by default
    - To increase it use `sys.setrecursionlimit(<depth>)`
```python
from functools import lru_cache


@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n-2) + fib(n-1)
```
- Parametrized Decorator
  - A decorator that accepts arguments and returns a normal decorator that accepts a function
```python
from functools import wraps


def debug(print_result=False):
    def decorator(func):
        @wraps(func)
        def out(*args, **kwargs):
            result = func(*args, **kwargs)
            print(func.__name__, result if print_result else '')
            return result
        return out
    return decorator


@debug(print_result=True)
def add(x, y):
    return x + y
```

[back to top](#table-of-contents)

### Class
- Return value of repr() should be unambiguous and of str() readable
- If only repr() is defined, it will also be used for str()
  ```python
  class Test:
      def __init__(self, a):
          self.a = a
      def __repr__(self):
          class_name = self.__class__.__name__
          return f'{class_name}({self.a!r})'
      def __str__(self):
          return str(self.a)

      @classmethod
      def get_class_name(cls):
          return cls.__name__
  ```
  - `Str()` use cases
    ```python
    test = Test("sample")
    print(test)  # sample
    print(f"{test}")  # sample
    raise Exception(test)
    """
    Traceback (most recent call last):
      File "/path/to/file.py", line 27, in <module>
        raise Exception(test)
    Exception: sample

    shell returned 1
    """
    
    
    import loguru  # pip install loguru
    
    loguru.logger.debug(test)  # 2022-04-04 02:43:02.509 | DEBUG    | __main__:<module>:28 - sample
    
    
    import csv
    
    # open the file in the write mode
    file = open('path/to/csv_file', 'w')
    csv.writer(file).writerow([test])
    ```
  - `Repr()` use cases
    ```python
    test = Test("sample")
    print([test])  # [Test('sample')]
    print(f'{test!r}')  # Test('sample')


    import loguru  # pip install loguru
    
    loguru.logger.exception(test)
    """
    2022-04-04 02:51:52.414 | ERROR    | __main__:<module>:25 - sample
    NoneType: None
    """
    
    
    import dataclasses
    
    Z = dataclasses.make_dataclass('Z', ['a'])
    print(Z(test))  # Z(a=Test('sample'))
    ```
- Constructor Overloading
  ```python
  class <name>:
      def __init__(self, a=None):
          self.a = a
  ```
  - Inheritance
    ```python
    class Person:
        def __init__(self, name, age):
            self.name = name
            self.age  = age
    
    
    class Employee(Person):
        def __init__(self, name, age, staff_num):
            super().__init__(name, age)
            self.staff_num = staff_num
    ```
  - Multiple Inheritance
    ```python
    class A: pass
    class B: pass
    class C(A, B): pass
    
    # MRO determines the order in which parent classes are traversed when searching for a method
    C.mro()  # [<class 'C'>, <class 'A'>, <class 'B'>, <class 'object'>]
    ```
- Property
  - Pythonic way of implementing getters and setters
  ```python
  class MyClass:
      @property
      def a(self):
          return self._a

      @a.setter
      def a(self, value):
          self._a = value


  el = MyClass()
  el.a = 123
  el.a  # 123
  ```
- Dataclass
  - Decorator that automatically generates init(), repr() and eq() special methods
  - Objects can be made sortable with 'order=True' and/or immutable and hashable with 'frozen=True'
  - Function field() is needed because `<attr_name>: list = []` would make a list that is shared among all instances
  - Default_factory can be any callable
  ```python
  from dataclasses import dataclass, field


  @dataclass(order=False, frozen=False)
  class <class_name>:
      <attr_name_1>: <type>
      <attr_name_2>: <type> = <default_value>
      <attr_name_3>: list/dict/set = field(default_factory=list/dict/set)
  ```
  - Inline
    ```python
    from dataclasses import make_dataclass


    <class> = make_dataclass('<class_name>', <coll_of_attribute_names>)
    <class> = make_dataclass('<class_name>', <coll_of_tuples>)
    <tuple> = ('<attr_name>', <type> [, <default_value>])
    ```
- Slots
  - Mechanism that restricts objects to attributes listed in 'slots' and significantly reduces their memory footprint
  ```python
  class MyClassWithSlots:
      __slots__ = ['a']
      def __init__(self):
          self.a = 1
  ```
- Copy
  ```python
  from copy import copy, deepcopy
  
  
  <object> = copy(<object>)
  <object> = deepcopy(<object>)
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
