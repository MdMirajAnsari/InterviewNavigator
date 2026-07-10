## **What are semantic and non-symentic HTML elements ?**

Semantic elements: They clearly describes what type of content they hold.
Eg: header,article,nav,footer,section etc.

Non-semantic elements: They acts as placeholders but does not describe what type of content they hold.
Eg: div,span etc.

---

In one of my frontend machine coding interviews, i was asked to resolve below issue in hashtag#css ? Add your comments on how you will resolve this issue

play with logic in this fiddle: https://jsfiddle.net/gzfjyh45/16/

1. Modify the css code such that child blocks should not overflow the parent container (All child blocks should be in square shape after css modifications and they should be with in container)?
2. Modify the css to display all 3 blocks in diagonal to container.

NOTE: Should not change existing width, height & border.

Below is the logic that you need to modify.

<div class="container">
 <div class="block">1</div>
 <div class="block">2</div>
 <div class="block">3</div>
</div>

.container {
 border: 1px solid black;
 height: 180px;
 width: 180px;
}

.block {
 border: 1px solid gray;
 height: 60px;
 width: 60px;
}

---

What is viewport ?

It is the area of the webpage in which the content is visible to the user.
viewport size varies based on the screen size.

<meta name="viewport" content="width=device-width, initial-scale=1.0">
__________________________________________________________________________________________________________________________________________________________________________________________________________________
 What is meta in html ?

meta tags are placed inside the head section of html document and will provide all the information about the html document which includes page title, description, author, charset etc.

It contains below attributes.,
name,content,charset,http-equiv.

# target="_blank" vs. target="_new"

---
