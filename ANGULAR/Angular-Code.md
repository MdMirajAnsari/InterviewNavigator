## 1. Pass data from a child component to a parent component.

**Using @Output and EventEmitter (Recommended)** 

The @Output decorator allows a child component to emit custom events that the parent component can listen to, enabling data to be passed from child to parent.StepsChild Component

```typescript
// (child.component.ts):

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="sendData()">Send Data to Parent</button>
  `
})
export class ChildComponent {
  @Output() dataEvent = new EventEmitter<string>(); // Define Output event

  sendData() {
    this.dataEvent.emit('Hello from Child!'); // Emit data to parent
  }
}
```

```typescript
// Parent Component (parent.component.ts):

import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child (dataEvent)="receiveData($event)"></app-child>
    <p>Received: {{ message }}</p>
  `
})
export class ParentComponent {
  message: string;

  receiveData(data: string) {
    this.message = data; // Handle data from child
  }
}
```

Explanation:The child component declares an @Output property (dataEvent) using EventEmitter.
The child calls emit() to send data (e.g., a string, object, or any type).
The parent listens to the dataEvent event using event binding (dataEvent)="receiveData($event)" and processes the emitted data.

Use Case: Ideal for most scenarios where the child needs to notify the parent of an event or send data, such as button clicks, form submissions, or state changes.

**Using ViewChild to Access Child Component**

The parent can directly access the child component’s properties or methods using @ViewChild, allowing it to retrieve data.

Steps

```typescript
//  Child Component (child.component.ts):

import { Component } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<button (click)="updateData()">Update Data</button>`
})
export class ChildComponent {
  childData: string = 'Initial Child Data';

  updateData() {
    this.childData = 'Updated Child Data';
  }
}
```

```typescript
// Parent Component (parent.component.ts):

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `<app-child></app-child><p>Child Data: {{ childData }}</.watch>`
})
export class ParentComponent implements AfterViewInit {
  @ViewChild(ChildComponent) child: ChildComponent;
  childData: string;

  ngAfterViewInit() {
    this.childData = this.child.childData; // Access child data
  }
}
```

Explanation:The parent uses @ViewChild to get a reference to the child component.
After the view is initialized (ngAfterViewInit), the parent can access the child’s properties or methods.
Caution: This tightly couples the parent and child, which may not be ideal for reusable components.

Use Case: Suitable for scenarios where the parent needs direct access to the child’s state, but use sparingly to maintain loose coupling.
