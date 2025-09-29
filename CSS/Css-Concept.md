## What is the difference between relative, absolute, fixed, and sticky positioning in CSS?

* **relative** → positioned relative to its normal position.
* **absolute** → positioned relative to the nearest positioned ancestor (not `static`).
* **fixed** → positioned relative to the viewport; does not move when scrolling.
* **sticky** → toggles between relative and fixed depending on scroll position.


* `static`:

  This is the default value. Elements with `position: static;` are positioned according to the normal document flow and are not affected by the `top`, `bottom`, `left`, or `right` properties.
* `relative`:

  An element with `position: relative;` is positioned relative to its normal position in the document flow. The `top`, `right`, `bottom`, and `left` properties offset the element from its original location, but other content is not adjusted to fill the gap left by the element.** **
* `absolute`:

  An element with `position: absolute;` is removed from the normal document flow and positioned relative to its nearest positioned ancestor (an ancestor with a `position` value other than `static`). If no such ancestor exists, it is positioned relative to the initial containing block (usually the viewport). The `top`, `right`, `bottom`, and `left` properties specify its distance from the edges of its positioning context.
* `fixed`:

  An element with `position: fixed;` is positioned relative to the viewport. This means it remains in the same position on the screen even when the page is scrolled. The `top`, `right`, `bottom`, and `left` properties specify its distance from the viewport edges.
* `sticky`:

  An element with `position: sticky;` behaves like `position: relative;` within its parent until a specified scroll threshold is reached, at which point it becomes "stuck" to a particular edge of the viewport, behaving like `position: fixed;`. The `top`, `right`, `bottom`, and `left` properties define the threshold for sticking and its position once stuck.

Examples:

```html
<div class="container">
  <div class="relative">Relative box
    <div class="absolute">Absolute inside relative</div>
  </div>
  <div class="fixed">Fixed header</div>
  <div class="sticky">Sticky section title</div>
</div>
```

```css
.container { height: 2000px; padding-top: 60px; }

/* static is default */
.relative { position: relative; border: 1px solid #ccc; height: 200px; }

.absolute {
  position: absolute;           /* positioned relative to .relative */
  right: 8px; bottom: 8px; background: #ffe08a; padding: 4px 8px;
}

.fixed {
  position: fixed;              /* stays at top while scrolling */
  top: 0; left: 0; right: 0; height: 48px;
  background: #6200ee; color: #fff; display: flex; align-items: center; padding: 0 12px;
}

.sticky {
  position: sticky;             /* sticks after reaching 10px from top */
  top: 10px; background: #e0f7fa; padding: 8px; margin-top: 600px;
}
```

## What is the difference between Visibility : hidden vs display: none ?

visibility hidden : This will hides the element but it will still takes up the space in the layout. whereas.,

display none: will removes the element from the document.

## What is css specificity ?

Css specificity means the set or rules that decides which css styles should be applied on to the element when multiple styles are targeted on the element at a time.

Inline styles > Id selectors > Class selectors,attribute selectors, pseudo classes > element selectorsf

## What is the difference between “display: none” and “visibility: hidden”, when used as attributes to the HTML element.

When we use the attribute “visibility: hidden” for an HTML element then that element will be hidden from the webpage but still takes up space. Whereas, if we use the “display: none” attribute for an HTML element then the element will be hidden, and also it won’t take up any space on the webpage.

## Change color of bullet

```html
<ul class="custom-bullets">
  <li>Item 1</li>
  <li>Item 2</li>
  </ul>
```

```css
.custom-bullets li { list-style: none; position: relative; padding-left: 1.25rem; }
.custom-bullets li::before {
  content: '';
  width: 8px; height: 8px; border-radius: 50%;
  background: #e91e63; position: absolute; left: 0; top: 0.6em;
}
```

## What is bom in css?

CSSOM (often confused with BOM) is the CSS Object Model: a tree representation of CSS used by the browser to compute styles. BOM (Browser Object Model) refers to browser APIs like `window`, `history`, `location`.

## Difference between relative import (`@import`) and `<link>` for CSS?

* `<link>` → Better performance, supports multiple stylesheets, loads parallelly.
* `@import` → Loads sequentially (slower), less recommended.

## What is the difference between `em`, `rem`, `%`, `px`, and `vh/vw` units?* Use **`rem` for font sizes** (consistent scaling).

* **px** → fixed size, not scalable.
* **em** → relative to parent element’s font size.
* **rem** → relative to root (`html`) font size.
* **%** → relative to parent’s size (width/height).
* **vh/vw** → relative to viewport height/width.

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

## What is the difference between margin and padding?

- Margin: space outside the border; separates elements.
- Padding: space inside the border; increases element’s clickable area/background.

```css
.card { margin: 16px; padding: 12px; }
```

## What is the box-sizing property?

`box-sizing: border-box;` makes width/height include padding and border (easier layouts).

```css
*, *::before, *::after { box-sizing: border-box; }
```

## Flexbox vs Grid: when to use each?

- Flexbox: one-dimensional layout (row OR column), content-driven.
- Grid: two-dimensional layout (rows AND columns), layout-driven.

```css
.flex { display: flex; gap: 8px; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
```

## How to center a div horizontally and vertically?

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
```

## Responsive units: vw, vh, %, em, rem

- vw/vh: viewport width/height.
- %: relative to parent.
- em: relative to current font-size.
- rem: relative to root font-size.

Examples:

```html
<div class="hero">Hero (vw/vh)</div>
<div class="parent">
  <div class="child">Child width 50%</div>
</div>
<button class="btn">EM padded button</button>
<h2 class="title">REM sized title</h2>
```

```css
html { font-size: 16px; }

/* vw/vh: full-width banner 50% viewport height */
.hero {
  height: 50vh;
  width: 100vw;
  background: linear-gradient(90deg, #2196f3, #21cbf3);
  color: white; display: flex; align-items: center; justify-content: center;
}

/* %: child width relative to parent */
.parent { width: 400px; background: #eee; padding: 8px; }
.child  { width: 50%; background: #c8e6c9; padding: 8px; }

/* em: padding scales with element's own font-size */
.btn { font-size: 1rem; padding: 0.5em 1em; }
.btn.large { font-size: 1.25rem; } /* padding grows because em */

/* rem: font-size relative to root (html) */
.title { font-size: 2rem; } /* 32px when root is 16px */
```

## Media queries example

```css
@media (max-width: 600px) {
  .sidebar { display: none; }
}
```

## CSS variables (custom properties)

```css
:root { --brand: #6200ee; }
button { background: var(--brand); }
```

## Prevent layout shift: image dimensions

Always set `width` and `height` (or aspect-ratio) to reserve space.

```css
img { width: 100%; height: auto; aspect-ratio: 16 / 9; }
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

## Translate

The **`translate()`** CSS function repositions an element in the horizontal and/or vertical directions.

```css
transform: translate(42px, 18px);
```
