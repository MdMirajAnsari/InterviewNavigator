# Contructor

using System;

class Employee{
public int Id, Age;
        public string Address, Name;
        public bool IsPermanent;
        //User Defined Default Constructor
        public Employee()
        {
            Id = 100;
            Age = 30;
            Address = "Bhubaneswar";
            Name = "Anurag";
            IsPermanent = true;
        }
        public void Display()
        {
            Console.WriteLine("Employee Id is:  " + Id);
            Console.WriteLine("Employee Age is:  " + Age);
            Console.WriteLine("Employee Address is:  " + Address);
            Console.WriteLine("Employee Name is:  " + Name);
            Console.WriteLine("Is Employee Permanent:  " + IsPermanent);
        }
}

public class Program
{
	public static void Main()
	{
		Employee e = new Employee();
		e.Display();
	}
}

# Abstract class

using System;

abstract class Animal
{
    public abstract void MakeSound();
}

class Dog : Animal
{
    public override void MakeSound()
    {
        Console.WriteLine("Woof!");
    }
}

class Program
{
    static void Main()
    {
        Dog myDog = new Dog();
        myDog.MakeSound();  // Output: Woof!
    }
}

# Inherit

using System;

class A{
	public virtual void Method(){
	Console.WriteLine("class A Method");
	}
}

class B:A{
public override void Method(){
	Console.WriteLine("class B Method");
}

}
public class Program
{
	public static void Main()
	{
		A a = new A();
			a.Method();

    A x = new B();
		x.Method();

    B b = new B();
			b.Method();

    }
}

# Closure

function makeCounter() {
  let count = 0;
  return function() {
    return count++;
  };
}

let counter = makeCounter();
console.log(counter()); // Outputs: 0
console.log(counter()); // Outputs: 1

# Session

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(100);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

app.UseSession();

HttpContext.Session.SetInt32();

var sessionObj = HttpContext.Session.GetString("loginDetails");

HttpContext.Session.Clear();

@if (HttpContextAccessor.HttpContext.Session.GetInt32(SD.SessionCart) != null)
{
    `<li class="nav-item">`
        `<a class="nav-link text-dark" asp-area="Customer" asp-controller="Cart" asp-action="Index">`
            `<i class="bi bi-cart">` &nbsp;`</i>`
            (@HttpContextAccessor.HttpContext.Session.GetInt32(SD.SessionCart))
        `</a>`
    `</li>`
}

# Middleware

# Migration

void ApplyMigration()
{
    using (var scope = app.Services.CreateScope())
    {
        var _db = scope.ServiceProvider.GetRequiredService `<AppDbContext>`();
        if (_db.Database.GetPendingMigrations().Count() > 0)
        {
            _db.Database.Migrate();
        }
    }
}

# Generic Method

public static T Add `<T>`(T number1, T number2)
{
    dynamic a = number1;
    dynamic b = number2;
    return a + b;
}

# View In SQL

```sql
CREATE VIEW sales_employees AS
SELECT name, salary
FROM employees
WHERE department = 'Sales';
```
