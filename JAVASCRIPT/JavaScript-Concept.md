# call

The **`call()`** method of [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) instances calls this function with a given `this` value and arguments provided individually.
var person =
{
  age: 20
};

let birthDay = function(years) {
  this.age += years;
};

console.log(person.age); //20
birthDay.call(person, 3); //the "this" keyword of birthDay function will refer to "person" object.
console.log(person.age); //23

# apply

The apply() method of Function instances calls this function with a given this value, and arguments provided as an array (or an array-like object).

var student1 = {
  studentName: "Scott",
  section: "A"
};

var student2 = {
  studentName: "John",
  section: "B"
};

//function at outside the object
function calculateTotalMarks(subject1, subject2, subject3)
{
  let totalMarks = subject1 + subject2 + subject3;
  let message = `Hey ${this.studentName}, your total marks is: ${totalMarks}`;
  console.log(message);
}

calculateTotalMarks.apply(student1, [ 60, 70, 80 ] ); //supply "student" object as "this" keyword of calculateTotalMarks function; and also supply the values of array into respective parameters, sequentially.
calculateTotalMarks.apply(student2, [ 56, 45, 88 ] );

# bind

The **`bind()`** method of [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) instances creates a new function that, when called, calls this function with its `this` keyword set to the provided value, and a given sequence of arguments preceding any provided when the new function is called.

var student2 = {
  studentName: "John",
  section: "B"
};

//function at outside the object
function calculateTotalMarks(subject1, subject2, subject3)
{
  let totalMarks = subject1 + subject2 + subject3;
  let message = `Hey ${this.studentName}, your total marks is: ${totalMarks}`;
  console.log(message);
}

var student1Calculate = calculateTotalMarks.bind(student1); //it creates a new function and stores reference of student1 as "this" keyword. The function will not be executed.
student1Calculate(60, 70, 80); //executes the function; this = student1

var student2Calculate = calculateTotalMarks.bind(student2); //it creates a new function and stores reference of student2 as "this" keyword. The function will not be executed.
student2Calculate(56, 45, 88); //executes the function; this = student2

var student1 = {
  studentName: "Scott",
  section: "A"
};

# Hoisting

Hoisting is JavaScript's default behavior of moving declarations to the top.

```
alert(Sum(5, 5)); // 10

function Sum(val1, val2)
{
    return val1 + val2;
}
```

Please note that JavaScript compiler does not move function expression.

```
Add(5, 5); // error

var Add = function Sum(val1, val2)
{
    return val1 + val2;
}
```

# Closure

A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the  **lexical environment** ). In other words, a closure gives a function access to its outer scope. In JavaScript, closures are created every time a function is created, at function creation time.

```
function a(){
for (var i = 0; i < 3; i++) {
  setTimeout(function log() {
    console.log(i); // What is logged?
  }, 1000);
}
}
a();
```

```
function init() {
  var name = "Mozilla"; // name is a local variable created by init
  function displayName() {
    // displayName() is the inner function, that forms a closure
    console.log(name); // use variable declared in the parent function
  }
  displayName();
}
init();
```

# Slice And Splice

 * **Modification** :

* `slice()`: Does not modify the original array.
* `splice()`: Modifies the original array.
* **Return Value** :
* `slice()`: Returns a new array containing the extracted elements.
* `splice()`: Returns an array containing the removed elements.
* **Use Cases** :
* `slice()`: When you need a portion of the array without altering the original.
* [`splice()`: When you need to add, remove, or replace elements in the array](https://www.geeksforgeeks.org/what-is-the-difference-between-array-slice-and-array-splice-in-javascript/)


# hasOwnProperty

* Checks only the object’s own properties.

let user = { name: "John", age: 30 };

console.log(user.hasOwnProperty('name')); // true
console.log(user.hasOwnProperty('address')); // false

# JavaScript Interview Questions With Answers

## 11. JavaScript Fundamentals

## 1. What is JavaScript?

JavaScript is a high-level, interpreted programming language used to build interactive web applications. It runs in browsers and also on servers through runtimes like Node.js.

## 2. Is JavaScript single-threaded?

JavaScript has a single main thread for executing code. It can still handle asynchronous work using the event loop, Web APIs, callbacks, promises, and task queues.

## 3. What are JavaScript's primitive data types?

Primitive types are `string`, `number`, `bigint`, `boolean`, `undefined`, `symbol`, and `null`.

## 4. Primitive versus reference types.

Primitive values are copied by value. Objects, arrays, and functions are reference types and are copied by reference.

```js
const a = { name: "Miraj" };
const b = a;
b.name = "John";
console.log(a.name); // John
```

## 5. What is dynamic typing?

Dynamic typing means variable types are checked at runtime and a variable can hold different types over time.

```js
let value = 10;
value = "ten";
```

## 6. What is type coercion?

Type coercion is JavaScript automatically converting one type to another during an operation.

```js
console.log("5" + 1); // "51"
console.log("5" - 1); // 4
```

## 7. Implicit versus explicit conversion.

Implicit conversion happens automatically. Explicit conversion is done manually using functions like `Number`, `String`, or `Boolean`.

```js
Number("10");
String(10);
Boolean(1);
```

## 8. == versus ===.

`==` compares after type coercion. `===` compares both value and type. Prefer `===` for predictable comparisons.

```js
0 == false;  // true
0 === false; // false
```

## 9. null versus undefined.

`undefined` means a variable has been declared but not assigned. `null` is an intentional empty value.

## 10. Why does typeof null return "object"?

It is a historical JavaScript bug kept for backward compatibility. `null` is still a primitive value, not an object.

## 11. var versus let versus const.

`var` is function-scoped and hoisted with `undefined`. `let` and `const` are block-scoped and are in the temporal dead zone before declaration. `const` prevents reassignment, but objects declared with `const` can still be mutated.

## 12. What is function scope?

Function scope means a variable is available only inside the function where it is declared.

## 13. What is block scope?

Block scope means a variable exists only inside a block like `if`, `for`, or `{}`. `let` and `const` are block-scoped.

## 14. What is lexical scope?

Lexical scope means a function's accessible variables are determined by where the function is written in the source code.

## 15. What is the temporal dead zone?

The temporal dead zone is the time between entering a scope and the actual `let` or `const` declaration. Accessing the variable during this time throws a `ReferenceError`.

## 16. What is hoisting?

Hoisting means declarations are processed before code execution. `var` is hoisted and initialized as `undefined`; function declarations are hoisted with their function body.

## 17. Are let and const hoisted?

Yes, but they are not initialized. They stay in the temporal dead zone until the declaration line executes.

## 18. Function declaration versus function expression.

Function declarations are hoisted completely. Function expressions are assigned to variables, so they are usable only after assignment.

```js
sayHi();
function sayHi() {}

sayHello(); // error if declared with const later
const sayHello = function () {};
```

## 19. Arrow function versus normal function.

Arrow functions do not have their own `this`, `arguments`, or `prototype`. Normal functions have dynamic `this` based on how they are called.

## 20. What are template literals?

Template literals use backticks and allow interpolation and multi-line strings.

```js
const message = `Hello ${name}`;
```

## 21. What is destructuring?

Destructuring extracts values from arrays or objects into variables.

```js
const { name } = user;
const [first] = numbers;
```

## 22. What is the spread operator?

Spread expands arrays or objects.

```js
const copy = { ...user };
const all = [...a, ...b];
```

## 23. What is the rest operator?

Rest collects remaining values into an array or object.

```js
function sum(...numbers) {}
const { id, ...rest } = user;
```

## 24. What are default parameters?

Default parameters provide fallback values when an argument is `undefined`.

```js
function greet(name = "Guest") {}
```

## 25. What is optional chaining?

Optional chaining safely reads nested properties without throwing if something is `null` or `undefined`.

```js
user?.address?.city
```

## 26. What is nullish coalescing?

`??` returns the right-hand value only when the left-hand value is `null` or `undefined`.

```js
const name = user.name ?? "Guest";
```

## 27. What are truthy and falsy values?

Falsy values are `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`. Most other values are truthy.

## 28. What is short-circuit evaluation?

Logical operators stop evaluating as soon as the result is known.

```js
isLoggedIn && showDashboard();
const title = customTitle || "Default";
```

## 29. What is strict mode?

Strict mode enables stricter parsing and error handling. It prevents some silent errors and unsafe JavaScript behavior.

```js
"use strict";
```

## 30. What is NaN?

`NaN` means Not-a-Number. It represents an invalid numeric result.

```js
Number("abc"); // NaN
```

## 31. How do you check for NaN correctly?

Use `Number.isNaN`.

```js
Number.isNaN(NaN); // true
```

## 32. What is immutability?

Immutability means not changing existing data directly. Instead, create a new value with the required changes.

## 33. Shallow copy versus deep copy.

A shallow copy copies only the first level. Nested objects still share references. A deep copy copies nested values too.

## 34. How do you clone an object?

Use spread, `Object.assign`, or `structuredClone` depending on depth.

```js
const shallow = { ...user };
const deep = structuredClone(user);
```

## 35. Limitations of JSON.parse(JSON.stringify(value)).

It loses functions, `undefined`, symbols, dates, maps, sets, circular references, and special values like `Infinity` or `NaN`.

## 36. What is structuredClone?

`structuredClone` creates a deep clone for many built-in data types and supports circular references. It does not clone functions.

## 37. What is a pure function?

A pure function returns the same output for the same input and has no side effects.

## 38. What is a higher-order function?

A higher-order function accepts another function as an argument or returns a function.

```js
const doubled = numbers.map((n) => n * 2);
```

## 39. What is a callback?

A callback is a function passed to another function to be executed later.

## 40. What is recursion?

Recursion is when a function calls itself until a base condition stops it.

## 12. Closures And Scope

## 41. What is a closure?

A closure is created when a function remembers variables from its outer lexical scope even after that outer function has finished executing.

## 42. Practical use case for closures.

Closures are used for private variables, function factories, memoization, event handlers, and callbacks.

```js
function createCounter() {
  let count = 0;
  return () => ++count;
}
```

## 43. How are closures used in React?

React event handlers, effects, callbacks, and custom hooks use closures to access props and state from the render where they were created.

## 44. What is a stale closure?

A stale closure happens when a function uses an old value captured from a previous render or scope.

## 45. Why do stale closures occur in React hooks?

They occur when dependencies are missing from `useEffect`, `useCallback`, or `useMemo`, or when async code uses state from an older render.

## 46. How can stale closures be fixed?

Include correct dependencies, use functional state updates, use refs for mutable values, or move logic into the effect or event handler where it belongs.

## 47. How can closures provide private variables?

Variables inside a function are not accessible from outside, but returned inner functions can still access them.

```js
function bankAccount() {
  let balance = 0;
  return {
    deposit(amount) { balance += amount; },
    getBalance() { return balance; }
  };
}
```

## 48. What is an immediately invoked function expression?

An IIFE is a function expression that runs immediately after it is created.

```js
(function () {
  console.log("run once");
})();
```

## 49. Closure output question.

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
```

Output: `3 3 3` because `var` is function-scoped and all callbacks share the same `i`. With `let`, output is `0 1 2` because each loop iteration gets a new block-scoped binding.

## 13. this, call, apply And bind

## 50. What does this represent?

`this` is the execution context of a function. Its value depends on how the function is called, not where it is defined, except for arrow functions.

## 51. How is this determined?

`this` is determined by the call site: object method call, explicit binding, constructor call, default binding, or lexical binding for arrow functions.

## 52. this in regular function versus arrow function.

Regular functions get `this` dynamically. Arrow functions capture `this` from their surrounding lexical scope.

## 53. What is implicit binding?

Implicit binding happens when a function is called as an object method.

```js
user.sayName(); // this is user
```

## 54. What is explicit binding?

Explicit binding uses `call`, `apply`, or `bind` to set `this` manually.

## 55. What is default binding?

Default binding happens when a function is called directly. In non-strict mode, `this` is usually the global object. In strict mode, it is `undefined`.

## 56. What is constructor binding?

When a function is called with `new`, JavaScript creates a new object and binds `this` to that object.

## 57. What does call do?

`call` invokes a function immediately with a specific `this` value and arguments passed one by one.

```js
fn.call(user, arg1, arg2);
```

## 58. What does apply do?

`apply` invokes a function immediately with a specific `this` value and arguments passed as an array.

```js
fn.apply(user, [arg1, arg2]);
```

## 59. What does bind do?

`bind` returns a new function with `this` permanently set.

```js
const boundFn = fn.bind(user);
```

## 60. call versus apply versus bind.

`call` and `apply` execute immediately. `bind` returns a new function. `call` takes separate arguments; `apply` takes an array.

## 61. Can a bound function be rebound?

No. Once a function is bound with `bind`, calling `bind` again does not replace the original bound `this`.

## 62. Why do arrow functions not have their own this?

Arrow functions were designed to capture `this` from the surrounding lexical scope, which makes them useful for callbacks.

## 63. What happens to this inside a callback?

`this` can be lost when a method is passed as a callback because the call site changes. Use `bind`, an arrow function, or call the method through its object.

## 64. How did class components bind event handlers?

Class components often used `.bind(this)` in the constructor or class field arrow functions.

## 14. Prototypes And Objects

## 65. What is an object?

An object is a collection of key-value pairs. Values can be primitives, objects, arrays, or functions.

## 66. What is a prototype?

A prototype is an object from which another object can inherit properties and methods.

## 67. What is the prototype chain?

When a property is not found on an object, JavaScript looks up the prototype chain until it finds the property or reaches `null`.

## 68. What is prototypal inheritance?

Prototypal inheritance means objects inherit directly from other objects through prototypes.

## 69. __proto__ versus prototype.

`__proto__` is an object's internal prototype reference. `prototype` is a property on constructor functions used when creating objects with `new`.

## 70. How does the new keyword work?

`new` creates a new object, links it to the constructor's prototype, binds `this` to the new object, runs the constructor, and returns the object unless another object is returned explicitly.

## 71. Class syntax versus prototype-based inheritance.

JavaScript classes are syntactic sugar over prototype-based inheritance. Methods defined in a class are placed on the prototype.

## 72. What is Object.create?

`Object.create(proto)` creates a new object with the given object as its prototype.

## 73. What is Object.assign?

`Object.assign` copies enumerable own properties from source objects to a target object. It performs a shallow copy.

## 74. What are property descriptors?

Property descriptors define property behavior, such as `value`, `writable`, `enumerable`, `configurable`, `get`, and `set`.

## 75. Object.freeze versus Object.seal.

`Object.freeze` prevents adding, deleting, and changing properties. `Object.seal` prevents adding or deleting properties but allows changing existing writable properties.

## 76. Is Object.freeze deep?

No. `Object.freeze` is shallow. Nested objects can still be changed unless they are also frozen.

## 77. What are enumerable properties?

Enumerable properties are properties that appear during enumeration, such as with `Object.keys` or `for...in`.

## 78. How do you iterate over object properties?

Use `Object.keys`, `Object.values`, `Object.entries`, or `for...in` with an own-property check.

## 79. Object.keys, Object.values and Object.entries.

`Object.keys` returns keys, `Object.values` returns values, and `Object.entries` returns key-value pairs.

## 80. How do you check whether an object owns a property?

Use `Object.hasOwn` or `hasOwnProperty`.

```js
Object.hasOwn(user, "name");
```

## 81. What are getters and setters?

Getters and setters let you define custom logic for reading and writing object properties.

## 82. What is object reference equality?

Objects are equal only when they reference the same object in memory.

```js
{} === {}; // false
```

## 15. Arrays

## 83. map versus forEach.

`map` returns a new array. `forEach` runs a function for each item and returns `undefined`.

## 84. filter versus find.

`filter` returns all matching items. `find` returns the first matching item.

## 85. find versus findIndex.

`find` returns the matching value. `findIndex` returns the matching index or `-1`.

## 86. some versus every.

`some` returns true if at least one item matches. `every` returns true only if all items match.

## 87. What does reduce do?

`reduce` accumulates array values into a single result.

```js
const total = numbers.reduce((sum, n) => sum + n, 0);
```

## 88. slice versus splice.

`slice` returns a portion of an array without changing the original. `splice` adds, removes, or replaces items and mutates the original array.

## 89. push versus concat.

`push` mutates the original array. `concat` returns a new array.

## 90. Which array methods mutate the original array?

Common mutating methods include `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`, and `copyWithin`.

## 91. How do you remove duplicates from an array?

Use `Set`.

```js
const unique = [...new Set(items)];
```

## 92. How do you flatten a nested array?

Use `flat`.

```js
const flat = nested.flat(Infinity);
```

## 93. How do you group objects by a property?

Use `reduce` or `Object.groupBy` when available.

```js
const grouped = users.reduce((acc, user) => {
  (acc[user.role] ??= []).push(user);
  return acc;
}, {});
```

## 94. How do you sort numbers correctly?

Pass a numeric comparator.

```js
numbers.sort((a, b) => a - b);
```

## 95. Why does default sort produce incorrect numeric order?

Default `sort` converts values to strings and sorts lexicographically.

## 96. How do you sort without mutating the original array?

Copy first, then sort.

```js
const sorted = [...numbers].sort((a, b) => a - b);
```

## 97. How do you find the maximum value?

Use `Math.max` with spread or `reduce` for very large arrays.

```js
Math.max(...numbers);
```

## 98. How do you merge arrays?

Use spread or `concat`.

```js
const merged = [...a, ...b];
```

## 99. How do you count occurrences?

Use `reduce`.

```js
const counts = items.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});
```

## 100. How do you move zeroes to the end?

Filter non-zeroes and zeroes, then merge.

```js
const result = [...arr.filter((n) => n !== 0), ...arr.filter((n) => n === 0)];
```

## 101. How do you find duplicate values?

Track seen values in a set.

```js
const seen = new Set();
const duplicates = arr.filter((item) => seen.size === seen.add(item).size);
```

## 102. How do you find the intersection of two arrays?

Use a `Set` for efficient lookup.

```js
const setB = new Set(b);
const intersection = a.filter((item) => setB.has(item));
```

## 16. Promises, Async/Await And Event Loop

## 103. What is synchronous programming?

Synchronous code runs line by line, and each operation blocks the next until it finishes.

## 104. What is asynchronous programming?

Asynchronous programming allows long-running work like timers, network calls, or file operations to finish later without blocking the main thread.

## 105. What is a Promise?

A Promise represents a future value from an asynchronous operation.

## 106. What are the states of a Promise?

A Promise can be `pending`, `fulfilled`, or `rejected`.

## 107. How do you create a Promise?

```js
const promise = new Promise((resolve, reject) => {
  resolve("done");
});
```

## 108. What does .then() return?

`.then()` returns a new Promise, which enables chaining.

## 109. How does Promise chaining work?

Each `.then()` receives the previous result and returns a value or Promise for the next step.

## 110. What is .catch()?

`.catch()` handles rejected Promises or errors thrown in a previous `.then()`.

## 111. What is .finally()?

`.finally()` runs after a Promise settles, whether fulfilled or rejected. It is useful for cleanup.

## 112. What is async/await?

`async/await` is syntax for writing Promise-based code in a cleaner, synchronous-looking style.

## 113. Does an async function always return a Promise?

Yes. An `async` function always returns a Promise, even if it returns a plain value.

## 114. How do you handle errors with async/await?

Use `try...catch`.

```js
try {
  const data = await fetchData();
} catch (error) {
  console.error(error);
}
```

## 115. What is the event loop?

The event loop coordinates the call stack, Web APIs, microtask queue, and callback queue so asynchronous callbacks can run when the stack is empty.

## 116. What is the call stack?

The call stack tracks currently executing function calls.

## 117. What are Web APIs?

Web APIs are browser-provided features like `setTimeout`, DOM events, `fetch`, and storage APIs. They handle async work outside the JavaScript call stack.

## 118. What is the callback queue?

The callback queue stores macrotasks such as timer callbacks and DOM event callbacks waiting to run.

## 119. What is the microtask queue?

The microtask queue stores Promise callbacks and similar high-priority async tasks. It runs before macrotasks.

## 120. Microtask versus macrotask.

Microtasks include Promise callbacks and `queueMicrotask`. Macrotasks include `setTimeout`, `setInterval`, and DOM events. Microtasks run before the next macrotask.

## 121. Which executes first: Promise callback or setTimeout?

The Promise callback executes first because it is a microtask. `setTimeout` is a macrotask.

## 122. What is Promise.all?

`Promise.all` runs promises concurrently and resolves when all resolve. It rejects when any promise rejects.

## 123. What happens when one Promise.all promise rejects?

The whole `Promise.all` rejects immediately with that error.

## 124. What is Promise.allSettled?

`Promise.allSettled` waits for every promise and returns each result as fulfilled or rejected.

## 125. What is Promise.race?

`Promise.race` settles as soon as the first promise settles, whether fulfilled or rejected.

## 126. What is Promise.any?

`Promise.any` resolves with the first fulfilled promise. It rejects only if all promises reject.

## 127. How do you execute promises sequentially?

Use a loop with `await`.

```js
for (const task of tasks) {
  await task();
}
```

## 128. How do you execute promises concurrently?

Start them together and wait with `Promise.all`.

```js
await Promise.all(tasks.map((task) => task()));
```

## 129. How do you add a timeout to a Promise?

Use `Promise.race` with a timer promise.

```js
const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000));
await Promise.race([fetchData(), timeout]);
```

## 130. What is callback hell?

Callback hell is deeply nested callback code that becomes hard to read and maintain. Promises and async/await help avoid it.

## 131. What is an unhandled Promise rejection?

It happens when a Promise rejects and no `.catch()` or `try...catch` handles the error.

## 132. Can JavaScript run asynchronous code while being single-threaded?

Yes. The main JavaScript execution is single-threaded, but the runtime delegates async work to Web APIs or native APIs and schedules callbacks through the event loop.

## 133. Event loop output question.

```js
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

Output:

```text
A
D
C
B
```

Synchronous logs run first, then microtasks, then timer callbacks.

## 17. JavaScript Output Questions

## 134. Output question: var hoisting.

```js
console.log(a);
var a = 10;
```

Output: `undefined`, because `var a` is hoisted and initialized as `undefined`.

## 135. Output question: let temporal dead zone.

```js
console.log(a);
let a = 10;
```

Result: `ReferenceError`, because `a` is in the temporal dead zone.

## 136. Output question: loose equality.

```js
console.log([] == false);
console.log([] === false);
```

Output:

```text
true
false
```

`==` coerces types. `===` does not.

## 137. Output question: object reference equality.

```js
const user1 = { name: "Miraj" };
const user2 = { name: "Miraj" };
console.log(user1 === user2);
```

Output: `false`, because they are different object references.

## 138. Output question: this in normal and arrow methods.

```js
const user = {
  name: "Miraj",
  normal() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  }
};
```

`normal()` gets `this` from the calling object, so `user.normal()` prints `Miraj`. The arrow function captures `this` lexically and does not receive `user` as its own `this`.
