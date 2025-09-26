## **Find duplicates in a list using LINQ** .

```csharp
using System;
using System.Linq;
using System.Collections.Generic;

var nums = new List<int> { 1,2,3,2,4,5,3,3 };
var duplicates = nums
    .GroupBy(x => x)
    .Where(g => g.Count() > 1)
    .Select(g => new { Value = g.Key, Count = g.Count() });

foreach (var d in duplicates)
    Console.WriteLine($"{d.Value} appears {d.Count} times");
```

## Remove Duplicate

```csharp
using System;
using System.Linq;

public class Program
{
	public static void Main()
	{
		string originalString = "amanisaman";
		string newString = string.Join(" ", originalString.ToCharArray().Distinct());
		Console.WriteLine(newString);
	}
}
```

```csharp
// Distinct on list of objects by a key
var people = new[] {
    new { Id = 1, Name = "Ann" },
    new { Id = 1, Name = "Ann Dup" },
    new { Id = 2, Name = "Bob" }
};

var distinctById = people
    .GroupBy(p => p.Id)
    .Select(g => g.First());
```

## **Get even/odd numbers from list using LINQ** .

```csharp
var list = Enumerable.Range(1, 10).ToList();
var evens = list.Where(x => x % 2 == 0).ToList();
var odds  = list.Where(x => x % 2 != 0).ToList();
```

## **LINQ query for 2nd highest salary** .

```csharp
var employees = new[] {
    new { Name = "A", Salary = 5000m },
    new { Name = "B", Salary = 9000m },
    new { Name = "C", Salary = 7000m },
    new { Name = "D", Salary = 9000m }
};

var secondHighest = employees
    .Select(e => e.Salary)
    .Distinct()
    .OrderByDescending(s => s)
    .Skip(1)
    .FirstOrDefault();

// Employees who have the 2nd highest salary
var secondHighestEmployees = employees
    .Where(e => e.Salary == secondHighest)
    .ToList();
```

## **Join two collections using LINQ** .

```csharp
var customers = new[] {
  new { Id = 1, Name = "Alice" },
  new { Id = 2, Name = "Bob" }
};

var orders = new[] {
  new { Id = 101, CustomerId = 1, Total = 120m },
  new { Id = 102, CustomerId = 2, Total = 80m },
  new { Id = 103, CustomerId = 1, Total = 50m }
};

// Inner join
var query = from c in customers
            join o in orders on c.Id equals o.CustomerId
            select new { c.Name, o.Id, o.Total };

// Group join (left join semantics)
var left = from c in customers
           join o in orders on c.Id equals o.CustomerId into grp
           from o in grp.DefaultIfEmpty()
           select new { c.Name, OrderId = o?.Id, Total = o?.Total };
```
