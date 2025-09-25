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

## Where have you used the Liskov Substitution Principle (LSP) in your project?

Let’s say you were working on a **microservices project** with an **OrderService** that processes different types of payments.

```csharp
public abstract class Payment
{
    public abstract void Process(decimal amount);
}

```

```csharp
public class CreditCardPayment : Payment
{
    public override void Process(decimal amount)
    {
        // Credit card specific logic
    }
}

public class PayPalPayment : Payment
{
    public override void Process(decimal amount)
    {
        // PayPal specific logic
    }
}

```

```csharp
public class OrderService
{
    private readonly Payment _payment;

    public OrderService(Payment payment)
    {
        _payment = payment;
    }

    public void Checkout(decimal amount)
    {
        _payment.Process(amount); // Works for any Payment type
    }
}

```

## suppose you need to download large file from cloud storage and it fails due to large file or network issue.  how do you optimize

If I had to download a large file from cloud storage, I would optimize it by streaming the content directly to disk instead of loading it into memory. To handle failures, I’d use HTTP range requests to resume downloads from where they left off. On top of that, I’d add retry policies with exponential backoff (e.g., Polly) to handle transient network issues. For extremely large files, I’d consider parallel chunk downloads and merge them later. This way, the solution is memory-efficient, resilient, and fault-tolerant

```csharp
using var response = await httpClient.GetAsync(fileUrl, HttpCompletionOption.ResponseHeadersRead);
response.EnsureSuccessStatusCode();

using var stream = await response.Content.ReadAsStreamAsync();
using var fileStream = new FileStream("file.zip", FileMode.Create, FileAccess.Write, FileShare.None, 8192, useAsync: true);

await stream.CopyToAsync(fileStream);

```

```csharp
long existingLength = new FileInfo("file.zip").Length;

var request = new HttpRequestMessage(HttpMethod.Get, fileUrl);
request.Headers.Range = new System.Net.Http.Headers.RangeHeaderValue(existingLength, null);

using var response = await httpClient.SendAsync(request, HttpCompletionOption.ResponseHeadersRead);
using var stream = await response.Content.ReadAsStreamAsync();
using var fileStream = new FileStream("file.zip", FileMode.Append, FileAccess.Write, FileShare.None, 8192, useAsync: true);

await stream.CopyToAsync(fileStream);

```

```csharp
var policy = Policy
    .Handle<HttpRequestException>()
    .Or<TaskCanceledException>()
    .WaitAndRetryAsync(
        retryCount: 5,
        sleepDurationProvider: attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)) // exponential backoff
    );

await policy.ExecuteAsync(() => DownloadFileAsync(fileUrl));

```

## How to implement API Versioning in asp.net core?

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// Add API Versioning
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0); // default v1.0
    options.AssumeDefaultVersionWhenUnspecified = true; // if client doesn’t specify version
    options.ReportApiVersions = true; // add API version headers in response
});
builder.Services.AddVersionedApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV"; // v1, v1.1, etc.
    options.SubstituteApiVersionInUrl = true;
});

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

```

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MyApi.Controllers.v1
{
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiVersion("1.0")]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetV1() => Ok("Response from v1 Products API");
    }
}

namespace MyApi.Controllers.v2
{
    [ApiController]
    [Route("api/v{version:apiVersion}/[controller]")]
    [ApiVersion("2.0")]
    public class ProductsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetV2() => Ok("Response from v2 Products API");
    }
}

```

## How to implement centralize logging in asp.net core

```csharp
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .WriteTo.Console() // log to console
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day) // log to file
    .WriteTo.Seq("http://localhost:5341") // optional: centralized Seq server
    .CreateLogger();

builder.Host.UseSerilog(); // replace default logging with Serilog

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "ActionResult", Version = "v1" });
});

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "ActionResult v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

try
{
    Log.Information("Starting application...");
    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application failed to start");
}
finally
{
    Log.CloseAndFlush();
}

```

## Status Code

**1xx – Informational**

* **100 Continue** → Initial request accepted, client should continue.
* **101 Switching Protocols** → Server switching protocols (e.g., HTTP → WebSocket).

**2xx – Success**

* **200 OK** → Standard success response.
* **201 Created** → Resource created successfully (often after `POST`).
* **202 Accepted** → Request accepted but still processing.
* **204 No Content** → Success but no response body (e.g., DELETE).

**3xx – Redirection**

* **301 Moved Permanently** → Resource has a new permanent URL.
* **302 Found** → Temporary redirect.
* **304 Not Modified** → Cached resource is still valid.
* **307 Temporary Redirect** → Like 302 but method must not change.
* **308 Permanent Redirect** → Like 301 but method must not change.

**4xx – Client Errors**

* **400 Bad Request** → Invalid request syntax.
* **401 Unauthorized** → Authentication required (or invalid).
* **403 Forbidden** → Authenticated but not allowed.
* **404 Not Found** → Resource doesn’t exist.
* **405 Method Not Allowed** → Request method not supported.
* **408 Request Timeout** → Server timed out waiting for client.
* **409 Conflict** → Conflict with current state (e.g., duplicate data).
* **429 Too Many Requests** → Rate limiting (client sent too many requests).

**5xx – Server Errors**

* **500 Internal Server Error** → Generic server-side failure.
* **501 Not Implemented** → Server doesn’t support functionality.
* **502 Bad Gateway** → Invalid response from upstream server.
* **503 Service Unavailable** → Server down or overloaded.
* **504 Gateway Timeout** → Upstream server took too long.

## One microservice is very slow due to external api calls how do you optimize

## Implement a simple crud API in asp.net core?

Step 1: Create Project

```
dotnet new webapi -n CrudApiDemo
cd CrudApiDemo

```

Step 2: Create Product Model

```csharp
namespace CrudApiDemo.Models
{
    public class Product
    {
        public int Id { get; set; }        // Primary Key
        public string Name { get; set; } = string.Empty;
        public decimal Price { get; set; }
    }
}

```

Step 3: Setup DbContext with In-Memory Database

```csharp
using CrudApiDemo.Models;
using Microsoft.EntityFrameworkCore;

namespace CrudApiDemo.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<Product> Products { get; set; }
    }
}

```

Step 4: Configure Services

```csharp
using CrudApiDemo.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseInMemoryDatabase("ProductsDb"));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

```

Step 5: Create Products Controller

```csharp
using CrudApiDemo.Data;
using CrudApiDemo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CrudApiDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }

        // POST: api/products
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // PUT: api/products/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id) return BadRequest();

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Products.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

```

## How to handle JWT Token Theft situation?

* **Short-lived access tokens** (e.g., 5–15 minutes).
* **Use refresh tokens** for long-lived sessions, but protect them strongly:

  * Store refresh tokens in **secure, HttpOnly, Secure, SameSite=strict** cookies for browser clients (avoid localStorage).
  * For mobile/native, use platform secure storage (keystore/Keychain).
* **Refresh token rotation** : issue a new refresh token on each refresh and mark the previous one as invalid. If an old/used refresh token is presented again -> treat as token theft and revoke the session.
* **Store refresh tokens server-side (or store their fingerprints)** so you can revoke them (DB or Redis).
* **Token revocation list / blacklist** for access tokens (short-lived) or for refresh tokens (authoritative). Use Redis for fast checks.
* **Sender-constrained tokens** : bind tokens to client (DPoP, MTLS, or include device fingerprint).
* **Multi-factor Authentication (MFA)** and device registration for sensitive access.
* **Use HTTPS everywhere** and Content Security Policy (CSP) to reduce XSS risk.
* **CSP & sanitize inputs** , and avoid storing tokens in sources accessible to JS if you can (prefer HttpOnly cookies).
* **Rotate signing keys periodically** with a published JWKS and key ids (`kid`).
* **Limit token scope & audience** (least privilege).

## How do you improve Web API performance? (Caching, async, compression).

## How do you secure Web API endpoints that do not require authentication?

Even without authentication, public Web API endpoints should be  **protected against abuse, misuse, and insecure communication** . Techniques include  **HTTPS, rate limiting, input validation, API keys, CORS, and monitoring** .

## Async/await pitfalls — what happens if you call .Result inside async code?

## Middleware ordering in[ASP.NET](http://asp.net/)Core — why does it matter?
