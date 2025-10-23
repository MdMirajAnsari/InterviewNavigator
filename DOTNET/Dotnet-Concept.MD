## .NET Version

9 features

Language Enhancements (C# 13 / F# 9 etc.)

## What is the CLR, and why is it important?

The Common Language Runtime (CLR) is the execution environment for .NET applications. It provides  **automatic memory management, security, and performance optimizations** , making applications more reliable and efficient.

How it works:

* Code written in C# or another .NET language compiles into Common Intermediate Language (CIL)
* The Just-In-Time (JIT) compiler translates CIL into machine code at runtime
* The Garbage Collector (GC) automatically manages memory by reclaiming unused objects
* The CLR enforces security policies and prevents unauthorized memory access

## What are the differences between .NET Framework, .NET Core, and .NET 5+?

NET has evolved from a Windows-only framework to a modern, cross-platform ecosystem. Each version has different capabilities and use cases.

Key differences:

* **.NET Framework** – Windows-only, supports WinForms, WPF, and older ASP.NET Web Forms. Still used in enterprise applications but no longer receives major updates
* **.NET Core** – The first cross-platform version, optimized for cloud and high-performance applications. Supports Docker, Kubernetes, and microservices
* **.NET 5+** – Replaces .NET Core, unifying desktop, mobile, cloud, and AI under a single framework. The latest long-term support (LTS) version is .NET 8 (2023) and the latest stable short-term support release (STS) is .NET 9 (2024).

## What is CIL (Common Intermediate Language)?

When you compile C# code, it doesn’t turn into machine code directly. Instead, it compiles into Common Intermediate Language (CIL), which is then executed by the CLR.

CIL enables:

* **Cross-platform compatibility** – Code written in any .NET language can run on different operating systems via the CLR
* **Language interoperability** – Since all .NET languages compile to CIL, C#, F#, and VB.NET can interact seamlessly

## EXTENSION METHODS

an extension method is a static method that allows you to add functionality to an existing type (class, interface, or struct) without modifying its source code or creating a derived class. Extension methods are defined in a static class and use the this keyword in the parameter list to specify the type they extend.

```csharp
using System;

public static class StringExtensions
{
    // Extension method for string
    public static int WordCount(this string str)
    {
        if (string.IsNullOrEmpty(str))
            return 0;
        return str.Split(new[] { ' ', '\t', '\n' }, StringSplitOptions.RemoveEmptyEntries).Length;
    }
}

class Program
{
    static void Main()
    {
        string text = "Hello world, this is a test!";
        int count = text.WordCount(); // Called like an instance method
        Console.WriteLine($"Word count: {count}");
    }
}
```

## How to manage state in asp.net core?

viewData and ViewBag

```csharp
// Controller
public class HomeController : Controller
{
    public IActionResult Index()
    {
        ViewData["Message"] = "Hello from ViewData!";
        ViewBag.UserName = "Alice";
        return View();
    }
}

// View (Index.cshtml)
<h2>@ViewData["Message"]</h2>
<h2>Welcome, @ViewBag.UserName!</h2>
```

TempData

```csharp
// Startup.cs or Program.cs (Configure services)
builder.Services.AddSession(); // Enable session
app.UseSession(); // Add session middleware

// Controller
public class HomeController : Controller
{
    public IActionResult Save()
    {
        TempData["SuccessMessage"] = "Data saved successfully!";
        return RedirectToAction("Index");
    }

    public IActionResult Index()
    {
        string message = TempData["SuccessMessage"]?.ToString();
        return View(model: message);
    }
}

// View (Index.cshtml)
@if (Model != null)
{
    <div class="alert alert-success">@Model</div>
}
```

Cookies

```csharp
// Controller
public class HomeController : Controller
{
    public IActionResult SetCookie()
    {
        Response.Cookies.Append("UserTheme", "Dark", new CookieOptions
        {
            Expires = DateTimeOffset.Now.AddDays(7),
            HttpOnly = true,
            Secure = true
        });
        return RedirectToAction("Index");
    }

    public IActionResult Index()
    {
        string theme = Request.Cookies["UserTheme"] ?? "Light";
        return View(model: theme);
    }
}

// View (Index.cshtml)
<h2>Current Theme: @Model</h2>
```

## How to handle cors?

```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);

// Add CORS services
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("http://localhost:3000") // Allow specific origin
               .AllowAnyHeader()                    // Allow any header
               .AllowAnyMethod();                   // Allow any HTTP method (GET, POST, etc.)
    });
});

builder.Services.AddControllers();

var app = builder.Build();

// Enable CORS middleware
app.UseCors("AllowSpecificOrigin");

app.UseAuthorization();
app.MapControllers();

app.Run();
```

## How to secure web api

```csharp
// Program.cs
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add JWT authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

app.UseHttpsRedirection();
app.UseAuthentication(); // Add authentication middleware
app.UseAuthorization();
app.MapControllers();

app.Run();
```

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;

    public AuthController(IConfiguration config)
    {
        _config = config;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginModel model)
    {
        // Validate credentials (e.g., check username/password against database)
        if (model.Username == "test" && model.Password == "password") // Simplified for demo
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, model.Username),
                new Claim(ClaimTypes.Role, "User")
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds);

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        }
        return Unauthorized();
    }
}

public class LoginModel
{
    public string Username { get; set; }
    public string Password { get; set; }
}
```

## CONVENTIONAL AND ATTRIBUTE ROUTING

Supports parameters & constraints.

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllersWithViews();

var app = builder.Build();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    // Default conventional route
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "{controller=Home}/{action=Index}/{id?}");
});

app.Run();

```

```csharp
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return Content("Home -> Index");
    }

    public IActionResult About()
    {
        return Content("Home -> About");
    }
}

```

Attribute Routing

1. New and preferred way of routing:

```csharp
[Route("api/[controller]")]
public class ProductsController : Controller
{
    [HttpGet]
    public IActionResult GetAll()
    {
        return Content("All products");
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        return Content($"Product {id}");
    }

    [HttpPost]
    public IActionResult Create()
    {
        return Content("Product created");
    }
}

```

## What is the use of @Html.AntiForgeryToken()?

Let's assume you have a register functionality in your web app. You have an AccountController (example.com/account/register) where you expect people to submit their info. Normally before someone posts the registration information needs to visit the actual (example.com/account/register) than submit the form.

Let say I am a bad guy and I want to flood your server with junk info all I need to do is just keep posting directly to (example.com/account/register) without visiting your site. So in order to stop me you implement AntiForgeryToken so you can make it sure I visited the page before I submitted the registration information.

CSRF / XSRF (Cross Site Request Forgery) is a process of sending a request to actual website, from a page present in attacker website, based on the logged-in session of actual website user.

#### How to Implement CSRF Security?

**View**

`@Html.AntiForgeryToken( )`

**Controller**

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="pun">[</span><span class="typ">ValidateAntiForgeryToken</span><span class="pun">]</span></p></li><li class="L1" data-node-id="20240810195432-c52y22a"><p><span class="kwd">public</span><span class="pln"></span><span class="typ">ActionResult</span><span class="pln"></span><span class="typ">Method</span><span class="pun">(</span><span class="pln"></span><span class="pun">)</span></p></li><li class="L2"><p><span class="pun">{</span></p></li><li class="L3" data-node-id="20240810195432-p1f8zmf"><p><span class="pun">}</span></p></li></ol></pre>

## Performance Optimization

Bundling and Minification
Used to load multiple css files / js files with a single request.

Also minifies (compresses) the css / js files.

Types of Bundles:

ScriptBundle: Contains javascript files (.js files).

StyleBundle: Contains css fles (.css files).

Microsoft.AspNet.Web.Optimization

This NuGet Package needs to be installed in the project, to use bundling concept.

## Strongly Typed Views

View that is associated to a specific model class is called as "Strongly Typed View".

Strongly typed views have to specify the model class name with @model directive at the top of the view.

Strongly Typed Views can receive model objects from the controller.

To receive model collections from the controller: `@model List<modelClassNameHere>`

## HTML Helpers

@Html.DisplayFor(modelItem => item.Id)

@Html.ActionLink("Edit", "Edit", new { id = item.Id })

* Binds HTML elements to Model Properties.
* Pre-defined methods that execute on server and generate (render) a specific html tag at run time.
* @Html is an object of HtmlHelper class.

**Server code:**

`@Html.TextBoxFor (model => model.EmpName)`

**Browser (Client) - auto generated**

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="tag"><input</span><span class="pln"></span><span class="atn">type</span><span class="pun">=</span><span class="atv">"text"</span><span class="pln"></span><span class="atn">name</span><span class="pun">=</span><span class="atv">"EmpName"</span><span class="tag">></span></p></li></ol></pre>

#### List of HTML Helpers

1. **Html.ActionLink:**      Hyperlink
2. **Html.TextBoxFor: **    Textbox
3. **Html.TextAreaFor:**   TextArea
4. **Html.CheckBoxFor: **   CheckBox
5. **Html.RadioButtonFor: **  RadioButton
6. **Html.DropDownListFor:**    Dropdown
7. **Html.ListBoxFor:**    Multi-Select ListBox
8. **Html.HiddenFor: **   Hidden Field
9. **Html.PasswordFor: **  Password TextBo
10. **Html.DisplayFor: **   Plain text
11. **Html.LabelFor: **   Label
12. **Html.EditorFor: **  TextBox /    TextArea / Numeric TextBox / Date TextBox etc.

## Built-in Tag Helpers:

* **<a asp-controller=”Home” asp-action=”Index”>Link `</a>`:** Generates a link with a URL that’s generated by routing based on the specified controller and action.
* **<img src=”~/images/pic.jpg” asp-append-version=”true” />:** Generates a `<img>` tag with a cache-busting query string to ensure the latest version of the image is fetched.
* **<form asp-controller=”Account” asp-action=”Login” method=”post”>…`</form>`:** Generates a form element with the appropriate action attribute for the specified controller and action.
* **`<input asp-for=”Username” />`:** Generates an input field with attributes based on the model property specified by asp-for.

## Filters

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

// Authorization Filter (Custom)
public class CustomAuthorizationFilter : IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        // Check for a specific header (e.g., X-API-Key)
        if (!context.HttpContext.Request.Headers.TryGetValue("X-API-Key", out var apiKey) || apiKey != "secret-key")
        {
            context.Result = new UnauthorizedResult();
        }
    }
}

// Resource Filter (Caching)
public class CacheResourceFilter : IResourceFilter
{
    private static readonly Dictionary<string, object> _cache = new Dictionary<string, object>();

    public void OnResourceExecuting(ResourceExecutingContext context)
    {
        // Check cache before executing the action
        var cacheKey = context.HttpContext.Request.Path;
        if (_cache.TryGetValue(cacheKey, out var cachedResult))
        {
            context.Result = new OkObjectResult(cachedResult); // Short-circuit with cached result
        }
    }

    public void OnResourceExecuted(ResourceExecutedContext context)
    {
        // Cache the result after execution
        if (context.Result is OkObjectResult okResult && okResult.Value != null)
        {
            var cacheKey = context.HttpContext.Request.Path;
            _cache[cacheKey] = okResult.Value;
        }
    }
}

// Action Filter (Logging and Validation)
public class LoggingActionFilter : IActionFilter
{
    private readonly ILogger<LoggingActionFilter> _logger;

    public LoggingActionFilter(ILogger<LoggingActionFilter> logger)
    {
        _logger = logger;
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        // Log action start and validate input
        _logger.LogInformation($"Executing action {context.ActionDescriptor.DisplayName}");
        if (context.ActionArguments.TryGetValue("model", out var model) && model == null)
        {
            context.Result = new BadRequestObjectResult("Model cannot be null");
        }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        _logger.LogInformation($"Finished executing action {context.ActionDescriptor.DisplayName}");
    }
}

// Result Filter (Modify Response)
public class CustomResultFilter : IResultFilter
{
    public void OnResultExecuting(ResultExecutingContext context)
    {
        // Add custom header to response
        context.HttpContext.Response.Headers.Add("X-Custom-Header", "ModifiedByResultFilter");
    }

    public void OnResultExecuted(ResultExecutedContext context)
    {
        // Post-processing (e.g., logging)
    }
}

// Exception Filter (Error Handling)
public class CustomExceptionFilter : IExceptionFilter
{
    private readonly ILogger<CustomExceptionFilter> _logger;

    public CustomExceptionFilter(ILogger<CustomExceptionFilter> logger)
    {
        _logger = logger;
    }

    public void OnException(ExceptionContext context)
    {
        _logger.LogError(context.Exception, "An unhandled exception occurred");
        context.Result = new ObjectResult(new { error = "An unexpected error occurred" })
        {
            StatusCode = 500
        };
        context.ExceptionHandled = true;
    }
}

// Program.cs configuration (minimal for brevity)
public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services
        builder.Services.AddApiVersioning(options =>
        {
            options.DefaultApiVersion = new ApiVersion(1, 0);
            options.AssumeDefaultVersionWhenUnspecified = true;
            options.ReportApiVersions = true;
            options.ApiVersionReader = new UrlSegmentApiVersionReader();
        }).AddApiExplorer();
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend", builder =>
            {
                builder.WithOrigins("https://localhost:3000")
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
        });
        builder.Services.AddControllers(options =>
        {
            // Register global filters (optional)
            options.Filters.Add<CustomExceptionFilter>();
        });
        builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
        builder.Services.AddDistributedMemoryCache();
        builder.Services.AddSession();
        builder.Services.AddAuthentication().AddJwtBearer(options => { /* JWT config */ });
        builder.Services.AddLogging();

        var app = builder.Build();

        app.UseHttpsRedirection();
        app.UseCors("AllowFrontend");
        app.UseSession();
        app.UseAuthentication();
        app.UseAuthorization();
        app.MapControllers();

        app.Run();
    }
}

// Model and DbContext
public class Person
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
}

public class AppDbContext : DbContext
{
    public DbSet<Person> People { get; set; }
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
}

// Controller with Filters
[ApiController]
[Route("api/v{version:apiVersion}/[controller]")]
[ApiVersion("1.0")]
[Authorize] // Built-in Authorization Filter (relates to Web API security)
[CustomAuthorizationFilter] // Custom Authorization Filter
[CacheResourceFilter] // Resource Filter for caching
[CustomResultFilter] // Result Filter for modifying response
public class PeopleController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<PeopleController> _logger;

    public PeopleController(AppDbContext context, ILogger<PeopleController> logger)
    {
        _context = context; // Relates to IDisposable
        _logger = logger;
    }

    [HttpGet]
    [LoggingActionFilter] // Action Filter for logging
    public IActionResult Get() // Relates to IActionResult
    {
        var people = _context.People.Where(p => p.Age > 22).ToList(); // Relates to IQueryable/ToList
        HttpContext.Session.SetString("LastQuery", "v1: Age > 22"); // Relates to state management
        return Ok(people);
    }

    [HttpPost]
    [LoggingActionFilter]
    public IActionResult Create([FromBody] Person model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState); // Relates to Web API security (input validation)
        }
        _context.People.Add(model);
        _context.SaveChanges();
        return CreatedAtAction(nameof(Get), new { id = model.Id }, model);
    }
}
```

##### **Scenario: A User Trying to Access a Restricted API Resource**

* **Authorization Filter:** Imagine the user is trying to access a secure admin page. The Authorization Filter first checks if the user is logged in and has the necessary ‘Admin’ role. If the user is not authorized, the filter will block the request and return a 403 Forbidden response.
* **Resource Filter:** Next, the Resource Filter checks if the data (e.g., a list of users) is cached. If it is, the filter serves the cached data, saving time and reducing database load.
* **Action Filter:** The Action Filter logs the request details, like which parameters were sent, and validates that the input data is correct before passing it to the action method.
* **Result Filter:** After the action method runs, the Result Filter checks if the response needs to be modified (e.g., adding custom headers, compressing large data).
* **Exception Filter:** Finally, if any exceptions were thrown during the process (e.g., database errors), the Exception Filter catches them and sends a custom error message.

#### **Differences Between Filters and Middleware in ASP.NET Core Web API**

In ASP.NET Core Web API, both middleware and filters are used to handle HTTP requests, but they serve different roles within the request processing pipeline. Here’s a clearer explanation and comparison:

##### **Middleware**

Middleware is a global component that is executed early in the request pipeline. It works across all HTTP requests and responses, meaning it can modify or inspect requests or responses for any action or controller in the application. Middleware is responsible for handling concerns that apply globally to the entire application, such as routing, security, exception handling, or modifying the response (e.g., adding headers).

**How It Works:** Middleware runs for every request coming into the system, and it is processed in the order in which it is registered. Each piece of middleware has access to the request, and it can either modify the request, pass it along the pipeline, or stop the request entirely (e.g., by returning a response early).

**Example:** Imagine you are managing a website with multiple pages (actions). A middleware component could check every visitor (HTTP request) for certain rules (authentication, headers, etc.) before allowing them to view any page (controller action). This happens before they even reach the actual page content (action method). You need to create a middleware that checks if a user is logged in and authenticated before allowing access to any page in the web application.

###### **When to Use:**

Middleware is ideal for tasks that need to be applied globally across all routes in your application. Common use cases include:

* Authentication and authorization
* CORS (Cross-Origin Resource Sharing)
* Logging requests
* Exception handling
* Modifying response headers (e.g., adding security headers)

## Entity Framework

Entity Framework (EF) is an open-source Object-Relational Mapping (ORM) framework developed by Microsoft for .NET applications. It simplifies data access by allowing developers to work with database entities as .NET objects, abstracting much of the underlying database interaction, such as writing raw SQL queries. Entity Framework is widely used in C# applications to interact with relational databases like SQL Server, MySQL, PostgreSQL, and others.

## Dapper

Dapper is a lightweight, high-performance Object-Relational Mapping (ORM) library for .NET applications, often referred to as a "micro-ORM." Developed by the team at Stack Overflow, Dapper provides a simple and efficient way to map database query results to .NET objects while maintaining close-to-metal performance by avoiding the heavy abstraction layers found in full-fledged ORMs like Entity Framework (EF). It is widely used in C# applications for scenarios where speed and control over SQL queries are critical.

## Server Side Validation

**ModelState.IsValid:** Checks whether the model object satisfied all the validation rules

## Client Side Validation

**Three NuGet packages:**

1. jQuery :    Performs DOM manipulations
2. jQuery.Validation :   Defines Validation Rules
3. Microsoft.jQuery.Unobtrusive.Validation:     Shows / Hides Error Message

#### HTML Helpers for Client Side Validation

1. **ValidationMessageFor :**      Displays error message
2. ValidationSummary:             Displays validation summary

## What is Asp.Net Core meta package?

The ASP.NET Core shared framework (Microsoft.AspNetCore.App) contains assemblies that are developed and supported by Microsoft. Microsoft.AspNetCore.App is installed when the .NET Core 3.0 or later SDK is installed. The shared framework is the set of assemblies (.dll files) that are installed on the machine and includes a runtime component and a targeting pack.

```
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>
    ...
</Project>
```

## Middleware

Middleware is a component that is assembled into the application pipeline to handle requests and responses.

Middleware are chained one-after-other and execute in the same sequence how they're added.

Middleware can be a request delegate (anonymous method or lambda expression) [or] a class.

**app.Run( )**

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="pln">app</span><span class="pun">.</span><span class="typ">Run</span><span class="pun">(</span><span class="pln">async </span><span class="pun">(</span><span class="typ">HttpContext</span><span class="pln"> context</span><span class="pun">)</span><span class="pln"></span><span class="pun">=></span></p></li><li class="L1" data-node-id="20240816162155-p8fwuzv"><p><span class="pun">{</span></p></li><li class="L2"><p><span class="com">//code</span></p></li><li class="L3" data-node-id="20240816162155-cz1eeik"><p><span class="pun">});</span></p></li></ol></pre>

The extension method called “Run” is used to execute a terminating / short-circuiting middleware that doesn’t forward the request to the next middleware.

**app.Use( )**

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="pln">app</span><span class="pun">.</span><span class="typ">Use</span><span class="pun">(</span><span class="pln">async </span><span class="pun">(</span><span class="typ">HttpContext</span><span class="pln"> context</span><span class="pun">,</span><span class="pln"></span><span class="typ">RequestDelegate</span><span class="pln"></span><span class="kwd">next</span><span class="pun">)</span><span class="pln"></span><span class="pun">=></span></p></li><li class="L1" data-node-id="20240816162204-dlayh8d"><p><span class="pun">{</span></p></li><li class="L2"><p><span class="pln"></span><span class="com">//before logic</span></p></li><li class="L3" data-node-id="20240816162204-o61zhd1"><p><span class="pln">  await </span><span class="kwd">next</span><span class="pun">(</span><span class="pln">context</span><span class="pun">);</span></p></li><li class="L4"><p><span class="pln"></span><span class="com">//after logic</span></p></li><li class="L5" data-node-id="20240816162204-peu7e52"><p><span class="pun">});</span></p></li></ol></pre>

The extension method called “Use” is used to execute a non-terminating / short-circuiting middleware that may / may not forward the request to the next middleware.

#### Middleware Class

Middleware class is used to separate the middleware logic from a lambda expression to a separate / reusable class.

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="kwd">class</span><span class="pln"></span><span class="typ">MiddlewareClassName</span><span class="pln"></span><span class="pun">:</span><span class="pln"></span><span class="typ">IMiddleware</span></p></li><li class="L1" data-node-id="20240816162226-7pcm3rg"><p><span class="pun">{</span></p></li><li class="L2"><p><span class="pln"></span><span class="kwd">public</span><span class="pln"> async </span><span class="typ">Task</span><span class="pln"></span><span class="typ">InvokeAsync</span><span class="pun">(</span><span class="typ">HttpContext</span><span class="pln"> context</span><span class="pun">,</span><span class="pln"></span><span class="typ">RequestDelegate</span><span class="pln"></span><span class="kwd">next</span><span class="pun">)</span></p></li><li class="L3" data-node-id="20240816162226-e0k0ccv"><p><span class="pln"></span><span class="pun">{</span></p></li><li class="L4"><p><span class="pln"></span><span class="com">//before logic</span></p></li><li class="L5" data-node-id="20240816162226-99u9xl5"><p><span class="pln">    await </span><span class="kwd">next</span><span class="pun">(</span><span class="pln">context</span><span class="pun">);</span></p></li><li class="L6"><p><span class="pln"></span><span class="com">//after logic</span></p></li><li class="L7" data-node-id="20240816162226-gp3g4tr"><p><span class="pln"></span><span class="pun">}</span></p></li><li class="L8"><p><span class="pun">}</span></p></li></ol></pre>

`app.UseMiddleware<MiddlewareClassName>();`

#### The Right Order of Middleware

1. **app**.**UseExceptionHandler**(**"/Error"**);
2. **app**.**UseHsts**();
3. **app**.**UseHttpsRedirection**();
4. **app**.**UseStaticFiles**();
5. **app**.**UseRouting**();
6. **app**.**UseCors**();
7. **app**.**UseAuthentication**();
8. **app**.**UseAuthorization**();
9. **app**.**UseSession**();
10. **app**.**MapControllers**();
11. **//add your custom middlewares**
12. **app**.**Run**();

**app.UseWhen( )**

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="pln">app</span><span class="pun">.</span><span class="typ">UseWhen</span><span class="pun">(</span></p></li><li class="L1" data-node-id="20240816162333-s46y8rw"><p><span class="pln">  context </span><span class="pun">=></span><span class="pln"></span><span class="pun">{</span><span class="pln"></span><span class="kwd">return</span><span class="pln"></span><span class="kwd">boolean</span><span class="pun">;</span><span class="pln"></span><span class="pun">},</span></p></li><li class="L2"><p><span class="pln">  app </span><span class="pun">=></span></p></li><li class="L3" data-node-id="20240816162333-jkda115"><p><span class="pln"></span><span class="pun">{</span></p></li><li class="L4"><p><span class="pln"></span><span class="com">//add your middlewares</span></p></li><li class="L5" data-node-id="20240816162333-zj23qua"><p><span class="pln"></span><span class="pun">}</span></p></li><li class="L6"><p><span class="pun">);</span></p></li></ol></pre>

The extension method called “UseWhen” is used to execute a branch of middleware only when the specified condition is true.

## Middleware vs Filters

Middleware is a **component in the HTTP request pipeline** that processes requests **before** they reach your controllers and **after** the response leaves them.

Filters are part of the  **ASP.NET MVC pipeline** , applied **inside controllers** to run code **before or after controller actions** (or results) execute.

## Caching

ASP.NET Core supports several types of caching:

* **In-memory Caching:** In this case, data is stored in the web server’s Memory (RAM). This is simple to implement, very fast, and ideal for single-server scenarios.
* **Distributed Caching:** In this case, it uses external cache stores like Redis or SQL Server. This is suitable for applications running on multiple servers in a load-balancing environment.
* **Response Caching:** In this case, it caches the responses of HTTP requests to improve the response time for similar requests. Stores the output of a request and reuses it for similar requests.

## Dependency Injection

In .NET, dependency injection (DI) is a core feature, especially in ASP.NET Core, where it’s built into the framework. The three main types of dependency injection—Constructor Injection, Setter Injection, and Interface Injection—are all supported, with Constructor Injection being the most commonly used. Below, I’ll explain how each type is implemented in .NET, focusing on ASP.NET Core’s DI container, and provide practical examples.**1. **Constructor Injection*** **Description**: Dependencies are injected via the constructor of a class. This is the default and recommended approach in .NET Core.

* **How It Works**: Services are registered in the DI container (typically in **Program.cs** or **Startup.cs** for older versions) and automatically injected into constructors of classes like controllers, services, or other components.
* **Pros**:

  * **Ensures dependencies are provided at object creation.**
  * **Promotes immutability (dependencies are typically private readonly).**
  * **Easy to test with mocked dependencies.**
* **Cons**:

  * **Can lead to verbose constructor signatures for many dependencies.**
* **Example**:
  **csharp**

  ```csharp
  // Service interface and implementation
  publicinterfaceIDatabase
  {
  stringGetData();
  }

  publicclassMySQLDatabase:IDatabase
  {
  publicstringGetData()=>"Data from MySQL";
  }

  // Service consuming the dependency
  publicclassUserService
  {
  privatereadonlyIDatabase _database;

  publicUserService(IDatabase database)
  {
          _database = database;
  }

  publicstringFetchData()=> _database.GetData();
  }

  // Register services in Program.cs (ASP.NET Core)
  var builder = WebApplication.CreateBuilder(args);
  builder.Services.AddScoped<IDatabase, MySQLDatabase>();
  builder.Services.AddScoped<UserService>();

  // Usage in a controller
  publicclassHomeController:Controller
  {
  privatereadonlyUserService _userService;

  publicHomeController(UserService userService)
  {
          _userService = userService;
  }

  publicIActionResultIndex()
  {
  returnContent(_userService.FetchData());
  }
  }
  ```
* **Registration**: Services are registered with lifetimes (**AddScoped**, **AddTransient**, or **AddSingleton**) in the DI container.

2. **Setter Injection*** **Description**: Dependencies are injected via public properties or methods after object creation. In .NET, this is less common but supported using property injection or manual setter methods.

* **How It Works**: The DI container or manual code sets dependencies via properties. ASP.NET Core’s DI doesn’t natively support property injection, but you can use third-party libraries like Autofac or manually implement it.
* **Pros**:

  * **Useful for optional dependencies.**
  * **Allows changing dependencies post-construction.**
* **Cons**:

  * **Object may be in an invalid state if the dependency isn’t set.**
  * **Less explicit than constructor injection.**
* **Example** (Manual Setter Injection):
  **csharp**

  ```csharp
  publicclassUserService
  {
  privateIDatabase _database;

  publicIDatabase Database
  {
  set=> _database =value;
  }

  publicstringFetchData()=> _database?.GetData()??"No database set";
  }

  // Manual usage
  var service =newUserService();
  service.Database =newMySQLDatabase();
  Console.WriteLine(service.FetchData());// Output: Data from MySQL
  ```
* **With Third-Party DI (e.g., Autofac)**:
  **csharp**

  ```csharp
  // In Autofac module
  builder.RegisterType<UserService>().PropertiesAutowired();
  ```

  Note: ASP.NET Core’s built-in DI doesn’t support property injection, so you’d need a library like Autofac.

3. **Interface Injection*** **Description**: Dependencies are injected by implementing an interface that defines an injection method. This is rare in .NET and not natively supported by the built-in DI container.

* **How It Works**: A class implements an interface with a method to inject dependencies. You’d typically manage this manually or with a custom DI framework.
* **Pros**:

  * **Highly customizable for specific use cases.**
* **Cons**:

  * **Complex and non-standard in .NET.**
  * **Couples the class to a specific injection interface.**
* **Example**:
  **csharp**

  ```csharp
  publicinterfaceIDependencyInjector
  {
  voidInjectDatabase(IDatabase database);
  }

  publicclassUserService:IDependencyInjector
  {
  privateIDatabase _database;

  publicvoidInjectDatabase(IDatabase database)
  {
          _database = database;
  }

  publicstringFetchData()=> _database.GetData();
  }

  // Manual usage
  var service =newUserService();
  service.InjectDatabase(newMySQLDatabase());
  Console.WriteLine(service.FetchData());
  ```
* **Note**: Interface injection is uncommon in .NET due to its complexity and lack of native support. Constructor injection is preferred.

## IActionResult and ActionResult

* IActionResult: We need to use IActionResult when we need to return different types of responses (e.g., success, error, not found) from a single action method.
* ActionResult `<T>`: We need to use ActionResult `<T>` to return a specific type of data along with the flexibility to return different HTTP status codes. This provides clear API documentation.
* Task `<IActionResult>` or Task<ActionResult `<T>`>: These two return types are used for asynchronous action methods that perform I/O-bound operations like database calls, file I/O, or external service calls.

## **Configuring the Startup Class in ASP.NET Core**

The Startup class is a very important class for any type of ASP.NET Core Web Application. This class provides two important methods are as follows:

1. **ConfigureService**
2. **Configure**

##### **ConfigureService Method:**

The ConfigureService method is used to configure all the services that you want to use in this application. The ConfigureService method takes IServiceCollection as an input parameter. The IServiceCollection interface belongs to Microsoft.Extensions.DependencyInjection namespace. So, whenever we inject any kind of method to this IServiceCollection object that means we are injecting the service to the built-in dependency injection.

##### **Configure Method:**

The Configure method is used to configure the HTTP request processing pipeline of the application. In other words, we can say that it will configure all the middleware that you want to use in your application. The Configure method takes two parameters i.e. IApplicationBuilder and IWebHostEnvironment instance. The IApplicationBuilder interface belongs to Microsoft.AspNetCore.Builder namespace and IWebHostEnvironment interface belong to Microsoft.AspNetCore.Hosting namespace.

The IApplicationBuilder Defines a class that provides the mechanisms to configure an application’s request pipeline. On the other hand, the IWebHostEnvironment Provides information about the web hosting environment an application is running in.

How to implement API versioning in asp.net core?

Difference between ViewBag, ViewData, TempData?

How to secure API?

Response Code

IEnumerable, ICollection, IList, IQueryable

Caching

## What is the role of IHostedService in .NET Core?

**background tasks or long-running services** that run alongside your web application or worker process.

```csharp
using Microsoft.Extensions.Hosting;
using System;
using System.Threading;
using System.Threading.Tasks;

public class MyBackgroundService : IHostedService, IDisposable
{
    private Timer _timer;

    // Called when the application starts
    public Task StartAsync(CancellationToken cancellationToken)
    {
        Console.WriteLine("Background Service is starting...");

        _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(5));
        return Task.CompletedTask;
    }

    private void DoWork(object state)
    {
        Console.WriteLine($"Working at: {DateTime.Now}");
    }

    // Called when the application is stopping
    public Task StopAsync(CancellationToken cancellationToken)
    {
        Console.WriteLine("Background Service is stopping...");
        _timer?.Change(Timeout.Infinite, 0);
        return Task.CompletedTask;
    }

    public void Dispose()
    {
        _timer?.Dispose();
    }
}

```

## How to implement a centralize logging and monitoting in a .net core application?

* Use **ILogger** (built-in) with a **provider** like  **Serilog/NLog** .
* Send logs to a central system ( **ELK, Seq, Azure App Insights** ).
* Add **Health Checks** for availability.
* Collect **metrics** with  **Prometheus/Grafana** .
* Implement **tracing** with  **OpenTelemetry** .

## Difference between IApplicationBuilder and IServiceCollection with example?

IServiceCollection

Used to register **dependencies and services** into the Dependency Injection (DI) container

```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // Register MVC controllers
        services.AddControllers();

        // Register EF Core DbContext
        services.AddDbContext<AppDbContext>();

        // Register custom service
        services.AddScoped<IEmailService, EmailService>();
    }
}

```

IApplicationBuilder

Used to define the **HTTP request pipeline** (middleware).

```csharp
public class Startup
{
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage(); // Show detailed error page in dev
        }

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}

```

## Differernce between generic host and web host?

WebHost

* Use Web Host – Only if you are maintaining an older ASP.NET Core project.
* Use Generic Host – For all new projects, whether it’s a web app, worker service, console app, or API.

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        CreateWebHostBuilder(args).Build().Run();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
        WebHost.CreateDefaultBuilder(args)
            .UseStartup<Startup>();
}

```

Host

```csharp
public class Program
{
    public static void Main(string[] args)
    {
        CreateHostBuilder(args).Build().Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });
}

```

Both Web Host and Generic Host are important concepts in .NET Core Hosting.

## Difference between IConfiguration and IOptions?

`IConfiguration` is the **root abstraction** in .NET for accessing key–value pairs from configuration sources (e.g., `appsettings.json`, environment variables, user secrets, command-line args, etc.).

```csharp
public class MyService
{
    private readonly IConfiguration _config;

    public MyService(IConfiguration config)
    {
        _config = config;
    }

    public void PrintConfig()
    {
        string value = _config["MySection:MyKey"]; 
        Console.WriteLine(value);
    }
}

```

`IOptions<T>` is a  **wrapper for strongly typed configuration classes** . It binds a configuration section to a class so you can access settings via properties instead of string keys.

```csharp
public class MySettings
{
    public string MyKey { get; set; }
}

// Program.cs / Startup.cs
builder.Services.Configure<MySettings>(builder.Configuration.GetSection("MySection"));

public class MyService
{
    private readonly MySettings _settings;

    public MyService(IOptions<MySettings> options)
    {
        _settings = options.Value;
    }

    public void PrintConfig()
    {
        Console.WriteLine(_settings.MyKey);
    }
}

```

## `IOptionsSnapshot` vs `IOptionsMonitor`

## IApplicationBuilder and IServiceCollection

## Difference between controllerBase and Controller in Web API?

* Use **`ControllerBase`** when building  **Web APIs** .
* Use **`Controller`** when building **MVC apps** that also return  **Views** .

## Difference between web.config and app.config?

* Use **`app.config`** → Desktop apps (console/WPF/WinForms).
* Use **`web.config`** → ASP.NET web apps (with IIS + HTTP pipeline configs).

## Expalin the difference between ViewResult and PartialViewResult?

ViewResult

Renders a complete view, including the layout page (_Layout.cshtml). It is used for displaying a full html page.

PartialViewResult

Renders only a partial view. It does not include a layout page and is used for rendering reusable, smaller, smaller sections of page (eg. a widget or a form).

## what is the difference between web.config and app.config

Web.config :

1. Used specifically for ASP.NET web projects, such as web forms, MVC, web APIs, and web services.
2. Stores configuration settings like connection strings, session states, authentication, authorization, custom error pages, and more—all relevant for web applications.
3. Multiple web.config files can exist within different folders in a web project for directory-specific settings. The web application auto-loads changes from web.config at runtime.
4. In .NET Core, web.config is used primarily for IIS configuration when deploying, and appsettings.json is preferred for application settings.

App.config :

1. Used for Windows applications—such as Windows Forms, Console Apps, Windows Services, and WPF applications.
2. Contains configuration data like connection strings, application settings, and custom sections for non-web-based .NET applications.
3. Only one app.config file per application. When the app is compiled, it becomes [YourAppName].exe.config.
4. Changes require restarting the application to take effect, unlike web.config which updates on-the-fly for web apps.

## How is memory management handled in .NET (GC generations, IDisposable)?

## **What is an AppDomain?**

An **AppDomain (Application Domain)** is a **logical isolation boundary** provided by the  **.NET CLR (Common Language Runtime)** .

It allows  **multiple .NET applications to run within a single process** , while keeping their code, memory, and security contexts **isolated** from each other.

## What is isolation level in dotnet

In  **.NET** , **isolation levels** define how transactions interact with each other, particularly in relation to data visibility and concurrency. They control  **how much one transaction can see the changes made by another concurrent transaction** .
