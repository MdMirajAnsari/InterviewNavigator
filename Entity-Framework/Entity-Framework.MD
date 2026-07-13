# Entity Framework Core Interview Questions and Answers

## Tracking versus AsNoTracking()

By default, EF Core tracks entities returned from queries. Tracking means the `DbContext` keeps the entity in its change tracker, detects modifications, and saves those changes when `SaveChanges()` is called.

Use tracking when you plan to update or delete the entity.

```csharp
var user = await context.Users.FirstAsync(x => x.Id == id);
user.Name = "New Name";
await context.SaveChangesAsync();
```

`AsNoTracking()` tells EF Core not to track the returned entities. It is faster and uses less memory for read-only queries.

```csharp
var users = await context.Users
    .AsNoTracking()
    .ToListAsync();
```

Use `AsNoTracking()` for reports, dropdowns, search results, API GET responses, and other read-only scenarios.

## Eager, lazy and explicit loading

**Eager loading** loads related data as part of the main query using `Include()` and `ThenInclude()`.

```csharp
var orders = await context.Orders
    .Include(o => o.Customer)
    .Include(o => o.OrderItems)
    .ToListAsync();
```

**Lazy loading** loads related data automatically when a navigation property is accessed. It usually requires lazy-loading proxies and virtual navigation properties.

```csharp
var order = await context.Orders.FirstAsync();
var customerName = order.Customer.Name; // customer loaded here
```

**Explicit loading** loads related data manually after the main entity is loaded.

```csharp
var order = await context.Orders.FirstAsync(o => o.Id == id);
await context.Entry(order)
    .Collection(o => o.OrderItems)
    .LoadAsync();
```

Eager loading is usually preferred when you know what related data is required. Lazy loading should be used carefully because it can cause many hidden database queries.

## What is the N+1 query problem?

The N+1 query problem happens when one query loads a list of records, and then one additional query is executed for each record to load related data.

Example: One query loads 100 orders, then 100 more queries load each order's customer. That becomes 101 total queries.

This commonly happens with lazy loading inside loops.

```csharp
var orders = await context.Orders.ToListAsync();

foreach (var order in orders)
{
    Console.WriteLine(order.Customer.Name); // may execute one query per order
}
```

Fix it by using `Include()`, projection with `Select()`, or batch queries.

## Include() versus projection using Select()

`Include()` loads full entity graphs and is useful when you need entities and their navigation properties, especially for updates.

```csharp
var orders = await context.Orders
    .Include(o => o.Customer)
    .ToListAsync();
```

Projection using `Select()` loads only the columns needed for the result. It is usually better for read-only API responses, reports, and DTOs.

```csharp
var orders = await context.Orders
    .Select(o => new OrderDto
    {
        Id = o.Id,
        CustomerName = o.Customer.Name,
        Total = o.Total
    })
    .ToListAsync();
```

Use `Include()` when working with entities. Use projection when returning shaped data and trying to avoid over-fetching.

## First, FirstOrDefault, Single and SingleOrDefault

`First()` returns the first matching record. It throws an exception if no record exists.

`FirstOrDefault()` returns the first matching record, or the default value, usually `null`, if no record exists.

`Single()` expects exactly one matching record. It throws an exception if no record exists or if more than one record exists.

`SingleOrDefault()` expects zero or one matching record. It returns `null` if no record exists and throws an exception if more than one record exists.

Use `FirstOrDefault()` when multiple records may match but you only need the first. Use `SingleOrDefault()` when the data rule says there must be at most one match, such as a unique email address.

## How does EF Core detect changes?

EF Core uses the change tracker inside `DbContext`. When an entity is queried with tracking enabled, EF Core stores its original values. Later, during `SaveChanges()`, EF Core compares the current values with the original values and decides which columns need to be updated.

Entity states include:

* `Added`
* `Unchanged`
* `Modified`
* `Deleted`
* `Detached`

You can inspect states using:

```csharp
var entries = context.ChangeTracker.Entries();
```

For disconnected scenarios like APIs, you may need to attach entities and set their state manually.

## What is optimistic concurrency?

Optimistic concurrency assumes that conflicts are rare. Instead of locking a row when it is read, EF Core checks whether the row changed before saving updates.

If another user changed the same row after it was loaded, EF Core detects the conflict and throws `DbUpdateConcurrencyException`.

This is commonly implemented using a concurrency token such as SQL Server `rowversion`.

## How do you use rowversion?

In SQL Server, `rowversion` is a binary value that automatically changes whenever a row is updated. EF Core can use it as a concurrency token.

Entity example:

```csharp
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public byte[] RowVersion { get; set; } = Array.Empty<byte>();
}
```

Fluent configuration:

```csharp
modelBuilder.Entity<Product>()
    .Property(p => p.RowVersion)
    .IsRowVersion();
```

Data annotation alternative:

```csharp
[Timestamp]
public byte[] RowVersion { get; set; } = Array.Empty<byte>();
```

When EF Core updates the row, it includes the original `RowVersion` in the `WHERE` clause. If no row is affected, EF Core treats it as a concurrency conflict.

## How do you handle DbUpdateConcurrencyException?

Handle `DbUpdateConcurrencyException` by deciding how the application should resolve the conflict.

Common strategies:

* **Client wins**: overwrite the database values with the current user's values.
* **Database wins**: discard the current user's changes and reload database values.
* **Merge**: compare both versions and let the user or business rule choose the final values.

Example:

```csharp
try
{
    await context.SaveChangesAsync();
}
catch (DbUpdateConcurrencyException ex)
{
    foreach (var entry in ex.Entries)
    {
        var databaseValues = await entry.GetDatabaseValuesAsync();

        if (databaseValues == null)
        {
            // entity was deleted by another user
        }
        else
        {
            entry.OriginalValues.SetValues(databaseValues);
            // decide whether to retry, merge, or return conflict to caller
        }
    }
}
```

In APIs, a common response is HTTP `409 Conflict` with enough information for the client to retry or show a merge screen.

## How do you execute transactions?

EF Core automatically wraps a single `SaveChanges()` call in a transaction for relational databases.

For multiple operations that must commit together, use an explicit transaction:

```csharp
await using var transaction = await context.Database.BeginTransactionAsync();

try
{
    context.Orders.Add(order);
    await context.SaveChangesAsync();

    context.AuditLogs.Add(log);
    await context.SaveChangesAsync();

    await transaction.CommitAsync();
}
catch
{
    await transaction.RollbackAsync();
    throw;
}
```

You can also use `TransactionScope`, but explicit EF Core transactions are often clearer when working with one database context.

## How do you handle transactions across microservices?

Across microservices, a single database transaction is usually avoided because each service owns its own database and distributed transactions are hard to scale and operate.

Common approaches:

* **Saga pattern**: Break the business transaction into multiple local transactions with compensating actions if a later step fails.
* **Outbox pattern**: Save business data and integration events in the same local transaction, then publish the events reliably.
* **Idempotent consumers**: Make message handlers safe to run more than once.
* **Eventual consistency**: Accept that services may become consistent after a short delay.

Example: In an order system, Order Service creates an order, Payment Service charges the customer, and Inventory Service reserves stock. If payment fails, a compensating command cancels the order.

## What are migrations?

Migrations are EF Core's way of versioning database schema changes in code. A migration describes how to move the database schema forward or backward.

Typical commands:

```powershell
Add-Migration AddProductTable
Update-Database
```

Or using .NET CLI:

```bash
dotnet ef migrations add AddProductTable
dotnet ef database update
```

A migration usually contains `Up()` for applying changes and `Down()` for reverting them.

## How do you safely deploy database migrations?

Safe migration deployment practices include:

* Review generated migration SQL before running it in production.
* Take backups before risky schema changes.
* Avoid destructive changes in the same deployment that still depends on old code.
* Use backward-compatible changes, such as adding nullable columns first.
* Deploy in phases for renames, type changes, and column removals.
* Run migrations during a controlled deployment step, not randomly from every app instance.
* Test migrations against production-like data.
* For large tables, avoid long locks by using online operations or phased backfills where possible.

In production, many teams generate SQL scripts and let a deployment pipeline or DBA run them.

```bash
dotnet ef migrations script
```

## How do you improve bulk-insert performance?

Ways to improve bulk inserts:

* Use `AddRange()` instead of many individual `Add()` calls.
* Save changes in batches instead of calling `SaveChanges()` per row.
* Disable change detection temporarily for very large inserts.
* Use database-specific bulk insert tools or libraries when inserting very large volumes.
* Insert only required columns.
* Avoid unnecessary tracking for read data used during the import.

Example batching:

```csharp
const int batchSize = 1000;

for (int i = 0; i < items.Count; i += batchSize)
{
    var batch = items.Skip(i).Take(batchSize);
    context.Products.AddRange(batch);
    await context.SaveChangesAsync();
    context.ChangeTracker.Clear();
}
```

For very high-volume inserts, EF Core's normal change tracking may still be slower than native bulk copy APIs.

## Why is DbContext registered as scoped?

`DbContext` is registered as scoped in ASP.NET Core because one HTTP request usually represents one unit of work.

Scoped lifetime gives each request its own `DbContext` instance. This allows EF Core to track changes during the request and save them together, while avoiding sharing the same context across unrelated requests.

```csharp
services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));
```

`DbContext` should not usually be singleton because it is not thread-safe and can keep growing tracked entities over time.

## Can the same DbContext be used across multiple threads?

No. `DbContext` is not thread-safe. The same instance should not be used concurrently across multiple threads or parallel tasks.

Bad example:

```csharp
await Task.WhenAll(
    context.Users.ToListAsync(),
    context.Orders.ToListAsync()); // same context used concurrently
```

Use separate `DbContext` instances for parallel work, or run operations sequentially on the same context.

## How do you inspect the SQL generated by EF Core?

Common ways to inspect generated SQL:

Use `ToQueryString()` for a LINQ query:

```csharp
var query = context.Orders
    .Where(o => o.Total > 100);

string sql = query.ToQueryString();
```

Enable EF Core logging:

```csharp
services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString)
           .LogTo(Console.WriteLine, LogLevel.Information));
```

Use SQL Server Profiler, Azure Data Studio, database logs, or Application Insights depending on the environment.

## Compiled queries: when are they useful?

Compiled queries are useful for frequently executed queries where query compilation overhead matters. EF Core normally caches query plans, so compiled queries are most useful in high-throughput paths where the same query shape runs many times.

Example:

```csharp
private static readonly Func<AppDbContext, int, Task<Product?>> GetProductById =
    EF.CompileAsyncQuery((AppDbContext context, int id) =>
        context.Products.FirstOrDefault(p => p.Id == id));
```

They are not necessary for most normal application queries. Measure performance before adding them because they can make code less readable.

## How do you prevent over-fetching?

To prevent over-fetching:

* Use projection with `Select()` to load only required columns.
* Avoid unnecessary `Include()` calls.
* Use pagination with `Skip()` and `Take()`.
* Filter data at the database level using `Where()`.
* Use `AsNoTracking()` for read-only queries.
* Return DTOs instead of full entity graphs from APIs.
* Avoid loading large navigation collections unless they are needed.

Example:

```csharp
var products = await context.Products
    .Where(p => p.IsActive)
    .Select(p => new ProductListDto
    {
        Id = p.Id,
        Name = p.Name,
        Price = p.Price
    })
    .Take(50)
    .ToListAsync();
```

## Repository pattern versus directly using DbContext

Using `DbContext` directly is simple and works well because EF Core already provides repository-like behavior through `DbSet<T>` and unit-of-work behavior through `DbContext`.

Direct `DbContext` advantages:

* Less boilerplate.
* Full access to LINQ and EF Core features.
* Easier to build optimized queries with projection, includes, and tracking options.

Repository pattern advantages:

* Hides EF Core details from the application layer.
* Centralizes complex data access logic.
* Can make unit testing easier by mocking interfaces.
* Helps enforce clean architecture boundaries.

Repository pattern disadvantages:

* Can become a thin wrapper over `DbSet<T>` with no real value.
* Can hide useful EF Core features.
* Generic repositories may not support complex business queries well.

A practical approach is to use `DbContext` directly for simple applications, and use repositories or query services when there is complex data access logic, clean architecture boundaries, or a need to isolate persistence details.
