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
