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

## @ViewChild

```@ViewChild(ChildComponent)
 @ViewChild(ChildComponent) child!: ChildComponent;
```

```typescript
@ViewChildren(ChildComponent) children!: QueryList<ChildComponent>;
```

@ContentChild

```typescript
@ContentChild('projected') projectedContent!: ElementRef;
```

```typescript
@ContentChildren('item') items!: QueryList<ElementRef>;
```

NGRX

```typescript
import { createAction } from '@ngrx/store';

export const increment = createAction('[Counter] Increment');
export const decrement = createAction('[Counter] Decrement');
export const reset = createAction('[Counter] Reset');

```

```typescript
import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';

export const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, state => state + 1),
  on(decrement, state => state - 1),
  on(reset, () => 0)
);

```

```typescript
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectCounter = createFeatureSelector<number>('counter');

```

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { counterReducer } from './store/counter.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ counter: counterReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25 }) // For Redux DevTools
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

```

```typescript
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { increment, decrement, reset } from './store/counter.actions';
import { selectCounter } from './store/counter.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  counter$: Observable<number>;

  constructor(private store: Store) {
    this.counter$ = this.store.select(selectCounter);
  }

  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }

  onReset() {
    this.store.dispatch(reset());
  }
}

```

```typescript
<h1>NgRx Counter Example</h1>
<h2>Current Count: {{ counter$ | async }}</h2>

<button (click)="onIncrement()">Increment</button>
<button (click)="onDecrement()">Decrement</button>
<button (click)="onReset()">Reset</button>

```

## Guard

```typescript
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('user'); // simple check
    if (!isLoggedIn) {
      this.router.navigate(['/login']); // redirect to login
      return false;
    }
    return true;
  }
}

```

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] }, // guard applied
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

```

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    localStorage.setItem('user', 'true'); // mock login
    this.router.navigate(['/home']);
  }
}

```

How do you implement **pagination** and **search** in Angular with Web API?
