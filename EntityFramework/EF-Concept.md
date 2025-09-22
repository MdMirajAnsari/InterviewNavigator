## How to improve performance of Entity Framework?

- Use `AsNoTracking()` for read-only queries.
- Prefer projections (`Select`) to only needed columns.
- Avoid N+1: use `Include` or explicit loading as appropriate.
- Batch writes where possible; reduce `SaveChanges()` calls.
- Use compiled queries for hot paths.
- Ensure proper database indexing and analyze query plans.

DbContext and DbSet

- `DbContext`: unit-of-work + change tracker; manages database connection and SaveChanges.
- `DbSet<TEntity>`: represents a table for CRUD and LINQ queries.

```csharp
public class AppDbContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    protected override void OnConfiguring(DbContextOptionsBuilder b)
        => b.UseSqlServer("<conn>");
}
```

Explicit Loading

```csharp
// Load collections
await context.Entry(category)
    .Collection(c => c.Products)
    .LoadAsync();

// Load reference
await context.Entry(product)
    .Reference(p => p.Category)
    .LoadAsync();
```

how to implement transaction in ef core?

```csharp
using var tx = await context.Database.BeginTransactionAsync();
try
{
    context.Add(new Order { /* ... */ });
    await context.SaveChangesAsync();

    await context.Database.ExecuteSqlRawAsync("UPDATE Inventory SET Qty = Qty - {0} WHERE Id = {1}", 1, 10);

    await tx.CommitAsync();
}
catch
{
    await tx.RollbackAsync();
    throw;
}
```

## lastest version

ef core 9

## Difference between EFCore and EF6?

EF Core is a complete rewrite focused on performance and extensibility, while EF6 is for legacy systems, lacking the cross-platform capabilities and ongoing development of EF Core

## Explain Eager Loading vs Lazy Loading vs Explicit Loading.

**Eager Loading**

Related entities are loaded  **immediately** , at the same time as the main entity.

Use `.Include()` (and `.ThenInclude()` for deeper levels).

```csharp
using (var context = new AppDbContext())
{
    // Load product and its related category immediately
    var products = context.Products
                          .Include(p => p.Category)
                          .ToList();

    foreach (var product in products)
    {
        Console.WriteLine($"{product.Name} - {product.Category.Name}");
    }
}

```

Lazy Loading

Related entities are loaded **only when accessed** for the first time (on demand).

Needs **virtual navigation properties** and **Lazy Loading proxies** (`Microsoft.EntityFrameworkCore.Proxies`).

Can cause **N+1 query problem** if you access many related entities inside loops.

```csharp
// Enable Lazy Loading in DbContext
protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
{
    optionsBuilder
        .UseLazyLoadingProxies()
        .UseSqlServer("YourConnectionString");
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }

    // virtual enables lazy loading
    public virtual Category Category { get; set; }
}

// Usage
using (var context = new AppDbContext())
{
    var products = context.Products.ToList();

    // Category is not loaded until accessed
    foreach (var product in products)
    {
        Console.WriteLine($"{product.Name} - {product.Category.Name}");
    }
}

```

Explicit Loading

Related entities are loaded  **manually** , by calling `.Entry().Collection().Load()` or `.Entry().Reference().Load()`.

```csharp
using (var context = new AppDbContext())
{
    var product = context.Products.First();

    // Explicitly load related category
    context.Entry(product)
           .Reference(p => p.Category)
           .Load();

    Console.WriteLine($"{product.Name} - {product.Category.Name}");
}

```
