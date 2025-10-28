## Program to find longest word in a given sentence

```javascript
function longestWord(sentence) {
  return sentence
    .match(/\b\w+\b/g)
    .reduce((a, b) => (b.length > a.length ? b : a), '');
}
// console.log(longestWord('I love JavaScript interview prep'));
```

## How to check whether a string is palindrome or not

```javascript
function isPalindrome(str) {
  const s = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let i = 0, j = s.length - 1;
  while (i < j) {
    if (s[i++] !== s[j--]) return false;
  }
  return true;
}
```

## Write a program to remove duplicates from an array

```javascript
const unique = arr => [...new Set(arr)];
```

## Program to find reverse of a string without using built-in method

```javascript
function reverseString(s) {
  let out = '';
  for (let i = s.length - 1; i >= 0; i--) out += s[i];
  return out;
}
```

## Find the max count of consecutive 1’s in an array

```javascript
function maxConsecutiveOnes(arr) {
  let max = 0, cur = 0;
  for (const x of arr) {
    cur = x === 1 ? cur + 1 : 0;
    if (cur > max) max = cur;
  }
  return max;
}
```

## Find the factorial of given number

```javascript
function factorial(n) {
  if (n < 0) throw new Error('negative');
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
}
```

## Merge two sorted arrays

```javascript
function mergeSorted(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    if (a[i] <= b[j]) out.push(a[i++]); else out.push(b[j++]);
  }
  while (i < a.length) out.push(a[i++]);
  while (j < b.length) out.push(b[j++]);
  return out;
}
```

## Check if arr2 contains squares of arr1 with same frequency

```javascript
function sameSquared(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  const c1 = new Map(), c2 = new Map();
  for (const x of arr1) c1.set(x, (c1.get(x) || 0) + 1);
  for (const y of arr2) c2.set(y, (c2.get(y) || 0) + 1);
  for (const [v, f] of c1.entries()) {
    const sq = v * v;
    if (c2.get(sq) !== f) return false;
  }
  return true;
}
```

## Check if two strings are anagrams

```javascript
function areAnagrams(a, b) {
  const s1 = a.toLowerCase().replace(/[^a-z0-9]/g, '');
  const s2 = b.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (s1.length !== s2.length) return false;
  const count = new Map();
  for (const ch of s1) count.set(ch, (count.get(ch) || 0) + 1);
  for (const ch of s2) {
    const n = (count.get(ch) || 0) - 1;
    if (n < 0) return false; count.set(ch, n);
  }
  return true;
}
```

## Find the maximum number in an array

```javascript
const maxInArray = arr => arr.reduce((m, x) => (x > m ? x : m), -Infinity);
```

## Filter even numbers from an array

```javascript
const evens = arr => arr.filter(x => x % 2 === 0);
```

## Check if a number is prime

```javascript
function isPrime(n) {
  if (n < 2) return false;
  if (n % 2 === 0) return n === 2;
  for (let i = 3; i * i <= n; i += 2) if (n % i === 0) return false;
  return true;
}
```

## Find the largest element in a nested array

```javascript
function maxNested(arr) {
  let max = -Infinity;
  (function walk(a) {
    for (const v of a) Array.isArray(v) ? walk(v) : (max = Math.max(max, v));
  })(arr);
  return max;
}
// Example: maxNested([[3,4,58],[709,8,9,[10,11]],[111,2]])
```

## Return Fibonacci sequence up to N terms

```javascript
function fib(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  const out = [0, 1];
  while (out.length < n) out.push(out.at(-1) + out.at(-2));
  return out;
}
```

## Count occurrences of each character in a string

```javascript
function charCount(str) {
  const map = new Map();
  for (const ch of str) map.set(ch, (map.get(ch) || 0) + 1);
  return Object.fromEntries(map);
}
```

## Sort an array of numbers in ascending order

```javascript
const sortAsc = arr => [...arr].sort((a, b) => a - b);
```

## Sort an array of numbers in descending order

```javascript
const sortDesc = arr => [...arr].sort((a, b) => b - a);
```

## Reverse the order of words in a sentence without using reverse()

```javascript
function reverseWords(sentence) {
  const words = sentence.trim().split(/\s+/);
  let i = 0, j = words.length - 1;
  while (i < j) { const t = words[i]; words[i] = words[j]; words[j] = t; i++; j--; }
  return words.join(' ');
}
```

## Flatten a nested array into a single-dimensional array

```javascript
arr.flat(infinity)
```
