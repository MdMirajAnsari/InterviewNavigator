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

var - hoisted but undefined

function- hoisted with defination

let & const - hoisted but remain temporal deal zone.

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

# Lexical Scopr

inner function can access their variable from their parent.

# This

This object refers the object it belongs to. but it defined how it getting called

method- it refers the object

function-refers undefined in strict mode otherwisw it refers window

arrow function- inherits from surrounding scope.

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

## Debounce and Throttle

let, const, var

rest and spread

deep copy and shallow copy

event bubbling and event capturing

high order function

## EventDelegation

## Pure Function

## ImPure Function

## Weakmap and WeakSet

## Event Bubbling

## Curring

## TypeOf

typeof null = object

typeof undefined = undefined

typeof arr = object

## hasOwnProperty

* Checks only the object’s own properties.

let user = { name: "John", age: 30 };

console.log(user.hasOwnProperty('name')); // true
console.log(user.hasOwnProperty('address')); // false

## What is the difference between shallow and deep copying in JavaScript?

A **shallow copy** creates a  **new object** , but **only copies references** for nested objects/arrays instead of cloning them.

So changes to nested objects  **affect both copies** .

```javascript
const original = {
  name: "raj",
  address: { city: "Mumbai" }
};

// Shallow copy using spread
const shallowCopy = { ...original };

shallowCopy.name = "Ansari"; 
shallowCopy.address.city = "Delhi";

console.log(original.name);        // "raj" ✅ (independent)
console.log(original.address.city); // "Delhi" ❌ (changed!)

```

A **deep copy** creates a  **new object with completely new nested objects/arrays** .

So changes in one object  **do not affect the other** .

```javascript
const original = {
  name: "raj",
  address: { city: "Mumbai" }
};

// Deep copy using structuredClone (modern JS)
const deepCopy = structuredClone(original);

deepCopy.address.city = "Delhi";

console.log(original.address.city); // "Mumbai" ✅ (unchanged)

```

## Difference between Promise.all(), Promise.allSettled(), Promise.any()

* Use **`Promise.all`** when you need *all results* but fail fast if any error.
* Use **`Promise.allSettled`** when you want *all outcomes* regardless of success/failure.
* Use **`Promise.any`** when you only care about the  *first successful result* .

## What is truthy and falsy value in javascript?

| `false` | falsy |
| --------- | ----- |

| `0`,`-0` | falsy |
| ------------ | ----- |

| `0n` | falsy |
| ------ | ----- |

| `""`(empty) | falsy |
| ------------- | ----- |

| `null` | falsy |
| -------- | ----- |

| `undefined` | falsy |
| ------------- | ----- |

| `NaN` | falsy |
| ------- | ----- |

| Everything else | truthy |
| --------------- | ------ |

## What is coercion in javascipt?

In JavaScript, **type coercion** is the process of converting a value from one data type to another.

* It can be **explicit** (you do it yourself).
* Or **implicit** (JavaScript does it automatically in expressions).

```javascript
// To String
String(123)      // "123"
(123).toString() // "123"

// To Number
Number("123")    // 123
parseInt("123")  // 123

// To Boolean
Boolean(1)       // true
Boolean(0)       // false

```

## What is the difference between a function declaration and function expression?

Function Declaration

```javascript
// Call before definition
greet();  // ✅ Works

function greet() {
  console.log("Hello from function declaration");
}

```

Function Expression

```javascript
// greet(); // ❌ Error: Cannot access 'greet' before initialization

const greet = function() {
  console.log("Hello from function expression");
};

greet();  // ✅ Works (after definition)

```


* **Function declaration** = named, hoisted, available everywhere in scope.
* **Function expression** = assigned to variable, not hoisted (must be defined before use).

## What is symbol in Javascript?


* A **Symbol** is a **primitive data type** (introduced in ES6).
* It represents a  **unique and immutable value** .
* Often used as object property keys to avoid  **name collisions** .

```javascript
const sym1 = Symbol();
const sym2 = Symbol("description");
const sym3 = Symbol("description");

console.log(sym2 === sym3); // false (each symbol is unique)

```

## Difference between Array.some() and Array.every()?

* `some()` → **at least one** must match 
* `every()` → **all must match** 

```javascript
const nums = [10, 20, 30, 40];

console.log(nums.some(n => n > 25));  // true  (30, 40 are > 25)
console.log(nums.every(n => n > 25)); // false (10 and 20 are not > 25)

```
