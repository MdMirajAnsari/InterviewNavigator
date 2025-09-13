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

## How to handle race condition in API calls?

A **race condition** occurs when multiple requests try to  **update or access the same resource concurrently** , and the outcome depends on the **timing** of execution.

Database Transactions + Row Locks

**Optimistic Concurrency**

* Assume conflicts are **rare** and detect them using a **concurrency token** (like a `RowVersion` or `Timestamp` column).
* If two updates collide, the  **second one fails** , and you can retry or return `409 Conflict`.
* **Transactions / Row locks** → Safe, but risk of blocking.
* **Optimistic concurrency (RowVersion)** → Best for REST APIs.
* **Pessimistic concurrency (locks)** → Good when conflicts are frequent.
* **Idempotency** → Prevents duplicate operations.
* **Queues** → Process sequentially for critical workloads.
* **Distributed locks** → Needed in multi-instance APIs.

## What is your strategic for handling slow internet connection?

* **Backend** → compress, cache, paginate, async, retry.
* **Frontend** → feedback, caching, offline-first, adaptive quality.
* **Both** → idempotency, resilience, graceful degradation.

## How to implement infinite scroll without performance issue?

## How do you handle a situation where your API suddenly start returning different data?

If your API suddenly starts returning different data than expected, that usually means a contract has been broken or  data integrity is compromised .

## Feature works in development but break in production what is your debugging process?

Reproduce → Compare environments → Check logs → Validate dependencies → Debug safely → Test with real data → Rollback/hotfix → Prevent reoccurrence.

## How do you prioritize performance fixes when you have limited time?

* Measure real bottlenecks.
* Fix **high-impact, low-effort** problems first.
* Target **user-visible slowdowns** over backend optimizations.
* Communicate trade-offs clearly.

## API is slow how to fix?

## Optimize a slow Query?

## What is HATEOAS in REST APIs

HATEOAS, which stands for Hypermedia As The Engine Of Application State, is a fundamental constraint of the REST architectural style. It dictates that a client interacting with a RESTful API should be able to dynamically navigate and discover available actions and resources based on the hypermedia links embedded within the server's responses.
