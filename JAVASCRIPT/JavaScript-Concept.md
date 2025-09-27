## call

**Quick Example:**
```javascript
function greet() { return `Hello, ${this.name}`; }
const person = { name: 'John' };
greet.call(person); // "Hello, John"
```

The **`call()`** method of [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) instances calls this function with a given `this` value and arguments provided individually.

```javascript
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
```

## apply

**Quick Example:**
```javascript
function sum(a, b, c) { return a + b + c; }
sum.apply(null, [1, 2, 3]); // 6
```

The apply() method of Function instances calls this function with a given this value, and arguments provided as an array (or an array-like object).

```javascript
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
```

## bind

**Quick Example:**
```javascript
function greet(greeting) { return `${greeting}, ${this.name}`; }
const person = { name: 'John' };
const boundGreet = greet.bind(person);
boundGreet('Hello'); // "Hello, John"
```

The **`bind()`** method of [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function) instances creates a new function that, when called, calls this function with its `this` keyword set to the provided value, and a given sequence of arguments preceding any provided when the new function is called.

```javascript
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
```

## Hoisting

**Quick Example:**
```javascript
console.log(x); // undefined (not error)
var x = 5;
```

Hoisting is JavaScript's default behavior of moving declarations to the top.

var - hoisted but undefined

function- hoisted with defination

let & const - hoisted but remain temporal deal zone.

```javascript
alert(Sum(5, 5)); // 10

function Sum(val1, val2)
{
    return val1 + val2;
}
```

Please note that JavaScript compiler does not move function expression.

```javascript
Add(5, 5); // error

var Add = function Sum(val1, val2)
{
    return val1 + val2;
}
```

## Closure

**Quick Example:**
```javascript
function outer(x) {
  return function inner(y) {
    return x + y; // x is from outer scope
  };
}
const add5 = outer(5);
add5(3); // 8
```

A **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the  **lexical environment** ). In other words, a closure gives a function access to its outer scope. In JavaScript, closures are created every time a function is created, at function creation time.

```javascript
function a(){
for (var i = 0; i < 3; i++) {
  setTimeout(function log() {
    console.log(i); // What is logged?
  }, 1000);
}
}
a();
```

```javascript
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

## Lexical Scopr

inner function can access their variable from their parent.

## This

**Quick Example:**
```javascript
const obj = {
  name: 'John',
  greet() { return `Hello, ${this.name}`; }
};
obj.greet(); // "Hello, John"
```

This object refers the object it belongs to. but it defined how it getting called

method- it refers the object

function-refers undefined in strict mode otherwisw it refers window

arrow function- inherits from surrounding scope.

## Slice And Splice

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

**Quick Examples:**
```javascript
// Debounce: Wait for user to stop typing
const debouncedSearch = debounce(searchFunction, 300);

// Throttle: Limit scroll events to 100ms intervals
const throttledScroll = throttle(handleScroll, 100);
```

### Debounce
**Debounce** delays the execution of a function until after a specified delay has passed since it was last called. If the function is called again before the delay completes, the timer resets.

**Use Cases:**
- Search input fields
- Window resize events
- Button clicks to prevent double-submission

```javascript
// Debounce implementation
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

// Example: Search input
const searchInput = document.getElementById('search');
const debouncedSearch = debounce(function(event) {
  console.log('Searching for:', event.target.value);
  // Perform actual search here
}, 300);

searchInput.addEventListener('input', debouncedSearch);

// Example: Resize handler
const debouncedResize = debounce(function() {
  console.log('Window resized');
  // Handle resize logic
}, 250);

window.addEventListener('resize', debouncedResize);
```

### Throttle
**Throttle** ensures a function is called at most once per specified time interval, regardless of how many times it's triggered.

**Use Cases:**
- Scroll events
- Mouse move events
- API calls to prevent excessive requests

```javascript
// Throttle implementation
function throttle(func, delay) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

// Example: Scroll handler
const throttledScroll = throttle(function() {
  console.log('Scrolling...');
  // Handle scroll logic
}, 100);

window.addEventListener('scroll', throttledScroll);

// Example: Mouse move
const throttledMouseMove = throttle(function(event) {
  console.log('Mouse position:', event.clientX, event.clientY);
  // Update cursor position
}, 16); // ~60fps

document.addEventListener('mousemove', throttledMouseMove);

// Example: API call throttling
const throttledApiCall = throttle(function(data) {
  fetch('/api/endpoint', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}, 1000); // Max 1 call per second
```

### Key Differences
| Feature | Debounce | Throttle |
|---------|----------|----------|
| **Execution** | After delay completes | At regular intervals |
| **Reset** | Timer resets on new call | Timer doesn't reset |
| **Use Case** | Wait for user to finish | Limit execution frequency |
| **Example** | Search input | Scroll events |

## let, const, var

**Quick Examples:**
```javascript
var x = 1;        // Function scoped, hoisted, redeclarable
let y = 2;        // Block scoped, hoisted (TDZ), not redeclarable
const z = 3;      // Block scoped, hoisted (TDZ), not reassignable
```

### Variable Declaration Comparison

| Feature | var | let | const |
|---------|-----|-----|-------|
| **Scope** | Function-scoped | Block-scoped | Block-scoped |
| **Hoisting** | Hoisted (undefined) | Hoisted (TDZ) | Hoisted (TDZ) |
| **Reassignment** | ✅ Allowed | ✅ Allowed | ❌ Not allowed |
| **Redeclaration** | ✅ Allowed | ❌ Not allowed | ❌ Not allowed |
| **Initialization** | Optional | Optional | Required |

### var (Function-scoped)
```javascript
function example() {
  if (true) {
    var x = 1;
  }
  console.log(x); // 1 (accessible outside block)
}

// Hoisting example
console.log(y); // undefined (not error)
var y = 5;

// Redeclaration allowed
var z = 1;
var z = 2; // ✅ Works
console.log(z); // 2

// Function scope
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3 (closure issue)
}
```

### let (Block-scoped)
```javascript
function example() {
  if (true) {
    let x = 1;
  }
  // console.log(x); // ReferenceError: x is not defined
}

// Hoisting (Temporal Dead Zone)
// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 5;

// No redeclaration
let z = 1;
// let z = 2; // SyntaxError: Identifier 'z' has already been declared

// Block scope
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2 (correct)
}

// Block scope examples
{
  let blockVar = "I'm block scoped";
}
// console.log(blockVar); // ReferenceError

if (true) {
  let conditionalVar = "Conditional";
}
// console.log(conditionalVar); // ReferenceError
```

### const (Block-scoped, Immutable Reference)
```javascript
// Must be initialized
const name = "John";
// const age; // SyntaxError: Missing initializer in const declaration

// Cannot reassign
// name = "Jane"; // TypeError: Assignment to constant variable

// But object properties can be modified
const person = { name: "John", age: 30 };
person.age = 31; // ✅ Allowed
person.city = "New York"; // ✅ Allowed
// person = {}; // ❌ Not allowed

// Array elements can be modified
const numbers = [1, 2, 3];
numbers.push(4); // ✅ Allowed
numbers[0] = 10; // ✅ Allowed
// numbers = [5, 6, 7]; // ❌ Not allowed

// Block scope
{
  const blockConst = "Block scoped";
}
// console.log(blockConst); // ReferenceError

// Temporal Dead Zone
// console.log(tdzVar); // ReferenceError
const tdzVar = "TDZ example";
```

### Practical Examples

```javascript
// ❌ Problem with var in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var:', i), 100); // 3, 3, 3
}

// ✅ Solution with let
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log('let:', i), 100); // 0, 1, 2
}

// ✅ Solution with const (if not modifying i)
for (const i of [0, 1, 2]) {
  setTimeout(() => console.log('const:', i), 100); // 0, 1, 2
}

// Function parameters
function example(param1, param2) {
  // param1 and param2 are like const - cannot be reassigned
  // param1 = "new value"; // This would create a new local variable
}
```

### Best Practices
1. **Use `const` by default** - for values that won't change
2. **Use `let` when reassignment needed** - for variables that change
3. **Avoid `var`** - use only when you need function scope specifically
4. **Declare variables as close to usage as possible**

## rest and spread

**Quick Examples:**
```javascript
// Rest: Collect remaining arguments
function sum(first, ...rest) { return first + rest.reduce((a, b) => a + b); }

// Spread: Expand array/object
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // [1, 2, 3, 4]
```

### Rest Operator (`...`)
The **rest operator** collects multiple elements and condenses them into a single element (usually an array).

**Use Cases:**
- Function parameters (collecting remaining arguments)
- Array destructuring (collecting remaining elements)
- Object destructuring (collecting remaining properties)

```javascript
// Function parameters - collecting remaining arguments
function sum(first, second, ...rest) {
  console.log('First:', first);    // 1
  console.log('Second:', second);  // 2
  console.log('Rest:', rest);      // [3, 4, 5, 6]
  
  const restSum = rest.reduce((acc, num) => acc + num, 0);
  return first + second + restSum;
}

console.log(sum(1, 2, 3, 4, 5, 6)); // 21

// Array destructuring - collecting remaining elements
const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
const [primary, secondary, ...otherColors] = colors;

console.log(primary);        // 'red'
console.log(secondary);      // 'green'
console.log(otherColors);    // ['blue', 'yellow', 'purple']

// Object destructuring - collecting remaining properties
const person = {
  name: 'John',
  age: 30,
  city: 'New York',
  country: 'USA',
  occupation: 'Developer'
};

const { name, age, ...address } = person;
console.log(name);      // 'John'
console.log(age);       // 30
console.log(address);   // { city: 'New York', country: 'USA', occupation: 'Developer' }

// Rest with function expressions
const multiply = (multiplier, ...numbers) => {
  return numbers.map(num => num * multiplier);
};

console.log(multiply(2, 1, 2, 3, 4)); // [2, 4, 6, 8]
```

### Spread Operator (`...`)
The **spread operator** expands an iterable (array, string, object) into individual elements.

**Use Cases:**
- Array operations (copying, merging, adding elements)
- Object operations (copying, merging, adding properties)
- Function calls (passing array elements as individual arguments)
- String operations

```javascript
// Array operations
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Copying arrays
const arr1Copy = [...arr1];
console.log(arr1Copy); // [1, 2, 3]

// Merging arrays
const merged = [...arr1, ...arr2];
console.log(merged); // [1, 2, 3, 4, 5, 6]

// Adding elements
const withNewElements = [...arr1, 4, 5, ...arr2];
console.log(withNewElements); // [1, 2, 3, 4, 5, 4, 5, 6]

// Function calls
function addThreeNumbers(a, b, c) {
  return a + b + c;
}

const numbers = [1, 2, 3];
console.log(addThreeNumbers(...numbers)); // 6

// Math functions
const scores = [85, 92, 78, 96, 88];
console.log(Math.max(...scores)); // 96
console.log(Math.min(...scores)); // 78

// Object operations
const user = { name: 'John', age: 30 };
const address = { city: 'New York', country: 'USA' };

// Copying objects
const userCopy = { ...user };
console.log(userCopy); // { name: 'John', age: 30 }

// Merging objects
const userWithAddress = { ...user, ...address };
console.log(userWithAddress); // { name: 'John', age: 30, city: 'New York', country: 'USA' }

// Adding/overriding properties
const updatedUser = { ...user, age: 31, city: 'Boston' };
console.log(updatedUser); // { name: 'John', age: 31, city: 'Boston' }

// String operations
const str = 'Hello';
const chars = [...str];
console.log(chars); // ['H', 'e', 'l', 'l', 'o']

// Converting NodeList to Array
const divs = document.querySelectorAll('div');
const divArray = [...divs]; // Now it's a real array with array methods
```

### Advanced Examples

```javascript
// Removing elements from array
const numbers = [1, 2, 3, 4, 5];
const [first, , ...rest] = numbers; // Skip second element
console.log(first); // 1
console.log(rest);  // [3, 4, 5]

// Conditional spreading
const includeExtra = true;
const baseConfig = { api: 'v1', timeout: 5000 };
const extraConfig = { debug: true, logging: true };

const finalConfig = {
  ...baseConfig,
  ...(includeExtra && extraConfig) // Only spread if condition is true
};

console.log(finalConfig); // { api: 'v1', timeout: 5000, debug: true, logging: true }

// Function with dynamic parameters
function createUser(id, ...userData) {
  return {
    id,
    ...userData.reduce((acc, data) => ({ ...acc, ...data }), {})
  };
}

const user = createUser(1, 
  { name: 'John' }, 
  { age: 30 }, 
  { city: 'New York' }
);
console.log(user); // { id: 1, name: 'John', age: 30, city: 'New York' }

// Array manipulation
const originalArray = [1, 2, 3];
const newArray = [...originalArray, 4, 5]; // Non-destructive way to add elements
console.log(originalArray); // [1, 2, 3] (unchanged)
console.log(newArray);      // [1, 2, 3, 4, 5]

// Nested object merging (shallow merge)
const defaultSettings = {
  theme: 'light',
  notifications: { email: true, push: false }
};
const userSettings = {
  theme: 'dark',
  notifications: { email: false }
};

const finalSettings = { ...defaultSettings, ...userSettings };
console.log(finalSettings.notifications); // { email: false, push: false }
```

### Key Differences
| Operator | Purpose | Context |
|----------|---------|---------|
| **Rest (`...`)** | Collect multiple elements into one | Function parameters, destructuring |
| **Spread (`...`)** | Expand one element into multiple | Arrays, objects, function calls |

### Common Patterns
```javascript
// Clone arrays/objects
const arr = [1, 2, 3];
const clonedArr = [...arr]; // Shallow copy

const obj = { a: 1, b: 2 };
const clonedObj = { ...obj }; // Shallow copy

// Merge with override
const defaultOptions = { timeout: 5000, retries: 3 };
const userOptions = { timeout: 10000 };
const finalOptions = { ...defaultOptions, ...userOptions }; // { timeout: 10000, retries: 3 }
```

## deep copy and shallow copy

**Quick Examples:**
```javascript
// Shallow copy
const shallow = { ...original };

// Deep copy
const deep = structuredClone(original);
// or
const deep2 = JSON.parse(JSON.stringify(original));
```

### Shallow Copy
A **shallow copy** creates a new object, but only copies references for nested objects/arrays instead of cloning them. Changes to nested objects affect both copies.

```javascript
// Shallow copy methods
const original = {
  name: "John",
  age: 30,
  address: { 
    city: "New York", 
    country: "USA" 
  },
  hobbies: ["reading", "gaming"]
};

// Method 1: Spread operator
const shallowCopy1 = { ...original };

// Method 2: Object.assign()
const shallowCopy2 = Object.assign({}, original);

// Method 3: Array methods (for arrays)
const originalArray = [1, 2, { a: 3 }];
const shallowArrayCopy = [...originalArray];
// or
const shallowArrayCopy2 = originalArray.slice();

// Testing shallow copy behavior
shallowCopy1.name = "Jane";           // ✅ Only affects shallow copy
shallowCopy1.address.city = "Boston"; // ❌ Affects both original and copy!
shallowCopy1.hobbies.push("swimming"); // ❌ Affects both original and copy!

console.log(original.name);        // "John" ✅ (independent)
console.log(original.address.city); // "Boston" ❌ (changed!)
console.log(original.hobbies);     // ["reading", "gaming", "swimming"] ❌ (changed!)
```

### Deep Copy
A **deep copy** creates a new object with completely new nested objects/arrays. Changes in one object do not affect the other.

```javascript
// Method 1: structuredClone() - Modern approach (ES2021)
const original = {
  name: "John",
  address: { city: "New York" },
  hobbies: ["reading", "gaming"]
};

const deepCopy1 = structuredClone(original);
deepCopy1.address.city = "Boston";
deepCopy1.hobbies.push("swimming");

console.log(original.address.city); // "New York" ✅ (unchanged)
console.log(original.hobbies);     // ["reading", "gaming"] ✅ (unchanged)

// Method 2: JSON methods (limitations: no functions, undefined, symbols, dates)
const deepCopy2 = JSON.parse(JSON.stringify(original));

// Method 3: Custom recursive function
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  if (typeof obj === "object") {
    const clonedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
}

const deepCopy3 = deepClone(original);

// Method 4: Using external libraries (Lodash)
// const deepCopy4 = _.cloneDeep(original);
```

### Comparison Table

| Method | Type | Pros | Cons |
|--------|------|------|------|
| `{...obj}` | Shallow | Simple, fast | Nested objects shared |
| `Object.assign({}, obj)` | Shallow | Simple, fast | Nested objects shared |
| `structuredClone(obj)` | Deep | Native, handles most types | Newer browsers only |
| `JSON.parse(JSON.stringify(obj))` | Deep | Works everywhere | No functions, dates, undefined |
| Custom recursive function | Deep | Full control | More code to maintain |

### Practical Examples

```javascript
// Shallow copy use cases
const user = { name: "John", preferences: { theme: "dark" } };
const userCopy = { ...user };
userCopy.name = "Jane"; // Safe to change
// userCopy.preferences.theme = "light"; // Dangerous - affects original!

// Deep copy use cases
const config = {
  api: { baseUrl: "https://api.example.com", timeout: 5000 },
  features: { darkMode: true, notifications: false }
};

const configCopy = structuredClone(config);
configCopy.api.baseUrl = "https://staging-api.example.com"; // Safe
configCopy.features.darkMode = false; // Safe

// Array copying
const numbers = [1, 2, { value: 3 }];

// Shallow copy
const shallowNumbers = [...numbers];
shallowNumbers[0] = 10; // Safe
shallowNumbers[2].value = 30; // Dangerous - affects original!

// Deep copy
const deepNumbers = structuredClone(numbers);
deepNumbers[2].value = 30; // Safe - doesn't affect original
```

### When to Use Each

**Use Shallow Copy when:**
- You only need to modify top-level properties
- Performance is critical (shallow is faster)
- You're certain there are no nested objects/arrays

**Use Deep Copy when:**
- You need to modify nested objects/arrays
- You want complete isolation between objects
- You're working with complex data structures

## event bubbling and event capturing

**Quick Examples:**
```javascript
// Event bubbling (default)
element.addEventListener('click', handler);

// Event capturing
element.addEventListener('click', handler, true);

// Stop propagation
event.stopPropagation();
```

### Event Flow in DOM
When an event occurs on a DOM element, it doesn't just trigger on that element. The event follows a specific path through the DOM tree in three phases:

1. **Capture Phase** (Event Capturing)
2. **Target Phase** 
3. **Bubble Phase** (Event Bubbling)

### Event Bubbling
**Event bubbling** is the process where an event starts from the target element and bubbles up to its parent elements, then to their parents, and so on until it reaches the document root.

```html
<!DOCTYPE html>
<html>
<body>
  <div id="grandparent">
    <div id="parent">
      <div id="child">
        <button id="button">Click me!</button>
      </div>
    </div>
  </div>
</body>
</html>
```

```javascript
// Event bubbling example
document.getElementById('button').addEventListener('click', function(e) {
  console.log('Button clicked (Target)');
});

document.getElementById('child').addEventListener('click', function(e) {
  console.log('Child clicked (Bubbling)');
});

document.getElementById('parent').addEventListener('click', function(e) {
  console.log('Parent clicked (Bubbling)');
});

document.getElementById('grandparent').addEventListener('click', function(e) {
  console.log('Grandparent clicked (Bubbling)');
});

document.body.addEventListener('click', function(e) {
  console.log('Body clicked (Bubbling)');
});

// When button is clicked, output will be:
// Button clicked (Target)
// Child clicked (Bubbling)
// Parent clicked (Bubbling)
// Grandparent clicked (Bubbling)
// Body clicked (Bubbling)
```

### Event Capturing
**Event capturing** is the opposite of bubbling. The event starts from the document root and goes down to the target element.

```javascript
// Event capturing example (useCapture = true)
document.getElementById('button').addEventListener('click', function(e) {
  console.log('Button clicked (Target)');
}, true); // true enables capturing

document.getElementById('child').addEventListener('click', function(e) {
  console.log('Child clicked (Capturing)');
}, true);

document.getElementById('parent').addEventListener('click', function(e) {
  console.log('Parent clicked (Capturing)');
}, true);

document.getElementById('grandparent').addEventListener('click', function(e) {
  console.log('Grandparent clicked (Capturing)');
}, true);

document.body.addEventListener('click', function(e) {
  console.log('Body clicked (Capturing)');
}, true);

// When button is clicked, output will be:
// Body clicked (Capturing)
// Grandparent clicked (Capturing)
// Parent clicked (Capturing)
// Child clicked (Capturing)
// Button clicked (Target)
```

### Complete Event Flow Example

```javascript
// Both capturing and bubbling phases
document.getElementById('grandparent').addEventListener('click', function(e) {
  console.log('Grandparent - Capturing');
}, true);

document.getElementById('grandparent').addEventListener('click', function(e) {
  console.log('Grandparent - Bubbling');
}, false);

document.getElementById('parent').addEventListener('click', function(e) {
  console.log('Parent - Capturing');
}, true);

document.getElementById('parent').addEventListener('click', function(e) {
  console.log('Parent - Bubbling');
}, false);

document.getElementById('button').addEventListener('click', function(e) {
  console.log('Button - Target');
});

// When button is clicked, output will be:
// Grandparent - Capturing
// Parent - Capturing
// Button - Target
// Parent - Bubbling
// Grandparent - Bubbling
```

### Stopping Event Propagation

```javascript
// stopPropagation() - stops event from continuing its journey
document.getElementById('button').addEventListener('click', function(e) {
  console.log('Button clicked');
  e.stopPropagation(); // Stops the event from bubbling/capturing further
});

document.getElementById('parent').addEventListener('click', function(e) {
  console.log('Parent clicked - this will NOT be called');
});

// stopImmediatePropagation() - stops all event listeners on the same element
document.getElementById('button').addEventListener('click', function(e) {
  console.log('First listener');
  e.stopImmediatePropagation(); // Stops all other listeners on this element
});

document.getElementById('button').addEventListener('click', function(e) {
  console.log('Second listener - this will NOT be called');
});

// preventDefault() - prevents default browser behavior
document.getElementById('button').addEventListener('click', function(e) {
  console.log('Button clicked');
  e.preventDefault(); // Prevents default button behavior (form submission, etc.)
  // Note: This doesn't stop propagation
});
```

### Event Delegation
Event delegation leverages bubbling to handle events efficiently:

```html
<ul id="todo-list">
  <li data-id="1">Task 1 <button class="delete">Delete</button></li>
  <li data-id="2">Task 2 <button class="delete">Delete</button></li>
  <li data-id="3">Task 3 <button class="delete">Delete</button></li>
</ul>
```

```javascript
// Instead of adding listeners to each button
// document.querySelectorAll('.delete').forEach(button => {
//   button.addEventListener('click', handleDelete);
// });

// Use event delegation on the parent
document.getElementById('todo-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete')) {
    const listItem = e.target.closest('li');
    const taskId = listItem.dataset.id;
    console.log('Deleting task:', taskId);
    listItem.remove();
  }
  
  // Handle other click events on the list
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('completed');
  }
});

// Benefits of event delegation:
// 1. Works with dynamically added elements
// 2. Better performance (fewer event listeners)
// 3. Less memory usage
```

### Practical Examples

```javascript
// Modal close on backdrop click
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) { // Clicked on the modal backdrop, not content
    closeModal();
  }
});

// Dropdown menu
document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('dropdown');
  const button = document.getElementById('dropdown-button');
  
  if (!dropdown.contains(e.target) && !button.contains(e.target)) {
    dropdown.classList.remove('open'); // Close dropdown if clicked outside
  }
});

// Form validation with bubbling
document.getElementById('form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validate all inputs
  const inputs = this.querySelectorAll('input[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  });
  
  if (isValid) {
    this.submit();
  }
});
```

### Key Points
- **Bubbling**: Event travels from target to root (default behavior)
- **Capturing**: Event travels from root to target (useCapture = true)
- **Target Phase**: Event is at the actual element that triggered it
- **Event delegation**: Use bubbling to handle events on parent elements
- **stopPropagation()**: Prevents event from continuing its journey
- **preventDefault()**: Prevents default browser behavior (doesn't stop propagation)

## high order function

**Quick Examples:**
```javascript
// Function that takes another function as argument
function higherOrder(fn) { return fn(); }

// Function that returns another function
function createMultiplier(x) { return y => x * y; }

// Array methods are HOFs
[1, 2, 3].map(x => x * 2); // [2, 4, 6]
```

### What are Higher-Order Functions?
A **higher-order function** is a function that either:
1. Takes one or more functions as arguments, OR
2. Returns a function as its result, OR
3. Both

### Functions as Arguments

```javascript
// Basic example - function that takes another function as argument
function greet(name, greetingFunction) {
  return greetingFunction(name);
}

function sayHello(name) {
  return `Hello, ${name}!`;
}

function sayGoodbye(name) {
  return `Goodbye, ${name}!`;
}

console.log(greet('John', sayHello));    // "Hello, John!"
console.log(greet('John', sayGoodbye));  // "Goodbye, John!"

// Array methods are higher-order functions
const numbers = [1, 2, 3, 4, 5];

// map() - transforms each element
const doubled = numbers.map(function(num) {
  return num * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// filter() - selects elements based on condition
const evens = numbers.filter(function(num) {
  return num % 2 === 0;
});
console.log(evens); // [2, 4]

// reduce() - accumulates values
const sum = numbers.reduce(function(acc, num) {
  return acc + num;
}, 0);
console.log(sum); // 15

// forEach() - executes function for each element
numbers.forEach(function(num) {
  console.log(`Number: ${num}`);
});
```

### Functions as Return Values

```javascript
// Function that returns a function
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15

// Another example - function factory
function createValidator(minLength) {
  return function(value) {
    return value.length >= minLength;
  };
}

const validateShort = createValidator(3);
const validateLong = createValidator(8);

console.log(validateShort('hi'));    // false
console.log(validateShort('hello')); // true
console.log(validateLong('hello'));  // false
console.log(validateLong('hello world')); // true
```

### Both: Functions as Arguments and Return Values

```javascript
// Function that takes a function and returns a function
function withLogging(fn) {
  return function(...args) {
    console.log(`Calling function with arguments:`, args);
    const result = fn(...args);
    console.log(`Function returned:`, result);
    return result;
  };
}

function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

const loggedAdd = withLogging(add);
const loggedMultiply = withLogging(multiply);

loggedAdd(2, 3);        // Logs arguments and result
loggedMultiply(4, 5);   // Logs arguments and result

// Timing function - another example
function withTiming(fn) {
  return function(...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`Function took ${end - start} milliseconds`);
    return result;
  };
}

const timedAdd = withTiming(add);
timedAdd(1, 2); // Logs execution time
```

### Common Higher-Order Function Patterns

```javascript
// 1. Memoization
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) {
      console.log('Returning cached result');
      return cache[key];
    }
    console.log('Computing new result');
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

function expensiveOperation(n) {
  console.log('Performing expensive operation...');
  return n * n;
}

const memoizedOperation = memoize(expensiveOperation);
console.log(memoizedOperation(5)); // Computes
console.log(memoizedOperation(5)); // Returns cached

// 2. Retry mechanism
function withRetry(fn, maxRetries = 3) {
  return async function(...args) {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn(...args);
      } catch (error) {
        lastError = error;
        console.log(`Attempt ${i + 1} failed:`, error.message);
        if (i < maxRetries - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    }
    throw lastError;
  };
}

// 3. Partial application
function partial(fn, ...presetArgs) {
  return function(...laterArgs) {
    return fn(...presetArgs, ...laterArgs);
  };
}

function greetWithPrefix(greeting, name, punctuation) {
  return `${greeting}, ${name}${punctuation}`;
}

const sayHelloTo = partial(greetWithPrefix, 'Hello');
console.log(sayHelloTo('John', '!')); // "Hello, John!"
```

### Array Higher-Order Functions Deep Dive

```javascript
const users = [
  { id: 1, name: 'John', age: 25, active: true },
  { id: 2, name: 'Jane', age: 30, active: false },
  { id: 3, name: 'Bob', age: 35, active: true },
  { id: 4, name: 'Alice', age: 28, active: true }
];

// Chaining higher-order functions
const activeUsersOver25 = users
  .filter(user => user.active)           // Filter active users
  .filter(user => user.age > 25)         // Filter users over 25
  .map(user => user.name)                // Get only names
  .sort();                               // Sort alphabetically

console.log(activeUsersOver25); // ['Alice', 'Bob']

// Custom higher-order function for array operations
function createFilter(condition) {
  return function(array) {
    return array.filter(condition);
  };
}

const filterActive = createFilter(user => user.active);
const filterOver25 = createFilter(user => user.age > 25);

const activeUsers = filterActive(users);
const usersOver25 = filterOver25(users);

// Composition of higher-order functions
function compose(...functions) {
  return function(value) {
    return functions.reduceRight((acc, fn) => fn(acc), value);
  };
}

const processUsers = compose(
  filterActive,
  filterOver25,
  (users) => users.map(user => user.name)
);

console.log(processUsers(users)); // ['Alice', 'Bob']
```

### Event Handling with Higher-Order Functions

```javascript
// Higher-order function for event handling
function createEventHandler(handler) {
  return function(event) {
    event.preventDefault();
    console.log('Event handled:', event.type);
    return handler(event);
  };
}

function handleClick(event) {
  console.log('Button clicked!');
}

function handleSubmit(event) {
  console.log('Form submitted!');
}

const enhancedClickHandler = createEventHandler(handleClick);
const enhancedSubmitHandler = createEventHandler(handleSubmit);

// Usage in DOM
// button.addEventListener('click', enhancedClickHandler);
// form.addEventListener('submit', enhancedSubmitHandler);
```

### Benefits of Higher-Order Functions
1. **Code Reusability** - Write once, use many times
2. **Abstraction** - Hide implementation details
3. **Composition** - Combine functions to create new functionality
4. **Functional Programming** - Enable functional programming patterns
5. **Flexibility** - Make code more flexible and maintainable

### Key Takeaways
- Higher-order functions are fundamental to functional programming
- They enable powerful patterns like decorators, middleware, and composition
- Array methods (`map`, `filter`, `reduce`, etc.) are examples of higher-order functions
- They make code more declarative and easier to reason about

## EventDelegation

**Quick Examples:**
```javascript
// Instead of adding listeners to each button
document.getElementById('list').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
});
```

### What is Event Delegation?
**Event delegation** is a technique where instead of adding event listeners to individual elements, you add a single event listener to a parent element that handles events for all its child elements. This leverages event bubbling to manage events efficiently.

### Basic Concept

```html
<ul id="todo-list">
  <li data-id="1">Task 1 <button class="delete">Delete</button></li>
  <li data-id="2">Task 2 <button class="delete">Delete</button></li>
  <li data-id="3">Task 3 <button class="delete">Delete</button></li>
</ul>
```

```javascript
// ❌ Without Event Delegation - Adding listener to each button
document.querySelectorAll('.delete').forEach(button => {
  button.addEventListener('click', function() {
    const listItem = this.parentElement;
    const taskId = listItem.dataset.id;
    console.log('Deleting task:', taskId);
    listItem.remove();
  });
});

// ✅ With Event Delegation - Single listener on parent
document.getElementById('todo-list').addEventListener('click', function(e) {
  // Check if the clicked element is a delete button
  if (e.target.classList.contains('delete')) {
    const listItem = e.target.closest('li');
    const taskId = listItem.dataset.id;
    console.log('Deleting task:', taskId);
    listItem.remove();
  }
});
```

### How Event Delegation Works

```javascript
// Event delegation leverages event bubbling
document.getElementById('parent').addEventListener('click', function(e) {
  // e.target is the actual element that was clicked
  // e.currentTarget is the element that has the event listener (parent)
  
  console.log('Target (clicked element):', e.target.tagName);
  console.log('Current target (parent with listener):', e.currentTarget.tagName);
  
  // Handle different types of clicks
  if (e.target.classList.contains('delete')) {
    handleDelete(e.target);
  } else if (e.target.classList.contains('edit')) {
    handleEdit(e.target);
  } else if (e.target.tagName === 'LI') {
    handleTaskClick(e.target);
  }
});

function handleDelete(button) {
  const task = button.closest('li');
  task.remove();
}

function handleEdit(button) {
  const task = button.closest('li');
  const text = task.querySelector('.task-text');
  text.contentEditable = true;
  text.focus();
}

function handleTaskClick(task) {
  task.classList.toggle('completed');
}
```

### Dynamic Content with Event Delegation

```html
<div id="container">
  <button id="add-item">Add Item</button>
  <ul id="dynamic-list"></ul>
</div>
```

```javascript
// Adding items dynamically
document.getElementById('add-item').addEventListener('click', function() {
  const list = document.getElementById('dynamic-list');
  const itemCount = list.children.length + 1;
  
  const li = document.createElement('li');
  li.innerHTML = `
    Item ${itemCount}
    <button class="delete">Delete</button>
    <button class="edit">Edit</button>
  `;
  list.appendChild(li);
});

// Event delegation handles dynamically added elements
document.getElementById('dynamic-list').addEventListener('click', function(e) {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  } else if (e.target.classList.contains('edit')) {
    const li = e.target.parentElement;
    const text = li.firstChild;
    const newText = prompt('Edit item:', text.textContent.trim());
    if (newText !== null) {
      text.textContent = newText;
    }
  }
});

// ✅ This works for both existing and dynamically added items!
```

### Advanced Event Delegation Patterns

```javascript
// Multiple event types with delegation
document.getElementById('container').addEventListener('click', handleClick);
document.getElementById('container').addEventListener('mouseover', handleMouseOver);
document.getElementById('container').addEventListener('mouseout', handleMouseOut);

function handleClick(e) {
  if (e.target.matches('.btn-primary')) {
    handlePrimaryAction(e.target);
  } else if (e.target.matches('.btn-secondary')) {
    handleSecondaryAction(e.target);
  } else if (e.target.matches('[data-action]')) {
    const action = e.target.dataset.action;
    executeAction(action, e.target);
  }
}

function handleMouseOver(e) {
  if (e.target.matches('.hoverable')) {
    e.target.classList.add('hovered');
  }
}

function handleMouseOut(e) {
  if (e.target.matches('.hoverable')) {
    e.target.classList.remove('hovered');
  }
}

// Using data attributes for flexible delegation
function executeAction(action, element) {
  switch (action) {
    case 'delete':
      element.closest('.item').remove();
      break;
    case 'toggle':
      element.closest('.item').classList.toggle('active');
      break;
    case 'copy':
      copyToClipboard(element.dataset.value);
      break;
  }
}
```

### Event Delegation with Form Elements

```html
<form id="dynamic-form">
  <div id="fields-container">
    <div class="field-group">
      <input type="text" name="field1" placeholder="Field 1">
      <button type="button" class="remove-field">Remove</button>
    </div>
  </div>
  <button type="button" id="add-field">Add Field</button>
  <button type="submit">Submit</button>
</form>
```

```javascript
// Add new fields dynamically
document.getElementById('add-field').addEventListener('click', function() {
  const container = document.getElementById('fields-container');
  const fieldCount = container.children.length + 1;
  
  const fieldGroup = document.createElement('div');
  fieldGroup.className = 'field-group';
  fieldGroup.innerHTML = `
    <input type="text" name="field${fieldCount}" placeholder="Field ${fieldCount}">
    <button type="button" class="remove-field">Remove</button>
  `;
  container.appendChild(fieldGroup);
});

// Event delegation for removing fields
document.getElementById('fields-container').addEventListener('click', function(e) {
  if (e.target.classList.contains('remove-field')) {
    e.target.closest('.field-group').remove();
  }
});

// Form submission with delegation
document.getElementById('dynamic-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  const data = {};
  
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }
  
  console.log('Form data:', data);
});
```

### Performance Benefits

```javascript
// ❌ Poor performance - many event listeners
function addListenersToAllButtons() {
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
      console.log('Button clicked:', this.textContent);
    });
  });
}

// ✅ Better performance - single event listener
document.addEventListener('click', function(e) {
  if (e.target.matches('.btn')) {
    console.log('Button clicked:', e.target.textContent);
  }
});

// Performance comparison
console.time('Many Listeners');
for (let i = 0; i < 1000; i++) {
  addListenersToAllButtons();
}
console.timeEnd('Many Listeners'); // Slower and uses more memory
```

### Event Delegation Best Practices

```javascript
// 1. Use specific selectors
document.getElementById('list').addEventListener('click', function(e) {
  // ✅ Good - specific selector
  if (e.target.matches('.delete-btn')) {
    handleDelete(e.target);
  }
  
  // ❌ Avoid - too generic
  // if (e.target.tagName === 'BUTTON') {
  //   handleButtonClick(e.target);
  // }
});

// 2. Check for element existence
document.getElementById('container').addEventListener('click', function(e) {
  if (e.target.closest('.delete-btn')) {
    const deleteBtn = e.target.closest('.delete-btn');
    handleDelete(deleteBtn);
  }
});

// 3. Use data attributes for actions
document.getElementById('container').addEventListener('click', function(e) {
  const action = e.target.dataset.action;
  if (action) {
    switch (action) {
      case 'delete':
        handleDelete(e.target);
        break;
      case 'edit':
        handleEdit(e.target);
        break;
      case 'save':
        handleSave(e.target);
        break;
    }
  }
});

// 4. Prevent unnecessary event propagation
document.getElementById('container').addEventListener('click', function(e) {
  if (e.target.matches('.btn')) {
    e.stopPropagation(); // Prevent event from bubbling further if needed
    handleButtonClick(e.target);
  }
});
```

### Common Use Cases

```javascript
// 1. Dynamic lists and tables
// 2. Modal dialogs
document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) { // Clicked on backdrop
    this.style.display = 'none';
  }
});

// 3. Dropdown menus
document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('dropdown');
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});

// 4. Tab navigation
document.getElementById('tab-container').addEventListener('click', function(e) {
  if (e.target.matches('.tab-button')) {
    const tabId = e.target.dataset.tab;
    showTab(tabId);
  }
});
```

### Benefits of Event Delegation
1. **Performance** - Fewer event listeners, less memory usage
2. **Dynamic Content** - Works with elements added after page load
3. **Maintainability** - Centralized event handling logic
4. **Scalability** - Handles large numbers of elements efficiently
5. **Memory Efficiency** - Single listener instead of many

### When NOT to Use Event Delegation
- When you need to prevent event bubbling
- When event handling logic is very specific to individual elements
- When you need direct access to the element's properties frequently
- For events that don't bubble (like `focus`, `blur`, `load`)

## Pure Function

**Quick Examples:**
```javascript
// Pure function - same input = same output, no side effects
function add(a, b) { return a + b; }

// Impure function - has side effects
let counter = 0;
function increment() { return ++counter; }
```

### What is a Pure Function?
A **pure function** is a function that:
1. **Always returns the same output** for the same input (deterministic)
2. **Has no side effects** - doesn't modify external state or variables
3. **Doesn't depend on external state** - only uses its parameters and local variables

### Characteristics of Pure Functions

```javascript
// ✅ Pure Function Examples

// 1. Mathematical operations
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function square(x) {
  return x * x;
}

// 2. String operations
function greet(name) {
  return `Hello, ${name}!`;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// 3. Array operations (non-mutating)
function addToArray(arr, item) {
  return [...arr, item]; // Returns new array, doesn't modify original
}

function filterEvens(numbers) {
  return numbers.filter(num => num % 2 === 0);
}

// 4. Object operations (non-mutating)
function addProperty(obj, key, value) {
  return { ...obj, [key]: value }; // Returns new object
}

function removeProperty(obj, key) {
  const { [key]: removed, ...rest } = obj;
  return rest;
}

// 5. Complex pure function
function calculateTotal(items, taxRate, discount) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = subtotal * discount;
  const taxedAmount = (subtotal - discountAmount) * taxRate;
  return subtotal - discountAmount + taxedAmount;
}
```

### Benefits of Pure Functions

```javascript
// 1. Predictability
console.log(add(2, 3)); // Always 5
console.log(add(2, 3)); // Always 5 (same input = same output)

// 2. Testability
function testAdd() {
  console.assert(add(2, 3) === 5, 'Should return 5');
  console.assert(add(0, 0) === 0, 'Should return 0');
  console.assert(add(-1, 1) === 0, 'Should return 0');
}

// 3. Caching/Memoization
const cache = {};
function memoizedSquare(x) {
  if (cache[x]) {
    console.log('Returning cached result');
    return cache[x];
  }
  console.log('Computing new result');
  const result = x * x;
  cache[x] = result;
  return result;
}

// 4. Parallel execution (safe to run concurrently)
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(square); // Can run in parallel safely
```

### Common Pure Function Patterns

```javascript
// 1. Data transformation
function transformUser(user) {
  return {
    id: user.id,
    fullName: `${user.firstName} ${user.lastName}`,
    email: user.email.toLowerCase(),
    isActive: user.status === 'active'
  };
}

// 2. Validation functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
}

// 3. Utility functions
function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

function formatDate(date, locale = 'en-US') {
  return new Intl.DateTimeFormat(locale).format(new Date(date));
}

// 4. Filtering and searching
function filterByCategory(items, category) {
  return items.filter(item => item.category === category);
}

function searchItems(items, searchTerm) {
  const term = searchTerm.toLowerCase();
  return items.filter(item => 
    item.name.toLowerCase().includes(term) ||
    item.description.toLowerCase().includes(term)
  );
}

// 5. Sorting
function sortByPrice(items, ascending = true) {
  return [...items].sort((a, b) => 
    ascending ? a.price - b.price : b.price - a.price
  );
}

function sortByName(items) {
  return [...items].sort((a, b) => a.name.localeCompare(b.name));
}
```

### Functional Programming with Pure Functions

```javascript
// Composition of pure functions
const users = [
  { id: 1, name: 'John', age: 25, active: true },
  { id: 2, name: 'Jane', age: 30, active: false },
  { id: 3, name: 'Bob', age: 35, active: true },
  { id: 4, name: 'Alice', age: 28, active: true }
];

// Pure functions for data processing
function filterActive(users) {
  return users.filter(user => user.active);
}

function filterOver25(users) {
  return users.filter(user => user.age > 25);
}

function getName(user) {
  return user.name;
}

function sortNames(names) {
  return [...names].sort();
}

// Compose functions
function getActiveUsersOver25Names(users) {
  return sortNames(
    filterOver25(filterActive(users)).map(getName)
  );
}

console.log(getActiveUsersOver25Names(users)); // ['Alice', 'Bob']

// Using pipe/compose utilities
function pipe(...functions) {
  return function(value) {
    return functions.reduce((acc, fn) => fn(acc), value);
  };
}

const processUsers = pipe(
  filterActive,
  filterOver25,
  users => users.map(getName),
  sortNames
);

console.log(processUsers(users)); // ['Alice', 'Bob']
```

### Recursive Pure Functions

```javascript
// Pure recursive functions
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

function sumArray(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArray(arr.slice(1));
}

function flattenArray(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
  }, []);
}

console.log(factorial(5)); // 120
console.log(fibonacci(10)); // 55
console.log(sumArray([1, 2, 3, 4])); // 10
console.log(flattenArray([1, [2, 3], [4, [5, 6]]])); // [1, 2, 3, 4, 5, 6]
```

### Testing Pure Functions

```javascript
// Easy to test because they're predictable
function runTests() {
  // Test add function
  console.assert(add(2, 3) === 5, 'Add function test failed');
  console.assert(add(-1, 1) === 0, 'Add with negatives test failed');
  
  // Test multiply function
  console.assert(multiply(3, 4) === 12, 'Multiply function test failed');
  console.assert(multiply(0, 100) === 0, 'Multiply by zero test failed');
  
  // Test string functions
  console.assert(greet('John') === 'Hello, John!', 'Greet function test failed');
  console.assert(capitalize('hello') === 'Hello', 'Capitalize function test failed');
  
  // Test array functions
  const originalArray = [1, 2, 3];
  const newArray = addToArray(originalArray, 4);
  console.assert(newArray.length === 4, 'Add to array test failed');
  console.assert(originalArray.length === 3, 'Original array should not be modified');
  
  console.log('All tests passed!');
}

runTests();
```

### Key Benefits Summary
1. **Predictable** - Same input always produces same output
2. **Testable** - Easy to write unit tests
3. **Cacheable** - Results can be memoized
4. **Parallelizable** - Safe to run concurrently
5. **Debuggable** - No hidden dependencies or side effects
6. **Reusable** - Can be used in different contexts
7. **Composable** - Can be combined to create complex operations

## ImPure Function

**Quick Examples:**
```javascript
// Impure - modifies external state
let count = 0;
function increment() { count++; return count; }

// Impure - depends on external state
function getTax(amount) { return amount * globalTaxRate; }

// Impure - has side effects
function logAndReturn(x) { console.log(x); return x; }
```

### What is an Impure Function?
An **impure function** is a function that:
1. **Has side effects** - modifies external state, variables, or performs I/O operations
2. **Depends on external state** - relies on variables outside its scope
3. **May produce different outputs** for the same input (non-deterministic)

### Types of Impure Functions

```javascript
// ❌ Impure Function Examples

// 1. Functions with side effects - modifying external variables
let counter = 0;

function incrementCounter() {
  counter++; // Modifies external state
  return counter;
}

console.log(incrementCounter()); // 1
console.log(incrementCounter()); // 2 (different output for same input)

// 2. Functions that depend on external state
let taxRate = 0.1;

function calculateTax(amount) {
  return amount * taxRate; // Depends on external variable
}

console.log(calculateTax(100)); // 10
taxRate = 0.2;
console.log(calculateTax(100)); // 20 (same input, different output)

// 3. Functions that perform I/O operations
function getCurrentTime() {
  return new Date(); // Different output each time called
}

function readUserInput() {
  return prompt('Enter your name:'); // I/O operation
}

function logMessage(message) {
  console.log(message); // Side effect - writing to console
}

// 4. Functions that modify arrays/objects
const users = [];

function addUser(user) {
  users.push(user); // Modifies external array
  return users.length;
}

function updateUser(id, updates) {
  const user = users.find(u => u.id === id);
  if (user) {
    Object.assign(user, updates); // Modifies external object
  }
  return user;
}

// 5. Functions with random behavior
function getRandomNumber() {
  return Math.random(); // Non-deterministic
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5); // Non-deterministic
}
```

### Common Impure Function Patterns

```javascript
// 1. DOM manipulation functions
function updateElementText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text; // Side effect - DOM modification
  }
}

function addClickHandler(element, handler) {
  element.addEventListener('click', handler); // Side effect - event listener
}

// 2. API calls and network operations
async function fetchUserData(userId) {
  const response = await fetch(`/api/users/${userId}`); // I/O operation
  return response.json();
}

function saveUserData(userData) {
  localStorage.setItem('user', JSON.stringify(userData)); // Side effect - storage
}

// 3. Database operations
function createUser(userData) {
  // Simulated database operation
  const user = { id: Date.now(), ...userData };
  database.users.push(user); // Side effect - database modification
  return user;
}

function deleteUser(userId) {
  const index = database.users.findIndex(u => u.id === userId);
  if (index !== -1) {
    database.users.splice(index, 1); // Side effect - database modification
    return true;
  }
  return false;
}

// 4. File system operations
function writeToFile(filename, content) {
  // Simulated file write
  console.log(`Writing to ${filename}: ${content}`); // Side effect
}

function readConfigFile() {
  // Simulated file read
  return { theme: 'dark', language: 'en' }; // I/O operation
}
```

### Why Impure Functions Are Sometimes Necessary

```javascript
// Some operations inherently require side effects

// 1. User interface updates
class TodoApp {
  constructor() {
    this.todos = [];
    this.element = document.getElementById('todo-list');
  }

  addTodo(text) {
    const todo = { id: Date.now(), text, completed: false };
    this.todos.push(todo); // Side effect - modifying state
    this.render(); // Side effect - DOM update
    return todo;
  }

  render() {
    this.element.innerHTML = this.todos
      .map(todo => `<li>${todo.text}</li>`)
      .join(''); // Side effect - DOM manipulation
  }

  toggleTodo(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed; // Side effect - modifying state
      this.render(); // Side effect - DOM update
    }
  }
}

// 2. Event handling
function handleFormSubmit(event) {
  event.preventDefault(); // Side effect - preventing default behavior
  
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  
  console.log('Form submitted:', data); // Side effect - logging
  validateAndSubmit(data); // Side effect - API call
}

// 3. State management
class StateManager {
  constructor() {
    this.state = {};
    this.listeners = [];
  }

  setState(newState) {
    this.state = { ...this.state, ...newState }; // Side effect - state change
    this.notifyListeners(); // Side effect - notifying listeners
  }

  subscribe(listener) {
    this.listeners.push(listener); // Side effect - adding listener
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1); // Side effect - removing listener
      }
    };
  }

  notifyListeners() {
    this.listeners.forEach(listener => listener(this.state)); // Side effect - calling listeners
  }
}
```

### Making Impure Functions More Manageable

```javascript
// 1. Isolate side effects
function processUserData(userData) {
  // Pure transformation
  const processedData = {
    ...userData,
    email: userData.email.toLowerCase(),
    fullName: `${userData.firstName} ${userData.lastName}`,
    processedAt: new Date().toISOString()
  };
  
  // Isolated side effect
  saveUserData(processedData);
  
  return processedData;
}

// 2. Use dependency injection
function createUserService(storage, api) {
  return {
    async saveUser(user) {
      // Side effects are injected dependencies
      await api.post('/users', user);
      storage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
  };
}

// 3. Separate pure and impure logic
function validateUser(user) {
  // Pure function - validation logic
  const errors = [];
  if (!user.email) errors.push('Email is required');
  if (!user.name) errors.push('Name is required');
  return { isValid: errors.length === 0, errors };
}

function handleUserSubmission(user) {
  // Impure function - handles side effects
  const validation = validateUser(user); // Pure function call
  
  if (!validation.isValid) {
    displayErrors(validation.errors); // Side effect
    return false;
  }
  
  saveUser(user); // Side effect
  showSuccessMessage(); // Side effect
  return true;
}
```

### Testing Impure Functions

```javascript
// Testing impure functions requires different strategies

// 1. Mock external dependencies
function createMockStorage() {
  let storage = {};
  return {
    getItem: (key) => storage[key],
    setItem: (key, value) => { storage[key] = value; },
    clear: () => { storage = {}; }
  };
}

function testUserService() {
  const mockStorage = createMockStorage();
  const mockApi = {
    post: jest.fn().mockResolvedValue({ success: true })
  };
  
  const userService = createUserService(mockStorage, mockApi);
  
  // Test the side effects
  userService.saveUser({ name: 'John', email: 'john@example.com' });
  
  expect(mockApi.post).toHaveBeenCalledWith('/users', { name: 'John', email: 'john@example.com' });
  expect(mockStorage.getItem('currentUser')).toBe('{"name":"John","email":"john@example.com"}');
}

// 2. Use spies for side effects
function testLoggingFunction() {
  const consoleSpy = jest.spyOn(console, 'log');
  
  logMessage('Test message');
  
  expect(consoleSpy).toHaveBeenCalledWith('Test message');
  
  consoleSpy.mockRestore();
}

// 3. Test state changes
function testStateManager() {
  const stateManager = new StateManager();
  const listener = jest.fn();
  
  stateManager.subscribe(listener);
  stateManager.setState({ count: 5 });
  
  expect(listener).toHaveBeenCalledWith({ count: 5 });
  expect(stateManager.state).toEqual({ count: 5 });
}
```

### When to Use Impure Functions

```javascript
// ✅ Appropriate use cases for impure functions:

// 1. User interface updates
function updateUI(data) {
  document.getElementById('status').textContent = data.status;
  document.getElementById('count').textContent = data.count;
}

// 2. API calls and data fetching
async function loadUserData(userId) {
  const response = await fetch(`/api/users/${userId}`);
  return response.json();
}

// 3. Event handling
function handleButtonClick(event) {
  event.preventDefault();
  performAction();
}

// 4. Logging and debugging
function debugLog(message, data) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[DEBUG] ${message}:`, data);
  }
}

// 5. File operations
function saveConfig(config) {
  localStorage.setItem('app-config', JSON.stringify(config));
}
```

### Best Practices for Impure Functions

```javascript
// 1. Minimize side effects
// ❌ Bad - many side effects
function processOrder(order) {
  console.log('Processing order:', order);
  validateOrder(order);
  calculateTotal(order);
  updateInventory(order);
  sendConfirmationEmail(order);
  updateDatabase(order);
  return order;
}

// ✅ Better - separate concerns
function processOrder(order) {
  const validatedOrder = validateOrder(order);
  const orderWithTotal = calculateTotal(validatedOrder);
  const processedOrder = updateInventory(orderWithTotal);
  
  // Handle side effects separately
  sendConfirmationEmail(processedOrder);
  updateDatabase(processedOrder);
  
  return processedOrder;
}

// 2. Make side effects explicit
function createUserWithSideEffects(userData) {
  const user = createUser(userData); // Pure function
  logUserCreation(user); // Side effect - logging
  notifyAdmin(user); // Side effect - notification
  return user;
}

// 3. Use dependency injection
function createUserService(dependencies) {
  const { logger, emailService, database } = dependencies;
  
  return {
    async createUser(userData) {
      const user = { id: Date.now(), ...userData };
      await database.save(user);
      logger.info('User created', user);
      await emailService.sendWelcomeEmail(user);
      return user;
    }
  };
}
```

### Key Takeaways
- **Impure functions are necessary** for real-world applications
- **Minimize side effects** and isolate them when possible
- **Separate pure logic from side effects** for better testability
- **Make dependencies explicit** through dependency injection
- **Test side effects** using mocks and spies
- **Use pure functions** where possible, impure functions when necessary

## Weakmap and WeakSet

**Quick Examples:**
```javascript
// WeakMap - object keys only, no iteration
const weakMap = new WeakMap();
const obj = { id: 1 };
weakMap.set(obj, 'value');
weakMap.get(obj); // 'value'

// WeakSet - object values only, no iteration
const weakSet = new WeakSet();
weakSet.add(obj);
weakSet.has(obj); // true
```

### What are WeakMap and WeakSet?
**WeakMap** and **WeakSet** are collections introduced in ES6 that hold "weak" references to objects. They allow garbage collection of their entries when the objects are no longer referenced elsewhere.

### Key Characteristics
1. **Weak References** - Don't prevent garbage collection of their keys/values
2. **Non-iterable** - Cannot be enumerated or have their size determined
3. **Object keys only** - WeakMap keys and WeakSet values must be objects
4. **Automatic cleanup** - Entries are automatically removed when objects are garbage collected

### WeakMap

```javascript
// Creating a WeakMap
const weakMap = new WeakMap();

// WeakMap operations
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const obj3 = { id: 3 };

// Setting values
weakMap.set(obj1, 'value1');
weakMap.set(obj2, 'value2');
weakMap.set(obj3, 'value3');

// Getting values
console.log(weakMap.get(obj1)); // 'value1'
console.log(weakMap.get(obj2)); // 'value2'

// Checking if key exists
console.log(weakMap.has(obj1)); // true
console.log(weakMap.has(obj2)); // true

// Deleting entries
weakMap.delete(obj2);
console.log(weakMap.has(obj2)); // false

// WeakMap cannot be iterated or have size determined
// console.log(weakMap.size); // undefined
// for (let key of weakMap) { } // TypeError: weakMap is not iterable
```

### WeakSet

```javascript
// Creating a WeakSet
const weakSet = new WeakSet();

// WeakSet operations
const obj1 = { name: 'John' };
const obj2 = { name: 'Jane' };
const obj3 = { name: 'Bob' };

// Adding objects
weakSet.add(obj1);
weakSet.add(obj2);
weakSet.add(obj3);

// Checking if object exists
console.log(weakSet.has(obj1)); // true
console.log(weakSet.has(obj2)); // true

// Deleting objects
weakSet.delete(obj2);
console.log(weakSet.has(obj2)); // false

// WeakSet cannot be iterated or have size determined
// console.log(weakSet.size); // undefined
// for (let value of weakSet) { } // TypeError: weakSet is not iterable
```

### Practical Examples

```javascript
// 1. Private data storage
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    
    // Store private data in WeakMap
    if (!User.privateData) {
      User.privateData = new WeakMap();
    }
    
    // Add private data
    User.privateData.set(this, {
      password: this.generatePassword(),
      lastLogin: null,
      loginAttempts: 0
    });
  }
  
  generatePassword() {
    return Math.random().toString(36).substring(2);
  }
  
  setPassword(newPassword) {
    const privateData = User.privateData.get(this);
    if (privateData) {
      privateData.password = newPassword;
    }
  }
  
  getLastLogin() {
    const privateData = User.privateData.get(this);
    return privateData ? privateData.lastLogin : null;
  }
  
  login() {
    const privateData = User.privateData.get(this);
    if (privateData) {
      privateData.lastLogin = new Date();
      privateData.loginAttempts = 0;
    }
  }
  
  incrementLoginAttempts() {
    const privateData = User.privateData.get(this);
    if (privateData) {
      privateData.loginAttempts++;
    }
  }
}

// Usage
const user1 = new User('John', 'john@example.com');
const user2 = new User('Jane', 'jane@example.com');

user1.login();
console.log(user1.getLastLogin()); // Current date

// Private data is not accessible from outside
console.log(user1.password); // undefined
console.log(User.privateData.get(user1).password); // Accessible but encapsulated
```

### DOM Element Tracking

```javascript
// 2. Tracking DOM elements without memory leaks
const domElements = new WeakMap();
const elementMetadata = new WeakSet();

// Function to track DOM elements
function trackElement(element, data) {
  domElements.set(element, {
    created: new Date(),
    data: data,
    clickCount: 0
  });
  elementMetadata.add(element);
}

// Function to handle element clicks
function handleElementClick(event) {
  const element = event.target;
  
  if (elementMetadata.has(element)) {
    const metadata = domElements.get(element);
    metadata.clickCount++;
    console.log(`Element clicked ${metadata.clickCount} times`);
  }
}

// Function to get element metadata
function getElementInfo(element) {
  if (elementMetadata.has(element)) {
    return domElements.get(element);
  }
  return null;
}

// Usage
const button = document.getElementById('myButton');
const div = document.getElementById('myDiv');

trackElement(button, { type: 'button', importance: 'high' });
trackElement(div, { type: 'container', importance: 'medium' });

button.addEventListener('click', handleElementClick);
div.addEventListener('click', handleElementClick);

// When elements are removed from DOM, they can be garbage collected
// and their metadata will be automatically cleaned up
```

### Cache Implementation

```javascript
// 3. Caching expensive computations
class ExpensiveComputationCache {
  constructor() {
    this.cache = new WeakMap();
  }
  
  compute(obj) {
    // Check if result is already cached
    if (this.cache.has(obj)) {
      console.log('Returning cached result');
      return this.cache.get(obj);
    }
    
    // Perform expensive computation
    console.log('Performing expensive computation...');
    const result = this.performExpensiveOperation(obj);
    
    // Cache the result
    this.cache.set(obj, result);
    return result;
  }
  
  performExpensiveOperation(obj) {
    // Simulate expensive operation
    let result = 0;
    for (let key in obj) {
      result += obj[key].toString().length;
    }
    return result;
  }
}

// Usage
const cache = new ExpensiveComputationCache();
const data1 = { a: 'hello', b: 'world' };
const data2 = { x: 'test', y: 'data' };

console.log(cache.compute(data1)); // Performs computation
console.log(cache.compute(data1)); // Returns cached result
console.log(cache.compute(data2)); // Performs computation for different object
```

### Event Listener Management

```javascript
// 4. Managing event listeners without memory leaks
class EventManager {
  constructor() {
    this.listeners = new WeakMap();
    this.elementMetadata = new WeakSet();
  }
  
  addListener(element, eventType, handler) {
    if (!this.listeners.has(element)) {
      this.listeners.set(element, new Map());
      this.elementMetadata.add(element);
    }
    
    const elementListeners = this.listeners.get(element);
    if (!elementListeners.has(eventType)) {
      elementListeners.set(eventType, new Set());
    }
    
    elementListeners.get(eventType).add(handler);
    element.addEventListener(eventType, handler);
  }
  
  removeListener(element, eventType, handler) {
    if (this.listeners.has(element)) {
      const elementListeners = this.listeners.get(element);
      if (elementListeners.has(eventType)) {
        elementListeners.get(eventType).delete(handler);
        element.removeEventListener(eventType, handler);
        
        // Clean up empty sets
        if (elementListeners.get(eventType).size === 0) {
          elementListeners.delete(eventType);
        }
      }
    }
  }
  
  removeAllListeners(element) {
    if (this.listeners.has(element)) {
      const elementListeners = this.listeners.get(element);
      for (let [eventType, handlers] of elementListeners) {
        for (let handler of handlers) {
          element.removeEventListener(eventType, handler);
        }
      }
      this.listeners.delete(element);
      this.elementMetadata.delete(element);
    }
  }
}

// Usage
const eventManager = new EventManager();
const button = document.getElementById('button');

function handleClick() {
  console.log('Button clicked!');
}

function handleMouseOver() {
  console.log('Mouse over button!');
}

eventManager.addListener(button, 'click', handleClick);
eventManager.addListener(button, 'mouseover', handleMouseOver);

// When button is removed from DOM, all references are cleaned up automatically
```

### Comparison with Map and Set

```javascript
// Map vs WeakMap
const map = new Map();
const weakMap = new WeakMap();

let obj = { data: 'test' };

map.set(obj, 'value');
weakMap.set(obj, 'value');

console.log(map.size); // 1
// console.log(weakMap.size); // undefined

// Remove reference to object
obj = null;

// Map still holds reference, preventing garbage collection
console.log(map.size); // Still 1

// WeakMap allows garbage collection
// The entry will be automatically removed when obj is garbage collected

// Set vs WeakSet
const set = new Set();
const weakSet = new WeakSet();

let obj1 = { name: 'test1' };
let obj2 = { name: 'test2' };

set.add(obj1);
weakSet.add(obj2);

console.log(set.size); // 1
// console.log(weakSet.size); // undefined

// Remove references
obj1 = null;
obj2 = null;

// Set still holds reference
console.log(set.size); // Still 1

// WeakSet allows garbage collection
```

### Use Cases and Best Practices

```javascript
// ✅ Good use cases for WeakMap/WeakSet:

// 1. Private object data
class Component {
  constructor() {
    if (!Component.privateData) {
      Component.privateData = new WeakMap();
    }
    Component.privateData.set(this, {
      internalState: {},
      cache: new Map()
    });
  }
  
  getPrivateData() {
    return Component.privateData.get(this);
  }
}

// 2. DOM element metadata
const elementData = new WeakMap();

function attachMetadata(element, data) {
  elementData.set(element, data);
}

// 3. Object association without preventing GC
const objectRegistry = new WeakMap();

function registerObject(obj, metadata) {
  objectRegistry.set(obj, metadata);
}

// ❌ Avoid these patterns:

// 1. Don't use primitive keys (WeakMap only accepts objects)
// weakMap.set('string', 'value'); // TypeError

// 2. Don't rely on iteration (not supported)
// for (let key of weakMap) { } // TypeError

// 3. Don't use when you need to enumerate all entries
// Use Map/Set instead if you need to iterate
```

### Memory Management Benefits

```javascript
// Demonstration of automatic cleanup
function demonstrateMemoryCleanup() {
  const weakMap = new WeakMap();
  const map = new Map();
  
  // Create objects
  let obj1 = { id: 1 };
  let obj2 = { id: 2 };
  
  // Add to both collections
  weakMap.set(obj1, 'weak reference');
  map.set(obj2, 'strong reference');
  
  console.log('Before null assignment:');
  console.log('WeakMap has obj1:', weakMap.has(obj1)); // true
  console.log('Map has obj2:', map.has(obj2)); // true
  
  // Remove references
  obj1 = null;
  obj2 = null;
  
  // Force garbage collection (in Node.js)
  if (global.gc) {
    global.gc();
  }
  
  console.log('After null assignment and GC:');
  // WeakMap entry should be cleaned up automatically
  // Map entry will still exist (preventing GC of obj2)
}

// Run with: node --expose-gc script.js
```

### Key Takeaways
1. **WeakMap/WeakSet don't prevent garbage collection** of their keys/values
2. **Use for private data** without memory leaks
3. **Perfect for DOM element tracking** and cleanup
4. **Cannot iterate or get size** - designed for automatic cleanup
5. **Only accept objects** as keys/values
6. **Memory efficient** - entries are automatically removed when objects are no longer referenced
7. **Great for caching and metadata** associated with objects that have their own lifecycle

## Currying

**Quick Examples:**
```javascript
// Regular function
function add(a, b, c) { return a + b + c; }

// Curried function
const addCurried = a => b => c => a + b + c;

// Usage
addCurried(1)(2)(3); // 6
const add5 = addCurried(5);
add5(2)(3); // 10
```

### What is Currying?
**Currying** is a functional programming technique where a function that takes multiple arguments is transformed into a sequence of functions, each taking a single argument. The curried function returns a new function that expects the next argument until all arguments are provided.

### Basic Currying Concept

```javascript
// Regular function (non-curried)
function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3)); // 6

// Curried version
function addCurried(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(addCurried(1)(2)(3)); // 6

// Arrow function currying
const addCurriedArrow = a => b => c => a + b + c;
console.log(addCurriedArrow(1)(2)(3)); // 6

// Partial application
const addOne = addCurriedArrow(1);
const addOneAndTwo = addOne(2);
console.log(addOneAndTwo(3)); // 6
```

### Manual Currying Examples

```javascript
// 1. Simple math operations
function multiply(a) {
  return function(b) {
    return a * b;
  };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12

// 2. String operations
function greet(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = greet('Hello');
const sayGoodbye = greet('Goodbye');

console.log(sayHello('John')); // "Hello, John!"
console.log(sayGoodbye('Jane')); // "Goodbye, Jane!"

// 3. Array operations
function filterBy(property) {
  return function(value) {
    return function(array) {
      return array.filter(item => item[property] === value);
    };
  };
}

const filterByStatus = filterBy('status');
const filterByActive = filterByStatus('active');

const users = [
  { name: 'John', status: 'active' },
  { name: 'Jane', status: 'inactive' },
  { name: 'Bob', status: 'active' }
];

console.log(filterByActive(users)); // [{ name: 'John', status: 'active' }, { name: 'Bob', status: 'active' }]
```

### Generic Currying Function

```javascript
// Utility function to curry any function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...nextArgs) {
        return curried(...args, ...nextArgs);
      };
    }
  };
}

// Using the curry utility
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6

// Partial application examples
const curriedMultiply = curry((a, b, c, d) => a * b * c * d);
const double = curriedMultiply(2);
const doubleAndTriple = double(3);
console.log(doubleAndTriple(4)(5)); // 120
```

### Practical Use Cases

```javascript
// 1. API request builders
function createApiClient(baseURL) {
  return function(endpoint) {
    return function(method) {
      return function(data) {
        return fetch(`${baseURL}${endpoint}`, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: data ? JSON.stringify(data) : undefined
        });
      };
    };
  };
}

const apiClient = createApiClient('https://api.example.com');
const usersEndpoint = apiClient('/users');
const postUser = usersEndpoint('POST');

// Usage: postUser({ name: 'John' }).then(response => response.json());

// 2. Configuration management
function createConfig(environment) {
  return function(app) {
    return function(version) {
      return {
        apiUrl: `https://${environment}.api.example.com`,
        appName: app,
        version: version,
        debug: environment === 'development'
      };
    };
  };
}

const devConfig = createConfig('development');
const myAppConfig = devConfig('MyApp');

console.log(myAppConfig('1.0.0'));
// { apiUrl: 'https://development.api.example.com', appName: 'MyApp', version: '1.0.0', debug: true }
```

### Benefits of Currying

```javascript
// 1. Code Reusability
function createLogger(level) {
  return function(context) {
    return function(message) {
      console.log(`[${level}] ${context}: ${message}`);
    };
  };
}

const errorLogger = createLogger('ERROR');
const authErrorLogger = errorLogger('AUTH');

authErrorLogger('Invalid credentials'); // [ERROR] AUTH: Invalid credentials

// 2. Function Composition
const add = a => b => a + b;
const multiply = a => b => a * b;

const addOne = add(1);
const multiplyByTwo = multiply(2);

const addOneAndDouble = x => multiplyByTwo(addOne(x));
console.log(addOneAndDouble(5)); // 12

// 3. Partial Application
const filterByStatus = filterBy('status');
const activeUsers = filterByStatus('active');
```

### When to Use Currying

```javascript
// ✅ Good use cases for currying:

// 1. When you need partial application
const filterByStatus = filterBy('status');
const activeUsers = filterByStatus('active');

// 2. For function composition
const processData = pipe(
  filterActive,
  mapUserNames,
  sortAlphabetically
);

// 3. For creating specialized functions
const createRequest = method => url => data => fetch(url, { method, body: data });
const postRequest = createRequest('POST');

// ❌ Avoid currying when:
// 1. It makes code less readable
// 2. Performance is critical (extra function calls)
// 3. You need to pass multiple arguments frequently
```

### Key Takeaways
1. **Currying transforms multi-argument functions** into single-argument functions
2. **Enables partial application** - fix some arguments to create specialized functions
3. **Facilitates function composition** and functional programming patterns
4. **Improves code reusability** by creating more flexible functions
5. **Use for configuration, validation, and API building** scenarios
6. **Don't overuse** - can make code harder to read if overdone
7. **Great for functional programming** and creating reusable, composable code

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

## Major ES6 Features

Destructuring Assignment

```javascript
const [a, b] = [1, 2];
const {name, age} = {name: "John", age: 25};

```

Arrow Functions

## What is Callback hell in JavaScript?

Callback Hell in **JavaScript** refers to a situation where multiple asynchronous operations are nested inside each other using **callbacks**

```javascript
getUser(function(user) {
    getOrders(user.id, function(orders) {
        getOrderDetails(orders[0].id, function(details) {
            processPayment(details, function(result) {
                console.log("Payment processed:", result);
            });
        });
    });
});

```

Solutions to Callback Hell:

```javascript
getUser()
  .then(user => getOrders(user.id))
  .then(orders => getOrderDetails(orders[0].id))
  .then(details => processPayment(details))
  .then(result => console.log("Payment processed:", result))
  .catch(err => console.error(err));

```
