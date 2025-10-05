# Regular Expression
## General rules
* Character classes
```
.         any character except newline
\w\d\s    word, digit, whitespace
\W\D\S    not word, digit, whitespace
[abc]     any of a, b, or c
[^abc]    not a, b, or c
[a-g]     character between a & g
```
* Anchors
```
^abc$     start / end of the string
\b\B      word, not-word boundary
```
* Escaped characters
```
\.\*\\    escaped special characters
\t\n\r    tab, linefeed, carriage return
```
* Groups & Lookaround
```
(abc)     capture group
\1        backreference to group #1
(?:abc)   non-capturing group
(?=abc)   positive lookahead
(?!abc)   negative lookahead
```
* Quantifiers & Alternation
```
a*a+a?    0 or more, 1 or more, 0 or 1
a{5}a{2,} exactly five, two or more
a{1,3}    between one & three
a+?a{2,}? match as few as possible
ab|cd     match ab or cd
```
## Javascript
### From https://github.com/DevLawrence/regex-cheatsheet/blob/master/regex.js
```javascript
let regex;

/* matching a specific string */
regex = /hello/;  ////looks for the string between the forward slashes (case-sensitive)... matches "hello", "hello123", "123hello123", "123hello"; doesn't match for "hell0", "Hello" 
regex = /hello/i;  //looks for the string between the forward slashes (case-insensitive)... matches "hello", "HelLo", "123HelLO"
regex = /hello/g;  //looks for multiple occurrences of string between the forward slashes...

/* wildcards */
regex = /h.llo/; // the "." matches any one character other than a new line character... matches "hello", "hallo" but not "h\nllo"
regex = /h.*llo/; // the "*" matches any character(s) zero or more times... matches "hello", "heeeeeello", "hllo", "hwarwareallo"

/* shorthand character classes */
regex = /\d/;  // matches any digit
regex = /\D/;  // matches any non-digit
regex = /\w/;  // matches any word character (a-z, A-Z, 0-9, _)
regex = /\W/;  // matches any non-word character
regex = /\s/;  // matches any white space character (\r (carriage return),\n (new line), \t (tab), \f (form feed))
regex = /\S/;  // matches any non-white space character

/* specific characters */
regex = /[aeiou]/; // matches any character in square brackets
regex = /[ck]atherine/; // matches catherine or katherine
regex = /[^aeiou]/; // matches anything except the characters in square brackets

/* charaacter ranges */
regex = /[a-z]/; // matches all lowercase letters
regex = /[A-Z]/; // matches all uppercase letters
regex = /[e-l]/; // matches lowercase letters e to l (inclusive)
regex = /[F-P]/; // matches all uppercase letters F to P (inclusive)
regex = /[0-9]/; // matches all digits
regex = /[5-9]/; // matches any digit from 5 to 9 (inclusive)
regex = /[a-zA-Z]/; // matches all lowercase and uppercase letters
regex = /[^a-zA-Z]/; // matches non-letters

/* matching repetition using quantifiers */
regex = /(hello){4}/; // matches "hellohellohellohello"
regex = /hello{3}/; // matches "hellooo" and "helloooo" but not "helloo"
regex = /\d{3}/; // matches 3 digits ("312", "122", "111", "12312321" but not "12")
regex = /\d{3,7}/; // matches digits that occur between 3 and 7 times (inclusive)
regex = /\d{3,}/; // matches digits that occur at least 3 times

/* matching repetitions using star and plus */
regex = /ab*c/; // matches zero or more repetitions of "b" (matches "abc", "abbbbc", "ac")
regex = /ab+c/; // matches one or more repetitions of "b" (matches "abc", "abbbbc", but not "ac")

/* matching beginning and end items */
regex = /^[A-Z]\w*/; // matches "H", "Hello", but not "hey"
regex = /\w*s$/; // matches "cats", "dogs", "avocados", but not "javascript"

/* matching word boundaries 
positions of word boundaries:
1. before the first character in string (if first character is a word character)
2. after the last character in the string, if the last character is a word character
3. between two characters in string, where one is a word character and the other isn't */
regex = /\bmeow\b/; // matches "hey meow lol", "hey:meow:lol", but not "heymeow lol"

/* groups */
regex = /it is (ice )?cold outside/; // matches "it is ice cold outside" and "it is cold outside"
regex = /it is (?:ice )?cold outside/; // same as above except it is a non-capturing group
regex = /do (cats) like taco \1/; // matches "do cats like taco cats"
regex = /do (cats) like (taco)\? do \2 \1 like you\?/; // matches "do cats like taco? do taco cats like you?"

//branch reset group (available in Perl, PHP, R, Delphi... commented out because this is a js file)
// regex = /(?|(cat)|(dog))\1/; // matches "catcat" and "dogdog"

/* alternative matching */
regex = /i like (tacos|boba|guacamole)\./; // matches "i like tacos.", "i like boba.", and "i like guacamole."

/* forward reference (available in Perl, PHP, Java, Ruby, etc... commented out because this is a js file) */
// regex = /(\2train|(choo))+/; // matches "choo", "choochoo", "chootrain", choochootrain", but not "train"

/* lookaheads */
regex = /z(?=a)/; // positive lookahead... matches the "z" before the "a" in pizza" but not the first "z"
regex = /z(?!a)/; // negative lookahead... matches the first "z" but not the "z" before the "a"

/* lookbehinds */
regex = /(?<=[aeiou])\w/; // positive lookbehind... matches any word character that is preceded by a vowel
regex = /(?<![aeiou])\w/; // negative lookbehind... matches any word character that is not preceded by a vowel

/* some useful functions */
regex.test("hello"); // returns true if found a match, false otherwise
regex.exec("hello"); // returns result array, null otherwise
"football".replace(/foot/,"basket"); // replaces matches with second argument

// greedy
/".+"/.exec('a "witch" and her "broom" is one') // "witch" and her "broom"
// lazy
/".+?"/.exec('a "witch" and her "broom" is one') // "witch"
```

## Python
### From https://github.com/tartley/python-regex-cheatsheet/blob/master/cheatsheet.rst
* Python 2.7 Regular Expressions
==============================
Non-special chars match themselves. Exceptions are special characters::

    \       Escape special char or start a sequence.
    .       Match any char except newline, see re.DOTALL
    ^       Match start of the string, see re.MULTILINE
    $       Match end of the string, see re.MULTILINE
    []      Enclose a set of matchable chars
    R|S     Match either regex R or regex S.
    ()      Create capture group, & indicate precedence

After '``[``', enclose a set, the only special chars are::

    ]   End the set, if not the 1st char
    -   A range, eg. a-c matches a, b or c
    ^   Negate the set only if it is the 1st char

Quantifiers (append '``?``' for non-greedy)::

    {m}     Exactly m repetitions
    {m,n}   From m (default 0) to n (default infinity)
    *       0 or more. Same as {,}
    +       1 or more. Same as {1,}
    ?       0 or 1. Same as {,1}

Special sequences::

    \A  Start of string
    \b  Match empty string at word (\w+) boundary
    \B  Match empty string not at word boundary
    \d  Digit
    \D  Non-digit
    \s  Whitespace [ \t\n\r\f\v], see LOCALE,UNICODE
    \S  Non-whitespace
    \w  Alphanumeric: [0-9a-zA-Z_], see LOCALE
    \W  Non-alphanumeric
    \Z  End of string
    \g<id>  Match prev named or numbered group,
            '<' & '>' are literal, e.g. \g<0>
            or \g<name> (not \g0 or \gname)

Special character escapes are much like those already escaped in Python string
literals. Hence regex '``\n``' is same as regex '``\\n``'::

    \a  ASCII Bell (BEL)
    \f  ASCII Formfeed
    \n  ASCII Linefeed
    \r  ASCII Carriage return
    \t  ASCII Tab
    \v  ASCII Vertical tab
    \\  A single backslash
    \xHH   Two digit hexadecimal character goes here
    \OOO   Three digit octal char (or just use an
           initial zero, e.g. \0, \09)
    \DD    Decimal number 1 to 99, match
           previous numbered group

Extensions. Do not cause grouping, except '``P<name>``'::

    (?iLmsux)     Match empty string, sets re.X flags
    (?:...)       Non-capturing version of regular parens
    (?P<name>...) Create a named capturing group.
    (?P=name)     Match whatever matched prev named group
    (?#...)       A comment; ignored.
    (?=...)       Lookahead assertion, match without consuming
    (?!...)       Negative lookahead assertion
    (?<=...)      Lookbehind assertion, match if preceded
    (?<!...)      Negative lookbehind assertion
    (?(id)y|n)    Match 'y' if group 'id' matched, else 'n'

Flags for re.compile(), etc. Combine with ``'|'``::

    re.I == re.IGNORECASE   Ignore case
    re.L == re.LOCALE       Make \w, \b, and \s locale dependent
    re.M == re.MULTILINE    Multiline
    re.S == re.DOTALL       Dot matches all (including newline)
    re.U == re.UNICODE      Make \w, \b, \d, and \s unicode dependent
    re.X == re.VERBOSE      Verbose (unescaped whitespace in pattern
                            is ignored, and '#' marks comment lines)

Module level functions::

    compile(pattern[, flags]) -> RegexObject
    match(pattern, string[, flags]) -> MatchObject
    search(pattern, string[, flags]) -> MatchObject
    findall(pattern, string[, flags]) -> list of strings
    finditer(pattern, string[, flags]) -> iter of MatchObjects
    split(pattern, string[, maxsplit, flags]) -> list of strings
    sub(pattern, repl, string[, count, flags]) -> string
    subn(pattern, repl, string[, count, flags]) -> (string, int)
    escape(string) -> string
    purge() # the re cache

RegexObjects (returned from ``compile()``)::

    .match(string[, pos, endpos]) -> MatchObject
    .search(string[, pos, endpos]) -> MatchObject
    .findall(string[, pos, endpos]) -> list of strings
    .finditer(string[, pos, endpos]) -> iter of MatchObjects
    .split(string[, maxsplit]) -> list of strings
    .sub(repl, string[, count]) -> string
    .subn(repl, string[, count]) -> (string, int)
    .flags      # int, Passed to compile()
    .groups     # int, Number of capturing groups
    .groupindex # {}, Maps group names to ints
    .pattern    # string, Passed to compile()

MatchObjects (returned from ``match()`` and ``search()``)::

    .expand(template) -> string, Backslash & group expansion
    .group([group1...]) -> string or tuple of strings, 1 per arg
    .groups([default]) -> tuple of all groups, non-matching=default
    .groupdict([default]) -> {}, Named groups, non-matching=default
    .start([group]) -> int, Start/end of substring match by group
    .end([group]) -> int, Group defaults to 0, the whole match
    .span([group]) -> tuple (match.start(group), match.end(group))
    .pos       int, Passed to search() or match()
    .endpos    int, "
    .lastindex int, Index of last matched capturing group
    .lastgroup string, Name of last matched capturing group
    .re        regex, As passed to search() or match()
    .string    string, "
