**Top 4 highest salary in C# using LINQ** :

```
var fourthHighestSalary = employees
    .OrderByDescending(e => e.Salary)
    .Skip(3)
    .FirstOrDefault();

Console.WriteLine($"{fourthHighestSalary.Name} - {fourthHighestSalary.Salary}");
```

```
var top4DistinctSalaries = employees
    .Select(e => e.Salary)
    .Distinct()
    .OrderByDescending(s => s)
    .Take(4)
    .ToList();
```
