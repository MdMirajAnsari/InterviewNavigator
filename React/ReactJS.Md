# In recent reactjs coding round, this was asked. Can you solve this ?

Implement a todo list component in React. User can add todos, mark todos as completed and filter todos

1. Each todo object should have a text property and a completed property.
2. Display the list of todos.Each todo should be displayed as a checkbox with the todo text as its label. The checkbox should be checked if the todo is completed.
3. The component should have a input field and a button for adding new todos. When the button is clicked, a new todo should be added to the list with the input fied's value as its text and completed set to false.
4. When a todo checkbox is clicked, the completed property of that todo should be toggled.
5. The component should have buttons for filtering the list of todos. There should be three filters. "ALL","ACTIVE","COMPLETED". "ALL" should show all the todos, "ACTIVE" should show todos where completed is false. "COMPLETED" should show only the todos where completed is true.

---

# How do you measure the performance of a webapplication ?

---

In recent reactjs machine coding round, this was asked. Can you solve this ?

1.get the data from below url

https://datausa.io/api/data?drilldowns=Nation&measures=Population

2. Display a table which should contain years and population from this api
3. Add a input where user can search year or population appy debouncing here.

4.Add a reset button which will reset the data in table to initial data.

5. Add delete option in each row which should delete respective row when clicked.

---

In recent reactjs interview, this machine coding problem was asked. Can you solve this ?

1. The UI should look like shown in the image above with 7 boxes shaped in C shape.
2. On clicking the box, its color changes to green.
3. When all boxes are green, they should again go back to the previous color yellow, one by one, by a 1-second delay, in the same order as they were clicked.

---

# What is Lazy loading in React ?

Lazy loading is a technique used in React to improve performance and reduce the initial load time of web applications. It allows you to split your code into smaller chunks, and load them on demand only when they are needed. This can significantly reduce the amount of JavaScript that needs to be loaded initially, which can improve the page load speed and user experience.

To implement lazy loading in React, you can use the "React.lazy" function. This function allows you to load a component lazily, i.e., only when it is needed.

---

What is useCallback in React ?

usecallback hook will return the memoized version of the callback function that only changes if one of the dependencies have been changed.

It is useful for optimizing performance by preventing unnecessary renders.

---

# React Memo

This function returns memoized return value of the component.

it renders the component and returns the result of component & also memoizes (stores) its result.

it doesn't re-render the component; instead, it returns the memoized result of component.

it renders the component and returns the result of component & also memoizes (stores) its result (same as first render).

# useMemo


This hook returns memoized return value of the function to prevent repeated execution of the function.

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="kwd">let</span><span class="pln"> myResult </span><span class="pun">=</span><span class="pln"></span><span class="pun">((</span><span class="pln"></span><span class="pun">)</span><span class="pln"></span><span class="pun">=></span></p></li><li class="L1" data-node-id="20240815194135-2ip04dy"><p><span class="pun">{</span></p></li><li class="L2"><p><span class="kwd">return</span><span class="pln"> someResult</span><span class="pun">;</span></p></li><li class="L3" data-node-id="20240815194135-9z6i3t2"><p><span class="pun">})</span><span class="pln"></span><span class="pun">(</span><span class="pln"></span><span class="pun">);</span></p></li></ol></pre>

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="kwd">let</span><span class="pln"> myResult </span><span class="pun">=</span><span class="pln"> useMemo</span><span class="pun">(</span></p></li><li class="L1" data-node-id="20240815194135-6oio3cm"><p><span class="pun">(</span><span class="pln"></span><span class="pun">)</span><span class="pln"></span><span class="pun">=></span><span class="pln"></span><span class="pun">{</span><span class="pln"></span><span class="kwd">return</span><span class="pln"> someResult</span><span class="pun">;</span><span class="pln"></span><span class="pun">},</span></p></li><li class="L2"><p><span class="pun">[</span><span class="pln"> dependencies </span><span class="pun">]</span></p></li><li class="L3" data-node-id="20240815194135-hzb0gb3"><p><span class="pun">);</span></p></li></ol></pre>


When you invoke useMemo with a function inside the component:

**First render**

it executes the function and returns the same returned value of the function & also memoizes (stores) the return value.

**Subsequent renders with same values of dependencies**

it doesn’t executes the function; but returns the same memoized return value;

**Subsequent renders with some changes in values of dependencies.**

it executes the function and returns the returned value of the function & also memoizes (stores) the same return value (just like first render).

When to use useMemo

When your function does some expensive task (heavier code with complex calculations) and is being executed on each render.

**Note:** Avoid using useMemo when your function is smaller.

# useCallback

This hook returns memoized function to prevent unnecessary re-renders of child components with React.memo().

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="kwd">let</span><span class="pln"> myFunction </span><span class="pun">=</span><span class="pln"></span><span class="pun">(</span><span class="pln"></span><span class="pun">)</span><span class="pln"></span><span class="pun">=></span></p></li><li class="L1" data-node-id="20240815123823-86jl6sc"><p><span class="pun">{</span></p></li><li class="L2"><p><span class="pun">};</span></p></li></ol></pre>

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="kwd">let</span><span class="pln"> myFunction </span><span class="pun">=</span><span class="pln"> useCallback</span><span class="pun">(</span></p></li><li class="L1" data-node-id="20240815123823-8f9gz67"><p><span class="pun">(</span><span class="pln"></span><span class="pun">)</span><span class="pln"></span><span class="pun">=></span><span class="pln"></span><span class="pun">{</span><span class="pln"></span><span class="pun">},</span></p></li><li class="L2"><p><span class="pun">[</span><span class="pln"> dependencies </span><span class="pun">]</span></p></li><li class="L3" data-node-id="20240815123823-krd0l55"><p><span class="pun">);</span></p></li></ol></pre>

**When you invoke useCallback with a function inside the component:**

**First render**

it creates a function and returns the same function & also memoizes (stores) the same function.

**Subsequent renders with same values of dependencies**

it creates a function but returns the same memoized function;

**Subsequent renders with some changes in values of dependencies.**

it creates a function and returns the same function & also memoizes (stores) the same function.

# When to use useCallback

When the child component is invoked with React.memo() and also the parent component is passing a callback function to the child component.

or

When your useEffect hook's dependencies array has a callback function.

Ex: useEffect(…, [ callback ] );

**Note: **Avoid using useCallback when your component is smaller.

# useRef

This hook return reference to DOM element object of an element

we can call DOM method using this reference

```
let myRef = useRef(initialValue)

<element ref={myRef}}>

myRef.current.SomeDomMethod())
```

When to use useRef?

When you want to invoke specific DOM methods.

What are controlled and uncontrolled components in Reactjs

# useReducer

This hook combines 'state' + 'method to manipulate the state'.

Alternative to useState.

**//useReducer**

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="kwd">let</span><span class="pln"></span><span class="pun">[</span><span class="pln"> currentState</span><span class="pun">,</span><span class="pln"> dispatch </span><span class="pun">]</span><span class="pln"></span><span class="pun">=</span><span class="pln"> useReducer</span><span class="pun">(</span><span class="pln">reducer</span><span class="pun">,</span><span class="pln"> initialState</span><span class="pun">);</span></p></li></ol></pre>

**//dispatch**

`dispatch( { type: "operation", payload: someData } );`

**//reducer**

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="kwd">let</span><span class="pln"> reducer </span><span class="pun">=</span><span class="pln"></span><span class="pun">(</span><span class="pln"> state</span><span class="pun">,</span><span class="pln"> action </span><span class="pun">)</span><span class="pln"></span><span class="pun">=></span><span class="pln"></span><span class="pun">{</span></p></li><li class="L1" data-node-id="20240815194239-ymermux"><p><span class="kwd">switch</span><span class="pln"></span><span class="pun">(</span><span class="pln">action</span><span class="pun">.</span><span class="pln">type</span><span class="pun">)</span></p></li><li class="L2"><p><span class="pun">{</span></p></li><li class="L3" data-node-id="20240815194239-fytxjxu"><p><span class="kwd">case</span><span class="pln"></span><span class="str">"operation1"</span><span class="pun">;</span></p></li><li class="L4"><p><span class="kwd">return</span><span class="pln"> updatedState1</span><span class="pun">;</span></p></li><li class="L5" data-node-id="20240815194239-tgyv4j7"><p><span class="kwd">case</span><span class="pln"></span><span class="str">"operation2"</span><span class="pun">;</span></p></li><li class="L6"><p><span class="kwd">return</span><span class="pln"> updatedState2</span><span class="pun">;</span></p></li><li class="L7" data-node-id="20240815194239-4y0o8bz"><p><span class="pun">}</span></p></li><li class="L8"><p><span class="pun">};</span></p></li></ol></pre>





1. What are the limitations of React in building large-scale applications?

2. How does React manage the Virtual DOM, and what are the benefits?

3. Can React Hooks fully replace Redux for state management? Explain why or why not.

4. What are the best practices for managing state in large React applications?

5. How would you optimize performance in a React app with large component trees?

6. Explain React's Strict Mode and its impact on development.

7. How can you prevent unnecessary re-renders in React functional components?

8. Describe the key differences between functional and class components in React.

9. What is the significance of the React Fiber architecture?

10. How does React handle side effects, and how can you manage them effectively?

11. Explain the differences between `useMemo()` and `useCallback()` in React.

12. How would you implement dynamic form handling and validation in React?

13. What is lazy loading in React, and how does it improve application performance?

14. How would you handle errors in a React app, and what is the role of error boundaries?

15. What are the benefits of server-side rendering (SSR) in React applications?

16. How do you handle styling in React components? Discuss different approaches.

17. How would you pass data between sibling components in React without using Redux?

18. Explain the use case of `useEffect()` for fetching data from an API.

19. How do you handle asynchronous operations in React using `async/await` or Promises?

20. How would you re-render a component when the window is resized?

21. Describe how React Context API can be used for state management in an app.

22. What is the role of React Router, and how does it work with dynamic routing?

23. Explain the concept of controlled and uncontrolled components in React.

24. How would you optimize React app performance when handling large lists or grids?

25. Explain the difference between shallow and deep comparison in React's `shouldComponentUpdate`.

26. How do you handle asynchronous code execution and state updates in React?

27. How would you implement custom hooks to abstract logic in React?

28. What are higher-order components (HOCs) in React, and how are they used?

29. How would you implement a search feature with debouncing in React?

30. Explain React's reconciliation process and how it updates the DOM efficiently.
