## How to do cleanup in useeffect?

**The **useEffect** hook accepts a callback function and an optional dependency array. The callback can return a cleanup function that React executes:**

```javascript
import { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Effect code (e.g., setting up a subscription, timer, or event listener)
    console.log('Effect ran');

    // Cleanup function
    return () => {
      console.log('Cleanup ran');
      // Clean up resources (e.g., clear timers, remove listeners, cancel subscriptions)
    };
  }, [/* dependency array */]);

  return <div>My Component</div>;
}
```

## When would you use Redux Toolkit over Context API for managing state in a React application?

*I would choose **Context API** for simple, lightweight state sharing, like passing theme, user authentication, or language preferences across components. It’s built-in, requires no extra library, and works best when the state is not too complex or frequently updated.*

*On the other hand, I’d use **Redux Toolkit** when the application has **large, complex, and frequently changing global state***

## When should you create a controlled component vs. an uncontrolled component in React forms?

* **Controlled** → when you need **full control** over input behavior and validation.
* **Uncontrolled** → when you need **quick setup** and don’t care about state until submission.

## How do you decide between using Client-Side Rendering (CSR), Server-Side Rendering (SSR), or Static Site Generation (SSG) in Next.js?

* **Dashboard:** CSR (user-specific, interactive).
* **E-commerce product page:** SSR (dynamic pricing/availability + SEO).
* **Blog homepage:** SSG (pre-rendered posts, updated occasionally).

## When would you prefer Tailwind CSS over CSS Modules or Styled Components?

In a recent project with a rapidly evolving dashboard UI, I used Tailwind to quickly prototype and maintain consistency. For smaller, reusable components with dynamic themes, I combined it with Styled Components for flexibility.


## How do you decide between storing tokens in localStorage, sessionStorage, or HTTP-only cookies?

* **Sensitive auth tokens → HTTP-only cookies** (secure, CSRF-protected).
* **Temporary or non-sensitive data → sessionStorage** .
* **Persistent non-sensitive state → localStorage** .

## What are the limitations of React in large-scale applications?

While React is highly flexible and performant, in large-scale applications, careful planning around state management, component architecture, and performance optimization is required to avoid maintenance and scalability issues.


## How can you prevent unnecessary re-renders in functional components?

* Use **`React.memo`** for pure components.
* Use **`useCallback`** for functions passed as props.
* Use **`useMemo`** for expensive calculations.
* Keep state  **as localized as possible** .
