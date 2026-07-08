# RxJS Operators and Creation Functions

## `takeUntil`

Emits values from the source Observable until another Observable emits. It is
commonly used to stop subscriptions when a component or process is destroyed.

```ts
const destroy$ = new Subject<void>();

source$.pipe(takeUntil(destroy$)).subscribe(console.log);

destroy$.next();
destroy$.complete();
```

## `take`

Emits only the first specified number of values and then completes.

```ts
interval(1000).pipe(take(3)).subscribe(console.log);
// 0, 1, 2
```

## `unsubscribe`

`unsubscribe()` is a method on a `Subscription`, not an RxJS operator. It stops
the subscription and releases its resources.

```ts
const subscription = interval(1000).subscribe(console.log);

subscription.unsubscribe();
```

Prefer operators such as `take`, `takeUntil`, or `first` when the subscription
can complete declaratively.

## `tap`

Performs a side effect without changing the emitted value. It is useful for
logging, debugging, and triggering non-transforming actions.

```ts
of(1, 2, 3).pipe(
  tap(value => console.log('Before map:', value)),
  map(value => value * 2)
);
```

## `map`

Transforms every emitted value into a new value.

```ts
of(1, 2, 3).pipe(
  map(value => value * 10)
);
// 10, 20, 30
```

## `filter`

Emits only values that satisfy a condition.

```ts
of(1, 2, 3, 4).pipe(
  filter(value => value % 2 === 0)
);
// 2, 4
```

## Higher-order mapping operators

These operators map each source value to an inner Observable. Their main
difference is how they handle multiple inner Observables.

### `mergeMap`

Subscribes to all inner Observables concurrently. Results may arrive in a
different order from the source values.

Use it when requests can run in parallel and every result matters.

```ts
userIds$.pipe(
  mergeMap(id => getUser(id))
);
```

### `switchMap`

Unsubscribes from the previous inner Observable when a new source value arrives.
Only the latest inner Observable remains active.

Use it for search boxes, route changes, and other “latest value wins” behavior.

```ts
searchText$.pipe(
  switchMap(text => search(text))
);
```

### `concatMap`

Queues inner Observables and processes them one at a time, preserving order.

Use it when every operation must finish in sequence.

```ts
items$.pipe(
  concatMap(item => saveItem(item))
);
```

### `exhaustMap`

Ignores new source values while the current inner Observable is active. After
the current one completes, it can accept another value.

Use it to prevent repeated submissions or duplicate login requests.

```ts
submitClicks$.pipe(
  exhaustMap(() => submitForm())
);
```

| Operator | When a new value arrives | Typical use |
| --- | --- | --- |
| `mergeMap` | Runs it concurrently | Parallel independent work |
| `switchMap` | Cancels the previous inner subscription | Search/autocomplete |
| `concatMap` | Queues it | Ordered saves or updates |
| `exhaustMap` | Ignores it while busy | Preventing duplicate submissions |

## `webSocket`

Creates a `WebSocketSubject` that can both receive and send WebSocket messages.
It is available from `rxjs/webSocket`.

```ts
import { webSocket } from 'rxjs/webSocket';

const socket$ = webSocket('wss://example.com/socket');

socket$.subscribe(message => console.log(message));
socket$.next({ type: 'ping' });
socket$.complete();
```

## Observable creation functions

### `of`

Creates an Observable that emits the supplied arguments in order and then
completes.

```ts
of('a', 'b', 'c').subscribe(console.log);
```

### `from`

Creates an Observable from an array, iterable, Promise, or another supported
Observable-like value.

```ts
from([10, 20, 30]).subscribe(console.log);
```

Unlike `of([10, 20, 30])`, which emits one array, `from([10, 20, 30])` emits
three individual values.

### `interval`

Emits an increasing number (`0`, `1`, `2`, and so on) repeatedly at the given
time interval. It continues until it is unsubscribed or stopped by an operator.

```ts
interval(1000).pipe(take(3)).subscribe(console.log);
```

### `fromEvent`

Creates an Observable from events produced by a DOM element, Node.js event
emitter, or another compatible event target.

```ts
const button = document.querySelector('button')!;
const clicks$ = fromEvent(button, 'click');

clicks$.subscribe(event => console.log(event));
```

## Combining Observables

### `merge`

Subscribes to multiple Observables and emits each value as soon as it arrives.
It does not wait for every source to emit.

```ts
merge(
  interval(1000).pipe(map(value => `A${value}`)),
  interval(1500).pipe(map(value => `B${value}`))
).subscribe(console.log);
```

### `combineLatest`

Waits until every source Observable has emitted at least once. After that, it
emits the latest value from every source whenever any source emits.

```ts
combineLatest([
  selectedCountry$,
  selectedCity$
]).subscribe(([country, city]) => {
  console.log(country, city);
});
```

`combineLatest` is useful when a result depends on the current state of several
long-lived Observables.
