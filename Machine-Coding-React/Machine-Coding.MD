# Machine Coding React Components

## 23. Components You May Be Asked To Build

## 1. Counter

Build a counter with increment, decrement, and reset buttons.

Expected answer:
- Store the count in `useState`.
- Use functional updates when the next value depends on the previous value.
- Disable decrement if a minimum value is required.

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount((c) => c - 1)}>-</button>
      <button onClick={() => setCount(0)}>Reset</button>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </div>
  );
}
```

## 2. Todo application

Build a todo app where users can add, complete, delete, and filter todos.

Expected answer:
- Store todos as an array of objects with `id`, `text`, and `completed`.
- Use controlled input for the new todo.
- Use stable IDs as keys.
- Support filters like all, active, and completed.

## 3. Search with debounce

Build a search input that waits before calling the API or filtering data.

Expected answer:
- Store the input value in state.
- Use a debounced value or timer.
- Clear the previous timeout in cleanup.
- Cancel stale API requests if needed.

```jsx
useEffect(() => {
  const timerId = setTimeout(() => {
    setDebouncedSearch(search);
  }, 500);

  return () => clearTimeout(timerId);
}, [search]);
```

## 4. Autocomplete component

Build an input that shows suggestions while the user types.

Expected answer:
- Debounce user input.
- Show loading, empty, and error states.
- Support keyboard navigation with arrow keys and Enter.
- Close suggestions on outside click or selection.
- Highlight the active suggestion.

## 5. Pagination component

Build pagination controls for a list.

Expected answer:
- Track current page and page size.
- Calculate total pages from total items.
- Disable previous on first page and next on last page.
- Fetch or slice data based on page.

```jsx
const totalPages = Math.ceil(totalItems / pageSize);
```

## 6. Infinite-scroll list

Build a list that loads more items when the user reaches the bottom.

Expected answer:
- Track items, page/cursor, loading, error, and `hasMore`.
- Use `IntersectionObserver` with a sentinel element.
- Prevent duplicate requests while loading.
- Stop observing when there is no more data.

## 7. Modal dialog

Build a reusable modal.

Expected answer:
- Render conditionally based on `isOpen`.
- Close on overlay click, Escape key, or close button.
- Trap focus inside the modal for accessibility.
- Restore focus when the modal closes.
- Use a portal for rendering outside parent layout constraints.

## 8. Accordion

Build expandable and collapsible sections.

Expected answer:
- Store the active item ID or a set of open IDs.
- Support single-open or multi-open behavior.
- Use buttons for headers.
- Add `aria-expanded` and `aria-controls`.

## 9. Tabs

Build tabs that switch between panels.

Expected answer:
- Store the active tab ID.
- Render tab buttons and the matching panel.
- Support keyboard navigation with arrow keys.
- Use proper roles: `tablist`, `tab`, and `tabpanel`.

## 10. Star-rating component

Build a component where users can select a rating.

Expected answer:
- Accept max rating and current value as props.
- Support hover preview and selected value.
- Call `onChange` when a star is selected.
- Make stars keyboard accessible.

## 11. Stopwatch

Build a stopwatch with start, pause, reset, and elapsed time display.

Expected answer:
- Store elapsed time and running state.
- Use `setInterval` inside `useEffect`.
- Clear interval on pause and unmount.
- Format milliseconds into minutes, seconds, and milliseconds.

## 12. Countdown timer

Build a timer that counts down from a given duration.

Expected answer:
- Store remaining time in state.
- Decrease time with an interval.
- Stop at zero.
- Clear the interval in cleanup.
- Support start, pause, reset, and optional completion callback.

## 13. Progress bar

Build a progress bar that displays completion percentage.

Expected answer:
- Accept `value`, `min`, and `max` props.
- Clamp the value between min and max.
- Calculate percentage.
- Add accessible attributes like `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, and `aria-valuemax`.

## 14. File-upload component

Build a file uploader.

Expected answer:
- Use `<input type="file" />`.
- Validate file type and size.
- Submit using `FormData`.
- Show selected file name, upload progress, success, and error states.

```jsx
const formData = new FormData();
formData.append("file", file);
```

## 15. Multi-step form

Build a wizard form with multiple steps.

Expected answer:
- Track current step and form values.
- Validate each step before moving forward.
- Allow back navigation without losing values.
- Show progress or step indicators.
- Submit all collected data at the final step.

## 16. Dynamic form fields

Build a form where users can add and remove fields.

Expected answer:
- Store fields as an array with stable IDs.
- Render inputs from the array.
- Add, remove, and update fields immutably.
- Validate each dynamic field.

## 17. Login form with validation

Build a login form with email and password validation.

Expected answer:
- Use controlled inputs.
- Validate required fields and email format.
- Disable submit while submitting.
- Show field-level and API errors.
- Store auth state after successful login.

## 18. Protected routes

Build routes that only authenticated users can access.

Expected answer:
- Read auth state from Context, Redux, or a custom auth hook.
- Redirect unauthenticated users to login.
- Preserve the requested URL so the user can return after login.

```jsx
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}
```

## 19. Theme switcher

Build a light/dark theme switcher.

Expected answer:
- Store theme in state or Context.
- Apply theme using a class, data attribute, or CSS variables.
- Persist the selected theme in localStorage.
- Respect system preference if no saved theme exists.

## 20. Reusable data table

Build a reusable table component.

Expected answer:
- Accept `columns` and `data` as props.
- Render headers and rows dynamically.
- Support custom cell rendering.
- Add optional sorting, filtering, pagination, loading, and empty states.

## 21. Sortable table

Build a table where clicking headers sorts rows.

Expected answer:
- Track sort column and direction.
- Toggle ascending and descending order.
- Use memoization for sorted data when needed.
- Keep sorting stable and avoid mutating original data.

```jsx
const sortedData = [...data].sort(compareRows);
```

## 22. Filterable product list

Build a product list with search and filters.

Expected answer:
- Store search text and selected filters.
- Derive filtered products from source data.
- Debounce search for API-backed lists.
- Support empty states and clear filters.

## 23. Shopping cart

Build a cart with add, remove, quantity update, and total price.

Expected answer:
- Store cart items with product ID, quantity, and price.
- Prevent invalid quantities.
- Calculate subtotal, tax, discount, and total as derived values.
- Persist cart if required.

## 24. Nested checkbox tree

Build a tree where parent and child checkboxes stay in sync.

Expected answer:
- Store checked IDs in a set or normalized structure.
- Checking a parent checks all children.
- Unchecking a parent unchecks all children.
- Parent shows checked, unchecked, or indeterminate state based on children.

## 25. Toast notification system

Build a toast system for success, error, warning, and info messages.

Expected answer:
- Store toasts in an array with unique IDs.
- Provide `addToast` and `removeToast` functions through Context or a hook.
- Auto-dismiss after a timeout.
- Allow manual close.
- Clean up timers.

## 26. Error boundary

Build an error boundary to catch render errors.

Expected answer:
- Use a class component with `getDerivedStateFromError` and `componentDidCatch`.
- Show fallback UI when an error occurs.
- Log the error for debugging.
- Remember that error boundaries do not catch event handler or async errors.

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
    return this.state.hasError ? <h2>Something went wrong.</h2> : this.props.children;
  }
}
```

## 27. Custom useFetch hook

Build a hook for fetching data.

Expected answer:
- Return `data`, `loading`, `error`, and optional `refetch`.
- Use `AbortController` to cancel requests.
- Handle loading, success, error, and cleanup.
- Avoid updating state after unmount.

## 28. Custom useDebounce hook

Build a hook that returns a debounced value.

Expected answer:
- Accept a value and delay.
- Update debounced value only after the delay passes.
- Clear the timeout when value or delay changes.

```jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debouncedValue;
}
```

## 29. Custom usePrevious hook

Build a hook that returns the previous value from the last render.

Expected answer:
- Store the value in `useRef`.
- Update the ref in `useEffect`.
- Return the previous ref value.

```jsx
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
```

## 30. Custom useLocalStorage hook

Build a hook that syncs state with localStorage.

Expected answer:
- Read initial value from localStorage lazily.
- Serialize values with `JSON.stringify`.
- Parse values with `JSON.parse`.
- Update localStorage when state changes.
- Handle missing or invalid stored values safely.

```jsx
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
```
