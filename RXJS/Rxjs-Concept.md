

map → Transform API responses into usable data.

filter → React only when input or events meet conditions.

debounceTime → Delay user input (perfect for search boxes).

switchMap → Cancel old requests & handle the latest (type-ahead search).

mergeMap → Run multiple API calls in parallel.

concatMap → Queue tasks one by one (form submissions, workflows).

takeUntil → Auto-cleanup subscriptions on ngOnDestroy.

combineLatest → React when multiple observables change together.

take

unsubscribe

tap

exhaustMap

webSocket

of

from

interval

fromEvent

merge

combineLatest

retry

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
