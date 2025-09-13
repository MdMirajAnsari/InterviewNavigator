## What is the difference between Visibility : hidden vs display: none ?

visibility hidden : This will hides the element but it will still takes up the space in the layout. whereas.,

display hidden: will removes the element from the document.

## What is css specificity ?

Css specificity means the set or rules that decides which css styles should be applied on to the element when multiple styles are targeted on the element at a time.

Inline styles > Id selectors > Class selectors,attribute selectors, pseudo classes > element selectorsf

## What is the difference between “display: none” and “visibility: hidden”, when used as attributes to the HTML element.

When we use the attribute “visibility: hidden” for an HTML element then that element will be hidden from the webpage but still takes up space. Whereas, if we use the “display: none” attribute for an HTML element then the element will be hidden, and also it won’t take up any space on the webpage.

## Change color of bullet

What is bom in css?

## what is difference between PX, unit, em, rem in css?

* Use **`rem` for font sizes** (consistent scaling).
* Use **`em` for spacing relative to font** (like padding inside buttons).
* Use  **`%` for fluid layouts** .
* Use **`px` sparingly** (icons, borders, tiny fixed details).

## what is different position in css?

* **static** → default, follows normal document flow.
* **relative** → positioned relative to itself; still takes up space.
* **absolute** → positioned relative to nearest positioned ancestor (or body); removed from flow.
* **fixed** → positioned relative to viewport; stays in place when scrolling.
* **sticky** → behaves like relative until a scroll threshold, then sticks like fixed.

Rule of thumb:

* Use **relative** for slight adjustments.
* Use **absolute** for placing inside a container.
* Use **fixed** for headers, footers, floating buttons.
* Use **sticky** for “stick-on-scroll” elements.

## what is pseudo selector?

Pseudo-classes

```css
/* First child of parent */
p:first-child { color: red; }

/* Hover state */
button:hover { background-color: blue; }

/* Active state */
a:active { color: green; }

/* Form field focus */
input:focus { border: 2px solid orange; }

```

Pseudo-elements

```css
/* Add content before element */
p::before { content: "👉 "; }

/* Add content after element */
p::after { content: " ✅"; }

/* Style the first letter */
p::first-letter { font-size: 200%; color: red; }

/* Style the first line */
p::first-line { font-weight: bold; }

```
