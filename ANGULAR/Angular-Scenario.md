## Write a basic Angular component code and show how component interact?

```javascript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <div style="border: 1px solid blue; padding: 10px; margin: 10px;">
      <h2>Child Component</h2>
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

## Implement a pagination in Angular consuming a Web API?

Step 1: Create Service to Call API

```javascript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://api.example.com/products';

  constructor(private http: HttpClient) {}

  getProducts(page: number, pageSize: number): Observable<PagedResult<Product>> {
    let params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize);

    return this.http.get<PagedResult<Product>>(this.apiUrl, { params });
  }
}

```

Step 2: Create Component

```javascript
import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  totalCount = 0;

  page = 1;
  pageSize = 5;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.page, this.pageSize)
      .subscribe(result => {
        this.products = result.items;
        this.totalCount = result.totalCount;
      });
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.loadProducts();
  }
}

```

Step 3: Component Template

```javascript
<div class="container">
  <h2>Products</h2>

  <ul>
    <li *ngFor="let product of products">
      {{ product.id }} - {{ product.name }}
    </li>
  </ul>

  <!-- Pagination -->
  <nav *ngIf="totalCount > pageSize">
    <ul class="pagination">
      <li class="page-item" [class.disabled]="page === 1">
        <a class="page-link" (click)="onPageChange(page - 1)">Previous</a>
      </li>

      <li class="page-item" 
          *ngFor="let p of [].constructor(Math.ceil(totalCount / pageSize)); let i = index"
          [class.active]="page === i+1">
        <a class="page-link" (click)="onPageChange(i+1)">{{ i+1 }}</a>
      </li>

      <li class="page-item" [class.disabled]="page === Math.ceil(totalCount / pageSize)">
        <a class="page-link" (click)="onPageChange(page + 1)">Next</a>
      </li>
    </ul>
  </nav>
</div>

```

## What do you feel is the best about Angular 16 ? What new things did you check in 16?

Signals (New Reactivity Model)

Introduces fine-grained reactivity (signal(), computed(), effect()).

Reduces reliance on Zone.js and RxJS.

More predictable and efficient change detection.

Non-Destructive Hydration (SSR)

Preserves server-rendered DOM during client bootstrap.

Smoothens server-side rendering experience.

esbuild-Based Build System (Preview)

Faster builds and improved performance.

Experimental Jest Support

Allows Jest as a testing framework in Angular projects.

Standalone Components & CLI Enhancements

Easier component/module/service generation.

Better CLI configuration and productivity.

Improved Developer Tools

Enhanced Angular Language Service: autocomplete & error detection.

Type-Safe Reactive Forms

Strict typing with TypeScript 5.1.

Prevents runtime form errors.

Angular CDK Enhancements

New components and utilities for accessibility, virtual scrolling, and styling.

## Suppose there are three APIs and you want to render data as soon as any one API gets the data but you also don't want to miss data from any. write code for that?

```typescript
import { Component, OnInit } from '@angular/core';
import { of, merge, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api-demo',
  template: `
    <h2>Data from APIs (render as soon as available):</h2>
    <ul>
      <li *ngFor="let item of renderedData">{{ item }}</li>
    </ul>

    <h2>All API Data (after all complete):</h2>
    <pre>{{ allData | json }}</pre>
  `
})
export class ApiDemoComponent implements OnInit {
  renderedData: any[] = [];
  allData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Suppose these are your three API calls
    const api1$: Observable<any> = this.http.get('https://api.example.com/data1');
    const api2$: Observable<any> = this.http.get('https://api.example.com/data2');
    const api3$: Observable<any> = this.http.get('https://api.example.com/data3');

    // Merge: emits data as soon as any API responds
    merge(api1$, api2$, api3$).subscribe({
      next: (data) => {
        this.renderedData.push(data); // render immediately
        this.allData.push(data);      // store for complete collection
      },
      error: (err) => console.error(err),
      complete: () => console.log('All APIs completed')
    });
  }
}

```

```typescript
import { Component, OnInit } from '@angular/core';
import { of, from } from 'rxjs';
import { mergeMap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-api-demo',
  template: `
    <h2>Data as it arrives:</h2>
    <ul>
      <li *ngFor="let item of renderedData">{{ item | json }}</li>
    </ul>
  `
})
export class ApiDemoComponent implements OnInit {
  renderedData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Array of API URLs
    const apis = [
      'https://api.example.com/data1',
      'https://api.example.com/data2',
      'https://api.example.com/data3'
    ];

    // Convert array of APIs to observable stream
    from(apis)
      .pipe(
        // Use mergeMap to call each API concurrently
        mergeMap((url) => this.http.get(url))
      )
      .subscribe({
        next: (data) => {
          // Render as soon as any API responds
          this.renderedData.push(data);
        },
        error: (err) => console.error(err),
        complete: () => console.log('All API calls completed')
      });
  }
}

```

## How do you prevent memory leaks with Observables?

* Observables are **lazy streams** → they keep running until **completed** or  **unsubscribed** .
* If you don’t unsubscribe, the subscription stays in memory → keeping components/services alive → memory leak.

We prevent memory leaks with Observables by unsubscribing properly, usually using `takeUntil` with a `Subject`, or by using Angular’s `AsyncPipe` which handles subscription cleanup automatically.

1. **Unsubscribe Manually (ngOnDestroy)**

```typescript
subscription!: Subscription;

ngOnInit() {
  this.subscription = this.myService.getData().subscribe(data => {
    console.log(data);
  });
}

ngOnDestroy() {
  this.subscription.unsubscribe();
}

```

Use `takeUntil` with a Subject

```typescript
private destroy$ = new Subject`<void>`();

ngOnInit() {
  this.myService.getData()
    .pipe(takeUntil(this.destroy$))
    .subscribe(data => console.log(data));
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}
```

3. **Use `AsyncPipe` in Templates**

   ```typescript
   <div *ngIf="myService.getData() | async as data">
     {{ data }}
   </div>

   ```
4. **Use Higher-Order Mapping (`switchMap`)**

* Cancels previous subscription automatically when new value comes in.
* ```typescript
  this.searchForm.valueChanges
    .pipe(
      debounceTime(300),
      switchMap(term => this.myService.search(term))
    )
    .subscribe(results => console.log(results));

  ```

## Why use trackBy in *ngFor and what happens if you skip it?

## How do you optimize Angular for performance in production?

## Drawback of async pipe

If you use the same observable with `| async` **multiple times** in the same template, Angular will **create multiple subscriptions** — which can cause extra re-rendering or performance issues.

## How Angular outside Angular’s change detection zone

Using `NgZone.runOutsideAngular()`

```typescript
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-heavy-task',
  template: `<h2>{{count}}</h2>`
})
export class HeavyTaskComponent {
  count = 0;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    // Run outside Angular to avoid triggering CD for each interval
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.count++;
        console.log('Count updated:', this.count);
      }, 1000);
    });
  }
}

```

## How interceptor works internally in angular

## How To change the output folder name

```bash
ng build --output-path=my-build

```

Difference between ngFor and @for

```typescript
<li *ngFor="let item of items; trackBy: trackByFn">
  {{ item }}
</li>

```

```typescript
@for (item of items; track item.id; let i = $index) {
  <li>{{ i }} - {{ item.name }}</li>
}

```

## Why they have introduce Signal in Angular

Before Angular 16, change detection relied heavily on:

* **Zone.js**
* **Change Detection Trees**

That meant:

* Whenever *anything* changed (click, HTTP response, setTimeout, etc.), Angular rechecked **every component** to see if something updated.
* This worked, but it was **inefficient** in large apps.

Angular introduced **Signals** to replace global change detection with a faster, more predictable, and fine-grained reactivity model — making Angular future-ready and “zone-less”.

```typescript
import { signal } from '@angular/core';

const count = signal(0);

function increment() {
  count.update(c => c + 1);
}

console.log(count()); // read value
increment();
console.log(count()); // 1

```

## How to **warn the user if they navigate away from a form with unsaved changes**


* Use **`CanDeactivate` guard** for in-app route navigation.
* Check `form.dirty` to know if user has unsaved changes.
* Optionally, use `beforeunload` for browser-level navigation.
* Use `confirm()` to show alert or a custom modal for better UX.

Using CanDeactivate Guard

```typescript
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

// Create an interface for components that want to use this guard
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({ providedIn: 'root' })
export class UnsavedChangesGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | boolean {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

```

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CanComponentDeactivate } from './unsaved-changes.guard';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html'
})
export class MyFormComponent implements CanComponentDeactivate {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: [''],
      email: ['']
    });
  }

  // This method is called by the guard
  canDeactivate(): boolean {
    if (this.myForm.dirty) {
      return confirm('You have unsaved changes! Do you really want to leave?');
    }
    return true;
  }
}

```

```typescript
import { Routes } from '@angular/router';
import { MyFormComponent } from './my-form.component';
import { UnsavedChangesGuard } from './unsaved-changes.guard';

const routes: Routes = [
  {
    path: 'form',
    component: MyFormComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: 'previous',
    component: PreviousComponent
  }
];

```

```typescript
import { Routes } from '@angular/router';
import { MyFormComponent } from './my-form.component';
import { UnsavedChangesGuard } from './unsaved-changes.guard';

const routes: Routes = [
  {
    path: 'form',
    component: MyFormComponent,
    canDeactivate: [UnsavedChangesGuard]
  },
  {
    path: 'previous',
    component: PreviousComponent
  }
];

```

## How to reduce bundle size in angular

* `ng build --prod`
* Lazy load modules
* Remove unused dependencies
* Optimize Angular Material imports
* Tree-shake & remove dead code
* Use smaller alternatives for big libraries
* Compress images/assets
* Use `OnPush` change detection 
* Analyze bundle with `webpack-bundle-analyzer` 

## What is the use of ts congiguration file in Angular?

* `tsconfig.json` is the  **TypeScript configuration file** .
* It tells the **TypeScript compiler** (`tsc`) how to **compile your TypeScript code** into JavaScript.
* In Angular, it’s used to configure  **compilation rules, target version, module system, and includes/excludes** .
