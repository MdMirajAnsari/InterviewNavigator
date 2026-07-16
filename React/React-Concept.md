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


## More React Interview Questions From The Priority List

## 32. What is React?

React is a JavaScript library for building user interfaces. It lets developers build reusable components and describe the UI declaratively based on state.

## 33. Is React a library or framework?

React is a library. It focuses mainly on the view layer. Routing, API caching, state management, and server rendering are usually added through other libraries or frameworks such as React Router, TanStack Query, Redux Toolkit, Next.js, or Remix.

## 34. What are React's main features?

React's main features are reusable components, JSX, declarative rendering, one-way data flow, hooks, Virtual DOM reconciliation, and a large ecosystem.

## 35. What is JSX?

JSX is a syntax extension that lets you write HTML-like markup inside JavaScript.

```jsx
const title = <h1>Hello React</h1>;
```

Browsers cannot run JSX directly. Build tools convert it into regular JavaScript.

## 36. What is a React element?

A React element is a plain object that describes what should be rendered. It contains information such as type, props, and children.

## 37. What is a React component?

A React component is a reusable function or class that returns React elements.

```jsx
function Button() {
  return <button>Save</button>;
}
```

## 38. Element versus component.

A component is the reusable function or class. An element is the object created when JSX uses that component or an HTML tag.

```jsx
function Welcome() {
  return <h1>Hello</h1>;
}

const element = <Welcome />;
```

## 39. What is one-way data binding?

One-way data binding means data flows from parent to child through props. Child components send changes back using callback functions. This keeps data flow predictable.

## 40. What is conditional rendering?

Conditional rendering means showing different UI based on a condition.

```jsx
return isLoggedIn ? <Dashboard /> : <Login />;
```

## 41. What are fragments?

Fragments let a component return multiple elements without adding an extra DOM node.

```jsx
return (
  <>
    <h1>Title</h1>
    <p>Description</p>
  </>
);
```

Use `React.Fragment` when a key is needed.

## 42. What are synthetic events?

Synthetic events are React's wrapper around native browser events. They provide a consistent API across browsers and use camelCase names like `onClick`, `onChange`, and `onSubmit`.

## 43. What is component composition?

Component composition means building larger UIs by combining smaller components. React prefers composition over inheritance because it is simpler and more flexible.

## 44. What are portals?

Portals let React render children into a DOM node outside the normal parent hierarchy.

```jsx
createPortal(<Modal />, document.getElementById("modal-root"));
```

They are useful for modals, tooltips, popovers, and overlays.

## 45. What is Strict Mode?

`React.StrictMode` is a development-only tool that helps detect unsafe patterns. It may intentionally render components or run effects more than once in development to reveal side effects and missing cleanup.

## 46. What is hydration?

Hydration is the process where React attaches event handlers and client-side behavior to HTML that was already rendered on the server.

## 47. Client-side rendering versus server-side rendering.

Client-side rendering sends minimal HTML and lets JavaScript build the UI in the browser. Server-side rendering generates the initial HTML on the server, which can improve first load and SEO but adds hydration and server complexity.

## 48. What is automatic batching?

Automatic batching means React groups multiple state updates into one render for better performance.

```jsx
setName("Asha");
setAge(30);
```

React can apply both updates and render once.

## 49. Does changing a normal variable cause a re-render?

No. React re-renders when state, props, context, or subscribed external store values change. A normal variable does not trigger rendering.

## 50. Why are state updates asynchronous?

React schedules and batches state updates for performance. Because updates may not apply immediately, use functional updates when the next state depends on the previous state.

```jsx
setCount((previous) => previous + 1);
```

## 51. What is stale state?

Stale state is an old value captured by a closure. It commonly appears in event handlers, timers, promises, and effects.

```jsx
setCount(count + 1);
setCount(count + 1);
```

Both calls may use the same old `count`. Use functional updates to avoid this.

## 52. Why should state be immutable?

React relies on reference changes to detect updates. Mutating objects or arrays directly can prevent expected renders and break memoization.

```jsx
setUser({ ...user, name: "New Name" });
```

## 53. How do you update nested state correctly?

Create new copies at each changed level.

```jsx
setUser({
  ...user,
  address: {
    ...user.address,
    city: "Pune"
  }
});
```

For deeply nested state, consider flattening the structure, using `useReducer`, or using Immer.

## 54. Why does useState return an array?

`useState` returns an array so the developer can choose meaningful names with array destructuring.

```jsx
const [count, setCount] = useState(0);
```

## 55. How do you initialize state lazily?

Pass a function to `useState`.

```jsx
const [value, setValue] = useState(() => expensiveInitialValue());
```

React calls it only during the initial render.

## 56. Why can multiple setCount(count + 1) calls produce only one increment?

Each call uses the same captured `count` value from the current render.

```jsx
setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
```

This usually increments by one. Use functional updates to apply all increments.

```jsx
setCount((previous) => previous + 1);
setCount((previous) => previous + 1);
setCount((previous) => previous + 1);
```

## 57. How do you update an array in state?

Create a new array instead of mutating the existing one.

```jsx
setItems([...items, newItem]);
setItems(items.filter((item) => item.id !== id));
setItems(items.map((item) => item.id === id ? updatedItem : item));
```

## 58. What happens when no dependency array is provided to useEffect?

The effect runs after every render.

```jsx
useEffect(() => {
  console.log("Effect");
});
```

## 59. Why do infinite effect loops occur?

An infinite loop happens when an effect updates state, the update causes a render, and the dependencies cause the effect to run again.

```jsx
useEffect(() => {
  setCount(count + 1);
}, [count]);
```

Fix it by correcting dependencies, moving logic to an event handler, using functional updates, or removing unnecessary effects.

## 60. Why should useEffect not usually be async directly?

An async function returns a Promise, but React expects an effect to return either nothing or a cleanup function.

```jsx
useEffect(() => {
  async function loadData() {
    const data = await fetchData();
    setData(data);
  }

  loadData();
}, []);
```

## 61. useEffect versus useLayoutEffect.

`useEffect` runs after the browser paints and is best for most side effects. `useLayoutEffect` runs after DOM updates but before paint, so it is useful for layout measurement or DOM changes that must happen before the user sees the screen.

## 62. When should you avoid using an effect?

Avoid effects for values that can be derived during render or logic that belongs in an event handler. Effects are mainly for synchronizing with external systems like APIs, subscriptions, timers, browser APIs, and third-party libraries.

## 63. How do you prevent race conditions between API requests?

Use `AbortController`, request IDs, or an ignore flag so older responses cannot overwrite newer data.

```jsx
useEffect(() => {
  let ignore = false;

  fetchUser(userId).then((data) => {
    if (!ignore) setUser(data);
  });

  return () => {
    ignore = true;
  };
}, [userId]);
```

## 64. What is useContext?

`useContext` reads a value from React Context.

```jsx
const theme = useContext(ThemeContext);
```

It avoids passing props through every level, but context updates can re-render all consumers.

## 65. What are the performance issues with Context?

When a context value changes, all components using that context can re-render. To reduce this, split contexts, memoize provider values, keep fast-changing state local, or use a state library with selectors.

## 66. useReducer versus useState.

Use `useState` for simple state. Use `useReducer` when updates are complex, several fields change together, or actions make the state transitions easier to understand.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

## 67. What is forwardRef?

`forwardRef` lets a component receive a ref from its parent and pass it to a DOM element or child component.

```jsx
const TextInput = forwardRef(function TextInput(props, ref) {
  return <input ref={ref} {...props} />;
});
```

## 68. What is useImperativeHandle?

`useImperativeHandle` customizes what a parent receives through a ref.

```jsx
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus()
}));
```

Use it sparingly for imperative actions like focus, scroll, open, or close.

## 69. What is useId?

`useId` generates a stable unique ID for accessibility attributes.

```jsx
const id = useId();

return (
  <>
    <label htmlFor={id}>Email</label>
    <input id={id} />
  </>
);
```

## 70. What is useTransition?

`useTransition` marks a state update as non-urgent so React can keep urgent interactions responsive.

```jsx
const [isPending, startTransition] = useTransition();

startTransition(() => {
  setSearchQuery(value);
});
```

## 71. What is useDeferredValue?

`useDeferredValue` lets React defer updating a value so urgent UI updates can happen first. It is useful for search, filtering, and expensive child rendering based on rapidly changing input.

## 72. What rules must hooks follow?

Hooks must be called only at the top level of React function components or custom hooks. Do not call hooks inside loops, conditions, nested functions, or regular JavaScript functions. This keeps hook order consistent between renders.

## 73. Can a custom hook return JSX?

Technically yes, but it is usually not recommended. Custom hooks should share logic. Components should return JSX.

## 74. How do you manage state in a large React application?

Keep local state close to where it is used. Use Context for simple global values, server-state libraries like TanStack Query or RTK Query for API data, and Redux Toolkit, Zustand, or similar tools when client state is complex and shared widely.

## 75. How do you handle API loading, errors, retries, and empty states?

Track each state explicitly.

```jsx
if (isLoading) return <Spinner />;
if (error) return <ErrorMessage error={error} />;
if (data.length === 0) return <EmptyState />;
```

For retries, caching, refetching, and stale data handling, use libraries like TanStack Query or RTK Query when appropriate.

## 76. How do you implement authentication and protected routes?

Store authenticated user or session state centrally, validate it on app load, and protect private routes before rendering them.

```jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
```

Also handle token expiry, refresh, logout, and unauthorized API responses.

## 77. How do you secure tokens in a React application?

Prefer secure, HttpOnly, SameSite cookies when possible because JavaScript cannot read HttpOnly cookies. Use HTTPS, short-lived access tokens, refresh-token rotation, CSRF protection where needed, and safe logout behavior. Avoid storing highly sensitive tokens in localStorage because XSS can expose them.

## 78. How do you test React components?

Use React Testing Library to test behavior from the user's perspective. Test rendering, user interactions, form validation, API success and error states, route behavior, and permissions. Mock network calls with MSW when possible.

## 79. Explain closures, promises, async/await, and the event loop.

A closure is when a function remembers variables from its outer scope. A Promise represents a future async result. `async/await` is cleaner syntax for Promise-based code. The event loop coordinates synchronous code, microtasks such as Promise callbacks, and macrotasks such as timers.

## 80. How do you measure React performance?

Use React DevTools Profiler, the browser Performance panel, Network panel, Lighthouse, bundle analyzers, and production monitoring. Look for unnecessary renders, expensive calculations, large lists, slow requests, large bundles, layout shifts, and long main-thread tasks.

## 81. What is the React Profiler?

The React Profiler is a React DevTools feature that records component renders. It shows which components rendered, how long they took, and why they rendered.

## 82. When does React.memo fail to prevent a re-render?

`React.memo` will not help if props are new references every render, such as inline objects, arrays, or functions. It also does not prevent renders caused by the component's own state or context changes.

## 83. What is shallow comparison?

Shallow comparison checks only top-level values. For objects and arrays, it compares references, not deep contents.

```jsx
{} === {} // false
```

## 84. Can excessive memoization make performance worse?

Yes. Memoization has overhead and adds dependency complexity. If the calculation is cheap or the component is already fast, `useMemo`, `useCallback`, and `React.memo` may make the code harder to maintain without improving performance.

## 85. What is list virtualization?

List virtualization renders only the visible rows of a very large list. Libraries like `react-window` and `react-virtualized` reduce DOM nodes and improve scrolling performance.

## 86. Debounce versus throttle.

Debounce waits until activity stops before running a function. It is useful for search input. Throttle runs a function at most once in a fixed time window. It is useful for scroll or resize handlers.

## 87. How do you reduce bundle size?

Analyze the bundle, remove unused dependencies, use code splitting, lazy-load heavy routes, prefer smaller libraries, enable tree shaking, avoid importing entire utility libraries, and remove dead code.

## 88. What is tree shaking?

Tree shaking is a build optimization that removes unused exports from the final JavaScript bundle. It works best with ES modules and side-effect-free code.

## 89. How do you prevent Context updates from re-rendering the whole app?

Split large contexts into smaller contexts, memoize provider values, avoid placing fast-changing values in broad providers, and place providers as low in the tree as practical. For complex global state, use libraries with selectors.

## 90. How do you identify memory leaks?

Look for growing memory usage, duplicated subscriptions, timers that keep running, event listeners not removed, sockets not closed, and API responses updating unmounted components. Use browser Memory tools, React Profiler, and proper cleanup in effects.

## 91. What are Core Web Vitals?

Core Web Vitals are user-experience performance metrics. Largest Contentful Paint measures loading speed, Cumulative Layout Shift measures visual stability, and Interaction to Next Paint measures responsiveness.

## 92. How do you optimize a slow React application?

First measure instead of guessing. Use the browser Performance panel, Network panel, Lighthouse, bundle analyzer, and React Profiler. Check unnecessary re-renders, expensive calculations, large lists, large bundles, repeated API calls, and slow assets. Then apply the fix that matches the bottleneck: state colocation, memoization, list virtualization, debouncing, code splitting, route lazy loading, image optimization, request caching, or Web Workers.

## State Management Interview Questions

## 93. What types of state exist in a frontend application?

Common frontend state types include local component state, global application state, server state, URL state, form state, authentication/session state, and UI state such as modals, tabs, filters, and loading flags.

## 94. Local state versus global state.

Local state belongs to one component or a small component subtree. Global state is shared across many unrelated parts of the application. Prefer local state by default and move state global only when multiple distant components genuinely need it.

## 95. UI state versus server state.

UI state describes client-only interface behavior, such as whether a modal is open. Server state comes from an API or backend, such as users, products, orders, or permissions. Server state usually needs caching, refetching, invalidation, loading states, and error handling.

## 96. When should state be lifted up?

Lift state up when multiple sibling components need to read or update the same value. Move the state to their nearest common parent and pass data down through props.

## 97. What is state colocation?

State colocation means keeping state as close as possible to where it is used. It reduces unnecessary re-renders, avoids overusing global state, and makes components easier to understand.

## 98. When should you not use Redux?

Do not use Redux for simple local UI state, small applications, or data that is only used by one component. Redux adds structure and tooling, but it is unnecessary when props, local state, Context, or a server-state library solves the problem cleanly.

## 99. What are Redux's core principles?

Redux has three core principles: the application state is stored in a single store, state is read-only and changed by dispatching actions, and changes are made using pure reducer functions.

## 100. What is a Redux store?

The Redux store is the central object that holds application state. It allows components to read state, dispatch actions, and subscribe to state changes.

## 101. What is an action?

An action is a plain object that describes what happened.

```jsx
{ type: "cart/addItem", payload: product }
```

Actions should describe events, not directly modify state.

## 102. What is a reducer?

A reducer is a pure function that receives the current state and an action, then returns the next state.

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "counter/increment":
      return { value: state.value + 1 };
    default:
      return state;
  }
}
```

## 103. Why must reducers be pure?

Reducers must be pure so state updates are predictable, testable, and easy to debug. A reducer should not call APIs, mutate external variables, generate random values, or perform side effects.

## 104. What is middleware?

Middleware sits between dispatching an action and the reducer receiving it. It is used for logging, async logic, analytics, error reporting, and modifying or intercepting actions.

## 105. Redux Thunk versus Redux Saga.

Redux Thunk lets action creators return functions for async work. It is simple and good for most API calls. Redux Saga uses generator functions to manage complex async workflows, cancellation, retries, and background tasks. Saga is powerful but adds more complexity.

## 106. What is Redux Toolkit?

Redux Toolkit is the official recommended way to write Redux. It provides `configureStore`, `createSlice`, `createAsyncThunk`, and RTK Query to reduce boilerplate and enforce good defaults.

## 107. Why is Redux Toolkit preferred over traditional Redux?

Redux Toolkit reduces boilerplate, includes good defaults, uses Immer for immutable updates, simplifies store setup, and makes async and API state easier to manage.

## 108. What is a slice?

A slice is a Redux Toolkit concept that groups state, reducers, and generated actions for one feature.

```jsx
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    }
  }
});
```

## 109. What is createAsyncThunk?

`createAsyncThunk` creates a thunk for async operations and automatically generates pending, fulfilled, and rejected action types.

```jsx
const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await fetch("/api/users");
  return response.json();
});
```

## 110. What is RTK Query?

RTK Query is Redux Toolkit's data-fetching and caching solution. It handles API requests, caching, loading states, errors, refetching, invalidation, and deduplication.

## 111. Redux versus Zustand.

Redux is more structured and has strong debugging, middleware, and ecosystem support. Zustand is smaller and simpler, with less boilerplate. Use Redux for large predictable state flows; use Zustand for lighter global state needs.

## 112. Redux versus React Query.

Redux manages client/application state. React Query, now TanStack Query, manages server state such as API data, caching, background refetching, and stale data. Many apps use both.

## 113. What is TanStack Query?

TanStack Query is a server-state management library for fetching, caching, synchronizing, and updating API data in React and other frameworks.

## 114. What is server-state caching?

Server-state caching stores API responses on the client so repeated requests can reuse existing data. It improves performance and reduces network calls while still allowing refetching and invalidation.

## 115. What are stale time and cache time?

Stale time is how long fetched data is considered fresh. Cache time, called garbage collection time in newer TanStack Query versions, is how long unused cached data remains in memory before being removed.

## 116. How do you invalidate cached queries?

Invalidate cached queries after a mutation so the library knows the data may be outdated.

```jsx
queryClient.invalidateQueries({ queryKey: ["users"] });
```

## 117. What is optimistic updating?

Optimistic updating means updating the UI before the server confirms success. It makes the app feel faster, but requires rollback if the request fails.

## 118. How do you roll back an optimistic update?

Save the previous cached value before updating, apply the optimistic value, and restore the previous value in the error handler if the request fails.

## 119. How do you persist Redux state?

Redux state can be persisted using libraries such as `redux-persist` or by manually saving selected state to storage. Persist only what is necessary, such as preferences or non-sensitive session metadata.

## 120. What problems can occur when state is persisted?

Persisted state can become stale, incompatible after deployments, too large, insecure, or inconsistent with server data. Sensitive values should not be stored in localStorage.

## 121. How do you avoid storing derived data?

Store the minimal source data and calculate derived values with selectors or memoized selectors.

```jsx
const total = cartItems.reduce((sum, item) => sum + item.price, 0);
```

Avoid storing both `cartItems` and `total` unless there is a strong reason.

## 122. What should not be placed in global state?

Avoid placing temporary form input, modal state used by one component, hover state, derived values, duplicated server data, and highly sensitive tokens in global state.

## 123. How do you normalize nested data?

Store entities by ID and keep arrays of IDs for ordering.

```jsx
{
  usersById: {
    1: { id: 1, name: "Asha" }
  },
  userIds: [1]
}
```

Normalization avoids deeply nested updates and duplicate data.

## 124. How do you manage form state?

For simple forms, use controlled components with `useState`. For large forms, use React Hook Form or Formik. Keep field values, touched status, validation errors, and submit status clear and separate.

## 125. How do you manage state shared between distant components?

Use Context, Redux, Zustand, URL state, or a shared server-state cache depending on the type of state. Do not lift state to a very high parent unless that parent naturally owns it.

## 126. How do you debug Redux state changes?

Use Redux DevTools to inspect actions, state diffs, and time-travel debugging. Good action names, selectors, and Redux Toolkit slices also make debugging easier.

## Forms And Validation Interview Questions

## 127. Controlled versus uncontrolled forms.

Controlled forms keep input values in React state. Uncontrolled forms let the DOM keep the value and read it with refs when needed. Controlled forms give more control over validation and conditional UI. Uncontrolled forms can be simpler and more performant for large forms.

## 128. How do you handle multiple input fields?

Use a single object in state and update fields by name.

```jsx
function handleChange(event) {
  const { name, value } = event.target;
  setForm((previous) => ({ ...previous, [name]: value }));
}
```

## 129. How do you validate a form?

Validate required fields, formats, ranges, lengths, and business rules. Validation can run on change, blur, submit, or a combination. For larger forms, use schema libraries like Zod or Yup.

## 130. Client-side versus server-side validation.

Client-side validation gives fast feedback and improves UX. Server-side validation enforces security and business rules on trusted backend data. Both are needed.

## 131. Why is server-side validation still required?

Client-side code can be bypassed or modified. The server must validate every request to protect data integrity, security, permissions, and business rules.

## 132. How do you show field-level validation errors?

Track errors by field name and display the message near the matching input.

```jsx
{errors.email && <p role="alert">{errors.email}</p>}
```

For accessibility, connect error text to the input with `aria-describedby`.

## 133. How do you prevent duplicate form submissions?

Track an `isSubmitting` flag, disable the submit button during submission, and ignore additional submit attempts until the request completes.

## 134. How do you disable the button while submitting?

Use submit state.

```jsx
<button disabled={isSubmitting}>
  {isSubmitting ? "Saving..." : "Save"}
</button>
```

## 135. How do you handle file uploads?

Use a file input and submit files with `FormData`.

```jsx
const formData = new FormData();
formData.append("file", file);
await fetch("/api/upload", { method: "POST", body: formData });
```

## 136. How do you show upload progress?

Use Axios `onUploadProgress` or lower-level browser APIs because the Fetch API does not provide upload progress events in the same simple way.

## 137. How do you handle large file uploads?

Use chunked uploads, resumable uploads, progress tracking, file-size validation, retry logic, and direct-to-storage uploads when appropriate.

## 138. What is multipart form data?

`multipart/form-data` is an encoding type used to submit forms containing files and fields. In JavaScript, it is commonly created using `FormData`.

## 139. React Hook Form versus Formik.

React Hook Form uses uncontrolled inputs and refs by default, which often means fewer re-renders. Formik commonly uses controlled form state and is straightforward but can re-render more often in large forms.

## 140. Why is React Hook Form performant?

React Hook Form stores field values with refs and subscriptions instead of updating React state on every keystroke for every field. This reduces re-renders in large forms.

## 141. How do you implement dynamic fields?

Store an array of field objects and render them with stable keys. In React Hook Form, use `useFieldArray` for add, remove, and reorder behavior.

## 142. How do you implement dependent dropdowns?

Store the parent dropdown value, fetch or filter child options when it changes, reset invalid child selections, and show loading or empty states when needed.

## 143. How do you reset a form?

For controlled forms, set state back to the initial values. In React Hook Form, call `reset(initialValues)`. Also clear errors, touched state, and submit state if needed.

## 144. How do you preserve unsaved form data?

Persist draft values in local component state, Context, sessionStorage, localStorage, or backend drafts. Choose storage based on sensitivity and whether the data should survive refresh or navigation.

## 145. How do you warn users before leaving a dirty form?

Track whether the form is dirty. Use router blockers for in-app navigation and `beforeunload` for browser refresh or tab close. Show a confirmation before losing unsaved changes.

## 146. How do you handle date and time fields?

Use a clear date format, validate time zones, avoid ambiguous local times, and convert values at API boundaries. Store dates consistently, often as ISO strings or UTC timestamps.

## 147. How do you prevent invalid characters?

Prefer validation and input constraints such as `type`, `pattern`, `maxLength`, and schema validation. For strict cases, sanitize in `onChange` or block specific keys, but still validate on submit and on the server.

## 148. How do you make a form accessible?

Use labels, keyboard-friendly controls, visible focus states, `aria-describedby` for help and errors, `role="alert"` for validation messages, proper button types, and semantic HTML.

## 149. How do you debounce asynchronous validation?

Wait until the user stops typing before calling the API. Clear the previous timer on each change and cancel outdated requests when possible.

## API And Async Programming Interview Questions

## 150. How do you call an API in React?

Call APIs inside effects, event handlers, route loaders, or server-state hooks depending on when the data is needed. Store loading, success, error, and empty states.

## 151. Fetch versus Axios.

`fetch` is built into browsers and uses Promises. Axios provides conveniences like automatic JSON parsing, request/response interceptors, easier timeout handling, upload progress, and automatic rejection for many HTTP errors.

## 152. Where should API calls be placed?

Place API logic in a service layer, custom hook, route loader, or server-state library. Avoid scattering raw `fetch` calls across many components.

## 153. How do you display loading state?

Track loading state and render a spinner, skeleton, disabled button, or inline loading indicator depending on the workflow.

## 154. How do you display error state?

Track the error and show a useful message with a retry option when appropriate. Avoid exposing raw technical details to end users.

## 155. How do you handle an empty response?

Check whether the returned list or object has no usable data and render an empty state with helpful next steps.

## 156. How do you retry failed requests?

Retry transient failures with a limit and delay, often with exponential backoff. Do not blindly retry validation errors or unauthorized requests.

## 157. How do you cancel an API request?

Use `AbortController` with `fetch` and call `abort()` in cleanup.

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadUsers() {
    try {
      const response = await fetch("/api/users", {
        signal: controller.signal
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      if (error.name !== "AbortError") {
        setError(error.message);
      }
    }
  }

  loadUsers();

  return () => controller.abort();
}, []);
```

## 158. What is AbortController?

`AbortController` is a browser API used to cancel asynchronous operations such as `fetch`. It provides a `signal` passed to the request and an `abort()` method to cancel it.

## 159. How do you avoid updating state after unmounting?

Cancel the request in cleanup with `AbortController`, or use an ignore flag so the response does not call `setState` after the component is gone.

## 160. How do you call multiple APIs in parallel?

Use `Promise.all` when all requests must succeed.

```jsx
const [users, roles] = await Promise.all([fetchUsers(), fetchRoles()]);
```

## 161. Promise.all versus Promise.allSettled.

`Promise.all` rejects as soon as one promise rejects. `Promise.allSettled` waits for every promise and returns success or failure for each one. Use `allSettled` when partial data is acceptable.

## 162. Sequential versus parallel API calls.

Use sequential calls when one request depends on the previous response. Use parallel calls when requests are independent and can run at the same time.

## 163. How do you implement pagination?

Keep page number, page size, total count, loading state, and current results. Send page parameters to the API and update the list when the user changes page.

## 164. How do you implement infinite scrolling?

Load the first page, detect when the user nears the bottom using scroll events or `IntersectionObserver`, then fetch and append the next page. Stop when there is no next page.

## 165. How do you implement search suggestions?

Store the search text, debounce API calls, cancel outdated requests, show loading and empty states, and make suggestions keyboard accessible.

## 166. How do you debounce API requests?

Delay the API call until the user stops typing for a short time. Clear the previous timeout on each input change.

## 167. How do you cache API responses?

Use a server-state library such as TanStack Query or RTK Query, or build a cache keyed by request parameters. Include invalidation and stale-data rules.

## 168. How do you prevent duplicate API requests?

Use request deduplication from TanStack Query or RTK Query, disable submit buttons during requests, cache in-flight promises, or centralize request handling.

## 169. How do you attach an authorization token?

Add an `Authorization` header in the API service layer.

```jsx
fetch("/api/profile", {
  headers: { Authorization: `Bearer ${token}` }
});
```

## 170. How do Axios interceptors work?

Axios interceptors run before requests or after responses. Request interceptors can attach tokens. Response interceptors can centralize error handling, refresh tokens, or log failures.

## 171. How do you refresh an expired access token?

When an API returns 401 due to expiry, call the refresh endpoint, store the new access token, and retry the original request. If refresh fails, log the user out.

## 172. What happens when several requests fail with 401 simultaneously?

Without coordination, each request may try to refresh the token. Use a shared refresh promise or queue so only one refresh happens and the other requests wait, then retry with the new token.

## 173. How do you centralize API error handling?

Create a reusable API client or service layer that normalizes errors, handles status codes, logs details, and returns consistent error objects to the UI.

## 174. How do you handle 400, 401, 403, 404, 409 and 500 responses?

Handle `400` as validation or bad request, `401` as unauthenticated, `403` as forbidden, `404` as not found, `409` as conflict, and `500` as a server error. Show user-friendly messages and log details where appropriate.

## 175. How do you handle optimistic concurrency errors?

A concurrency error happens when data changed on the server after the user loaded it. Show a conflict message, refetch the latest data, and let the user retry, overwrite, or merge changes depending on the workflow.

## 176. How do you handle API timeouts?

Use Axios timeout support or combine `fetch` with `AbortController` and a timer. Show a retry option and avoid leaving the UI stuck in loading state.

## 177. How do you show partial data when one request fails?

Use independent loading/error states or `Promise.allSettled`. Render successful sections and show an error or retry action only for the failed section.

## 178. How do you design a reusable API service layer?

Create a centralized client for base URL, headers, auth, error normalization, timeout behavior, and response parsing. Keep endpoint functions small and typed where possible.

## React Router Interview Questions

## 179. What is client-side routing?

Client-side routing changes the visible page in the browser without requesting a new HTML document from the server. JavaScript updates the UI based on the URL.

## 180. How does React Router work?

React Router matches the current URL to route definitions and renders the matching components. It also provides hooks for navigation, route parameters, query strings, nested layouts, and route state.

## 181. BrowserRouter versus HashRouter.

`BrowserRouter` uses the HTML5 history API and clean URLs like `/users/1`. It requires server configuration to return the app for unknown routes. `HashRouter` uses URLs like `/#/users/1` and works without server route configuration.

## 182. What are Routes and Route?

`Routes` is the container that finds the best matching route. `Route` defines a path and the element to render.

```jsx
<Routes>
  <Route path="/users/:id" element={<UserPage />} />
</Routes>
```

## 183. What is an outlet?

`Outlet` is a placeholder where child routes render inside a parent layout.

```jsx
function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
```

## 184. What are nested routes?

Nested routes are routes defined inside parent routes. They allow shared layouts and child pages to render through `Outlet`.

## 185. How do you access route parameters?

Use `useParams`.

```jsx
const { id } = useParams();
```

## 186. Query parameters versus route parameters.

Route parameters identify a resource, such as `/users/42`. Query parameters represent optional filters or UI state, such as `/users?page=2&sort=name`.

## 187. How do you navigate programmatically?

Use `useNavigate`.

```jsx
const navigate = useNavigate();
navigate("/dashboard");
```

## 188. What is useNavigate?

`useNavigate` is a React Router hook that returns a function for changing routes from code, such as after login or form submission.

## 189. What is useLocation?

`useLocation` returns the current location object, including `pathname`, `search`, `hash`, and navigation `state`.

## 190. How do you create a protected route?

Check authentication before rendering private content. Redirect unauthenticated users to login.

```jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
```

## 191. How do you handle unauthorized access?

For unauthenticated users, redirect to login. For authenticated users without permission, show a forbidden page or redirect to a safe route.

## 192. How do you preserve the requested URL after login?

Pass the current location in route state before redirecting to login, then navigate back after successful login.

```jsx
<Navigate to="/login" state={{ from: location }} replace />
```

## 193. How do you lazy-load routes?

Use dynamic imports with `React.lazy` and `Suspense`, or React Router's lazy route APIs.

```jsx
const Dashboard = lazy(() => import("./Dashboard"));
```

## 194. How do you create a 404 page?

Add a catch-all route using `*`.

```jsx
<Route path="*" element={<NotFound />} />
```

## 195. How do you prevent navigation with unsaved changes?

Track dirty form state and use a router blocker for in-app navigation. Use `beforeunload` for browser refresh or tab close.

## 196. How do you pass state during navigation?

Pass a `state` object to `navigate` or `Link`.

```jsx
navigate("/checkout", { state: { fromCart: true } });
```

Read it with `useLocation()`.

## 197. How do you define role-based routes?

Store the user's roles or permissions and check them before rendering the route. Show forbidden UI or redirect when the user lacks permission.

## 198. How do you handle browser refresh on a React route?

Configure the server to serve the React app's `index.html` for all client-side routes. Without this, refreshing `/dashboard` may return a server 404.

## React Security Interview Questions

## 199. What is cross-site scripting?

Cross-site scripting, or XSS, is a vulnerability where an attacker injects malicious JavaScript into a page viewed by other users. The script can steal tokens, read sensitive data, change page content, or perform actions as the user.

## 200. How does React reduce XSS risks?

React escapes values rendered in JSX by default. If an API returns a string like `<script>alert(1)</script>`, React renders it as text instead of executing it.

```jsx
<p>{comment}</p>
```

This default escaping reduces XSS risk, but it does not make the app automatically safe in every situation.

## 201. What is dangerouslySetInnerHTML?

`dangerouslySetInnerHTML` is React's way to insert raw HTML into the DOM.

```jsx
<div dangerouslySetInnerHTML={{ __html: html }} />
```

It is named dangerously because React will not escape that HTML for you.

## 202. When is dangerouslySetInnerHTML unsafe?

It is unsafe when the HTML comes from users, CMS content, query parameters, third-party APIs, or any untrusted source without sanitization. Attackers can inject scripts, event handlers, dangerous URLs, or malicious markup.

## 203. How do you sanitize HTML?

Use a trusted sanitizer library such as DOMPurify before rendering raw HTML. Sanitization removes dangerous tags, attributes, and URLs while preserving safe markup.

```jsx
const safeHtml = DOMPurify.sanitize(htmlFromApi);
return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
```

Sanitize on the backend when possible, and sanitize again on the frontend if untrusted HTML must be rendered.

## 204. What is CSRF?

Cross-site request forgery, or CSRF, is an attack where a malicious site causes a user's browser to send an unwanted authenticated request to another site where the user is logged in.

## 205. When is a React application vulnerable to CSRF?

A React app is vulnerable when authentication is based on cookies that the browser sends automatically and the backend accepts state-changing requests without CSRF protection. This is especially important for POST, PUT, PATCH, and DELETE requests.

## 206. How do anti-forgery tokens work?

The server creates a unique CSRF token and the frontend sends it with state-changing requests, often in a header. The backend validates that the token matches the user's session. A malicious third-party site cannot read the token, so it cannot create a valid forged request.

## 207. What is CORS?

CORS, or Cross-Origin Resource Sharing, is a browser security policy that controls whether JavaScript from one origin can read responses from another origin.

## 208. Is CORS a security mechanism for protecting APIs from all clients?

No. CORS is enforced by browsers. It does not stop non-browser clients like curl, Postman, scripts, or servers from calling an API. APIs must still enforce authentication, authorization, validation, and rate limiting on the backend.

## 209. What is Content Security Policy?

Content Security Policy, or CSP, is a browser security header that restricts which scripts, styles, images, frames, and other resources can load. A strong CSP can reduce the impact of XSS by blocking inline scripts and untrusted sources.

## 210. Where should JWT tokens be stored?

There is no one-size-fits-all answer. For sensitive long-lived tokens, avoid localStorage because injected JavaScript can read it. When the backend supports it, prefer Secure, HttpOnly, SameSite cookies with CSRF protection. Short-lived access tokens in memory can also reduce exposure.

## 211. Local storage versus session storage versus secure cookies.

`localStorage` persists until cleared and is readable by JavaScript. `sessionStorage` lasts for the browser tab session and is also readable by JavaScript. Secure HttpOnly cookies can be sent automatically by the browser and cannot be read by JavaScript, but they require CSRF protection when used for authentication.

## 212. What are HttpOnly, Secure and SameSite cookie attributes?

`HttpOnly` prevents JavaScript from reading the cookie. `Secure` sends the cookie only over HTTPS. `SameSite` controls whether cookies are sent with cross-site requests and helps reduce CSRF risk.

## 213. Can frontend route guards provide real authorization?

No. Frontend route guards improve user experience by hiding or redirecting UI, but users can bypass frontend code. They are not a security boundary.

## 214. Why must authorization be checked by the backend?

The backend controls the protected data and operations. It must verify the user's identity, roles, permissions, and ownership for every protected request because frontend code can be modified or bypassed.

## 215. How do you avoid exposing sensitive configuration?

Keep secrets such as API private keys, database credentials, signing keys, and service tokens on the server. Only expose public configuration needed by the frontend, such as public API base URLs or public analytics IDs.

## 216. Are environment variables in a React bundle secret?

No. Environment variables embedded into a React build become part of the JavaScript bundle and can be inspected by users. Only put public values in frontend environment variables.

## 217. How do you protect against dependency vulnerabilities?

Keep dependencies updated, remove unused packages, use lockfiles, run security audits, review high-risk packages, avoid abandoned libraries, and monitor advisories. Also limit dependency permissions and avoid blindly running unknown scripts.

## 218. What is clickjacking?

Clickjacking is an attack where a malicious site embeds your app in a hidden or disguised frame and tricks users into clicking something unintended. Defend with headers like `Content-Security-Policy: frame-ancestors` or `X-Frame-Options`.

## 219. What is open redirect vulnerability?

An open redirect happens when an app redirects users to a URL controlled by user input without validation. Attackers can use it for phishing by making malicious links look like trusted app links.

## 220. How do you prevent sensitive information from appearing in logs?

Do not log passwords, tokens, cookies, full authorization headers, personal data, payment data, or secret config. Redact sensitive fields, centralize logging, review error reporting tools, and avoid logging entire request or response objects.

## 221. How do you safely render data received from an API?

Render API strings through JSX interpolation so React escapes them. Validate and normalize API data before use. Do not pass untrusted values into `dangerouslySetInnerHTML`, URLs, scripts, or inline event handlers without validation and sanitization.

## 222. How do you implement session timeout?

Track token expiry or session expiry, warn the user before timeout, clear client auth state on expiry, redirect to login, and let the backend reject expired sessions. For activity-based timeout, update last-active time on user actions and coordinate with backend session rules.

## 223. How do you handle refresh-token rotation?

On each refresh, the server issues a new refresh token and invalidates the previous one. The frontend should handle refresh responses, retry failed requests after successful refresh, log out if refresh fails, and avoid running multiple simultaneous refresh calls by using a shared refresh promise or queue.

## 224. Strong answer about tokens.

A strong interview answer:

I avoid storing long-lived sensitive tokens in localStorage because injected JavaScript can read them. When the backend design permits, I prefer Secure, HttpOnly, SameSite cookies combined with CSRF protection. Regardless of frontend controls, the backend must validate authentication and authorization on every protected operation.

## React Application Architecture Interview Questions

## 225. How would you structure a large React application?

A large React application should be structured around clear ownership, predictable boundaries, and maintainability. I usually separate app bootstrapping, routes, feature modules, shared UI, shared utilities, API services, configuration, and tests.

Example:

```txt
src/
  app/
    App.jsx
    router.jsx
    providers.jsx
    store.js
  features/
    auth/
      components/
      hooks/
      services/
      authSlice.js
    interviews/
      components/
      hooks/
      services/
      pages/
  shared/
    components/
    hooks/
    utils/
  services/
    apiClient.js
    errorService.js
    telemetryService.js
  config/
    env.js
    featureFlags.js
```

The `app` folder owns application setup. The `features` folder owns business modules. The `shared` folder contains generic reusable code. The `services` folder contains cross-application integrations. A good structure should make it obvious where to add a new screen, API call, reusable component, route, or business rule.

## 226. Feature-based versus layer-based folder structure.

A layer-based structure groups files by technical type, such as `components`, `hooks`, `services`, `pages`, and `utils`. It is simple for small apps, but in a large app one feature becomes scattered across many folders.

A feature-based structure groups files by business capability:

```txt
features/
  interviews/
    components/
    hooks/
    services/
    pages/
    interviewSlice.js
```

Feature-based structure usually scales better because related files stay together. Each feature can own its UI, API calls, state, tests, and routing. A practical large app often uses a hybrid: feature-based organization for product areas, and layer-based organization inside each feature.

## 227. How do you create reusable components?

Reusable components should have a clear responsibility, a small public API, and no dependency on feature-specific business logic. They should accept data through props, expose events through callbacks, support composition through `children` or slots, and handle accessibility internally where possible.

Example:

```jsx
function Button({ variant = "primary", size = "md", loading = false, children, onClick }) {
  return (
    <button className={`btn btn-${variant} btn-${size}`} disabled={loading} onClick={onClick}>
      {loading ? "Loading..." : children}
    </button>
  );
}
```

This button is reusable because it knows button behavior and styling, but it does not know whether it is used for login, checkout, or scheduling. Avoid extracting components too early. If a component is used once, keep it local until a real reuse pattern appears.

## 228. How do you prevent a shared component library from becoming difficult to maintain?

A shared component library becomes hard to maintain when it collects one-off props, product-specific behavior, inconsistent styling, and undocumented edge cases. Keep it maintainable by making components generic, accessible, documented, tested, and owned by clear maintainers.

Prefer composition over many special-case props.

Bad:

```jsx
<Modal isCheckout isProfileEdit showInterviewWarning useLegacyFooter />
```

Better:

```jsx
<Modal title="Delete interview">
  <DeleteInterviewContent />
  <ModalFooter>
    <Button variant="secondary">Cancel</Button>
    <Button variant="danger">Delete</Button>
  </ModalFooter>
</Modal>
```

The library should provide reliable building blocks. Product teams should compose those blocks for specific workflows. Deprecate old APIs carefully, review new additions strictly, and remove stale variants after migration.

## 229. Smart versus presentational components.

Smart components know about data fetching, routing, permissions, state, effects, or business rules. Presentational components focus on rendering UI from props.

Smart component:

```jsx
function UserProfilePage() {
  const { userId } = useParams();
  const { data, isLoading, error } = useUserProfile(userId);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return <UserProfileCard user={data} />;
}
```

Presentational component:

```jsx
function UserProfileCard({ user }) {
  return <section><h2>{user.name}</h2><p>{user.email}</p></section>;
}
```

This separation improves reuse and testing. Modern React does not require a strict split everywhere, but the principle is useful: keep UI components pure when possible and move side effects or complex behavior into hooks, services, or container components.

## 230. How do you separate business logic from UI?

Move business rules, transformations, permissions, API calls, and workflow decisions out of JSX-heavy components. Use custom hooks for reusable stateful behavior, service modules for APIs, utility functions for pure transformations, stores or reducers for state transitions, and domain modules for business rules.

Example:

```jsx
function InterviewSummary({ interview }) {
  const statusLabel = getInterviewStatusLabel(interview.status);
  const canReschedule = canRescheduleInterview(interview);

  return (
    <Card>
      <h3>{interview.candidateName}</h3>
      <p>{statusLabel}</p>
      {canReschedule && <Button>Reschedule</Button>}
    </Card>
  );
}
```

```jsx
function canRescheduleInterview(interview) {
  return interview.status === "scheduled" && !interview.isLocked;
}
```

This makes rules easier to test without rendering React components and keeps UI code easier to read.

## 231. What is a custom hook's responsibility?

A custom hook is responsible for reusable stateful logic. It can use React hooks internally and return state, derived values, and actions to a component. Good custom hooks encapsulate behavior such as data loading, subscriptions, forms, dialogs, debouncing, browser APIs, permissions, or feature flags.

Example:

```jsx
function useDisclosure(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((value) => !value)
  };
}
```

A custom hook should not return JSX. It should not become a dumping ground for unrelated logic. Its API should be small and named around behavior, such as `useAuth`, `useDebouncedValue`, `useInterviewDetails`, or `useFeatureFlag`.

## 232. How do you design an API service layer?

An API service layer centralizes HTTP communication so components do not directly manage URLs, headers, parsing, authentication, retries, timeouts, or error normalization.

Typical structure:

```txt
services/
  apiClient.js
features/
  interviews/
    services/
      interviewApi.js
```

The common client handles shared behavior:

```jsx
async function request(path, options = {}) {
  const response = await fetch(`${config.apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
      ...options.headers
    }
  });

  if (!response.ok) {
    throw await normalizeApiError(response);
  }

  return response.json();
}
```

Feature services expose business-friendly functions:

```jsx
export function getInterview(id) {
  return request(`/interviews/${id}`);
}

export function updateInterview(id, payload) {
  return request(`/interviews/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
}
```

This keeps components clean, makes errors consistent, centralizes auth behavior, and isolates backend contract changes.

## 233. How do you handle cross-cutting concerns?

Cross-cutting concerns are behaviors used across many features: authentication, authorization, logging, telemetry, error handling, feature flags, internationalization, theming, caching, and notifications.

Handle them with shared infrastructure instead of duplicating logic in every component. Use React providers for app-wide context, API client middleware for headers and errors, route guards for protected pages, error boundaries for rendering failures, a shared notification layer for toasts, and a telemetry service for analytics and performance events.

Example:

```jsx
function AppProviders({ children }) {
  return (
    <ConfigProvider>
      <AuthProvider>
        <FeatureFlagProvider>
          <I18nProvider>
            <TelemetryProvider>{children}</TelemetryProvider>
          </I18nProvider>
        </FeatureFlagProvider>
      </AuthProvider>
    </ConfigProvider>
  );
}
```

The main idea is to make common behavior available consistently while keeping individual feature components focused.

## 234. How do you centralize error handling?

Centralized error handling means errors are normalized, logged, displayed, and recovered from consistently. A good React app usually handles errors at several levels.

Use the API client to convert HTTP errors into consistent objects. Use error boundaries to catch rendering failures. Use form components to show validation errors near fields. Use a notification system for generic failures. Use telemetry to report unexpected errors. Use route-level error pages for not found, forbidden, or failed route loading states.

Example:

```jsx
class ApiError extends Error {
  constructor({ status, code, message, details }) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
```

The UI should not need to understand every backend error shape. It should receive predictable errors and decide whether to show an inline message, toast, retry button, fallback page, or redirect. Log technical details for developers, but show simple and safe messages to users.

## 235. How do you implement feature flags?

Feature flags allow functionality to be turned on or off without deploying new code. They are useful for gradual rollouts, beta programs, A/B tests, kill switches, and environment-specific behavior.

Implementation options include build-time environment flags, runtime flags loaded from an API, or third-party systems such as LaunchDarkly, ConfigCat, or Unleash. Runtime flags are more flexible because they can target users, roles, tenants, regions, or rollout percentages.

Example:

```jsx
function useFeatureFlag(flagName) {
  const flags = useContext(FeatureFlagContext);
  return Boolean(flags[flagName]);
}

function Dashboard() {
  const showNewAnalytics = useFeatureFlag("newAnalytics");
  return showNewAnalytics ? <NewAnalytics /> : <OldAnalytics />;
}
```

Good practices: define defaults, keep flag names consistent, avoid deeply nested flag checks, remove stale flags after rollout, and never rely on frontend-only flags for security-sensitive access control.

## 236. How do you support multiple environments?

Multiple environments usually include local, development, QA, staging, production, and preview environments. Support them by separating environment-specific configuration from source code.

Common environment-specific values include API base URL, authentication domain, analytics key, feature flag client key, logging level, CDN URL, monitoring DSN, and build mode.

Example:

```txt
.env.local
.env.development
.env.staging
.env.production
```

```jsx
export const config = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
  environment: import.meta.env.VITE_APP_ENV,
  telemetryKey: import.meta.env.VITE_TELEMETRY_KEY
};
```

Important rule: frontend environment variables are not secrets. Anything bundled into frontend JavaScript can be inspected by users. For runtime flexibility, load public configuration from a deployment-generated `config.json` so the same build artifact can run in different environments.

## 237. How do you manage application configuration?

Application configuration should be centralized, validated, and easy to access. Avoid reading raw environment variables throughout the app.

Recommended approach: create a `config` module, read environment or runtime values in one place, validate required values at startup, expose clearly named fields, and keep secrets out of frontend config.

Example:

```jsx
function required(value, name) {
  if (!value) {
    throw new Error(`Missing required config: ${name}`);
  }

  return value;
}

export const config = {
  apiBaseUrl: required(import.meta.env.VITE_API_BASE_URL, "VITE_API_BASE_URL"),
  appEnv: import.meta.env.VITE_APP_ENV || "local",
  enableTelemetry: import.meta.env.VITE_ENABLE_TELEMETRY === "true"
};
```

This makes misconfiguration fail early, keeps tests easier to mock, and prevents components from depending directly on build-tool details.

## 238. How do you implement micro-frontends?

Micro-frontends split a frontend application into independently owned and independently deployable parts. Each micro-frontend usually belongs to a team or business domain.

Common implementation approaches include Module Federation, Single-SPA, Web Components, iframe integration, server-side composition, or route-based composition.

Example route split:

```txt
/dashboard   -> shell app
/billing     -> billing micro-frontend
/interviews  -> interviews micro-frontend
/admin       -> admin micro-frontend
```

A typical architecture includes a shell application, shared authentication, shared routing conventions, a shared design system, telemetry, error reporting, dependency version strategy, clear communication contracts, and independent CI/CD pipelines.

Micro-frontends should be introduced for organizational and deployment reasons, not just because an app is large. Many applications are better served by a modular monolith frontend with strong feature boundaries.

## 239. What are the advantages and disadvantages of micro-frontends?

Advantages:

- Teams can work independently.
- Features can be deployed separately.
- Different areas can use different release cycles.
- Legacy and modern stacks can coexist during migration.
- Large applications can scale across many teams.
- Ownership boundaries become clearer.

Disadvantages:

- More operational complexity.
- Harder dependency management.
- Possible duplicate JavaScript bundles.
- Consistent styling and UX are harder to maintain.
- Shared state and routing become more complex.
- Cross-app testing is harder.
- Performance can suffer if composition is not designed carefully.
- Production debugging may require tracing across multiple apps.

Micro-frontends are useful when team independence and deployment autonomy are worth the added complexity. They are usually not the first choice for small or medium applications.

## 240. How do micro-frontends communicate?

Micro-frontends should communicate through explicit and stable contracts. Avoid tight coupling where one app imports private modules from another app.

Common communication methods:

- URL and route parameters.
- Backend APIs.
- Custom DOM events.
- Event bus.
- Shared state exposed by the shell.
- Module Federation exposed functions.
- Browser storage for limited non-sensitive data.
- `postMessage` for iframe-based micro-frontends.

Example:

```jsx
window.dispatchEvent(
  new CustomEvent("cart:item-added", {
    detail: { productId: "123" }
  })
);
```

Listener:

```jsx
useEffect(() => {
  function handleItemAdded(event) {
    refreshCart(event.detail.productId);
  }

  window.addEventListener("cart:item-added", handleItemAdded);
  return () => window.removeEventListener("cart:item-added", handleItemAdded);
}, []);
```

Keep communication minimal. If micro-frontends constantly need each other's internal state, the boundaries may be wrong.

## 241. How do you avoid dependency duplication?

Dependency duplication happens when multiple apps bundle their own copies of React, React DOM, UI libraries, utility packages, or design-system packages.

Ways to reduce duplication:

- Configure shared dependencies in Module Federation.
- Mark React and React DOM as singletons.
- Align dependency versions across teams.
- Use peer dependencies for shared component libraries.
- Use a monorepo with workspace dependency management when appropriate.
- Run bundle analysis in CI.
- Avoid importing heavy libraries for small tasks.
- Share stable, heavy, common dependencies while keeping feature-specific dependencies local.

Example:

```js
shared: {
  react: { singleton: true, requiredVersion: "^18.0.0" },
  "react-dom": { singleton: true, requiredVersion: "^18.0.0" }
}
```

Do not share everything automatically. Over-sharing can reduce team independence and make deployments fragile.

## 242. How do you migrate a legacy frontend to React?

Legacy migration should be incremental and risk-controlled. Rewriting the whole frontend at once is usually expensive and risky.

A common strategy:

1. Identify boundaries such as pages, widgets, or routes.
2. Add React to the existing app or create a React shell.
3. Migrate one isolated area first.
4. Share authentication, routing, and styling carefully.
5. Build adapters between legacy code and React.
6. Add tests around critical workflows.
7. Replace legacy screens gradually.
8. Remove legacy dependencies after usage reaches zero.

Patterns include strangler migration, route-by-route migration, widget embedding, or micro-frontend migration.

Example mounting React inside a legacy page:

```jsx
const rootElement = document.getElementById("react-interview-widget");

if (rootElement) {
  createRoot(rootElement).render(<InterviewWidget />);
}
```

The key is to keep the product working while the migration happens.

## 243. How do you maintain backward compatibility?

Backward compatibility means new frontend code continues to work with existing users, URLs, APIs, data formats, browser support expectations, analytics, and integrations.

Techniques:

- Keep old routes redirecting to new routes.
- Support old API response fields during transition.
- Use feature flags for gradual rollout.
- Avoid breaking shared component APIs without deprecation.
- Version API contracts when needed.
- Add compatibility adapters.
- Keep analytics event names stable or migrate them deliberately.
- Test important legacy workflows.

Example adapter:

```jsx
function normalizeUser(apiUser) {
  return {
    id: apiUser.id,
    name: apiUser.name || apiUser.fullName,
    email: apiUser.emailAddress || apiUser.email
  };
}
```

Compatibility should not mean carrying old code forever. Define a deprecation plan and remove compatibility code after the migration window ends.

## 244. How do you design a reusable component library?

A reusable component library should provide consistent, accessible, themeable, documented building blocks for applications.

Core decisions:

- Define design tokens for color, spacing, typography, radius, shadows, and motion.
- Build primitives such as Button, Input, Select, Checkbox, Modal, Tabs, Tooltip, and Table.
- Support composition through `children`, slots, or render props.
- Keep components controlled when state must be owned by the app.
- Provide uncontrolled variants only when they simplify common usage.
- Ensure keyboard and screen reader accessibility.
- Support theming and dark mode if needed.
- Publish versions carefully.
- Include Storybook stories and usage documentation.
- Add tests for behavior and accessibility.

Example API:

```jsx
<Button variant="primary" size="md" onClick={save}>
  Save
</Button>

<TextField
  label="Email"
  value={email}
  error={errors.email}
  onChange={setEmail}
/>
```

Avoid making the library too product-specific. Domain-specific components can live in a separate product component package.

## 245. How do you document components?

Component documentation should explain what the component does, when to use it, what props it accepts, accessibility behavior, and common examples.

Good documentation includes purpose, basic usage, variants, states, prop tables, keyboard interactions, accessibility notes, design guidelines, edge cases, and migration notes for breaking changes.

Example structure:

```md
# Button

Use Button for primary user actions.

## Examples
## Variants
## Props
## Accessibility
## Guidelines
```

Documentation should stay close to the source code so it evolves with the component. Storybook is commonly used because it makes component examples interactive and easy for developers, QA, and designers to review.

## 246. What is Storybook?

Storybook is a tool for developing, testing, and documenting UI components in isolation. It lets developers create stories that show components in different states without running the full application.

Example:

```jsx
export default {
  title: "Components/Button",
  component: Button
};

export const Primary = {
  args: {
    variant: "primary",
    children: "Save"
  }
};

export const Loading = {
  args: {
    variant: "primary",
    loading: true,
    children: "Saving"
  }
};
```

Storybook helps with design-system development, visual review, edge-case testing, documentation, accessibility checks, and visual regression testing.

## 247. How do you maintain accessibility across a design system?

Accessibility should be built into shared components rather than fixed separately on every screen.

Practices:

- Use semantic HTML by default.
- Provide accessible labels and descriptions.
- Ensure keyboard navigation works.
- Maintain visible focus states.
- Meet color contrast requirements.
- Support screen reader announcements for dynamic content.
- Use ARIA only when semantic HTML is not enough.
- Test components with tools such as axe.
- Document keyboard interactions in Storybook.
- Include disabled, error, loading, and empty states.

Examples: a modal should trap focus, close on Escape, restore focus after closing, and have an accessible title. A form field should connect label, input, help text, and error message. Complex widgets such as menus, tabs, and comboboxes should follow established ARIA patterns.

## 248. How do you enforce coding standards?

Coding standards are enforced through tooling, automation, documentation, and code review.

Common tools:

- ESLint for code quality rules.
- Prettier for formatting.
- TypeScript for type safety.
- Stylelint for CSS rules.
- Husky or Lefthook for pre-commit checks.
- lint-staged for changed-file checks.
- CI pipelines for linting, tests, type checks, and builds.
- Shared editor settings.

Example checks:

```txt
npm run lint
npm run typecheck
npm run test
npm run build
```

Standards should focus on preventing real problems. Formatting should be automated so reviews can focus on behavior, architecture, accessibility, performance, and correctness.

## 249. How do you review frontend pull requests?

A frontend pull request review should check correctness, maintainability, user experience, accessibility, performance, security, and test coverage.

Review checklist:

- Does the implementation satisfy the requirement?
- Are edge cases handled?
- Is state located in the right place?
- Are API calls centralized and errors handled?
- Are loading, empty, and error states present?
- Are components reusable without being over-abstracted?
- Is the UI keyboard and screen-reader accessible?
- Is the code consistent with existing patterns?
- Are meaningful tests included?
- Does the change affect bundle size or performance?
- Are feature flags or rollout controls needed?
- Is sensitive data protected?

Good review comments are specific, kind, and tied to risk.

Example:

```txt
This component calls the API directly, while the rest of the feature uses interviewApi.js.
Moving this request into the service layer would keep auth headers and error handling consistent.
```

## 250. How do you handle internationalization?

Internationalization, or i18n, means designing the application so it can support multiple languages and regions.

Common approach:

- Use a library such as react-i18next, FormatJS, or Lingui.
- Store translated strings in locale files.
- Avoid hardcoded user-facing text in components.
- Support interpolation and pluralization.
- Format dates, numbers, and currency by locale.
- Load only the active locale to reduce bundle size.
- Include translation keys in review workflows.

Example:

```jsx
const { t } = useTranslation();
return <h1>{t("dashboard.title")}</h1>;
```

Do not concatenate translated sentence fragments because word order differs across languages.

Bad:

```jsx
t("hello") + " " + userName
```

Better:

```jsx
t("greeting", { name: userName })
```

## 251. How do you support right-to-left layouts?

Right-to-left, or RTL, support is needed for languages such as Arabic, Hebrew, Persian, and Urdu.

Key practices:

- Set the `dir` attribute based on locale.
- Use CSS logical properties instead of hardcoded left and right.
- Test layouts in RTL mode.
- Mirror directional icons where appropriate.
- Avoid hardcoded text alignment.
- Ensure menus, drawers, tables, and carousels behave correctly.

Example:

```jsx
<html lang="ar" dir="rtl">
```

Use logical CSS:

```css
.card {
  padding-inline-start: 16px;
  padding-inline-end: 16px;
  margin-inline-start: 8px;
}
```

Instead of:

```css
.card {
  padding-left: 16px;
  margin-left: 8px;
}
```

RTL support should be visually tested because layout problems often appear only when direction changes.

## 252. How do you handle date and currency localisation?

Date and currency localization should use the user's locale, region, timezone, and currency rules instead of hardcoded formats. Use the browser `Intl` APIs or a well-maintained date library when needed.

Date example:

```jsx
const formatter = new Intl.DateTimeFormat(locale, {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: userTimeZone
});

formatter.format(new Date(interview.startsAt));
```

Currency example:

```jsx
const formatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "INR"
});

formatter.format(1200);
```

Important rules: store dates consistently, usually as UTC or ISO 8601; convert to local timezone only for display; avoid ambiguous formats such as `01/02/2026`; keep currency as amount plus currency code; and do not assume currency from language alone.

## 253. How do you instrument frontend telemetry?

Frontend telemetry collects useful signals about application behavior, performance, errors, and user journeys.

Common telemetry includes page views, route changes, user actions, conversion events, API failures, JavaScript errors, web vitals, performance timings, feature flag exposure, and form abandonment.

Good telemetry design:

- Create a central telemetry service.
- Define event names and schemas.
- Avoid logging sensitive data.
- Include context such as route, environment, build version, and user role.
- Respect consent and privacy rules.
- Batch or throttle events when needed.
- Correlate frontend events with backend request IDs.

Example:

```jsx
telemetry.track("interview_scheduled", {
  interviewType: "technical",
  source: "dashboard"
});
```

For performance:

```jsx
import { onCLS, onINP, onLCP } from "web-vitals";

onCLS(sendToTelemetry);
onINP(sendToTelemetry);
onLCP(sendToTelemetry);
```

Telemetry should answer real operational questions. Avoid collecting random data without a clear use.

## 254. How do you investigate a production-only frontend issue?

A production-only issue should be investigated systematically because local reproduction may not show the problem.

Steps:

1. Confirm user impact, browser, route, tenant, role, locale, device, and time window.
2. Check monitoring for JavaScript errors, failed API calls, and performance spikes.
3. Compare production configuration with staging or local configuration.
4. Check recent deployments, feature flag changes, and backend changes.
5. Use source maps to map minified stack traces back to source code.
6. Inspect network requests and response payloads if reproducible.
7. Check browser differences, extensions, CDN caching, and service workers.
8. Correlate frontend telemetry with backend logs using request IDs.
9. Reproduce with the same permissions, locale, data shape, and flags.
10. Roll back, disable a flag, or hotfix if user impact is high.
11. Add a regression test after fixing the issue.

Common causes include different environment variables, minification issues, CDN cache problems, missing source maps, production-only flags, unexpected real user data, browser differences, race conditions, third-party failures, and service worker cache bugs.

A strong answer should mention both debugging and mitigation. In production, reducing user impact is often as important as finding the root cause.
