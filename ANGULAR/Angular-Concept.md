observable

subject

pipe

of

## Differences between mergeMap, concatMap, and switchMap.

mergeMap
Behavior: Flattens multiple inner Observables and subscribes to them concurrently. All results are emitted as they complete, regardless of order.
When to Use: Use when you want to process multiple API calls in parallel and collect all results.
Drawback: No guaranteed order of results; can be resource-intensive if many Observables are active simultaneously.
Example:typescript

```typescript
import { of } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';

const source = of(1, 2, 3);
source.pipe(
  mergeMap(val => of(`API call for ${val}`).pipe(delay(1000 - val * 100))) // Simulate faster response for higher values
).subscribe(result => console.log(result));
```

Output (order depends on completion time):

API call for 3
API call for 2
API call for 1

Here, mergeMap runs all API calls concurrently, and results are emitted as they arrive (faster calls complete first).

2. concatMap
   Behavior: Maps each value to an Observable and subscribes to them one at a time, waiting for the current inner Observable to complete before subscribing to the next. Maintains the order of the source Observable.
   When to Use: Use for sequential API calls where the order of execution and results matters, or when the second API depends on the first completing.
   Drawback: Slower, as it waits for each inner Observable to complete before moving to the next.
   Example (for your API dependency scenario):typescript

```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-example',
  template: `<p>{{ data$ | async | json }}</p>`
})
export class ExampleComponent {
  data$;
  constructor(private http: HttpClient) {
    this.data$ = this.http.get<{ userId: number }>('https://api.example.com/user').pipe(
      concatMap(user => this.http.get(`https://api.example.com/user/${user.userId}/details`))
    );
  }
}
```

Behavior:The first API (/user) is called, and only after it completes does the second API (/user/{userId}/details) start.
Results are emitted in the order of the source Observable.

1. switchMap
   Behavior: Maps each value to an Observable and subscribes to the latest one, canceling any previous in-flight Observables if a new value is emitted.
   When to Use: Use when you only care about the latest result, such as in search-as-you-type scenarios or when a new API call invalidates previous ones.
   Drawback: Cancels previous requests, so you may lose results from earlier Observables.
   Example:typescript

```typescript
import { of } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';

const source = of(1, 2, 3);
source.pipe(
  switchMap(val => of(`API call for ${val}`).pipe(delay(1000)))
).subscribe(result => console.log(result));
```

Output:

API call for 3

Only the result of the last emission (3) is logged because switchMap cancels previous Observables when a new value arrives.

## Subject

A `Subject` does not store any previous value.

Subscribers receive only values emitted **after** they subscribe.

## BehaviourSubject

A BehaviorSubject in Angular (part of the RxJS library) is a special type of Subject that holds a current value and emits it to new subscribers immediately upon subscription. Unlike a regular Subject, it always has a value, even if no events have been emitted yet, making it useful for representing state that components can rely on.Key Characteristics of BehaviorSubjectInitial Value: Requires an initial value when created.
Current Value Access: Subscribers get the most recent value (or initial value) immediately upon subscription.
Multiple Subscribers: Like other Subjects, it supports multiple subscribers, and all receive the same value when next() is called.
State Management: Often used to hold and share state (e.g., user data, form state) across components.
Common Methods

next(value): Emits a new value to all subscribers.
getValue(): Retrieves the current value of the BehaviorSubject.
subscribe(): Allows components to subscribe to value changes.
asObservable(): Converts the BehaviorSubject to an Observable to prevent external code from calling next().

Use Cases
State Management: Share application state (e.g., user authentication status, theme settings).
Form Data: Track form input changes across components.
Real-Time Updates: Reflect changes like notifications or live data feeds.


## ReplaySubject

A `ReplaySubject` stores multiple previous values and sends them to new subscribers.

## Lifecycle Hooks

OnChanges
Fired when one or more of the component or directive properties have been changed.

OnInit
Fired when component or directive properties have been initialized.

OnDestroy
Fired when the component or directive instance is destroyed

AfterContentInit
Fire after the initialization of the content of the component or directive has finished.

AfterContentChecked
Fire after the view has been fully initialized.

AfterViewInit
Fires after initializing both the component view and any of its child views. This is a useful lifecycle hook for plugins
outside of the Angular 2 ecosystem. For example, you could use this method to initialize a jQuery date picker based on the markup that Angular 2 has rendered.

## Data Binding

Data binding in Angular is a mechanism that synchronizes the data between the component (TypeScript) and the template (HTML). It enables dynamic updates to the UI when the underlying data changes and vice versa. Angular supports several types of data binding, which I’ll outline below with concise explanations and examples.Types of Data BindingInterpolation (One-Way Binding: Component to View)  Uses double curly braces {{ }} to display component data in the template.
Data flows from the component to the view.

```typescript
// Component
export class AppComponent {
  title = 'Hello, Angular!';
}
```

```html
<!-- Template -->
<h1>{{ title }}</h1>
```

Output: Displays "Hello, Angular!" in the UI.

Property Binding (One-Way Binding: Component to View)  Binds a component property to an HTML element property using square brackets [ ].

```typescript

// Component
export class AppComponent {
  isDisabled = true;
}
```

```html
<!-- Template -->
<button [disabled]="isDisabled">Click me</button>
```

Output: The button is disabled based on the isDisabled property.

Event Binding (One-Way Binding: View to Component)  Binds DOM events to component methods using parentheses ( ).

```typescript
// Component
export class AppComponent {
  handleClick() {
    console.log('Button clicked!');
  }
}
```

```html
<!-- Template -->
<button (click)="handleClick()">Click me</button>
```

Output: Logs "Button clicked!" to the console when the button is clicked.

**Two-Way Binding**  Combines property and event binding to synchronize data between component and view.
Uses [(ngModel)] directive (requires FormsModule to be imported).

```typescript
// Component
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `<input [(ngModel)]="name" placeholder="Enter name">
             <p>You entered: {{ name }}</p>`,
  standalone: true,
  imports: [FormsModule]
})
export class AppComponent {
  name = '';
}
```

Output: The input field and the paragraph update simultaneously as the user types.

Attribute Binding  Binds component data to HTML attributes (not properties) using [attr.].

```typescript

// Component
export class AppComponent {
  colSpanValue = 2;
}
```

```html
<!-- Template -->
<td [attr.colspan]="colSpanValue">Spanning columns</td>
```

Output: The `<td>` element spans 2 columns.

Class and Style Binding  Dynamically apply CSS classes or styles based on component logic.
Class Binding

```typescript

// Component
export class AppComponent {
  isActive = true;
}
```

```html
<!-- Template -->
<div [class.active]="isActive">Conditional Class</div>
```

```css
.active { background-color: lightblue; }
```

Output: The div has a light blue background if isActive is true.
Style Binding

```html

<div [style.backgroundColor]="isActive ? 'lightblue' : 'white'">Conditional Style</div>
```

Key PointsOne-Way Binding: Data flows either from component to view (interpolation, property binding) or view to component (event binding).
Two-Way Binding: Requires FormsModule for ngModel and is useful for form inputs.
Performance: Angular’s change detection automatically updates the UI when bound data changes, but overuse of two-way binding can impact performance in large applications.
Directives: Structural directives like *ngIf and *ngFor often work with data binding to conditionally render or iterate over elements.

## Angular Directives

Angular directives are special markers (attributes or elements) in the DOM that extend HTML functionality or manipulate the DOM in Angular applications. They allow you to attach behavior to elements, modify their structure, or create reusable components. Angular has three main types of directives: Component Directives, Structural Directives, and Attribute Directives.

Defined using the @Component decorator, they encapsulate HTML, CSS, and TypeScript logic.
Identified by a leading asterisk (*) in templates. *ngif
Modify the behavior or appearance of an element without altering the DOM structure. ngClass
