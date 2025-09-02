## **File**Upload Limits in .NET

**maxRequestLength (ASP.NET)**

* **Location:** `web.config`
* **Purpose:** Specifies the maximum size (in KB) of the request, which includes file uploads.
* **Default:** 4096 KB (4 MB)

```xml
<system.web>
  <httpRuntime maxRequestLength="102400" /> <!-- 100 MB -->
</system.web>
```

ASP.NET Core – `RequestSizeLimit`

[RequestSizeLimit(50_000_000)] // 50 MB
public IActionResult Upload(IFormFile file) { ... }

## Validation in ASP.NET Core / Web API using Data Annotations


```csharp
using System.ComponentModel.DataAnnotations;

public class UserModel
{
    [Required(ErrorMessage = "Name is required")]
    [StringLength(50, ErrorMessage = "Name cannot exceed 50 characters")]
    public string Name { get; set; }

    [Range(18, 60, ErrorMessage = "Age must be between 18 and 60")]
    public int Age { get; set; }

    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }
}

```

When you post this model to a controller:

```csharp
[HttpPost]
public IActionResult Create(UserModel user)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    return Ok("User created successfully!");
}

```


2. **Custom Validation Attribute**

```csharp
public class NotFutureDateAttribute : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        if (value is DateTime date)
        {
            return date <= DateTime.Today;
        }
        return false;
    }
}

public class EventModel
{
    [NotFutureDate(ErrorMessage = "Date cannot be in the future")]
    public DateTime EventDate { get; set; }
}

```

FluentValidation (Advanced & Clean)

```csharp
using FluentValidation;

public class UserModelValidator : AbstractValidator<UserModel>
{
    public UserModelValidator()
    {
        RuleFor(u => u.Name).NotEmpty().MaximumLength(50);
        RuleFor(u => u.Age).InclusiveBetween(18, 60);
        RuleFor(u => u.Email).EmailAddress();
    }
}

```
