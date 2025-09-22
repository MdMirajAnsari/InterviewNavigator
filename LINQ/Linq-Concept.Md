## Method Syntax and Query Syntax

var evenNumbers = numbers

.Where(n => n % 2 ==0);

var evenNumbers = from number in numbers

    where number % 2 == 0

    select number;

## Deferred Execution

The evaluation of a LINQ expression id `delayed` until the value is actually needed. It allow us to work on latest data.

## First and FirstOrDefault

First() method returns first element in the collection that matches with the collection.

It throws exception if no element matches with the condition.

FirstOrDefault() method returns first element that matches with the condition.

It returns null if no element matches with the condition.

## Single and SingleOrDefault

It returns first element (only one element) that matches with the collection.

It throws exception if no element or multiple elements match with the condition.

SingleOrDefault

It returns first element (only one element) that matches with the collection.

It returns null if no element matches with the condition; but it throws exception if multiple elements match with the condition.

ToLookup

AsEnumerable

AsQueryable

ToList

ToDictionary

ToArray

GroupBy

ElementAt vs ElementAtOrDefault

Range

Empty

Last vs LastOrDefault

Concat

Union

Intersect

Any

Contains

select vs SelectMany

OrderBy

ThenBy

Reverse

where

Take

TakeWhile

Skip

SkipWhile

## Difference between IEnumerable, IQueryable, IList?

* **IEnumerable** → Best for in-memory enumeration.
* **IQueryable** → Best for querying databases efficiently.
* **IList** → Best for modifiable collections with index access.

## What is the difference between Select and SelectMany?

- Select projects element-by-element; SelectMany flattens nested sequences.

```csharp
var ordersNested = customers.Select(c => c.Orders);        // IEnumerable<IEnumerable<Order>>
var allOrders   = customers.SelectMany(c => c.Orders);     // IEnumerable<Order>
```

## How do you perform a left join with LINQ?

```csharp
var q = from c in customers
        join o in orders on c.Id equals o.CustomerId into grp
        from o in grp.DefaultIfEmpty()
        select new { c.Name, OrderId = o?.Id };
```

## How do you get distinct elements by a key?

```csharp
var distinct = items
  .GroupBy(x => x.Key)
  .Select(g => g.First());
```

## How to paginate results with LINQ?

```csharp
int page = 2, pageSize = 10;
var pageItems = source.Skip((page - 1) * pageSize).Take(pageSize);
```

## How to compute aggregates per group?

```csharp
var stats = purchases
  .GroupBy(p => p.Category)
  .Select(g => new { Category = g.Key, Total = g.Sum(x => x.Amount), Avg = g.Average(x => x.Amount) });
```

## How to check if any/all elements match a condition?

```csharp
bool hasPremium = users.Any(u => u.IsPremium);
bool allActive  = users.All(u => u.Active);
```

## AsEnumerable vs AsQueryable

- AsEnumerable switches to client-side LINQ to Objects.
- AsQueryable exposes provider-backed query for translation (e.g., to SQL).

## How to order by multiple fields?

```csharp
var ordered = people
  .OrderBy(p => p.LastName)
  .ThenBy(p => p.FirstName)
  .ThenByDescending(p => p.Age);
```

## How to find the Nth highest value?

```csharp
int n = 3;
var nth = source
  .Select(x => x.Score)
  .Distinct()
  .OrderByDescending(x => x)
  .Skip(n - 1)
  .FirstOrDefault();
```
