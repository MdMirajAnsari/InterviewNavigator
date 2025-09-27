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

`useLocation` (from React Router) returns the current location object (pathname, search, hash, state). Useful to react to URL changes.

**Example:**

```javascript
import { useLocation } from 'react-router-dom';

function WhereAmI() {
  const location = useLocation();
  return <pre>{JSON.stringify(location, null, 2)}</pre>;
}
```

USECALLBACK

`useCallback(fn, deps)` memoizes a function so its identity is stable between renders unless dependencies change. Helps avoid unnecessary re-renders in children.

**Example:**

```javascript
import { useState, useCallback, memo } from 'react';

const List = memo(function List({ onSelect }) {
  return <button onClick={() => onSelect(1)}>Select 1</button>;
});

export default function Page() {
  const [count, setCount] = useState(0);
  const handleSelect = useCallback((id) => {
    console.log('Selected', id);
  }, []);
  return (
    <>
      <button onClick={() => setCount(c => c + 1)}>Inc {count}</button>
      <List onSelect={handleSelect} />
    </>
  );
}
```

USECONTEXT

`useContext(MyContext)` reads the nearest Provider value to avoid prop drilling.

**Example:**

```javascript
import { createContext, useContext } from 'react';

const ThemeContext = createContext('light');

function Button() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}

export default function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Button />
    </ThemeContext.Provider>
  );
}
```

USEIMPERATIVEHANDLE

`useImperativeHandle(ref, createHandle)` customizes the instance value exposed to parent refs. Use with `forwardRef` for imperative methods.

**Example:**

```javascript
import { useRef, forwardRef, useImperativeHandle } from 'react';

const Input = forwardRef(function Input(props, ref) {
  const innerRef = useRef(null);
  useImperativeHandle(ref, () => ({ focus: () => innerRef.current?.focus() }));
  return <input ref={innerRef} {...props} />;
});

export default function Form() {
  const inputRef = useRef(null);
  return (
    <>
      <Input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}
```

## CONTEXT API

Context API lets you share values (e.g., theme, auth) across the component tree without prop drilling. Provide at a high level, consume with `useContext`.

**When to use:** Shared config or state read by many components. For complex state/side effects, consider Redux or other state libs.

## **What is React Router?**

Client-side routing library for React that maps URLs to components without full page reloads. Provides components/hooks for navigation and route data.

**Example (v6):**

```javascript
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav><Link to="/">Home</Link> | <Link to="/about">About</Link></nav>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/about" element={<div>About</div>} />
      </Routes>
    </BrowserRouter>
  );
}
```

## ****What is prop drilling and its disadvantages?****

Prop drilling is passing props through multiple layers to reach a deeply nested child that needs them.

**Disadvantages:**

* Noisy/boilerplate; brittle to refactors; intermediate components receive unused props; performance concerns.

**Alternatives:** Context API, custom hooks, state libraries (Redux, Zustand).

## What is Reonciliation in React?

Reconciliation is React’s process of diffing the new element tree against the previous one to compute minimal DOM updates. React assumes same-type elements have similar trees and uses `key` to match list items.

**Tips:** Provide stable `key`s, avoid index keys for reordering lists.

## Explain Strict Mode in React.

`<React.StrictMode>` enables extra checks in development: highlights unsafe lifecycles, warns about legacy APIs, intentionally double-invokes some functions to surface side effects. No effect in production.

## What are error boundaries?

In  **React** , an **Error Boundary** is a special type of component that is used to **catch JavaScript errors** in its child component tree, log those errors, and display a fallback UI instead of breaking the entire React app.

**Example:**

```javascript
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so fallback UI shows
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Log error details
    console.error("Error caught by boundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

```

```javascript
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

```



Currently, **function components cannot directly be Error Boundaries** because they don’t have lifecycle methods.

But you can use the [`react-error-boundary`](https://www.npmjs.com/package/react-error-boundary) library, which provides hooks (`useErrorHandler`) and a ready-made `ErrorBoundary` component.

```javascript
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" style={{ color: "red" }}>
      <p>⚠️ Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function BuggyComponent() {
  throw new Error("Boom! Component crashed 🚨");
}

export default function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset state or retry logic
      }}
    >
      <BuggyComponent />
    </ErrorBoundary>
  );
}

```

## How do you handle side effects in React components?

Use `useEffect` for async tasks, subscriptions, timers, and DOM mutations; return a cleanup function to unsubscribe.

**Example:**

```javascript
import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let active = true;
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r => r.json())
      .then(d => { if (active) setUsers(d); });
    return () => { active = false; };
  }, []);
  return users.map(u => <div key={u.id}>{u.name}</div>);
}
```

## What are the lifecycle methods of React?

Class components:

* Mounting: `constructor`, `static getDerivedStateFromProps`, `render`, `componentDidMount`
* Updating: `shouldComponentUpdate`, `render`, `getSnapshotBeforeUpdate`, `componentDidUpdate`
* Unmounting: `componentWillUnmount`
* Error: `static getDerivedStateFromError`, `componentDidCatch`

In function components, use effects to model lifecycle-like behavior.

## How to pass data between sibling components using React router?

Use a shared parent (lift state), global store, or pass via navigation state/query.

**Example (navigate state):**

```javascript
// Sender
import { useNavigate } from 'react-router-dom';
function A() {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/b', { state: { msg: 'Hello' } })}>Go</button>;
}

// Receiver
import { useLocation } from 'react-router-dom';
function B() {
  const { state } = useLocation();
  return <div>{state?.msg}</div>;
}
```

What is the difference between state and props in React?
**State:** Internal, mutable by the component (via `setState`/hooks), controls behavior/UI.

**Props:** External, read-only inputs passed from parent to child.

## What is the difference between `useEffect` and `useLayoutEffect` in React?

`useEffect` runs after paint, non-blocking; good for async and non-visual side effects.

`useLayoutEffect` runs synchronously after DOM mutations but before paint; use for measurement/sync DOM updates to avoid flicker. Avoid on server.

## What is `forwardRef()` in React used for?

Allows a parent to pass a `ref` to a child’s DOM node or imperative API. Combine with `useImperativeHandle` to expose controlled methods.

## Explain what React hydration is

Hydration attaches event listeners to server-rendered HTML on the client, making it interactive without re-rendering from scratch. Used in SSR/SSG frameworks (Next.js, Remix).

## What are React Portals used for?

Render children into a DOM node outside the parent hierarchy (e.g., modals, tooltips) while preserving React event bubbling.

**Example:**

```javascript
import { createPortal } from 'react-dom';

function Modal({ children }) {
  const root = document.getElementById('modal-root');
  return createPortal(children, root);
}
```

## How do you localize React applications?

Use i18n libraries (e.g., `react-i18next`). Store translations per locale and wrap the app with a provider.

**Example (react-i18next gist):**

```javascript
import { useTranslation, I18nextProvider } from 'react-i18next';

function Hello() {
  const { t } = useTranslation();
  return <h2>{t('hello')}</h2>;
}
```

## What is code splitting in a React application?

Split bundles so users download only what they need. Use dynamic `import()` with `React.lazy` and `Suspense`.

**Example:** See lazy loading section above.

## What is the Flux pattern and what are its benefits?

Unidirectional data flow pattern: Actions → Dispatcher → Stores → View. Ensures predictable updates and simplifies reasoning about state changes.

Redux was inspired by Flux and formalizes many of its ideas.

## What is React Fiber and how is it an improvement over the previous approach?

Fiber reimplemented React’s reconciliation to break rendering into units of work with priorities, enabling interruption, resumption, and better scheduling (concurrent features, Suspense). Improves responsiveness over the older stack reconciler.

## What are forms in React?

You can build forms as controlled (state-driven) or uncontrolled (DOM-driven via refs). Controlled forms ease validation and conditional UI; uncontrolled forms are simpler for basic cases or non-React integrations.

## How would you lift the state up in a React application, and why is it necessary?

Lift the state to the nearest common ancestor so sibling components can share and coordinate data.

**Example:**

```javascript
function Parent() {
  const [value, setValue] = useState('');
  return (
    <>
      <ChildA value={value} onChange={setValue} />
      <ChildB value={value} />
    </>
  );
}
```

## What are Pure Components?

Class `React.PureComponent` does a shallow comparison of props/state to skip re-renders. For function components, use `React.memo`.

**Example:**

```javascript
const Item = React.memo(function Item({ name }) {
  return <div>{name}</div>;
});
```

## What is the role of PropTypes in React?

Runtime props type-checking for components; helps catch bugs during development.

**Example:**

```javascript
import PropTypes from 'prop-types';

function User({ name, age }) { return <div>{name} ({age})</div>; }
User.propTypes = { name: PropTypes.string.isRequired, age: PropTypes.number };
```

## What is the difference between `createElement` and `cloneElement`?

`React.createElement(type, props, ...children)` creates a new element.

`React.cloneElement(element, props, ...children)` clones an existing element, merging new props/children and preserving `key`/`ref`.

**Example:**

```javascript
const el = React.createElement('button', { className: 'a' }, 'Click');
const cloned = React.cloneElement(el, { className: 'b' }); // class becomes 'b'
```

## What are stateless components?

Stateless components in React are components that do not manage or hold their own state. They receive data and behavior exclusively through props and render UI based on those props. Typically, stateless components are implemented as functions (function components).

**Example:**

```javascript
function Greeting(props) {
  return <h2>Hello, {props.name}!</h2>;
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

Static Site Generation (SSG) pre-renders pages to static HTML at build time. This yields very fast load times and great SEO for content that doesn’t change per-request.

**When to use:** Blogs, docs, marketing pages. Rebuild when content changes.

**Example (Next.js):**

```javascript
// pages/posts/[id].js
export default function Post({ post }) {
  return <article><h2>{post.title}</h2><p>{post.body}</p></article>;
}

export async function getStaticPaths() {
  const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then(r => r.json());
  return { paths: posts.slice(0, 3).map(p => ({ params: { id: String(p.id) } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`).then(r => r.json());
  return { props: { post } };
}
```

## What is lazy loading in React?

Lazy loading defers loading of non-critical code until it’s needed, reducing initial bundle size.

**Example:**

```javascript
import React, { Suspense } from 'react';
const Chart = React.lazy(() => import('./Chart'));

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <Chart />
    </Suspense>
  );
}
```

## How would you handle form validation in React?

Options: controlled inputs with custom rules, or libraries like `react-hook-form` + schema (`Yup`/`Zod`).

**Example (react-hook-form + Yup):**

```javascript
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Min 8 chars').required('Password required')
});

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = data => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      {errors.email && <small>{errors.email.message}</small>}
      <input type="password" {...register('password')} placeholder="Password" />
      {errors.password && <small>{errors.password.message}</small>}
      <button>Sign up</button>
    </form>
  );
}
```

## What is Redux, and how does it help manage state in large applications?

Redux is a predictable state container. It centralizes app state, updates it via dispatched actions and pure reducers, supports middleware for async logic, and offers great DevTools.

**Example (Redux Toolkit):**

```javascript
// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    added: (state, action) => { state.push({ id: Date.now(), text: action.payload, done: false }); },
    toggled: (state, action) => {
      const t = state.find(x => x.id === action.payload);
      if (t) t.done = !t.done;
    }
  }
});

export const { added, toggled } = todosSlice.actions;
export const store = configureStore({ reducer: { todos: todosSlice.reducer } });
```

```javascript
// App.jsx
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './store';
import { added, toggled } from './store';

function Todos() {
  const todos = useSelector(s => s.todos);
  const dispatch = useDispatch();
  return (
    <>
      <button onClick={() => dispatch(added('Learn Redux'))}>Add</button>
      {todos.map(t => (
        <div key={t.id} onClick={() => dispatch(toggled(t.id))}>
          {t.text} {t.done ? '✓' : ''}
        </div>
      ))}
    </>
  );
}

export default function App() {
  return <Provider store={store}><Todos /></Provider>;
}
```

## What is the difference between Redux and Context API?

- Purpose: Context avoids prop drilling; Redux provides a full state management pattern with reducers, actions, middleware, DevTools.
- Scale: Context suits simple, low-frequency shared state; Redux suits complex, app-wide, frequently changing state.
- Performance: Context re-renders all consumers on value change unless split/memoized; Redux selectors give granular subscriptions.
- Async: Context requires custom handling; Redux has thunks, createAsyncThunk, sagas, etc.

## How would you handle asynchronous actions in Redux?

Use middleware. Easiest is Redux Toolkit’s `createAsyncThunk`; alternatives include thunks, sagas, observables.

**Example (createAsyncThunk):**

```javascript
// features/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  return await res.json();
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => { state.status = 'loading'; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default usersSlice.reducer;
```

```javascript
// Users.jsx
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './features/usersSlice';

export function Users() {
  const { items, status } = useSelector(s => s.users);
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(fetchUsers())} disabled={status === 'loading'}>
        Load users
      </button>
      {status === 'loading' && 'Loading…'}
      {items.map(u => <div key={u.id}>{u.name}</div>)}
    </div>
  );
}
```

## How does React handle security vulnerabilities like XSS attacks?

JSX escapes values by default, preventing injection. Avoid raw HTML unless necessary; if using `dangerouslySetInnerHTML`, sanitize first (e.g., with DOMPurify).

**Example:**

```javascript
import DOMPurify from 'dompurify';

export default function Article({ html }) {
  const safe = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: safe }} />;
}

// Safe by default (escaped):
const userInput = '<img src=x onerror=alert(1) />';
<div>{userInput}</div>; // renders text, not executable HTML
```

## **What is the purpose of render() in React?**

In class components, `render()` returns the React elements to display. It must be pure (no side effects) and derive UI from `props`/`state`.

**Example:**

```javascript
import React from 'react';
class Greeting extends React.Component {
  render() {
    return <h2>Hello, {this.props.name}</h2>;
  }
}
```

## **What are synthetic events in React?**

Synthetic events are React’s cross-browser wrapper for native events, giving a consistent API.

**Example:**

```javascript
function Button() {
  function handleClick(event) {
    console.log(event.type); // "click"
    console.log(event.nativeEvent instanceof MouseEvent); // true
  }
  return <button onClick={handleClick}>Click</button>;
}
```

## **What is React Fiber?**

React Fiber is the reconciliation engine enabling incremental, interruptible rendering with prioritization. It powers features like Suspense and transitions.

**Example (useTransition to lower priority):**

```javascript
import { useState, useTransition } from 'react';

export default function Search() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    const next = e.target.value;
    setText(next); // urgent update
    startTransition(() => setQuery(next)); // low-priority
  }

  return (
    <>
      <input value={text} onChange={onChange} />
      {isPending && <span>Updating…</span>}
      <Results query={query} />
    </>
  );
}
```

**Example (Suspense lazy loading):**

```javascript
import React, { Suspense } from 'react';
const Profile = React.lazy(() => import('./Profile'));

export default function Page() {
  return (
    <Suspense fallback={<div>Loading profile…</div>}>
      <Profile />
    </Suspense>
  );
}
```
