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

## Difference between EFCore and EF6?

EF Core is a complete rewrite focused on performance and extensibility, while EF6 is for legacy systems, lacking the cross-platform capabilities and ongoing development of EF Core

EF Core- Precompiled Queries.

**DB First is actually quite easy — scaffolding with CLI commands, it creates the context + models. From there you can scaffold the controllers. In Mac I use MySQL.** ”

```sql
dotnet ef dbcontext scaffold "server=localhost;user=root;password=1234;database=MyAppDb" \
Pomelo.EntityFrameworkCore.MySql \
--output-dir Models

```

## how to implement transaction in ef core?

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

## Explain Eager Loading vs Lazy Loading vs Explicit Loading vs Deferred Execution vs Immediate Execution

**Eager Loading**

Related entities are loaded  **immediately** , at the same time as the main entity.

Used when you know you’ll need related data upfront.
Achieved using Include and ThenInclude.
Pros: Reduces N+1 query problem.
Cons: May load unnecessary data if not carefully selected.

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

• Related data is not loaded until accessed.
• This is the N+1 problem.
• Needs virtual navigation properties and EF Core proxies enabled.
• Pros: Loads only when needed.
• Cons: Performance hit if accessing many related records.

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

Load related data on demand, manually.

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

Deferred Execution
• LINQ queries in EF Core are not executed immediately.
• Execution happens only when you iterate (foreach) or use terminal operators (ToList(), Count(), Any() etc.).

```csharp
query = query.Where(e => e.Dept == "IT");
int count = query.Count(); // Executes here
```

 Immediate Execution
• Query runs right away when operators like Count(), Any(), FirstOrDefault() are used.

```csharp
int count = context.Employee.Where(e => e.Salary > 50000).Count();
```

## What are migrations in EF Core?

In  **Entity Framework Core (EF Core)** , **migrations** are a way to keep your **database schema** (tables, columns, relationships) in sync with your **C# entity classes (models)** as they evolve during development.

```csharp
dotnet ef migrations add AddDateOfBirthToUser

```

```csharp
dotnet ef database update

```

## How do you handle transactions?

Implicit Transactions (Default)

```csharp
using (var context = new AppDbContext())
{
    context.Users.Add(new User { Name = "Alice" });
    context.Orders.Add(new Order { Amount = 500 });

    context.SaveChanges(); // All changes saved in one transaction
}

```

Explicit Transactions

```csharp
using (var context = new AppDbContext())
{
    using (var transaction = context.Database.BeginTransaction())
    {
        try
        {
            context.Users.Add(new User { Name = "Bob" });
            context.SaveChanges();

            context.Orders.Add(new Order { Amount = 300 });
            context.SaveChanges();

            transaction.Commit();  // ✅ Commit if everything succeeds
        }
        catch
        {
            transaction.Rollback(); // ❌ Rollback if any error
        }
    }
}

```

## Difference between DbContext vs ObjectContext.

* **`ObjectContext`**

  * The **older, lower-level API** introduced with  **EF 1.0** .
  * Part of the  **Entity Framework’s Object Services API** .
  * More  **verbose and complex** .
  * ```csharp
    using (var context = new SchoolEntities())
    {
        ObjectSet<Student> students = context.CreateObjectSet<Student>();
        var studentList = students.Where(s => s.Age > 18).ToList();
    }

    ```
* **`DbContext`**

  * Introduced in **EF 4.1** (the “DbContext API”).
  * A **wrapper** around `ObjectContext`.
  * Provides a **simplified, developer-friendly** API.
  * Became the **standard in EF Core** (where `ObjectContext` doesn’t exist anymore).
  * ```csharp
    using (var context = new SchoolDbContext())
    {
        var studentList = context.Students.Where(s => s.Age > 18).ToList();
    }

    ```

## How do you avoid N+1 queries in EF Core?

1. **Use Eager Loading with `Include`**
2. Use Explicit Loading (Selective)
3. Use Projection (`Select`)

## How to handle transaction in ef core?
