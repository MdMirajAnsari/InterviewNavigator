## What are semantic and non-symentic HTML elements ?

Semantic elements: They clearly describes what type of content they hold.
Eg: header,article,nav,footer,section etc.

Non-semantic elements: They acts as placeholders but does not describe what type of content they hold.
Eg: div,span etc.

---

## What is viewport ?

It is the area of the webpage in which the content is visible to the user.
viewport size varies based on the screen size.

# target="_blank" vs. target="_new"

* **_blank** is standardized, always opens a new tab/window, and is the recommended choice.
* **_new** is non-standard, may reuse an existing tab/window named "_new," and should be avoided.

## Difference between link tag `<link>` and anchor tag `<a>`?

The anchor tag `<a>` is used to create a hyperlink to another webpage or to a certain part of the webpage and these links are clickable, whereas, link tag `<link>` defines a link between a document and an external resource and these are not clickable.

## What is new about the relationship between the `<header>` and `<h1>` tags in HTML5?

As HTML5 was all about better semantics and arrangements of the tags and elements, the `<header>` tag specifies the header section of the webpage. Unlike in previous version there was one `<h1>` element for the entire webpage, now this is the header for one section such as `<article>` or `<section>`. According to the HTML5 specification, each `<header>` element must at least have one `<h1>` tag

### What is the difference between `<figure>` tag and `<img>` tag?

The `<img>` tag is used to embed a single image into a web page, while the `<figure>` tag is a semantic container used to group self-contained content, such as an `<img>` and its associated `<figcaption>` (caption), that can be removed without affecting the main document's flow. Use `<img>` for decorative images or when an image is part of the main text flow and doesn't need a caption. Use `<figure>` when the content (image, code snippet, etc.) provides context or is a key part of the main message, especially when it needs a caption.

### Is the `<datalist>` tag and `<select>` tag same?

### What are Semantic Elements?

Semantic elements are those which describe the particular meaning to the browser and the developer. Elements like `<form>`, `<table>`, `<article>`, `<figure>`, etc., are semantic elements

### Is drag and drop possible using HTML5 and how?

Yes, in HTML5 we can drag and drop an element. This can be achieved using the drag and drop-related events to be used with the element which we want to drag and drop.

### What type of audio files can be played using HTML5?

HTML5 supports the following three types of audio file formats:

1. Mp3
2. WAV
3. Ogg

### What is the usage of a novalidate attribute for the form tag that is introduced in HTML5?

The `novalidate` attribute, introduced in HTML5 for the `<form>` tag, is a boolean attribute that, when present, specifies that the form-data should not be validated by the browser when submitted.

### What is a manifest file in HTML5?

In HTML5, a manifest file (specifically an Application Cache Manifest file, often referred to as `appcache` or `cache manifest`) is a text file that instructs the browser on which resources (HTML pages, CSS files, JavaScript files, images, etc.) to cache for offline access. This allows web applications to function even when there is no network connection.

### What is the Geolocation API in HTML5?

## What do *DOCTYPE* and *html lang* attributes do?

The `<!DOCTYPE html>` declaration and the `lang` attribute on the `<html>` tag serve distinct but important purposes in an HTML document:

`<!DOCTYPE html>` Declaration:

The `<!DOCTYPE html>` declaration, placed at the very beginning of an HTML document, serves to inform the web browser about the version of HTML the document conforms to. Specifically, `<!DOCTYPE html>` declares that the document is an HTML5 document. This declaration is crucial because it triggers "standards mode" in browsers, ensuring that the page is rendered according to modern web standards and avoiding "quirks mode," which can lead to inconsistent rendering across different browsers.

## Can you explain the purpose of *meta tags* in HTML?

In  **HTML** , **meta tags** are elements placed inside the `<head>` section of a web page that provide **metadata** (information about the page) to browsers, search engines, and other services. They don’t display content directly to the user, but they influence how the page behaves, is indexed, and interpreted.

## What is the difference between *b* and *strong* tags?

## When would you use *em* over  *i* , and vice versa?

### **What is the use of an iframe tag?**

## What is the purpose of  *small* ,  *s* , and *mark* tags?

### **What is the purpose of the data-* attribute in HTML? Provide an example use case.*

### What is the difference between the defer and async attributes in the `<script>` tag?

### **What are void tags in HTML5?**

`<br>, <hr>, `

### MathML

## WebWorker

## Not Valid tag in html5

---
