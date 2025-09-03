## *@Input and @Output*

@Input

* Used to  **pass data from a parent component → child component** .
* Makes a property in the child component bindable from the parent’s template.
* child.component.ts

```typescript
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `<p>Child received: {{ data }}</p>`
})
export class ChildComponent {
  @Input() data!: string; // Property exposed to parent
}

```

parent.component.html

```html
<app-child [data]="parentMessage"></app-child>

```

parent.component.ts

```typescript
export class ParentComponent {
  parentMessage = "Hello from Parent!";
}

```

*@Output*

* Used to  **send data/events from child component → parent component** .
* Works with  **EventEmitter** .

child.component.ts

```typescript
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <button (click)="sendMessage()">Send Message</button>
  `
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit("Hello from Child!");
  }
}

```

parent.component.html

```typescript
<app-child (messageEvent)="receiveMessage($event)"></app-child>
<p>Message from child: {{ childMessage }}</p>

```

parent.component.ts

```typescript
export class ParentComponent {
  childMessage = '';

  receiveMessage(msg: string) {
    this.childMessage = msg;
  }
}

```
