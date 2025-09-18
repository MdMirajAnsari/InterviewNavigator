## Write a basic Angular component code and show how component interact?

```javascript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div style="border: 1px solid blue; padding: 10px; margin: 10px;">
      <h3>Child Component</h3>
      <p>Received from Parent: {{ parentMessage }}</p>

      <button (click)="sendMessageToParent()">Send Message to Parent</button>
    </div>
  `
})
export class ChildComponent {
  // Receive data from parent
  @Input() parentMessage: string = '';

  // Send data to parent
  @Output() messageEvent = new EventEmitter<string>();

  sendMessageToParent() {
    this.messageEvent.emit("Hello Parent! 👋 from Child");
  }
}

```

```javascript
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <div style="border: 1px solid green; padding: 10px; margin: 10px;">
      <h2>Parent Component</h2>
      <p>Message from Child: {{ childMessage }}</p>

      <!-- Pass data to child -->
      <app-child 
        [parentMessage]="parentMessage" 
        (messageEvent)="receiveMessage($event)">
      </app-child>
    </div>
  `
})
export class ParentComponent {
  parentMessage = "Hello Child! 👋 from Parent";
  childMessage = "";

  receiveMessage(msg: string) {
    this.childMessage = msg;
  }
}

```

## How do you implemet a resilience in Angular?


In  **Angular** , resilience usually means making the app **robust against failures** such as:

* API errors (server down, invalid request, timeouts).
* Network instability (slow internet, offline).
* Retry logic, fallbacks, and graceful error handling.

```javascript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = 'https://api.example.com/data';

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.apiUrl).pipe(
      retry(3), // retry up to 3 times before failing
      catchError(error => {
        console.error('Request failed:', error);
        return throwError(() => new Error('Something went wrong, please try again later.'));
      })
    );
  }
}

```
