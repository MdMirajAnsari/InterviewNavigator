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
How It Works:The inputâ€™s value prop is tied to a state variable.
An onChange handler updates the state whenever the user interacts with the input.
React re-renders the component with the updated state, keeping the inputâ€™s value in sync.

Key Characteristics:
The state is the single source of truth.
You have full control over the inputâ€™s value and can manipulate it programmatically.
Useful for validating input, formatting data, or conditionally rendering based on input values.

**Uncontrolled Components**
Definition: An uncontrolled component is a form input where the value is managed by the DOM itself, not React state. You access the inputâ€™s value using a ref or directly from the DOM when needed (e.g., on form submission).
How It Works:The inputâ€™s value prop is not set by React state.
A ref (created with useRef) is used to access the inputâ€™s DOM node and retrieve its value.
React does not control the inputâ€™s value during user interactions; the DOM handles it.

Key Characteristics:
The DOM is the source of truth for the inputâ€™s value.
Less React involvement, as state updates arenâ€™t required for every change.
Useful for simple forms or when integrating with non-React libraries.

## 4. What are higher-order components (HOCs) in React, and how are they used?

A Higher-Order Component (HOC) in React is a design pattern used to reuse component logic. It is a function that takes a component as an argument and returns a new component with enhanced functionality. HOCs are a way to share behavior or logic across multiple components without duplicating code, leveraging Reactâ€™s compositional nature.
Definition: An HOC is a function that wraps a component to add additional props, state, or behavior, returning a new component.
Key Characteristics:
HOCs are not part of Reactâ€™s API but are a pattern that emerges from Reactâ€™s functional composition.
They are pure functions with no side effects, taking a component and returning a new one.
They are commonly used for cross-cutting concerns like authentication, logging, or data fetching.

## HOOKS

`useRef` in React is used to store a value that persists across renders  **without causing a re-render** .

```
import { useRef } from "react";

function InputExample() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  );
}
```

## Additional React Interview Questions

## 5. Functional components versus class components.

Functional components are JavaScript functions that return JSX. They are the modern standard in React because hooks let them manage state, side effects, refs, memoization, and reusable logic.

Class components are ES6 classes that extend `React.Component`. They use lifecycle methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`, and manage state with `this.state` and `this.setState`.

Functional components are usually preferred because they are shorter, easier to reuse with hooks, and align with modern React patterns.

## 6. Props versus state.

Props are data passed from a parent component to a child component. They are read-only from the child component's point of view.

State is data managed inside a component. It can change over time, usually because of user interaction, API responses, timers, or other events.

Use props when data is owned by a parent. Use state when the component itself needs to track changing data.

## 7. What causes a React component to re-render?

A React component can re-render when:

- Its state changes.
- Its props change.
- Its parent component re-renders.
- A context value used by the component changes.
- A subscribed external store changes.

Re-rendering means React calls the component again to calculate what the UI should look like. React may still skip real DOM changes if the output is the same.

## 8. How do you prevent unnecessary re-renders?

Common ways to reduce unnecessary re-renders include:

- Use `React.memo` for components that render the same output for the same props.
- Use `useMemo` for expensive calculated values.
- Use `useCallback` for stable function references passed to memoized children.
- Keep state as local as possible.
- Split large components into smaller focused components.
- Avoid creating new object, array, or function props unless needed.
- Use stable and correct keys in lists.

Do not optimize blindly. First confirm there is a real performance issue.

## 9. What does React.memo do?

`React.memo` memoizes a component. If the component receives the same props as the previous render, React can skip rendering that component.

Example:

```jsx
const UserCard = React.memo(function UserCard({ user }) {
  return <div>{user.name}</div>;
});
```

`React.memo` does a shallow comparison of props by default. It is useful for pure components, especially when they receive stable props and are expensive to render.

## 10. useMemo versus useCallback.

`useMemo` memoizes the result of a calculation.

```jsx
const filteredUsers = useMemo(() => {
  return users.filter((user) => user.active);
}, [users]);
```

`useCallback` memoizes a function reference.

```jsx
const handleClick = useCallback(() => {
  submitForm(id);
}, [id]);
```

Use `useMemo` when you want to avoid recalculating a value. Use `useCallback` when you want to keep a function reference stable, often when passing it to a memoized child component.

## 11. When should you not use useMemo?

Do not use `useMemo` when:

- The calculation is cheap.
- The value is not passed to memoized children.
- The component is already fast.
- The dependency list is difficult to maintain correctly.
- You are using it only because it "feels optimized."

`useMemo` itself has overhead. It should be used for expensive calculations or referential stability when it actually matters.

## 12. Explain useEffect.

`useEffect` is a React hook used to run side effects after rendering. Side effects include API calls, subscriptions, timers, logging, manually changing the DOM, and syncing React state with external systems.

Basic syntax:

```jsx
useEffect(() => {
  document.title = `Count: ${count}`;
}, [count]);
```

React runs the effect after the render is committed to the screen. The dependency array controls when the effect runs.

## 13. What does an empty dependency array mean?

An empty dependency array means the effect runs only once after the component mounts.

```jsx
useEffect(() => {
  fetchUsers();
}, []);
```

This is commonly used for initial data loading or one-time setup. In development with React Strict Mode, React may intentionally run effects twice to help detect unsafe side effects.

## 14. What happens when dependencies are missing?

When dependencies are missing, the effect can use stale values from an older render. This can cause bugs such as incorrect API calls, outdated state, missed updates, or cleanup logic using old values.

Example problem:

```jsx
useEffect(() => {
  console.log(userId);
}, []); // userId is missing
```

If `userId` changes, the effect will not run again. The dependency array should include all values from the component scope that are used inside the effect.

## 15. How do you clean up an effect?

Return a cleanup function from the effect.

```jsx
useEffect(() => {
  const intervalId = setInterval(() => {
    console.log("running");
  }, 1000);

  return () => {
    clearInterval(intervalId);
  };
}, []);
```

Cleanup is used for timers, subscriptions, event listeners, sockets, and aborting API requests. React runs cleanup before the effect runs again and when the component unmounts.

## 16. What is useRef?

`useRef` is a React hook that returns a mutable object with a `.current` property. The value persists across renders.

Common uses include:

- Accessing DOM elements directly.
- Storing timer IDs.
- Keeping previous values.
- Holding mutable values that should not cause rendering.

Example:

```jsx
const inputRef = useRef(null);

function focusInput() {
  inputRef.current.focus();
}
```

## 17. useRef versus useState.

`useState` stores data that should trigger a re-render when it changes.

`useRef` stores a mutable value that persists across renders but does not trigger a re-render when changed.

Use `useState` for values shown in the UI. Use `useRef` for DOM elements, timers, previous values, or mutable values that do not need to update the screen.

## 18. Does changing useRef.current trigger rendering?

No. Updating `useRef.current` does not trigger a component re-render.

```jsx
const countRef = useRef(0);

countRef.current += 1; // No re-render
```

This makes refs useful for storing values that need to persist but should not affect the UI directly.

## 19. What are custom hooks?

Custom hooks are reusable functions that use React hooks internally. Their names must start with `use`.

Example:

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
```

Custom hooks help share stateful logic between components without duplicating code.

## 20. Context API versus Redux.

Context API is built into React and is useful for passing data through the component tree without prop drilling. It works well for global values like theme, language, authenticated user, or simple app-level state.

Redux is a predictable state management library. It is better for larger applications with complex state updates, shared business logic, debugging needs, middleware, caching, or async flows.

Use Context for simple shared values. Use Redux when state logic becomes complex, widely shared, or needs strong tooling.

## 21. Redux flow and Redux Toolkit.

Classic Redux flow:

1. A component dispatches an action.
2. The reducer receives the current state and action.
3. The reducer returns a new state.
4. The store updates.
5. Subscribed components re-render with the new state.

Redux Toolkit is the recommended way to write Redux. It reduces boilerplate with APIs like `configureStore`, `createSlice`, `createAsyncThunk`, and RTK Query.

Example slice:

```jsx
const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    }
  }
});
```

Redux Toolkit uses Immer internally, so reducer code can look mutable while still producing immutable updates.

## 22. What are reducers, actions and selectors?

Actions are plain objects that describe what happened.

```jsx
{ type: "cart/addItem", payload: product }
```

Reducers are pure functions that receive the current state and an action, then return the next state.

Selectors are functions that read and derive data from the store.

```jsx
const selectCartItems = (state) => state.cart.items;
```

Selectors keep components cleaner and make state access reusable.

## 23. What is prop drilling?

Prop drilling happens when props are passed through multiple intermediate components just to reach a deeply nested child.

Example:

```jsx
<App user={user}>
  <Layout user={user}>
    <Header user={user} />
  </Layout>
</App>
```

It can make components harder to maintain. Common solutions include component composition, Context API, Redux, Zustand, or other state management tools.

## 24. What are React keys?

Keys are special attributes used by React to identify items in a list.

```jsx
users.map((user) => <UserCard key={user.id} user={user} />);
```

Keys help React understand which items were added, removed, or changed during reconciliation. A good key should be stable and unique among siblings.

## 25. Why should an array index not always be used as a key?

Array indexes can cause bugs when list items are reordered, inserted, or deleted. React may reuse the wrong component instance, causing incorrect UI state, wrong input values, or unexpected behavior.

Index keys are acceptable only when the list is static, never reordered, and items are not inserted or removed from the middle.

Prefer stable IDs from the data.

## 26. What is reconciliation?

Reconciliation is React's process of comparing the previous render output with the new render output to decide what changed.

React uses this comparison to update only the necessary parts of the real DOM. Keys help React reconcile lists efficiently and correctly.

## 27. What is code splitting?

Code splitting means breaking an application bundle into smaller chunks that can be loaded only when needed.

Benefits include:

- Faster initial page load.
- Smaller JavaScript payloads.
- Better performance for large applications.

Common places to split code are routes, heavy components, charts, editors, and admin-only pages.

## 28. How do React.lazy and Suspense work?

`React.lazy` lets you load a component dynamically.

```jsx
const ProfilePage = React.lazy(() => import("./ProfilePage"));
```

`Suspense` displays fallback UI while the lazy component is loading.

```jsx
<Suspense fallback={<div>Loading...</div>}>
  <ProfilePage />
</Suspense>
```

Together, they support component-level code splitting.

## 29. Error boundaries.

Error boundaries are React components that catch JavaScript errors in their child component tree and show fallback UI instead of crashing the whole app.

Class component example:

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }

    return this.props.children;
  }
}
```

Error boundaries catch render errors, lifecycle errors, and constructor errors below them. They do not catch errors inside event handlers, async code, or server-side rendering.

## 30. How do you handle forms and validation?

Forms are usually handled with controlled components, where each input value is stored in React state.

Basic approach:

- Store form values in state.
- Update values using `onChange`.
- Validate on change, blur, or submit.
- Show clear error messages.
- Prevent submit if validation fails.

For larger forms, libraries like React Hook Form, Formik, Yup, or Zod can reduce boilerplate and make validation easier.

## 31. How do you cancel API requests when a component unmounts?

Use `AbortController` and call `abort()` in the effect cleanup function.

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadUsers() {
    try {
      const response = await fetch("/api/users", {
        signal: controller.signal
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error(error);
      }
    }
  }

  loadUsers();

  return () => {
    controller.abort();
  };
}, []);
```

This prevents state updates after unmount and avoids wasting network work.

