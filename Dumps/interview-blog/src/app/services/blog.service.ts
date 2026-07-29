import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BlogPost, Category } from '../models/blog-post.model';

const angularCodeMd = "" +
  "## 1. Pass data from a child component to a parent component.\n" +
  "\n**Using @Output and EventEmitter (Recommended)**\n\nThe @Output decorator allows a child component to emit custom events that the parent component can listen to, enabling data to be passed from child to parent.\n\n```typescript\n// (child.component.ts):\n\nimport { Component, Output, EventEmitter } from '@angular/core';\n\n@Component({\n  selector: 'app-child',\n  template: '<button (click)=\\\"sendData()\\\">Send Data to Parent</button>'\n})\nexport class ChildComponent {\n  @Output() dataEvent = new EventEmitter<string>(); // Define Output event\n\n  sendData() {\n    this.dataEvent.emit('Hello from Child!'); // Emit data to parent\n  }\n}\n```\n\n```typescript\n// Parent Component (parent.component.ts):\n\nimport { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-parent',\n  template: '<app-child (dataEvent)=\\\"receiveData($event)\\\"></app-child><p>Received: {{ message }}</p>'\n})\nexport class ParentComponent {\n  message: string;\n\n  receiveData(data: string) {\n    this.message = data; // Handle data from child\n  }\n}\n```\n\nExplanation: The child component declares an @Output property (dataEvent) using EventEmitter. The child calls emit() to send data (e.g., a string, object, or any type). The parent listens to the dataEvent event using event binding (dataEvent)='receiveData($event)' and processes the emitted data.\n\nUse Case: Ideal for most scenarios where the child needs to notify the parent of an event or send data, such as button clicks, form submissions, or state changes.\n\n**Using ViewChild to Access Child Component**\n\nThe parent can directly access the child component’s properties or methods using @ViewChild, allowing it to retrieve data.\n\nSteps\n\n```typescript\n//  Child Component (child.component.ts):\n\nimport { Component } from '@angular/core';\n\n@Component({\n  selector: 'app-child',\n  template: '<button (click)=\\\"updateData()\\\">Update Data</button>'\n})\nexport class ChildComponent {\n  childData: string = 'Initial Child Data';\n\n  updateData() {\n    this.childData = 'Updated Child Data';\n  }\n}\n```\n\n```typescript\n// Parent Component (parent.component.ts):\n\nimport { Component, ViewChild, AfterViewInit } from '@angular/core';\nimport { ChildComponent } from './child.component';\n\n@Component({\n  selector: 'app-parent',\n  template: '<app-child></app-child><p>Child Data: {{ childData }}</p>'\n})\nexport class ParentComponent implements AfterViewInit {\n  @ViewChild(ChildComponent) child: ChildComponent;\n  childData: string;\n\n  ngAfterViewInit() {\n    this.childData = this.child.childData; // Access child data\n  }\n}\n```\n\nExplanation: The parent uses @ViewChild to get a reference to the child component. After the view is initialized (ngAfterViewInit), the parent can access the child’s properties or methods. Caution: This tightly couples the parent and child, which may not be ideal for reusable components.\n\nUse Case: Suitable for scenarios where the parent needs direct access to the child’s state, but use sparingly to maintain loose coupling.";

const angularConceptMd = "" +
  "observable\n\nsubject\n\npipe\n\nof\n\n## Differences between mergeMap, concatMap, and switchMap.\n\nmergeMap\nBehavior: Flattens multiple inner Observables and subscribes to them concurrently. All results are emitted as they complete, regardless of order.\nWhen to Use: Use when you want to process multiple API calls in parallel and collect all results.\nDrawback: No guaranteed order of results; can be resource-intensive if many Observables are active simultaneously.\nExample:typescript\n\n```typescript\nimport { of } from 'rxjs';\nimport { mergeMap, delay } from 'rxjs/operators';\n\nconst source = of(1, 2, 3);\nsource.pipe(\n  mergeMap(val => of(`API call for ${val}`).pipe(delay(1000 - val * 100))) // Simulate faster response for higher values\n).subscribe(result => console.log(result));\n```\n\nOutput (order depends on completion time):\n\nAPI call for 3\nAPI call for 2\nAPI call for 1\n\nHere, mergeMap runs all API calls concurrently, and results are emitted as they arrive (faster calls complete first).\n\n2. concatMap\n   Behavior: Maps each value to an Observable and subscribes to them one at a time, waiting for the current inner Observable to complete before subscribing to the next. Maintains the order of the source Observable.\n   When to Use: Use for sequential API calls where the order of execution and results matters, or when the second API depends on the first completing.\n   Drawback: Slower, as it waits for each inner Observable to complete before moving to the next.\n   Example (for your API dependency scenario):typescript\n\n```typescript\nimport { Component } from '@angular/core';\nimport { HttpClient } from '@angular/common/http';\nimport { concatMap } from 'rxjs/operators';\n\n@Component({\n  selector: 'app-example',\n  template: '<p>{{ data$ | async | json }}</p>'\n})\nexport class ExampleComponent {\n  data$;\n  constructor(private http: HttpClient) {\n    this.data$ = this.http.get<{ userId: number }>('https://api.example.com/user').pipe(\n      concatMap(user => this.http.get(`https://api.example.com/user/${user.userId}/details`))\n    );\n  }\n}\n```\n\nBehavior:The first API (/user) is called, and only after it completes does the second API (/user/{userId}/details) start.\nResults are emitted in the order of the source Observable.\n\n1. switchMap\n   Behavior: Maps each value to an Observable and subscribes to the latest one, canceling any previous in-flight Observables if a new value is emitted.\n   When to Use: Use when you only care about the latest result, such as in search-as-you-type scenarios or when a new API call invalidates previous ones.\n   Drawback: Cancels previous requests, so you may lose results from earlier Observables.\n   Example:typescript\n\n```typescript\nimport { of } from 'rxjs';\nimport { switchMap, delay } from 'rxjs/operators';\n\nconst source = of(1, 2, 3);\nsource.pipe(\n  switchMap(val => of(`API call for ${val}`).pipe(delay(1000)))\n).subscribe(result => console.log(result));\n```\n\nOutput:\n\nAPI call for 3\n\nOnly the result of the last emission (3) is logged because switchMap cancels previous Observables when a new value arrives.\n\n## BehaviourSubject\n\nA BehaviorSubject in Angular (part of the RxJS library) is a special type of Subject that holds a current value and emits it to new subscribers immediately upon subscription. Unlike a regular Subject, it always has a value, even if no events have been emitted yet, making it useful for representing state that components can rely on.Key Characteristics of BehaviorSubjectInitial Value: Requires an initial value when created.\nCurrent Value Access: Subscribers get the most recent value (or initial value) immediately upon subscription.\nMultiple Subscribers: Like other Subjects, it supports multiple subscribers, and all receive the same value when next() is called.\nState Management: Often used to hold and share state (e.g., user data, form state) across components.\nCommon Methods\n\nnext(value): Emits a new value to all subscribers.\ngetValue(): Retrieves the current value of the BehaviorSubject.\nsubscribe(): Allows components to subscribe to value changes.\nasObservable(): Converts the BehaviorSubject to an Observable to prevent external code from calling next().\n\nUse Cases\nState Management: Share application state (e.g., user authentication status, theme settings).\nForm Data: Track form input changes across components.\nReal-Time Updates: Reflect changes like notifications or live data feeds.\n\n## Lifecycle Hooks\n\nOnChanges\nFired when one or more of the component or directive properties have been changed.\n\nOnInit\nFired when component or directive properties have been initialized.\n\nOnDestroy\nFired when the component or directive instance is destroyed\n\nAfterContentInit\nFire after the initialization of the content of the component or directive has finished.\n\nAfterContentChecked\nFire after the view has been fully initialized.\n\nAfterViewInit\nFires after initializing both the component view and any of its child views. This is a useful lifecycle hook for plugins\noutside of the Angular 2 ecosystem. For example, you could use this method to initialize a jQuery date picker based on the markup that Angular 2 has rendered.\n\n## Data Binding\n\nData binding in Angular is a mechanism that synchronizes the data between the component (TypeScript) and the template (HTML). It enables dynamic updates to the UI when the underlying data changes and vice versa. Angular supports several types of data binding, which I’ll outline below with concise explanations and examples.Types of Data BindingInterpolation (One-Way Binding: Component to View)  Uses double curly braces {{ }} to display component data in the template.\nData flows from the component to the view.\n\n```typescript\n// Component\nexport class AppComponent {\n  title = 'Hello, Angular!';\n}\n```\n\n```html\n<!-- Template -->\n<h1>{{ title }}</h1>\n```\n\nOutput: Displays \"Hello, Angular!\" in the UI.\n\nProperty Binding (One-Way Binding: Component to View)  Binds a component property to an HTML element property using square brackets [ ].\n\n```typescript\n// Component\nexport class AppComponent {\n  isDisabled = true;\n}\n```\n\n```html\n<!-- Template -->\n<button [disabled]=\"isDisabled\">Click me</button>\n```\n\nOutput: The button is disabled based on the isDisabled property.\n\nEvent Binding (One-Way Binding: View to Component)  Binds DOM events to component methods using parentheses ( ).\n\n```typescript\n// Component\nexport class AppComponent {\n  handleClick() {\n    console.log('Button clicked!');\n  }\n}\n```\n\n```html\n<!-- Template -->\n<button (click)=\"handleClick()\">Click me</button>\n```\n\nOutput: Logs \"Button clicked!\" to the console when the button is clicked.\n\n**Two-Way Binding**  Combines property and event binding to synchronize data between component and view.\nUses [(ngModel)] directive (requires FormsModule to be imported).\n\n```typescript\n// Component\nimport { Component } from '@angular/core';\nimport { FormsModule } from '@angular/forms';\n\n@Component({\n  selector: 'app-root',\n  template: '<input [(ngModel)]=\"name\" placeholder=\"Enter name\">\n             <p>You entered: {{ name }}</p>',\n  standalone: true,\n  imports: [FormsModule]\n})\nexport class AppComponent {\n  name = '';\n}\n```\n\nOutput: The input field and the paragraph update simultaneously as the user types.\n\nAttribute Binding  Binds component data to HTML attributes (not properties) using [attr.].\n\n```typescript\n// Component\nexport class AppComponent {\n  colSpanValue = 2;\n}\n```\n\n```html\n<!-- Template -->\n<td [attr.colspan]=\"colSpanValue\">Spanning columns</td>\n```\n\nOutput: The `<td>` element spans 2 columns.\n\nClass and Style Binding  Dynamically apply CSS classes or styles based on component logic.\nClass Binding\n\n```typescript\n// Component\nexport class AppComponent {\n  isActive = true;\n}\n```\n\n```html\n<!-- Template -->\n<div [class.active]=\"isActive\">Conditional Class</div>\n```\n\n```css\n.active { background-color: lightblue; }\n```\n\nOutput: The div has a light blue background if isActive is true.\nStyle Binding\n\n```html\n<div [style.backgroundColor]=\"isActive ? 'lightblue' : 'white'\">Conditional Style</div>\n```\n\nKey PointsOne-Way Binding: Data flows either from component to view (interpolation, property binding) or view to component (event binding).\nTwo-Way Binding: Requires FormsModule for ngModel and is useful for form inputs.\nPerformance: Angular’s change detection automatically updates the UI when bound data changes, but overuse of two-way binding can impact performance in large applications.\nDirectives: Structural directives like *ngIf and *ngFor often work with data binding to conditionally render or iterate over elements.\n\n## Angular Directives\nAngular directives are special markers (attributes or elements) in the DOM that extend HTML functionality or manipulate the DOM in Angular applications. They allow you to attach behavior to elements, modify their structure, or create reusable components. Angular has three main types of directives: Component Directives, Structural Directives, and Attribute Directives. \n\nDefined using the @Component decorator, they encapsulate HTML, CSS, and TypeScript logic.\nIdentified by a leading asterisk (*) in templates. *ngif\nModify the behavior or appearance of an element without altering the DOM structure. ngClass";

const angularMainMd = "" +
  "# **Life Cycle**\n\n# Async Pipe\n\n# **BehaviorSubject**\n\nA Subject or Observable doesn't have a current value. When a value is emitted, it is passed to subscribers and the Observable is done with it.\n\nIf you want to have a current value, use BehaviorSubject which is designed for exactly that purpose. BehaviorSubject keeps the last emitted value and emits it immediately to new subscribers.\n\nIt also has a method getValue() to get the current value.\n\n# Observable and Observer\n\nPattern matching of message passing from publisher to subscriber\n\n1. **Observable** is like a youtube channel of someone else. (( It uploads new videos(data) from time to time, **so it is a data source** for you))\n2. Your youtube account is an **Observer**\n3. Your youtube account **(Observer)** can only get notifications about whether someone else's youtube channel **(Observable)** has uploaded a new video **(has new data)** or made a livestream **(new event)** only if you have **subscribed** to that channel\n\n**(Observer subscribes Observable to listen for new data/any event)**\n\nwhere observable is a data source, subscribe is like a method/function , Observer is generally on your side\n\n# @Input Binding\n\nThis decorator allows a parent component to pass data to a child component.\n\n```\nclass ChildComponent\n{\n\t@Input(\"someInputName\"): propertyName: dataType\n}\n\n<app-child [someInputName]=\"valueOfParent\">\n</app-child>\n\n```\n\n# @Output Binding\n\nThis decorator, combined with `EventEmitter`, allows a child component to send data back to the parent component.\n\n```\nclassComponent\n{\n\t@Output(\"someOutputName\") : eventName: EventEmitter = new EventEmitter();\n}\n\n<app-child (someOutputName)=\"methodName()\">\n</app-child>\n```\n\n# Rxjs Subject\n\nPlain Observable unicast the values to observable\n\nsubject class multicast the values to all observer at-a-time.\n\nSubject = Observable + Array of Observers\n\n```\nvar mySubject = new Subject<dataType>();\nsubject.next(data);\n\nmySubject.subscribe((data)=>{\n//so something\n})\n```\n\n# Rxjs BehaviourSubject\n\nBehaviourSubject stores the current value which is lastly broadcast to the observer.\n\n# ContentChild && ContentChildren\n\nchild to grandChild\n\n# BehaviourSubject\n\n# ElementRef\n\nRepresent plain html tags of the template\n\n```\n<div #refvariable></div>\n\nclass Component\n{\n\t@ViewChild(\"refvariable\"): variableName:ElementRef\n}\n```\n\n# Observable\n\nhandling asynchronous or even synchronous events.\n\nTo start receiving values from an observable, you need to subscribe to it.\n\nSubscriptions can be cancelled using the `unsubscribe` method, which helps in avoiding memory leaks.\n\n# Interceptors";

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private categories: Category[] = [
    {
      id: 'angular',
      name: 'Angular',
      description: 'Angular interview questions and concepts',
      icon: 'code',
      color: '#dd0031',
      postCount: 1
    },
    {
      id: 'react',
      name: 'React',
      description: 'React interview questions and concepts',
      icon: 'react',
      color: '#61dafb',
      postCount: 1
    },
    {
      id: 'csharp',
      name: 'C#',
      description: 'C# interview questions and OOP concepts',
      icon: 'csharp',
      color: '#68217a',
      postCount: 1
    },
    {
      id: 'javascript',
      name: 'JavaScript',
      description: 'JavaScript interview questions and concepts',
      icon: 'javascript',
      color: '#f7df1e',
      postCount: 1
    },
    {
      id: 'sql',
      name: 'SQL Server',
      description: 'SQL Server interview questions and concepts',
      icon: 'database',
      color: '#cc2927',
      postCount: 1
    },
    {
      id: 'css',
      name: 'CSS',
      description: 'CSS interview questions and concepts',
      icon: 'palette',
      color: '#1572b6',
      postCount: 1
    },
    {
      id: 'html',
      name: 'HTML',
      description: 'HTML interview questions and concepts',
      icon: 'html5',
      color: '#e34f26',
      postCount: 1
    },
    {
      id: 'dotnet',
      name: '.NET',
      description: '.NET Framework interview questions',
      icon: 'dotnet',
      color: '#512bd4',
      postCount: 1
    },
    {
      id: 'git',
      name: 'Git',
      description: 'Git commands and interview questions',
      icon: 'git',
      color: '#f05032',
      postCount: 1
    },
    {
      id: 'linq',
      name: 'LINQ',
      description: 'LINQ interview questions and concepts',
      icon: 'linq',
      color: '#ff6b35',
      postCount: 2
    },
    {
      id: 'data-structures',
      name: 'Data Structures',
      description: 'Data structures and algorithms',
      icon: 'data_array',
      color: '#4caf50',
      postCount: 1
    },
    {
      id: 'system-design',
      name: 'System Design',
      description: 'System design concepts and patterns',
      icon: 'architecture',
      color: '#2196f3',
      postCount: 1
    }
  ];

  private blogPosts: BlogPost[] = [
    {
      id: 'angular-observables-rxjs',
      title: 'Angular Observables and RxJS Operators',
      category: 'angular',
      content: `
        <h2>Understanding RxJS Operators</h2>
        <p>RxJS operators are essential for working with Observables in Angular applications. They allow you to transform, filter, and combine data streams effectively.</p>

        <h3>mergeMap vs concatMap vs switchMap</h3>
        <p>These three operators are commonly used for handling multiple API calls, but they behave differently:</p>

        <h4>mergeMap</h4>
        <ul>
          <li>Flattens multiple inner Observables and subscribes to them concurrently</li>
          <li>All results are emitted as they complete, regardless of order</li>
          <li>Use when you want to process multiple API calls in parallel</li>
        </ul>

        <h4>concatMap</h4>
        <ul>
          <li>Maps each value to an Observable and subscribes to them one at a time</li>
          <li>Maintains the order of the source Observable</li>
          <li>Use for sequential API calls where order matters</li>
        </ul>

        <h4>switchMap</h4>
        <ul>
          <li>Maps each value to an Observable and subscribes to the latest one</li>
          <li>Cancels any previous in-flight Observables</li>
          <li>Use when you only care about the latest result</li>
        </ul>

        <h3>BehaviorSubject</h3>
        <p>A BehaviorSubject is a special type of Subject that holds a current value and emits it to new subscribers immediately upon subscription. It's perfect for state management scenarios.</p>

        <div class="code-block">
          <pre><code>import { BehaviorSubject } from 'rxjs';

const userState = new BehaviorSubject(null);

// Subscribe to get current value immediately
userState.subscribe(user => console.log('Current user:', user));

// Update the state
userState.next({ id: 1, name: 'John' });</code></pre>
        </div>
      `,
      excerpt: 'Learn about RxJS operators like mergeMap, concatMap, and switchMap, and understand how BehaviorSubject works for state management in Angular applications.',
      tags: ['Angular', 'RxJS', 'Observables', 'State Management', 'TypeScript'],
      date: new Date('2024-01-15'),
      author: 'Miraj',
      readTime: 8
    },
    {
      id: 'csharp-oop-concepts',
      title: 'C# Object-Oriented Programming Concepts',
      category: 'csharp',
      content: `
        <h2>Core OOP Principles in C#</h2>
        <p>Object-Oriented Programming is fundamental to C# development. Understanding these concepts is crucial for writing maintainable and scalable code.</p>

        <h3>Encapsulation</h3>
        <p>Encapsulation is the bundling of data and methods that operate on that data within a single unit or object, hiding the internal state and requiring all interaction to be performed through an object's methods.</p>

        <div class="code-block">
          <pre><code>public class BankAccount
{
    private decimal balance;

    public decimal Balance
    {
        get { return balance; }
        private set { balance = value; }
    }

    public void Deposit(decimal amount)
    {
        if (amount > 0)
            balance += amount;
    }
}</code></pre>
        </div>

        <h3>Inheritance</h3>
        <p>Inheritance allows a class to inherit properties and methods from another class, promoting code reuse and establishing a relationship between parent and child classes.</p>

        <h3>Polymorphism</h3>
        <p>Polymorphism allows objects to be treated as instances of their parent class while maintaining their own unique implementations of methods.</p>

        <h3>Abstraction</h3>
        <p>Abstraction hides complex implementation details and shows only the necessary features of an object.</p>
      `,
      excerpt: 'Master the four pillars of Object-Oriented Programming in C#: Encapsulation, Inheritance, Polymorphism, and Abstraction with practical examples.',
      tags: ['C#', 'OOP', 'Inheritance', 'Polymorphism', 'Encapsulation'],
      date: new Date('2024-01-16'),
      author: 'Miraj',
      readTime: 10
    },
    {
      id: 'javascript-es6-features',
      title: 'Modern JavaScript ES6+ Features',
      category: 'javascript',
      content: `
        <h2>Essential ES6+ Features for Modern JavaScript</h2>
        <p>ES6 (ECMAScript 2015) and subsequent versions have introduced powerful features that make JavaScript more expressive and easier to work with.</p>

        <h3>Arrow Functions</h3>
        <p>Arrow functions provide a concise syntax for writing function expressions and automatically bind the 'this' context.</p>

        <div class="code-block">
          <pre><code>// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// With array methods
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);</code></pre>
        </div>

        <h3>Destructuring</h3>
        <p>Destructuring allows you to extract values from objects and arrays into distinct variables.</p>

        <div class="code-block">
          <pre><code>// Object destructuring
const user = { name: 'John', age: 30 };
const { name, age } = user;

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [first, second] = colors;</code></pre>
        </div>

        <h3>Template Literals</h3>
        <p>Template literals provide an easy way to create multiline strings and embed expressions.</p>

        <h3>Promises and Async/Await</h3>
        <p>Modern JavaScript provides powerful tools for handling asynchronous operations.</p>
      `,
      excerpt: 'Explore essential ES6+ features including arrow functions, destructuring, template literals, and async/await for modern JavaScript development.',
      tags: ['JavaScript', 'ES6', 'Arrow Functions', 'Destructuring', 'Async/Await'],
      date: new Date('2024-01-17'),
      author: 'Miraj',
      readTime: 12
    },
    {
      id: 'react-hooks-state',
      title: 'React Hooks and State Management',
      category: 'react',
      content: `
        <h2>Understanding React Hooks</h2>
        <p>React Hooks were introduced in React 16.8 to allow functional components to use state and other React features without writing class components.</p>

        <h3>useState Hook</h3>
        <p>The useState hook allows functional components to manage local state.</p>

        <div class="code-block">
          <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}</code></pre>
        </div>

        <h3>useEffect Hook</h3>
        <p>The useEffect hook lets you perform side effects in functional components, similar to componentDidMount and componentDidUpdate in class components.</p>

        <h3>useContext Hook</h3>
        <p>useContext allows you to consume context values without nesting components.</p>

        <h3>Custom Hooks</h3>
        <p>You can create custom hooks to extract component logic into reusable functions.</p>
      `,
      excerpt: 'Master React Hooks including useState, useEffect, and useContext for modern React development and state management.',
      tags: ['React', 'Hooks', 'State Management', 'JavaScript', 'Components'],
      date: new Date('2024-01-18'),
      author: 'Miraj',
      readTime: 9
    },
    {
      id: 'sql-server-queries',
      title: 'SQL Server Query Optimization',
      category: 'sql',
      content: `
        <h2>SQL Server Performance Optimization</h2>
        <p>Writing efficient SQL queries is crucial for database performance. Understanding query optimization techniques can significantly improve application performance.</p>

        <h3>Indexing Strategies</h3>
        <p>Proper indexing is essential for query performance. Understanding when and how to create indexes can make a huge difference.</p>

        <div class="code-block">
          <pre><code>-- Create a clustered index
CREATE CLUSTERED INDEX IX_Users_Email
ON Users (Email);

-- Create a non-clustered index
CREATE NONCLUSTERED INDEX IX_Users_Name
ON Users (FirstName, LastName)
INCLUDE (Email, Phone);</code></pre>
        </div>

        <h3>Query Optimization</h3>
        <p>Understanding execution plans and query optimization techniques is crucial for database performance.</p>

        <h3>Stored Procedures</h3>
        <p>Stored procedures can improve performance and security by pre-compiling SQL statements.</p>

        <h3>Common Performance Issues</h3>
        <ul>
          <li>Missing indexes on frequently queried columns</li>
          <li>Using SELECT * instead of specific columns</li>
          <li>Not using parameterized queries</li>
          <li>Inefficient JOIN operations</li>
        </ul>
      `,
      excerpt: 'Learn SQL Server query optimization techniques including indexing strategies, execution plans, and performance best practices.',
      tags: ['SQL Server', 'Database', 'Performance', 'Indexing', 'Queries'],
      date: new Date('2024-01-19'),
      author: 'Miraj',
      readTime: 11
    },
    {
      id: 'css-layout-techniques',
      title: 'Modern CSS Layout Techniques',
      category: 'css',
      content: `
        <h2>CSS Layout Fundamentals</h2>
        <p>Modern CSS provides powerful layout tools including Flexbox and Grid that make creating responsive layouts much easier.</p>

        <h3>CSS Flexbox</h3>
        <p>Flexbox is a one-dimensional layout method for arranging items in rows or columns.</p>

        <div class="code-block">
          <pre><code>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.item {
  flex: 1;
  margin: 10px;
}</code></pre>
        </div>

        <h3>CSS Grid</h3>
        <p>CSS Grid is a two-dimensional layout system that allows you to create complex layouts with rows and columns.</p>

        <div class="code-block">
          <pre><code>.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}</code></pre>
        </div>

        <h3>Responsive Design</h3>
        <p>Creating layouts that work across different screen sizes is essential for modern web development.</p>

        <h3>CSS Variables</h3>
        <p>CSS custom properties (variables) allow you to store and reuse values throughout your stylesheets.</p>
      `,
      excerpt: 'Master modern CSS layout techniques including Flexbox, Grid, and responsive design principles for creating beautiful web layouts.',
      tags: ['CSS', 'Flexbox', 'Grid', 'Layout', 'Responsive Design'],
      date: new Date('2024-01-20'),
      author: 'Miraj',
      readTime: 8
    },
    {
      id: 'angular-code-md',
      title: 'Angular Code Examples',
      category: 'angular',
      content: angularCodeMd,
      excerpt: 'Angular code examples and patterns.',
      tags: ['Angular', 'Code', 'Component', 'EventEmitter'],
      date: new Date('2024-01-21'),
      author: 'Miraj',
      readTime: 10
    },
    {
      id: 'angular-concept-md',
      title: 'Angular Concepts',
      category: 'angular',
      content: angularConceptMd,
      excerpt: 'Angular concepts and RxJS operators.',
      tags: ['Angular', 'Concepts', 'RxJS', 'Observables'],
      date: new Date('2024-01-22'),
      author: 'Miraj',
      readTime: 12
    },
    {
      id: 'angular-main-md',
      title: 'Angular Interview Notes',
      category: 'angular',
      content: angularMainMd,
      excerpt: 'Angular interview notes and lifecycle.',
      tags: ['Angular', 'Lifecycle', 'BehaviorSubject'],
      date: new Date('2024-01-23'),
      author: 'Miraj',
      readTime: 8
    }
  ];

  constructor() { }

  getCategories(): Observable<Category[]> {
    return of(this.categories);
  }

  getCategoryById(id: string): Observable<Category | undefined> {
    return of(this.categories.find(cat => cat.id === id));
  }

  getBlogPosts(): Observable<BlogPost[]> {
    return of(this.blogPosts);
  }

  getBlogPostById(id: string): Observable<BlogPost | undefined> {
    return of(this.blogPosts.find(post => post.id === id));
  }

  getBlogPostsByCategory(categoryId: string): Observable<BlogPost[]> {
    return of(this.blogPosts.filter(post => post.category === categoryId));
  }

  searchBlogPosts(query: string): Observable<BlogPost[]> {
    const lowercaseQuery = query.toLowerCase();
    return of(this.blogPosts.filter(post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.content.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    ));
  }
}
