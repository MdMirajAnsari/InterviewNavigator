## What is jQuery and why use it?

jQuery is a small JavaScript library that simplifies DOM traversal/manipulation, events, AJAX, and animations with a consistent cross-browser API.

```html
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
```

## How to select elements in jQuery?

Use CSS-like selectors with `$()`.

```javascript
const $items = $('.item');     // by class
const $id    = $('#title');    // by id
const $tags  = $('li.active'); // by tag + class
```

## Difference between $(document).ready() and window.onload

`$(document).ready(fn)` runs when the DOM is ready (before images/styles load). `window.onload` fires after all resources load.

```javascript
$(function(){ console.log('DOM ready'); });        // shorthand for $(document).ready
$(window).on('load', function(){ console.log('All loaded'); });
```

## How to handle click events and prevent default?

```javascript
$('a.nav').on('click', function(e){
  e.preventDefault();
  console.log('link blocked');
});
```

## How to add/remove/toggle classes?

```javascript
$('#box').addClass('active');
$('#box').removeClass('hidden');
$('#box').toggleClass('expanded');
```

## How to get/set text, HTML, and values?

```javascript
$('#title').text('Hello');          // set text
const html = $('#content').html();  // get inner HTML
$('#name').val('Alice');            // set input value
```

## How to create and insert elements?

```javascript
const $li = $('<li>', { class: 'item', text: 'New' });
$('#list').append($li);        // inside end
$('#list').prepend($li);       // inside start
$('#list').after('<hr/>');     // after element
$('#list').before('<h3>List</h3>'); // before element
```

## Event delegation (why and how)?

Delegate to a stable ancestor so new dynamic elements also receive handlers.

```javascript
$('#list').on('click', 'li.item', function(){
  $(this).toggleClass('selected');
});
```

## How to perform AJAX with jQuery?

```javascript
$.ajax({
  url: '/api/users',
  method: 'GET',
  dataType: 'json'
}).done(function(data){
  console.log(data);
}).fail(function(xhr){
  console.error(xhr.status);
});

// Shorthands
$.getJSON('/api/users', function(data){ console.log(data); });
$.post('/api/save', { name: 'Ann' }, function(resp){ console.log(resp); });
```

## How to animate elements?

```javascript
$('#box').fadeIn(200).delay(500).fadeOut(200);
$('#panel').slideToggle(300);
$('#ball').animate({ left: '+=50px', opacity: 0.5 }, 400);
```

## How to chain jQuery methods?

Most methods return the jQuery object, enabling chaining.

```javascript
$('#msg').addClass('show').text('Saved').fadeIn(150).delay(800).fadeOut(150);
```

## How to serialize a form and submit via AJAX?

```javascript
$('#form').on('submit', function(e){
  e.preventDefault();
  const data = $(this).serialize();
  $.post('/api/submit', data).done(() => alert('OK'));
});
```

## How to filter and map collections?

```javascript
const texts = $('li').map(function(){ return $(this).text(); }).get();
const $visible = $('div').filter(':visible');
```

## How to handle promises in jQuery AJAX?

`$.ajax` returns a jqXHR (thenable).

```javascript
$.get('/api').then(data => console.log(data)).catch(err => console.error(err));
```

## How to remove elements and their events?

```javascript
$('#item').remove();      // remove from DOM
$('#item').off();         // remove all handlers
```
