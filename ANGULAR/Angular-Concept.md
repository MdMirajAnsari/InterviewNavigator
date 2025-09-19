## Angular Directives

The Angular Directives are the elements which are basically used to change the behavior or appearance or layout of the DOM (Document Object Model) element. In other words, we can say that the directives are basically used to extend the power of HTML attributes and to change the appearance or behavior of a DOM element.

##### **Types of Directives in Angular:**

**Structural Directive**

The Structural Directives are responsible for the HTML layout. That means, they will shape or reshape the HTML view by simply adding or removing the elements from the DOM. These directives are basically used to handle how the component or the element should render in a template.

In Angular, there are three structural directives are available. They are as follows:

1. **NgFor (*ngFor)**
2. **NgIf (*ngIf)**
3. **NgSwitch (*ngSwitch)**

**Attribute Directive**

Attribute Directives are basically used to modify the behavior or appearance of the DOM element or the Component. In Angular, there are two in-built attribute directives available. They are as follows:

1. **NgStyle** : This NgStyle Attribute Directive is basically used to modify the element appearance or behavior.
2. **NgClass** : This NgClass Attribute Directive is basically used to change the class attribute of the element in the DOM or in the Component to which it has been attached.

**Component Directives**

The Component is also a type of directive in angular with its own template, styles, and logic needed for the view. The Component Directive is the most widely used directive in the angular application and you cannot create an angular application without a component.

A component directive requires a view along with its attached behavior and this type of directive adds DOM Elements. The Component Directive is a class with **@Component** decorator function.

## **What are Angular Decorators?**

Decorators are the features of Typescript and are implemented as functions. The name of the decorator starts with **@** symbol following by brackets and arguments. That means in angular whenever you find something which is prefixed by **@** symbol, then you need to consider it as a decorator.

##### **Commonly used Decorators:**

There are many built-in decorators are available in angular. Some of them are as follows:

1. **@NgModule** to define a module.
2. **@Component** to define components.
3. **@Injectable** to define services.
4. **@Input** and **@Output** to define properties, etc.

##### **Types of Decorators in Angular:**

In Angular, the Decorators are classified into 4 types. They are as follows:

1. **Class Decorators:** @Component and @NgModule
2. **Property Decorators:** @Input and @Output (These two decorators are used inside a class)
3. **Method Decorators:** @HostListener (This decorator is used for methods inside a class like a click, mouse hover, etc.)
4. **Parameter Decorators:** @Inject (This decorator is used inside class constructor).

## How DI works?

STEP 1:

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // Registers the service as a singleton at the root level
})
export class MyService {
  getData(): string {
    return 'Hello from MyService!';
  }
}
```

* **The **@Injectable** decorator marks the class as injectable.**
* **providedIn: 'root'** ensures the service is available application-wide as a singleton.

Angular’s DI system needs to know how to provide the service. The **providedIn: 'root'** metadata in the service handles this automatically. However, you can also register providers manually in a module or component.**1.

**Using **providedIn: 'root'** (Recommended)**:

* **As shown above, this is the modern way to register services, introduced in Angular 6+.**
* **It ensures a single instance of the service is created and tree-shaking optimizes unused services.**

1. **Alternative: Register in NgModule**:
   If you need to scope the service to a specific module, add it to the **providers** array in **app.module.ts**:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MyService } from './services/my.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [MyService], // Register the service here
  bootstrap: [AppComponent]
})
export class AppModule {}
```

**Component-Level Provider (Optional)**:
If you want a new instance of the service for a specific component and its children, register it in the component’s metadata:

```typescript
@Component({
  selector: 'app-my-component',
  template: '...',
  providers: [MyService] // New instance for this component
})
export class MyComponent {}
```

Inject the service into the component:
Open src/app/my-component/my-component.component.ts and inject MyService via the constructor:

```typescript
import { Component, OnInit } from '@angular/core';
import { MyService } from '../services/my.service';

@Component({
  selector: 'app-my-component',
  template: `<p>{{ data }}</p>`
})
export class MyComponent implements OnInit {
  data: string;

  constructor(private myService: MyService) {} // Inject the service

  ngOnInit(): void {
    this.data = this.myService.getData(); // Use the service
  }
}
```

The private myService: MyService syntax tells Angular to inject an instance of MyService.

Explore Advanced DI (Optional)

1. Using InjectionToken for Non-Class Dependencies:
   If you need to inject a configuration value (e.g., API URL), create an InjectionToken:

```typescript
import { InjectionToken } from '@angular/core';

export const API_URL = new InjectionToken<string>('API_URL');

// In app.module.ts
@NgModule({
  providers: [{ provide: API_URL, useValue: 'https://api.example.com' }]
})
export class AppModule {}
```

Types of Providers

Angular supports various provider types for flexibility:*

Class Provider: provide: MyService, useClass: MyService

* Value Provider: provide: 'API_URL', useValue: 'https://api.example.com'
* Factory Provider: provide: MyService, useFactory: () => new MyService(config)
* Alias Provider: provide: MyService, useExisting: OtherService
* Injection Tokens: Used for non-class dependencies (e.g., configuration objects)

Summary of Steps1. Create a service with @Injectable and define its logic.

1. Register the service (via providedIn: 'root' or in a module/component).
2. Create a component and inject the service via its constructor.
3. Use the service in the component to fetch or manipulate data.
4. Add the component to the app’s template.
5. Run and test the app.
6. (Optional) Explore advanced DI features like InjectionToken or factory providers.
7. Test the DI setup using Angular’s testing utilities.

## BehaviourSubject

A BehaviorSubject in Angular (part of the RxJS library) is a special type of Subject that holds a current value and emits it to new subscribers immediately upon subscription.

```typescript
import { BehaviorSubject } from 'rxjs';

const subject = new BehaviorSubject<number>(0);
```

Unlike a regular Subject, it always has a value, even if no events have been emitted yet, making it useful for representing state that components can rely on.Key Characteristics of BehaviorSubjectInitial Value: Requires an initial value when created.
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

Data binding in Angular is a mechanism that synchronizes the data between the component (TypeScript) and the template (HTML). It enables dynamic updates to the UI when the underlying data changes and vice versa. Angular supports several types of data binding, which I’ll outline below with concise explanations and examples.Types of Data Binding Interpolation (One-Way Binding: Component to View)  Uses double curly braces {{ }} to display component data in the template.
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

# What is Angular Services?

## what is http interceptor

* It allows you to  **intercept all HTTP requests and responses** .
* Common use cases:

  * Adding **Authorization headers** (e.g., JWT token)
  * Logging requests/responses
  * Global error handling
  * Modifying request or response data

    ```typescript
    import { Injectable } from '@angular/core';
    import {
      HttpInterceptor,
      HttpRequest,
      HttpHandler,
      HttpEvent
    } from '@angular/common/http';
    import { Observable } from 'rxjs';

    @Injectable()
    export class AuthInterceptor implements HttpInterceptor {

      intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Clone the request and add Authorization header
        const token = localStorage.getItem('token'); // example token
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Request Intercepted:', authReq);
        return next.handle(authReq);
      }
    }

    ```

what is observable

Difference between Constructor and ngOnint?

What is AuthGuard or RouteGuard

Difference between ViewChild and ViewChildren

Difference between ContentChild and ContentChildren

what is ng-content

what is queryList

Template diven and reactive form

## how angular handle change detection

Angular uses **dirty checking** to detect changes

```typescript
<div *ngIf="email.invalid && email.dirty">
      Enter a valid email!
    </div>
```

Reactive Form Example

```typescript
<form [formGroup]="userForm" (ngSubmit)="submit()">
  
  <div>
    <label>Name:</label>
    <input type="text" formControlName="name">
    <div *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.dirty">
      Name is required!
    </div>
  </div>

  <div>
    <label>Email:</label>
    <input type="email" formControlName="email">
    <div *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.dirty">
      Enter a valid email!
    </div>
  </div>

  <button type="submit" [disabled]="userForm.invalid">Submit</button>
</form>

```

# **Life Cycle**

# Async Pipe

# **BehaviorSubject**

A Subject or Observable doesn't have a current value. When a value is emitted, it is passed to subscribers and the Observable is done with it.

If you want to have a current value, use BehaviorSubject which is designed for exactly that purpose. BehaviorSubject keeps the last emitted value and emits it immediately to new subscribers.

It also has a method getValue() to get the current value.

# Observable and Observer

Pattern matching of message passing from publisher to subscriber

1. **Observable** is like a youtube channel of someone else. (( It uploads new videos(data) from time to time, **so it is a data source** for you))
2. Your youtube account is an **Observer**
3. Your youtube account **(Observer)** can only get notifications about whether someone else's youtube channel **(Observable)** has uploaded a new video **(has new data)** or made a livestream **(new event)** only if you have **subscribed** to that channel

**(Observer subscribes Observable to listen for new data/any event)**

where observable is a data source, subscribe is like a method/function , Observer is generally on your side

# Rxjs Subject

Plain Observable unicast the values to observable

subject class multicast the values to all observer at-a-time.

Subject = Observable + Array of Observers

```
var mySubject = new Subject<dataType>();
subject.next(data);

mySubject.subscribe((data)=>{
//so something
})
```

# Rxjs BehaviourSubject

BehaviourSubject stores the current value which is lastly broadcast to the observer.

# ContentChild && ContentChildren

child to grandChild

# ElementRef

Represent plain html tags of the template

```
<div #refvariable></div>

class Component
{
	@ViewChild("refvariable"): variableName:ElementRef
}
```

# Observable

handling asynchronous or even synchronous events.

To start receiving values from an observable, you need to subscribe to it.

Subscriptions can be cancelled using the `unsubscribe` method, which helps in avoiding memory leaks.

## Explain Change Detection in Angular?

Change Detection in Angular is the mechanism by which Angular **checks the component state (data)** and **updates the view (DOM)** whenever something changes.

Change Detection Strategies

Angular provides  **two strategies** :

1. **Default Strategy (CheckAlways)**

```javascript
@Component({
  selector: 'app-default',
  template: `{{ counter }}`,
  changeDetection: ChangeDetectionStrategy.Default
})
export class DefaultComponent {
  @Input() counter!: number;
}

```

OnPush Strategy

```javascript
@Component({
  selector: 'app-onpush',
  template: `{{ counter }}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushComponent {
  @Input() counter!: number;
}

```

## Difference between ngif and hidden in angular templates?

* Use `*ngIf` when you want to  **conditionally render/destroy elements** .
* Use `[hidden]` when you just want to **toggle visibility** but keep the element in the DOM.

## What is Difference between JIT and AOT compilation?

* **JIT mode** → Compiles templates in the browser when the app loads.
* **AOT mode** → Compiles templates at build time, ships optimized JS to browser.

```
ng build --aot    # Angular Ahead-of-Time build

```
