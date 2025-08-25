# What is the CLR, and why is it important?


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

# EXTENSION METHODS

Extension method allow us to seemingly add methods to an existing type without modifying this type's source code.

They are static method, but they're called as if they were instance methods on the extended type.

```
namespace Polymorphism.Extensions
{
	public static class StringExtensions
	{
		public static int CountLines(this string input)=> input.Split(Environment.NewLine).Length;
	}
}
```

# How to manage state in asp.net core?

# How to handle cors?

# How to secure web api

# Difference between ActionResult and IActionResult

# How to implement API versioning?

# CONVENTIONAL AND ATTRIBUTE ROUTING

Following are some suggestions on when to use each one. Consider choosing traditional routes when:

You want centralized configuration of all your routes.
You use custom constraint objects.
You have an existing working application you don't want to change
Consider choosing attribute routes when:

You want to keep your routes together with your action's code
You are creating a new application or making significant changes to an existing.
You want to match route parameter names with an actual parameter of the method(action), this will make the route parameter more descriptive and omit the weird error where the route ID would not match and that usually happens because we didn't configure routing correctly and we were using asp.net default route.
But the reasons why many developers recommend the Attribute Routes is because it allows you quite a bit more flexibility and places the routes next to the actions that will actually use them. You can switch from option to another at any time is not difficult

Attribute Routing
Problems in Conventional Routing

Very difficult to understand for the developers, which route is for which action methods.

Very difficult to avoid conflicts among the routes [some times, we can't apply constraints].

Overall, some routes for multiple action methods; some routes for specific action methods; Overall, it looks cumbersome.

RouteConfig.cs

protected static void RegisterRoutes( RouteCollection routes)
{
   routes.MapRoute("name", "url", defaults, constraints);
   routes.MapRoute("name", "url", defaults, constraints);
   routes.MapRoute("name", "url", defaults, constraints);
   …
}

Types of URL Routing
Conventional Routing

It is the traditional way of routing.  routes.MapRoute( "name", "url", { defaults } )

Applicable for a specific / multiple action methods.

Routes will be cumbersome.

Enabled by default.

Supports parameters & constraints.

Attribute Routing

1. New and preferred way of routing:

["url"]
public ActionResult Methodname( )
{
}
2. Applicable for specific action method. Each action method must have "Route" defined.

3. Routes are very clearly understandable for the developers.
4. Should be enabled using:  routes.MapMvcAttributesRoutes( );
5. Also supports parameters & constraints.

# What is the use of @Html.AntiForgeryToken()?

Let's assume you have a register functionality in your web app. You have an AccountController (example.com/account/register) where you expect people to submit their info. Normally before someone posts the registration information needs to visit the actual (example.com/account/register) than submit the form.

Let say I am a bad guy and I want to flood your server with junk info all I need to do is just keep posting directly to (example.com/account/register) without visiting your site. So in order to stop me you implement AntiForgeryToken so you can make it sure I visited the page before I submitted the registration information.

CSRF / XSRF (Cross Site Request Forgery) is a process of sending a request to actual website, from a page present in attacker website, based on the logged-in session of actual website user.

#### How to Implement CSRF Security?

**View**

`@Html.AntiForgeryToken( )`

**Controller**

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="pun">[</span><span class="typ">ValidateAntiForgeryToken</span><span class="pun">]</span></p></li><li class="L1" data-node-id="20240810195432-c52y22a"><p><span class="kwd">public</span><span class="pln"></span><span class="typ">ActionResult</span><span class="pln"></span><span class="typ">Method</span><span class="pun">(</span><span class="pln"></span><span class="pun">)</span></p></li><li class="L2"><p><span class="pun">{</span></p></li><li class="L3" data-node-id="20240810195432-p1f8zmf"><p><span class="pun">}</span></p></li></ol></pre>

# Performance Optimization

Bundling and Minification
Used to load multiple css files / js files with a single request.

Also minifies (compresses) the css / js files.

Types of Bundles:

ScriptBundle: Contains javascript files (.js files).

StyleBundle: Contains css fles (.css files).

Microsoft.AspNet.Web.Optimization

This NuGet Package needs to be installed in the project, to use bundling concept.

# Strongly Typed Views

View that is associated to a specific model class is called as "Strongly Typed View".

Strongly typed views have to specify the model class name with @model directive at the top of the view.

Strongly Typed Views can receive model objects from the controller.

To receive model collections from the controller: `@model List<modelClassNameHere>`

# HTML Helpers

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

# Built-in Tag Helpers:

* **<a asp-controller=”Home” asp-action=”Index”>Link `</a>`:** Generates a link with a URL that’s generated by routing based on the specified controller and action.
* **<img src=”~/images/pic.jpg” asp-append-version=”true” />:** Generates a `<img>` tag with a cache-busting query string to ensure the latest version of the image is fetched.
* **<form asp-controller=”Account” asp-action=”Login” method=”post”>…`</form>`:** Generates a form element with the appropriate action attribute for the specified controller and action.
* **`<input asp-for=”Username” />`:** Generates an input field with attributes based on the model property specified by asp-for.

# Filters

Filters in ASP.NET Core Web API are reusable components (attributes or classes) that allow developers to execute custom logic before or after an action method is invoked in a controller. Filters help decouple concerns such as validation, logging, security, and exception handling, making the code more modular and easier to maintain.

#### **Types of Filters in ASP.NET Core Web API**

ASP.NET Core provides several types of filters, each serving a specific purpose:

##### **1. Authorization Filters**

Authorization filters run first in the filter pipeline. They handle security concerns such as ensuring that the request is authorized to proceed. These filters are primarily used to authenticate the user and check if the user has the necessary permissions (roles, claims, etc.) to access a specific resource or endpoint.

* **How It Works:** The Authorization Filter verifies whether the user is authenticated and authorized. For example, it checks whether the user has a valid token and if the user’s role matches the required role to access the resource.
* **Example:** The [Authorize] attribute is a built-in authorization filter that is applied to controller actions or controllers themselves to ensure only authenticated and authorized users can access certain endpoints.
* **Real-time Use Case:** In an admin dashboard API endpoint, you can apply the [Authorize(Roles = “Admin”)] filter to ensure that only users with the “Admin” role can access the endpoint. If a user without the “Admin” role tries to access it, the filter will prevent them from doing so and return a 403 Forbidden response.

##### **2. Action Filters**

Action filters execute before and after an action method runs. They are typically used for tasks such as logging, modifying inputs or outputs, or measuring performance. They allow you to add logic before or after the execution of the action method.

* **How It Works:** Action Filters run at two points during the request. Before the action method is executed, they allow you to modify input data or perform validation. After the action method has completed, they allow you to modify the action result or log the output.
* **Example:** An action filter that logs every incoming request and its parameters for auditing purposes.
* **Real-time Use Case:** For example, in an e-commerce application, you can log every user activity by using an action filter. Each time a user performs an action like adding an item to the cart or making a purchase, an action filter can log the request and parameters into a log file or database for auditing purposes.

##### **3. Result Filters**

Result filters execute after the action method has run but before the response is sent to the client. They are useful for modifying or logging the final response, such as adding headers, modifying the body, or compressing large response payloads. The result filter provides a final opportunity to alter the response before it’s sent to the client.

* **How It Works:** The Result Filter is executed after the action method has returned its result. It allows you to modify the result before it is sent out, such as adding custom headers, changing the response content, or compressing the response data.
* **Example:** A result filter that compresses large JSON data before returning it to the client.
* **Real-time Use Case:** Suppose you are building an API that returns a list of products. If the list is very large, you can apply a result filter to compress the response to make it more efficient for network transfer. For example, you could apply gzip compression to the response before sending it to the client to reduce the payload size.

##### **4. Exception Filters**

Exception filters catch and handle any unhandled exceptions thrown by action methods. They are used to manage errors in a centralized way, returning custom error messages or logging the error details. Exception filters allow you to intercept exceptions and provide user-friendly error responses.

* **How It Works:** Exception Filters are triggered when an unhandled exception is thrown during the execution of an action method. You can catch these exceptions and decide how to handle them, such as logging the error or returning a custom error message to the client.
* **Example:** An exception filter that catches a database connection failure and returns a custom error message.
* **Real-time Use Case:** If a user submits an invalid ID in the request body, and the action method attempts to query a database with that invalid ID, an exception filter can catch the resulting error. It could then return a 400 Bad Request status code along with a message detailing the issue (e.g., “Invalid product ID”).

##### **5. Resource Filters**

Resource filters run before all other filters in the pipeline. They are typically used for resource management tasks such as caching, authentication, or processing requests before reaching the action method. These filters are ideal for scenarios where early-stage resource management is required.

* **How It Works:** Resource Filters are executed before authorization filters and action filters. They are often used for tasks like caching results or managing resources, such as limiting the number of concurrent requests to a resource.
* **Example:** A resource filter that checks if data is cached and returns the cached data if available, preventing redundant processing or database calls.
* **Real-time Use Case:** In a weather forecast API, a resource filter could cache the results of weather data for a particular location. If a user makes a subsequent request for the same location within a certain time frame, the filter can return the cached data instead of querying the database again, thus improving performance and reducing database load.

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

# Server Side Validation

**ModelState.IsValid:** Checks whether the model object satisfied all the validation rules

# Client Side Validation

**Three NuGet packages:**

1. jQuery :    Performs DOM manipulations
2. jQuery.Validation :   Defines Validation Rules
3. Microsoft.jQuery.Unobtrusive.Validation:     Shows / Hides Error Message

#### HTML Helpers for Client Side Validation

1. **ValidationMessageFor :**      Displays error message
2. ValidationSummary:             Displays validation summary

#### Custom Validation

* Used to implement user-defined validations.
* Create a class that extends ValidationAttribute class.
* IsValid method executes after submitting the form (after Model Binding).
* IsValid method receives the input value as argument.
* ValidationContext provides details about current model property’s details.
* IsValid method returns either “Success” or “ValidationResult with error message”.
* Best for database related validations.

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="kwd">public</span><span class="pln"></span><span class="kwd">class</span><span class="pln"></span><span class="typ">SampleAttribute</span><span class="pln"></span><span class="pun">:</span><span class="pln"></span><span class="typ">ValidationAttribute</span></p></li><li class="L1" data-node-id="20240813131529-uiehjz3"><p><span class="pun">{</span></p></li><li class="L2"><p><span class="pln"></span><span class="kwd">protected</span><span class="pln"></span><span class="kwd">override</span><span class="pln"></span><span class="typ">ValidationResult</span><span class="pln"></span><span class="typ">IsValid</span><span class="pun">(</span><span class="kwd">object</span><span class="pln"> value</span><span class="pun">,</span><span class="pln"></span><span class="typ">ValidationContext</span><span class="pln"> validationContext</span><span class="pun">)</span></p></li><li class="L3" data-node-id="20240813131529-mebt7zd"><p><span class="pln"></span><span class="pun">{</span></p></li><li class="L4"><p><span class="pln"></span><span class="com">//your code here</span></p></li><li class="L5" data-node-id="20240813131529-6f59upt"><p><span class="pln"></span><span class="kwd">return</span><span class="pln"></span><span class="typ">ValidationResult</span><span class="pun">.</span><span class="typ">Success</span><span class="pun">;</span></p></li><li class="L6"><p><span class="pln"> </span></p></li><li class="L7" data-node-id="20240813131529-yepqde9"><p><span class="pln"></span><span class="com">//or</span></p></li><li class="L8"><p><span class="pln"></span><span class="kwd">return</span><span class="pln"></span><span class="kwd">new</span><span class="pln"></span><span class="typ">ValidationResult</span><span class="pun">(</span><span class="kwd">this</span><span class="pun">.</span><span class="typ">ErrorMessage</span><span class="pun">);</span></p></li><li class="L9" data-node-id="20240813131529-42mvnyf"><p><span class="pln"></span><span class="pun">}</span></p></li><li class="L0"><p><span class="pun">}</span></p></li></ol></pre>

# What is Asp.Net Core meta package?

The ASP.NET Core shared framework (Microsoft.AspNetCore.App) contains assemblies that are developed and supported by Microsoft. Microsoft.AspNetCore.App is installed when the .NET Core 3.0 or later SDK is installed. The shared framework is the set of assemblies (.dll files) that are installed on the machine and includes a runtime component and a targeting pack.

```
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
  </PropertyGroup>
    ...
</Project>
```

# Middleware

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

# Caching

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

## **HTTP Response Status Codes:**

1. 1xx Informational: The request was received and is continuing.
2. 2xx Successful: The request was successfully received, understood, and accepted.
3. 3xx Redirection: Further action is needed to complete the request.
4. 4xx Client Error: There was an error in the request sent by the client.
5. 5xx Server Error: The server failed to fulfill a valid request.

* 100 Continue: This informs the client that the initial part of the request has been received and that the client should continue sending the rest of the request.
* 101 Switching Protocols: Indicates that the server is switching to a different protocol as requested by the client.
* 200 OK: The HTTP 200 OK success status response code indicates that the request has succeeded. It is often used for GET and POST requests that are processed successfully.
* 201 Created: The request has succeeded, and a new resource has been created as a result. This is typically used in response to a POST request.
* 202 Accepted: The server has received the request and will process it, but the processing may not be completed immediately.
* 204 No Content: The server successfully processed the request but is not returning any content. This is often used for DELETE requests.
* 301 Moved Permanently: This response status code tells the client that the resource has been moved permanently to a new URL and should use the new URL in future requests.
* 302 Found: This response status code indicates that the resource is temporarily located at a different URL. The client should use this temporary URL for this request. As the redirection might be altered occasionally, the client should continue using the original URI for future requests.
* 304 Not Modified: This response status code informs the client that the resource has not changed since the last request so that the client can use its cached version.
* 400 Bad Request: The server cannot process the request due to a client error (e.g., malformed request syntax).
* 401 Unauthorized: Authentication is required and has failed or has not been provided.
* 403 Forbidden: The server understands the request but refuses to authorize it due to lack of permission.
* 404 Not Found: The server can not find the requested resource. In the browser, this means the URL is not recognized. In an API, this can also mean that the endpoint is valid, but the resource itself does not exist.
* 405 Method Not Allowed: This indicates that the server knows the request method but is not supported by the target resource. For example, we have one method, which is a POST method, in the server, and we are trying to access that method from the client using GET Verb; then, in that case, we will get a 405-status code.

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
