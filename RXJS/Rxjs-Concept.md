## forkJoin

call api in one shot

```csharp
forkJoin({
  users: this.http.get('https://api.example.com/users'),
  orders: this.http.get('https://api.example.com/orders')
}).subscribe(result => {
  console.log(result.users);
  console.log(result.orders);
});

```

## map → Transform API responses into usable data.

Transforms each emitted value.

```typescript
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

from([1, 2, 3]).pipe(
  map(x => x * 10)
).subscribe(console.log); // 10, 20, 30
```

## filter → React only when input or events meet conditions.

Emits only values that pass the predicate.

```typescript
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

from([1, 2, 3, 4]).pipe(
  filter(x => x % 2 === 0)
).subscribe(console.log); // 2, 4
```

## debounceTime → Delay user input (perfect for search boxes).

Delays emissions until silence for the given time.

```typescript
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const input = document.getElementById('search') as HTMLInputElement;
fromEvent(input, 'input').pipe(
  debounceTime(300),
  map(() => input.value)
).subscribe(query => console.log('Search:', query));
```

## switchMap → Cancel old requests & handle the latest (type-ahead search).

Switch to new inner Observable, cancel previous.

```typescript
import { fromEvent } from 'rxjs';
import { debounceTime, map, switchMap } from 'rxjs/operators';

const input = document.getElementById('search') as HTMLInputElement;
fromEvent(input, 'input').pipe(
  debounceTime(300),
  map(() => input.value),
  switchMap(q => fetch(`/api?q=${q}`).then(r => r.json()))
).subscribe(console.log);
```

## mergeMap → Run multiple API calls in parallel.

Flatten and subscribe to many inner Observables concurrently.

```typescript
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

from([1, 2, 3]).pipe(
  mergeMap(id => fetch(`/api/items/${id}`).then(r => r.json()))
).subscribe(console.log);
```

## concatMap → Queue tasks one by one (form submissions, workflows).

Run inner Observables sequentially, preserving order.

```typescript
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';

from([1, 2, 3]).pipe(
  concatMap(id => fetch(`/api/step/${id}`).then(r => r.json()))
).subscribe(console.log);
```

## takeUntil → Auto-cleanup subscriptions on component destroy.

Complete when notifier emits.

```typescript
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const destroy$ = new Subject<void>();
interval(1000).pipe(
  takeUntil(destroy$)
).subscribe(console.log);

// later
destroy$.next();
destroy$.complete();
```

## combineLatest → React when multiple observables change together.

Emit latest values from all sources whenever any changes.

```typescript
import { combineLatest, interval } from 'rxjs';
import { map } from 'rxjs/operators';

const a$ = interval(1000);
const b$ = interval(1500);

combineLatest([a$, b$]).pipe(
  map(([a, b]) => `${a}:${b}`)
).subscribe(console.log);
```

## take → Take only the first N values.

```typescript
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

interval(500).pipe(
  take(3)
).subscribe(console.log); // 0,1,2 then complete
```

## unsubscribe → Cancel an active subscription.

```typescript
import { interval } from 'rxjs';

const sub = interval(1000).subscribe(console.log);
setTimeout(() => sub.unsubscribe(), 2500); // stop after ~2.5s
```

## tap → Side effects for debugging/logging.

```typescript
import { of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

of(2).pipe(
  tap(x => console.log('before', x)),
  map(x => x * 5),
  tap(x => console.log('after', x))
).subscribe();
```

## exhaustMap → Ignore new triggers while a request is in flight.

Useful for login button or form submit to prevent duplicates.

```typescript
import { fromEvent } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';

const btn = document.getElementById('submit')!;
fromEvent(btn, 'click').pipe(
  exhaustMap(() => fetch('/api/submit', { method: 'POST' }))
).subscribe();
```

## webSocket → Create a WebSocket subject.

```typescript
import { webSocket } from 'rxjs/webSocket';

const socket$ = webSocket('wss://echo.websocket.org');
socket$.subscribe(msg => console.log('server:', msg));
socket$.next({ hello: 'world' });
```

## of → Create observable from static values.

```typescript
import { of } from 'rxjs';

of(1, 2, 3).subscribe(console.log);
```

## from → Create observable from Promise/array/iterable.

```typescript
import { from } from 'rxjs';

from(fetch('/api').then(r => r.json())).subscribe(console.log);
```

## interval → Emit increasing numbers at intervals.

```typescript
import { interval } from 'rxjs';

interval(1000).subscribe(console.log); // 0,1,2...
```

## fromEvent → Create observable from DOM or Node event.

```typescript
import { fromEvent } from 'rxjs';

fromEvent(document, 'click').subscribe(() => console.log('clicked'));
```

## merge → Combine Observables by interleaving values.

```typescript
import { merge, interval } from 'rxjs';

merge(interval(500), interval(800)).subscribe(console.log);
```

## combineLatest (duplicate) → See above example.

## retry → Retry a failing source a number of times.

```typescript
import { defer } from 'rxjs';
import { retry } from 'rxjs/operators';

let attempts = 0;
defer(() => {
  attempts++;
  if (attempts < 3) return Promise.reject('fail');
  return Promise.resolve('ok');
}).pipe(
  retry(2)
).subscribe(console.log, console.error);
```

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
