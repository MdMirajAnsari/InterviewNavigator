## 1. How does React manage the Virtual DOM, and what are the benefits?

Virtual DOM Creation:React creates a virtual representation of the UI as a tree of JavaScript objects, mirroring the structure of the real DOM.
Each UI component in React corresponds to a node in the Virtual DOM, storing properties like element type, props, and children.

State or Prop Changes:When a component's state or props change, React generates a new Virtual DOM tree reflecting the updated UI.

Diffing Algorithm:React compares the new Virtual DOM tree with the previous one using a process called "reconciliation."
The diffing algorithm identifies changes (e.g., updated props, added/removed elements) efficiently by:Comparing trees at the same level (not deep comparisons across levels).
Using keys to optimize list updates.
Assuming different component types produce different subtrees, avoiding unnecessary comparisons.

Minimal Updates to Real DOM:React calculates the minimal set of changes needed to update the real DOM.
These changes are batched and applied in a single operation to reduce costly DOM manipulations.

Rendering:React updates only the changed parts of the real DOM, ensuring efficient rendering.

## 2. Explain the use case of `useEffect()` for fetching data from an API.

The useEffect hook in React is used to handle side effects, such as fetching data from an API, in functional components. It allows you to perform operations like data fetching after a component renders, ensuring the UI remains responsive and updates correctly when data is received.Use Case: Fetching Data from an API with useEffectPurpose: Fetch data from an API when a component mounts or when specific dependencies change, and update the component's state with the fetched data.How it Works:useEffect runs after the component renders, making it ideal for asynchronous operations like API calls.
It accepts a callback function (the effect) and an optional dependency array to control when the effect runs.
You can use it to fetch data, update state, and handle cleanup (e.g., aborting requests).

## 3. Explain the concept of controlled and uncontrolled components in React.

In React, controlled and uncontrolled components refer to how form inputs (like `<input>`, `<textarea>`, or `<select>`) are managed in terms of their value and state. The distinction lies in whether React's state is the single source of truth for the input's value (controlled) or if the DOM itself manages the input's value (uncontrolled).
**Controlled Components**
Definition: A controlled component is a form input where the value is controlled by React state. The input's value is set by a state variable, and any changes to the input are handled by updating that state via an event handler (e.g., onChange).
How It Works:The input’s value prop is tied to a state variable.
An onChange handler updates the state whenever the user interacts with the input.
React re-renders the component with the updated state, keeping the input’s value in sync.

Key Characteristics:
The state is the single source of truth.
You have full control over the input’s value and can manipulate it programmatically.
Useful for validating input, formatting data, or conditionally rendering based on input values.

**Uncontrolled Components**
Definition: An uncontrolled component is a form input where the value is managed by the DOM itself, not React state. You access the input’s value using a ref or directly from the DOM when needed (e.g., on form submission).
How It Works:The input’s value prop is not set by React state.
A ref (created with useRef) is used to access the input’s DOM node and retrieve its value.
React does not control the input’s value during user interactions; the DOM handles it.

Key Characteristics:
The DOM is the source of truth for the input’s value.
Less React involvement, as state updates aren’t required for every change.
Useful for simple forms or when integrating with non-React libraries.

## 4. What are higher-order components (HOCs) in React, and how are they used?

A Higher-Order Component (HOC) in React is a design pattern used to reuse component logic. It is a function that takes a component as an argument and returns a new component with enhanced functionality. HOCs are a way to share behavior or logic across multiple components without duplicating code, leveraging React’s compositional nature.
Definition: An HOC is a function that wraps a component to add additional props, state, or behavior, returning a new component.
Key Characteristics:
HOCs are not part of React’s API but are a pattern that emerges from React’s functional composition.
They are pure functions with no side effects, taking a component and returning a new one.
They are commonly used for cross-cutting concerns like authentication, logging, or data fetching.

## JSX

JSX code here which is basically HTML code inside of JavaScript. Indeed, JSX stands for JavaScript XML because HTML in the end is XML, you could say. So, we got this HTML code in JavaScript.

## HOOKS

## USESTATE

managing state

## USEEFFECT

`useEffect` is a React Hook that allows functional components to perform side effects. Side effects are operations that interact with the "outside world" beyond the component's rendering, such as:

* **Data fetching:** Making API calls to retrieve data.
* **DOM manipulation:** Directly interacting with the browser's Document Object Model (e.g., changing the document title, adding event listeners).
* **Subscriptions:** Setting up and cleaning up subscriptions to external services.
* **Timers:** Using `setTimeout` or `setInterval`.

`useEffect` takes two arguments:

* **A setup function (the "effect"):**

  This function contains the code for your side effect. It runs after every render by default.
* **An optional dependency array:**

  This array specifies the values that the effect depends on. If any value in the dependency array changes between renders, the effect will re-run.

## USEREF

`useRef` is a React Hook that provides a way to persist mutable values across component re-renders without causing a re-render of the component itself. It returns a mutable object with a single property called `current`, which holds the referenced value.

* **Accessing and Interacting with DOM Elements:**

  * `useRef` is commonly used to get a direct reference to a DOM element rendered by React.
  * You can attach the ref object to an HTML element in your JSX using the `ref` attribute, e.g., `<input ref={inputRef} />`.
  * This allows you to perform direct DOM manipulations, such as focusing an input, triggering animations, or measuring element dimensions, outside of React's typical declarative approach.

## USEREDUCER

`useReducer` is a React Hook for managing complex state logic in functional components. It is an alternative to `useState` and is useful when state transitions depend on previous state or when multiple state variables are updated together.

**How it works:**

- You define a reducer function that takes the current state and an action, and returns the new state.
- You call `useReducer(reducer, initialState)` to get the current state and a dispatch function.
- Dispatching actions triggers the reducer to update the state.

**Example:**

```javascript
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}
```

## USEMEMO

`useMemo` is a React Hook that memoizes the result of a calculation between renders. It helps optimize performance by preventing expensive computations from running on every render unless their dependencies change.

**How it works:**

- You pass a function and a dependency array to `useMemo`.
- The function is only re-executed when one of the dependencies changes.
- Useful for optimizing rendering of components with heavy calculations or derived data.

**Example:**

```javascript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(input);
}, [input]);
```

USELOCATION

USECALLBACK

USECONTEXT

USEIMPERATIVEHANDLE

USECONTEXT

CUSTOM HOOKS

## CONTEXT API

## **What is React Router?**

### ****What is prop drilling and its disadvantages?****

## What is Reonciliation in React?

Reconciliation in React is the process by which React efficiently updates the actual DOM (Document Object Model) to reflect changes in a component's state or props. It's a key mechanism for optimizing UI updates and ensuring a smooth user experience.** **

## Explain Strict Mode in React.

## What are error boundaries?

In React, an **Error Boundary** is a special component that **catches JavaScript errors** anywhere in its child component tree, logs them, and displays a fallback UI instead of breaking the entire React app.

# How do you handle side effects in React components?

## What are the lifecycle methods of React?

## How to pass data between sibling components using React router?

What is the difference between state and props in React?

### What is the difference between `useEffect` and `useLayoutEffect` in React?

### What is `forwardRef()` in React used for?

### Explain what React hydration is

### What are React Portals used for?

### How do you localize React applications?

### What is code splitting in a React application?

### What is the Flux pattern and what are its benefits?

### What is React Fiber and how is it an improvement over the previous approach?

### What are forms in React?

## How would you lift the state up in a React application, and why is it necessary?

## What are Pure Components?

## What is the role of PropTypes in React?

## What is the difference between `createElement` and `cloneElement`?

## What are stateless components?

Stateless components in React are components that do not manage or hold their own state. They receive data and behavior exclusively through props and render UI based on those props. Typically, stateless components are implemented as functions (function components).

**Example:**

```javascript
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

Stateless components are simple, reusable, and easier to test since their output depends only on the input props.

## What are stateful components?

Stateful components in React are components that manage their own internal state using the `useState` hook (in function components) or `this.state` (in class components). They can update their state in response to user interactions, API calls, or other events, and re-render when the state changes.

**Example (Function Component):**

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Stateful components are useful when you need to track and update data that affects the component's rendering.

## Explain higher-order components (HOCs).

A higher-order component (HOC) is a function in React that takes a component and returns a new component with enhanced or additional functionality. HOCs are used to reuse logic across multiple components, such as handling authentication, data fetching, or logging.

**Key points:**

- HOCs do not modify the original component; they wrap it and add new props, state, or behavior.
- HOCs are a pattern, not a part of the React API.

**Example:**

```javascript
function withLogger(WrappedComponent) {
  return function(props) {
    console.log('Props:', props);
    return <WrappedComponent {...props} />;
  };
}
```

You can use HOCs to share code between components without repeating logic.

## What are some common performance optimization techniques in React?

- **Memoization:** Use `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders and recomputations.
- **Code Splitting:** Load components or routes only when needed using React.lazy and Suspense.
- **Virtualization:** Render only visible items in large lists using libraries like `react-window` or `react-virtualized`.
- **Avoid Inline Functions/Objects:** Define handlers and objects outside render to prevent new references on each render.
- **Efficient State Management:** Lift state only when necessary and avoid deeply nested state.
- **Key Prop in Lists:** Use stable and unique keys for list items to help React efficiently update lists.
- **Use Pure Components:** Prefer functional components and `React.PureComponent` to avoid unnecessary renders.
- **Throttling and Debouncing:** Limit the frequency of expensive operations (e.g., scroll, resize handlers).
- **Lazy Loading Images:** Load images only when they enter the viewport.

Applying these techniques helps keep React applications fast and responsive.

## What is Static site generation (SSG)?

## What is lazy loading in React?

# How would you handle form validation in React?

# What is Redux, and how does it help manage state in large applications?

# What is the difference between Redux and Context API?

# How would you handle asynchronous actions in Redux?

# How does React handle security vulnerabilities like XSS attacks?

### **What is the purpose of render() in React?**

### **What are synthetic events in React?**

### **What is React Fiber?**

How does the JavaScript event loop work?

What are promises, and how do they differ from async/await?

What is the difference between shallow and deep copying in JavaScript?

Explain the purpose of React hooks. How does useEffect work?

What is the significance of key props in React lists?

## Difference between virtual dom and shallow dom?

Shadow DOM provides encapsulation for reusable web components, isolating their styles and structure, while Virtual DOM is a performance optimization technique used by JavaScript frameworks like React to minimize direct manipulation of the browser's real DOM= . The key distinction is that Shadow DOM is a browser technology for component isolation, and Virtual DOM is a conceptual strategy for efficient UI updates. 

```
// React uses Virtual DOM
function App() {
  const [name, setName] = React.useState("John");
  return <h1>Hello, {name}</h1>;
}

```

```
// Native Shadow DOM example
let div = document.createElement("div");
let shadow = div.attachShadow({ mode: "open" });

shadow.innerHTML = `<style>p { color: red; }</style><p>Hello Shadow DOM</p>`;
document.body.appendChild(div);

```
