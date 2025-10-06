## Difference between semantic tags and non-semantic tags?

**Semantic Elements**

**Multimedia Support**

## What is meta data in html?

HTML metadata provides information about an HTML document

```html
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## What are semantic and non-symentic HTML elements ?

Semantic elements: They clearly describes what type of content they hold.
Eg: header,article,nav,footer,section etc.

Non-semantic elements: They acts as placeholders but does not describe what type of content they hold.
Eg: div,span etc.

## What is viewport ?

It is the area of the webpage in which the content is visible to the user.
viewport size varies based on the screen size.

## target="_blank" vs. target="_new"

* **_blank** is standardized, always opens a new tab/window, and is the recommended choice.
* **_new** is non-standard, may reuse an existing tab/window named "_new," and should be avoided.

## Difference between link tag `<link>` and anchor tag `<a>`?

The anchor tag `<a>` is used to create a hyperlink to another webpage or to a certain part of the webpage and these links are clickable, whereas, link tag `<link>` defines a link between a document and an external resource and these are not clickable.

```html
<link rel="stylesheet" href="style.css">
```

## What is new about the relationship between the `<header>` and `<h2>` tags in HTML5?

As HTML5 was all about better semantics and arrangements of the tags and elements, the `<header>` tag specifies the header section of the webpage. Unlike in previous version there was one `<h2>` element for the entire webpage, now this is the header for one section such as `<article>` or `<section>`. According to the HTML5 specification, each `<header>` element must at least have one `<h2>` tag

## What is the difference between `<figure>` tag and `<img>` tag?

The `<figure>` tag is a semantic container for self-contained content like images, diagrams, or code snippets, which can be associated with a caption using the `<figcaption>` tag, while the `<img>` tag is a self-closing tag specifically used to display an image on a web page by referencing its source file.

* Use **`<img>`** when you just need to show an image.
* Use **`<figure>` (with `<img>` inside)** when the image needs a  **caption or explanation** .
* ```html
  <figure>
    <img src="cat.jpg" alt="A cute cat">
    <figcaption>This is my cat enjoying the sunshine.</figcaption>
  </figure>

  ```

## Is the `<datalist>` tag and `<select>` tag same?

* Use **`<select>`** for **fixed** options.
* Use **`<datalist>`** for **autocomplete** suggestions with flexibility.

## What are Semantic Elements?

Semantic elements are those which describe the particular meaning to the browser and the developer. Elements like `<form>`, `<table>`, `<article>`, `<figure>`, etc., are semantic elements

## Is drag and drop possible using HTML5 and how?

Yes, in HTML5 we can drag and drop an element. This can be achieved using the drag and drop-related events to be used with the element which we want to drag and drop.

## What type of audio files can be played using HTML5?

HTML5 supports the following three types of audio file formats:

1. Mp3
2. WAV
3. Ogg

## What is the usage of a novalidate attribute for the form tag that is introduced in HTML5?

The `novalidate` attribute, introduced in HTML5 for the `<form>` tag, is a boolean attribute that, when present, specifies that the form-data should not be validated by the browser when submitted.

## What is a manifest file in HTML5?

In HTML5, a manifest file (specifically an Application Cache Manifest file, often referred to as `appcache` or `cache manifest`) is a text file that instructs the browser on which resources (HTML pages, CSS files, JavaScript files, images, etc.) to cache for offline access. This allows web applications to function even when there is no network connection.

## What is the Geolocation API in HTML5?

The **Geolocation API in HTML5** is a web API that allows web applications to access the geographical location of a user's device.

## What do *DOCTYPE* and *html lang* attributes do?

The `<!DOCTYPE html>` declaration and the `lang` attribute on the `<html>` tag serve distinct but important purposes in an HTML document:

`<!DOCTYPE html>` Declaration:

The `<!DOCTYPE html>` declaration, placed at the very beginning of an HTML document, serves to inform the web browser about the version of HTML the document conforms to. Specifically, `<!DOCTYPE html>` declares that the document is an HTML5 document. This declaration is crucial because it triggers "standards mode" in browsers, ensuring that the page is rendered according to modern web standards and avoiding "quirks mode," which can lead to inconsistent rendering across different browsers.

## Can you explain the purpose of *meta tags* in HTML?

In  **HTML** , **meta tags** are elements placed inside the `<head>` section of a web page that provide **metadata** (information about the page) to browsers, search engines, and other services. They don’t display content directly to the user, but they influence how the page behaves, is indexed, and interpreted.

## What is the difference between *b* and *strong* tags?

- `b`: stylistic bold without implying importance.
- `strong`: semantic importance; conveys emphasis to assistive tech and can affect SEO.

```html
<p><b>Visual bold</b> vs <strong>Important content</strong></p>
```

## When would you use *em* over  *i* , and vice versa?

- `em`: semantic emphasis that can be nested to increase stress (affects screen readers).
- `i`: visual italics for alternate voice, technical term, or title without emphasis.

```html
<p>Please <em>do not</em> refresh.</p>
<p><i>De facto</i> standard.</p>
```

## **What is the use of an iframe tag?**

Embeds another HTML page inside the current page (maps, videos, widgets). Use with care for security; sandbox when possible.

```html
<iframe src="https://example.com" width="600" height="400" sandbox="allow-scripts allow-same-origin"></iframe>
```

## What is the purpose of  *small* ,  *s* , and *mark* tags?

- `small`: side comments, fine print.
- `s`: content no longer accurate/relevant (not for deletions in edits).
- `mark`: highlight text relevant to current context.

```html
<p>Total $10 <small>(tax included)</small></p>
<p><s>Was $20</s> Now $10</p>
<p>Search result: <mark>javascript</mark> tutorial</p>
```

## What is the purpose of the data- attribute in HTML? Provide an example use case.

Custom data attributes for storing extra information on elements, accessible via JS (`dataset`).

```html
<button id="buy" data-product-id="42" data-price="9.99">Buy</button>
<script>
  const btn = document.getElementById('buy');
  console.log(btn.dataset.productId, btn.dataset.price);
  // dataset maps data-product-id -> productId
  </script>
```

## What is the difference between the defer and async attributes in the `<script>` tag?

- `async`: download in parallel; execute as soon as ready (order not guaranteed). Good for independent scripts (analytics).
- `defer`: download in parallel; execute after HTML parsing, in order. Good for dependent scripts.

```html
<script src="a.js" async></script>
<script src="b.js" defer></script>
```

## **What are void tags in HTML5?**

`<br>, <hr>, `

Void (self-closing) elements have no closing tag/content. Common HTML5 void tags:

`area, base, br, col, embed, hr, img, input, link, meta, param, source, track, wbr`

## MathML

MathML is an XML-based markup to display mathematical notation in the browser.

```html
<math>
  <msup><mi>a</mi><mn>2</mn></msup>
  <mo>+</mo>
  <msup><mi>b</mi><mn>2</mn></msup>
  <mo>=</mo>
  <msup><mi>c</mi><mn>2</mn></msup>
  </math>
```

## WebWorker

Runs JS in a background thread for CPU-heavy tasks to keep the UI responsive.

```html
<!-- main.js -->
const worker = new Worker('worker.js');
worker.postMessage({ n: 40 });
worker.onmessage = e => console.log('Result', e.data);

/* worker.js */
self.onmessage = e => {
  const fib = n => (n < 2 ? n : fib(n-1)+fib(n-2));
  self.postMessage(fib(e.data.n));
};
```

## Not Valid tag in html5

Deprecated/non-standard in HTML5 (avoid): `font`, `center`, `big`, `tt`, `strike`, `u` (use CSS), `marquee`, `blink`.

## Difference between span and div

* **`<div>`** = big container → for layout and structure, block
* **`<span>`** = small container → for styling parts of text, inline
