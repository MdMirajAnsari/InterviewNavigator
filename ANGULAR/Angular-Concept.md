## Angular 16

Standalone Components – Simplified Architecture
Forget the old NgModules. Components can now be self-contained, easier to test, and directly imported. Cleaner, faster, smarter.

Angular Signals – Reactive State Made Simple
A fine-grained reactivity system (signal(), computed(), effect()) that updates only what’s necessary. No more messy subscriptions or unnecessary re-renders.

New Control Flow – @if, @for, @switch
Say goodbye to *ngIf, *ngFor, *ngSwitch. The new syntax makes templates cleaner, more readable, and more efficient.

Zoneless Angular – Performance Boost
No zone.js required! Angular now uses signals and manual detection for leaner, faster rendering. Ideal for real-time and large-scale apps.

Latest APIs – Resource & Effects
Handle async data with Resource API (auto-loading, error, success states). Run side-effects with Effects API — without boilerplate RxJS subscriptions.

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
<h2>{{ title }}</h2>
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

## What is Angular Services?

Angular Services are injectable classes that encapsulate reusable logic such as data access (HTTP), business rules, state management, or utilities. Services are provided via Angular's Dependency Injection (DI) and are typically singletons when registered at the root level.

Key points:

- Share logic/data across components.
- Promote separation of concerns (keep components lean).
- Scope via providers: root (singleton), module, or component-level.

Example: service and usage

```typescript
// my.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' }) // singleton at root
export class MyService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('/api/users');
  }
}

// users.component.ts
import { Component, OnInit } from '@angular/core';
import { MyService } from './my.service';

@Component({ selector: 'app-users', template: `<li *ngFor="let u of users">{{ u.name }}</li>` })
export class UsersComponent implements OnInit {
  users: any[] = [];
  constructor(private myService: MyService) {}
  ngOnInit() { this.myService.getUsers().subscribe(u => this.users = u); }
}
```

Scoping a service to a component (new instance per component subtree):

```typescript
@Component({
  selector: 'scoped-example',
  template: `...`,
  providers: [MyService]
})
export class ScopedExampleComponent {}
```

Best practices:

- Keep services stateless where possible; if stateful, document lifetime.
- Prefer `providedIn: 'root'` for app-wide singletons and tree-shaking.
- Use interfaces/tokens for configuration and testing flexibility.

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

## what is observable

An Observable is a stream of asynchronous values that you can subscribe to. It pushes values over time and supports operators for transformation.

```typescript
import { Observable } from 'rxjs';

const obs = new Observable<number>(sub => {
  sub.next(1);
  sub.next(2);
  setTimeout(() => { sub.next(3); sub.complete(); }, 1000);
});

obs.subscribe({ next: v => console.log(v) });
```

## Difference between Constructor and ngOnint?

- Constructor: Runs when the class is instantiated. Do DI only; avoid heavy logic and DOM access.
- ngOnInit: Lifecycle hook called after Angular sets input bindings; safe place for initialization and API calls.

```typescript
export class UserComponent implements OnInit {
  constructor(private http: HttpClient) { /* DI only */ }
  ngOnInit() { /* fetch data here */ }
}
```

## What is AuthGuard or RouteGuard

Guards decide if navigation is allowed. `CanActivate` controls entering a route; `CanDeactivate` controls leaving; others include `CanLoad`, `Resolve`.

```typescript
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.isLoggedIn()) return true;
    this.router.navigate(['/login']);
    return false;
  }
}

// Route
{ path: 'admin', component: AdminComponent, canActivate: [AuthGuard] }
```

## Difference between ViewChild and ViewChildren

- ViewChild: Gets a single element/component from the view (template) after view init.
- ViewChildren: Gets a QueryList of multiple matches.

```typescript
@ViewChild('inputRef') input!: ElementRef<HTMLInputElement>;
@ViewChildren(ItemComponent) items!: QueryList<ItemComponent>;

ngAfterViewInit() {
  this.input.nativeElement.focus();
  this.items.forEach(c => c.highlight());
}
```

## Difference between ContentChild and ContentChildren

- ContentChild/ContentChildren: Query projected content (inside `<ng-content>`) from a parent using content projection.

```typescript
// child component
@Component({ selector: 'panel', template: `<ng-content></ng-content>` })
export class PanelComponent {
  @ContentChildren('link') links!: QueryList<ElementRef>;
}
```

## what is ng-content

Content projection placeholder that lets parent components project markup into a child component.

```html
<!-- child -->
<div class="card">
  <h2><ng-content select="[card-title]"></ng-content></h2>
  <div><ng-content></ng-content></div>
</div>

<!-- parent usage -->
<app-card>
  <span card-title>Title</span>
  <p>Body content</p>
  <button>Action</button>
  </app-card>
```

## what is queryList

`QueryList<T>` is a live iterable result of a query (`ViewChildren`/`ContentChildren`). It updates when the view/content changes.

```typescript
@ViewChildren(ItemComponent) items!: QueryList<ItemComponent>;
ngAfterViewInit() {
  this.items.changes.subscribe(() => console.log('list changed'));
}
```

## Template diven and reactive form

- Template-driven forms: Simpler, defined in template using `ngModel`. Good for small forms.
- Reactive forms: Defined in code with `FormGroup`/`FormControl`, better for complex validation and testability.

Template-driven example:

```html
<form #f="ngForm" (ngSubmit)="submit(f.value)">
  <input name="email" ngModel required email />
  <button [disabled]="f.invalid">Submit</button>
  </form>
```

Reactive example:

```typescript
import { FormBuilder, Validators } from '@angular/forms';

form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });

constructor(private fb: FormBuilder) {}
submit() { console.log(this.form.value); }
```

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

## **Life Cycle**

Angular components have lifecycle hooks you can tap into to run code at key moments.

Common hooks (in call order):

- ngOnChanges(changes): when @Input values change
- ngOnInit(): once after first @Input set
- ngDoCheck(): custom change detection
- ngAfterContentInit()/ngAfterContentChecked(): projected content
- ngAfterViewInit()/ngAfterViewChecked(): component views/child views
- ngOnDestroy(): before component is destroyed (cleanup)

Example logging hooks:

```typescript
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';

@Component({ selector: 'app-life', template: `<div>Life</div>` })
export class LifeComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  ngOnChanges(changes: SimpleChanges) { console.log('OnChanges', changes); }
  ngOnInit() { console.log('OnInit'); }
  ngAfterViewInit() { console.log('AfterViewInit'); }
  ngOnDestroy() { console.log('OnDestroy'); }
}
```

Cleanup pattern:

```typescript
private destroy$ = new Subject<void>();

ngOnInit() {
  this.service.stream$.pipe(takeUntil(this.destroy$)).subscribe();
}
ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

## Async Pipe

The `async` pipe subscribes to an Observable/Promise in the template and renders the latest value. It also handles unsubscribe automatically.

Benefits:

- Auto-subscribe/unsubscribe
- Triggers change detection on emissions (works well with OnPush)

Example with Observable:

```typescript
// component.ts
import { Component } from '@angular/core';
import { interval, map, startWith } from 'rxjs';

@Component({ selector: 'app-counter', template: `Count: {{ count$ | async }}` })
export class CounterComponent {
  count$ = interval(1000).pipe(startWith(0), map(n => n));
}
```

Example with HTTP:

```typescript
// component.ts
users$ = this.http.get<User[]>('/api/users');

// template.html
<li *ngFor="let u of users$ | async">{{ u.name }}</li>
```

## **BehaviorSubject**

A Subject or Observable doesn't have a current value. When a value is emitted, it is passed to subscribers and the Observable is done with it.

If you want to have a current value, use BehaviorSubject which is designed for exactly that purpose. BehaviorSubject keeps the last emitted value and emits it immediately to new subscribers.

It also has a method getValue() to get the current value.

## Observable and Observer

Pattern matching of message passing from publisher to subscriber

1. **Observable** is like a youtube channel of someone else. (( It uploads new videos(data) from time to time, **so it is a data source** for you))
2. Your youtube account is an **Observer**
3. Your youtube account **(Observer)** can only get notifications about whether someone else's youtube channel **(Observable)** has uploaded a new video **(has new data)** or made a livestream **(new event)** only if you have **subscribed** to that channel

**(Observer subscribes Observable to listen for new data/any event)**

where observable is a data source, subscribe is like a method/function , Observer is generally on your side

## Rxjs Subject

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

## Rxjs BehaviourSubject

BehaviourSubject stores the current value which is lastly broadcast to the observer.

## ContentChild && ContentChildren

child to grandChild

## ElementRef

Represent plain html tags of the template

```
<div #refvariable></div>

class Component
{
	@ViewChild("refvariable"): variableName:ElementRef
}
```

## Observable

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

## Explain **Change Detection Strategy** (Default vs OnPush).

Angular runs change detection (CD) to keep the view in sync with data. The strategy controls when a component checks for changes.

- Default (CheckAlways):

  - CD runs for the whole component tree on many triggers (events, XHRs, setTimeout, zone-aware tasks).
  - Any parent update propagates to all children.
  - Easiest, but more work per change.
- OnPush:

  - CD runs for the component only when one of these happens:
    - An @Input reference changes (new object/array/primitive value).
    - An event originates inside the component (e.g., (click)).
    - An async source emits via `async` pipe.
    - You manually request it (`markForCheck`, `detectChanges`).
  - Skips checks if inputs are the same reference → better performance.

Example (Default vs OnPush):

```typescript
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'child-default',
  template: `{{ data.name }}`,
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChildDefaultComponent {
  @Input() data!: { name: string };
}

@Component({
  selector: 'child-onpush',
  template: `{{ data.name }}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildOnPushComponent {
  @Input() data!: { name: string };
}

@Component({
  selector: 'app-parent',
  template: `
    <button (click)="mutate()">Mutate object</button>
    <button (click)="replace()">Replace object</button>
    <div>
      <child-default [data]="model"></child-default>
      <child-onpush [data]="model"></child-onpush>
    </div>
  `
})
export class ParentComponent {
  model = { name: 'Alice' };

  mutate() {
    // Same reference; OnPush child WILL NOT update
    this.model.name = 'Bob';
  }

  replace() {
    // New reference; OnPush child updates
    this.model = { ...this.model, name: 'Carol' };
  }
}
```

OnPush with async pipe (auto-updates on emission):

```typescript
@Component({
  selector: 'onpush-stream',
  template: `Count: {{ counter$ | async }}`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnPushStreamComponent {
  counter$ = interval(1000).pipe(startWith(0));
}
```

Manual triggers (advanced):

```typescript
constructor(private cdr: ChangeDetectorRef) {}

ngAfterViewInit() {
  this.cdr.markForCheck(); // schedule check for this component and ancestors
  // or this.cdr.detectChanges(); // run a synchronous check now
}
```

Guidance:

- Prefer OnPush for performance-critical trees and immutable patterns.
- Replace objects/arrays instead of mutating to trigger OnPush.
- Use `async` pipe for streams; avoids manual subscription and triggers CD on emission.

## what are pure and impure pipes?

* **Definition:** Pure pipes execute **only when Angular detects a pure change** in the input value.
* **Pure Change:** A change is considered *pure* when the input **primitive value changes** (like number, string, boolean) or a **new object/array reference** is passed.
* **Default:** All pipes are  **pure by default** .
* **Performance:** More efficient because Angular doesn't run them on every change detection cycle.

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'square' }) // pure by default
export class SquarePipe implements PipeTransform {
  transform(value: number): number {
    console.log('Pure pipe executed');
    return value * value;
  }
}

```

* **Definition:** Impure pipes execute  **every time change detection runs** , regardless of whether the input changed.
* **Use Case:** Useful for **mutable objects or arrays** that change internally but maintain the same reference.
* **Declaration:** Set `pure: false` in the `@Pipe` decorator.

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter', pure: false })
export class FilterPipe implements PipeTransform {
  transform(items: string[], searchText: string): string[] {
    console.log('Impure pipe executed');
    return items.filter(item => item.includes(searchText));
  }
}

```

## What are Subjects vs BehaviorSubjects vs ReplaySubjects?

### Subject

A Subject is a special type of Observable that allows values to be multicasted to many Observers. It's like an EventEmitter, but it's the only way of making any Observable execution be shared among multiple subscribers.

**Key Characteristics:**

- **No initial value** - starts empty
- **Hot Observable** - emits values only after subscription
- **Multicast** - can have multiple subscribers
- **Manual emission** - values are emitted using `next()`

```typescript
import { Subject } from 'rxjs';

const subject = new Subject<string>();

// Subscribers
subject.subscribe(value => console.log('Subscriber 1:', value));
subject.subscribe(value => console.log('Subscriber 2:', value));

// Emit values
subject.next('Hello');
subject.next('World');

// Output:
// Subscriber 1: Hello
// Subscriber 2: Hello
// Subscriber 1: World
// Subscriber 2: World
```

### BehaviorSubject

BehaviorSubject is a variant of Subject that requires an initial value and emits its current value whenever it is subscribed to.

**Key Characteristics:**

- **Has initial value** - must provide initial value
- **Current value access** - new subscribers get the last emitted value immediately
- **State management** - perfect for holding application state
- **getValue()** method to get current value

```typescript
import { BehaviorSubject } from 'rxjs';

const behaviorSubject = new BehaviorSubject<number>(0); // Initial value: 0

// First subscriber gets initial value immediately
behaviorSubject.subscribe(value => console.log('Subscriber 1:', value)); // Output: 0

behaviorSubject.next(1);
behaviorSubject.next(2);

// Second subscriber gets the last emitted value
behaviorSubject.subscribe(value => console.log('Subscriber 2:', value)); // Output: 2

// Get current value without subscribing
console.log('Current value:', behaviorSubject.getValue()); // Output: 2
```

### ReplaySubject

ReplaySubject is a variant of Subject that replays old values to new subscribers. It can replay a specific number of values or all values within a time window.

**Key Characteristics:**

- **Replays old values** - new subscribers get previous emissions
- **Configurable buffer** - can specify how many values to replay
- **Time-based replay** - can replay values within a time window
- **No initial value** - starts empty but replays previous values

```typescript
import { ReplaySubject } from 'rxjs';

// Replay last 2 values
const replaySubject = new ReplaySubject<number>(2);

replaySubject.next(1);
replaySubject.next(2);
replaySubject.next(3);

// New subscriber gets last 2 values
replaySubject.subscribe(value => console.log('Subscriber:', value));
// Output: 2, 3

// Time-based replay (replay values from last 1000ms)
const timeReplaySubject = new ReplaySubject<number>(undefined, 1000);

timeReplaySubject.next(1);
setTimeout(() => timeReplaySubject.next(2), 500);
setTimeout(() => timeReplaySubject.next(3), 1500);

setTimeout(() => {
  timeReplaySubject.subscribe(value => console.log('Time subscriber:', value));
  // Output: 2, 3 (only values from last 1000ms)
}, 2000);
```


### Practical Use Cases

**Subject - Event Broadcasting:**

```typescript
// User actions
const userActionSubject = new Subject<string>();

userActionSubject.subscribe(action => {
  console.log('User performed:', action);
});

// Emit when user clicks
userActionSubject.next('button-clicked');
```

**BehaviorSubject - Application State:**

```typescript
// User authentication state
const authState = new BehaviorSubject<boolean>(false);

// Components can get current state immediately
authState.subscribe(isLoggedIn => {
  console.log('User logged in:', isLoggedIn);
});

// Update state
authState.next(true);
```

**ReplaySubject - Data Caching:**

```typescript
// API data caching
const apiDataSubject = new ReplaySubject<any[]>(1);

// First API call
apiDataSubject.next([{id: 1, name: 'John'}]);

// Later subscribers get cached data
apiDataSubject.subscribe(data => {
  console.log('Cached data:', data);
});
```

## What is Zone.js?

Zone.js is a library that provides a mechanism to intercept and keep track of asynchronous operations in JavaScript. It's the foundation of Angular's change detection system and enables automatic change detection when asynchronous operations complete.

Zone.js is essential for Angular's automatic change detection and provides a powerful way to monitor and control asynchronous operations in JavaScript applications.
