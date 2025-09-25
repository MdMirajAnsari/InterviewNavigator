## **Version**

It was officially released for General Availability in Nov, 2024 with the announcement of .NET 9

It includes key features:

- Params Collections
- New Lock Type
- New Escape Sequence \e
- Init Array with Index from the End Operator ^
- Relaxed Constraints on ref struct and ref variables

## **Difference between Class and Objects in C#**

- **Class**: A blueprint describing properties/behaviors.
- **Object**: An instance created from a class at runtime.

```csharp
public class Car
{
    public string Model { get; set; }
    public void Start() => Console.WriteLine($"{Model} started");
}

// Usage
var car = new Car { Model = "Civic" }; // object (instance)
car.Start();
```

## Constructor

- Special method used to initialize a new object’s state.
- **Default constructor access modifier in C# = `private`** (if not specified).
- Has no return type and shares the class name.
- The compiler provides a default parameterless constructor if none is defined.
- Fields have default values (numbers: 0, bool: false, reference: null).

```csharp
public class Person
{
    public string Name { get; }
    public int Age { get; private set; }

    // Explicit parameterless constructor
    public Person()
    {
        Name = "Unknown";
        Age = 0;
    }

    // Overloaded constructor
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}

var a = new Person();            // uses parameterless constructor
var b = new Person("Alice", 30); // uses overloaded constructor
```

## **Static Constructor**

In a static constructor, you cannot use any access specifiers like public, private, and protected.

Static Constructors are responsible for initializing static variables

public by default . access modifier can't be chnaged

Execute only once, i.e when first object is created for the class or when the class is accessed for the first time during the execution of Main method?

and these constructors are never called explicitly. They are called Implicitly and moreover, these constructors are the first to execute in any class

Static Constructors execute immediately once the execution of a class start and moreover, it is the first block of code to run under a class whereas non-static constructors execute only after creating the instance of the class as well as each and every time the instance of the class is created.

Static Constructors cannot be parameterized, so overloading of the static constructors is not possible in C#.

```csharp
public class Logger
{
    public static string AppName { get; }

    // Static constructor: runs once before first use
    static Logger()
    {
        AppName = "MyApp";
        Console.WriteLine("Static ctor ran");
    }
}

// First access triggers static constructor once
Console.WriteLine(Logger.AppName);
Console.WriteLine(Logger.AppName); // no second run
```

## **private constructor**

When a class contains a private constructor then we cannot create an object for the class outside of the class. So, private constructors are used to create an object for the class within the same class. Generally, private constructors are used in the Remoting concept.

We need to use the private constructor in C# when the class contains only static members.

##### **When to use Private Constructors in C#?**

private constructor is used to implement Singleton Design Pattern.

##### Example: Singleton and utility class using private constructor

```csharp
// Singleton using a private constructor
public sealed class AppConfig
{
    private static readonly Lazy<AppConfig> _instance =
        new Lazy<AppConfig>(() => new AppConfig());

    public static AppConfig Instance => _instance.Value;

    // Private constructor prevents external instantiation
    private AppConfig()
    {
        // load settings once
        Version = "1.0.0";
    }

    public string Version { get; }
}

// Usage:
// var cfg = AppConfig.Instance; Console.WriteLine(cfg.Version);


// Utility class to prevent instantiation
public static class MathUtils
{
    // Alternatively, for a non-static utility holder:
    // private MathUtils() { }

    public static int Add(int a, int b) => a + b;
}

// Usage:
// var sum = MathUtils.Add(2, 3);
```

## Destructor

Destructors which are also called Finalizers in C# are used to perform any necessary final clean-up when a class instance is being collected by the garbage collector.

##### **When to use Destructor in C#?**

You might have one question on your mind if the memory management is automatically managed by the garbage collector, then when do we need to use Destructor? In general, as C#.NET developers, we need not be much more worried about memory management. This is because the .NET garbage collector implicitly manages the allocation and deallocation of the memory for our objects.

However, when our application works with unmanaged resources, such as windows, files, and network connections, we should use a destructor to free the memory for those unmanaged resources. When the object is eligible for destruction, the garbage collector runs the Finalize method of the object.

##### **When is a Destructor method Called in C#?**

A destructor method gets called automatically by the garbage collector when the object of the class is destroyed. So, the point that you need to remember is that the destructor methods are automatically called by the garbage collector.

Desctructor is called implicitily

can can call destructor explicilty by using GC.Collect();

## **What is Garbage Collection in .NET Framework?**

###### Garbage Collector is nothing but a feature provided by CLR that helps us clean or destroy unused managed objects. Cleaning or destroying those unused managed objects basically reclaims the memory.

##### **What are Generations?**

Generations are nothing but will define how long the objects stay in the memory

your class should implement the IDisposable interface and provide the implementation for the Dispose method. Within the Dispose method, you need to write the clean-up code for unmanaged objects, and in the end, you need to call GC.SuppressFinalize(true) method by passing true as the input value. This method suppresses any kind of destructor and just goes and cleans up the objects.

## **Different Types of Access Specifiers in C#:**

## **Generalization and Specialization**

In specialization, the parent was existing and the child was defined later. In generalization, the child class was existing then we define the base class. So, specialization is a top-down approach and generalization is a bottom-up approach.

In specialization, the base class has something to give to the child class whereas, in generalization, the base class doesn’t have anything to give to their child classes. Just their purpose is to group them together so that we can easily manage all those things.

The purpose of generalization is to achieve polymorphism and the purpose of specialization is to share its features with its child classes.

## **Differences Between Finalize and Dispose in C#**

* **Timing:** Finalize is called by the garbage collector in a non-deterministic manner, while Dispose is called explicitly at a known point in the program.
* **Resources:** Finalize is typically used for unmanaged resources, whereas Dispose can be used for both managed and unmanaged resources.
* **Control:** Dispose gives you more control over resource management compared to Finalize.

## CLASS IN C#

**Partial Class and Partial Methods in C#**

partial classes allow you to split the definition of a single class across multiple files. If two partial class definitions in separate files have the same name, they must meet specific requirements to work correctly:**1. **Same Namespace**: Both partial class definitions must be in the same namespace (or have no namespace if they are in the global namespace).

1. **Same Class Name**: The class names must match exactly, including case sensitivity.
2. **Partial Keyword**: Both class definitions must use the **partial** keyword.
3. **Same Access Modifier**: Both parts of the partial class must have the same access modifier (e.g., **public**, **private**, etc.).
4. **Same Assembly**: Partial classes must be defined within the same assembly (project).

**Sealed Class and Sealed Methods in C#**

## CLR-Common Language Runtime

Runtime enginer to execute application

## CLS-Common Language Specification

## BCL- Base Class Library

Console, String, StringBuilder, convert, Thread, Task

## Value Type vs Reference Types

System.value

struct, int char

Syste,.Object

classes,delegate, string, array

## What is a managed and unmanaged code

Managed code lets you run the code on a managed CLR runtime environment in the .NET framework.
Unmanaged code is when the code doesn’t run on CLR, it is an unmanaged code that works outside the .NET framework.

## Garbage Collection

Garbage Collection is a process of deleting objects from memory, to free-up memory; so the same memory can be re-used

**When GC gets triggered?**

There are NO specific timings for GC to get triggered.

GC automatically gets trigged in the following conditions:

- When the "heap" is full or free space is too low.
- When we call GC.Collect() explicitly.

#### Generations in GC

Heap contains three segments (called generations):

* Generation 2 [Long-Lived Generation]
* Generation 1 [Survival Generation]
* Generation 0 [Short-Lived Generation]

## IDisposable

The "IDisposable" interface of "System" namespace, has a method called "Dispose", which is used to close un-managed resources that are created during the life-time of the object.

#### Using Declaration

You can prefix "using" keyword before the local variable declaration, in order to call "Dispose" method when that variable goes out of scope.

## Destructor

Destructor is a special method of the class, which is used to close un-managed resources (such as database connections and file connections), that are opened during the class execution.

## Base Keyword

The `base` keyword is used to refer to the base class when chaining constructors or when you want to access a member (method, property, anything) in the base class that has been overridden or hidden in the current class. For example,

```csharp
using System;

public class Program
{
    class A {
        protected virtual void Foo() {
            Console.WriteLine("I'm A");
        }
    }

    class B : A {
        protected override void Foo() {
            Console.WriteLine("I'm B");
        }

        public void Bar() {
            Foo();       // Calls Foo() from class B
            base.Foo();  // Calls Foo() from class A
        }
    }

    public static void Main(string[] args)
    {
       new B().Bar();
    }
}

```

would output

```csharp
I'm B
I'm A
```

## Ref and Out

when you want multiple outputs from a function, then you need to use the ref and out parameters in C#.

if you are declaring some out variables, then it is mandatory or compulsory to initialize or update the out variables inside the method body else we will get a compiler error. But with the ref, updating the ref variable inside a method is optional.

initializing the ref parameter is mandatory before passing such variables to the method while initializing the out-parameter variables is optional in C#.

**Note:** The point that you need to remember is that the ref keyword is used to pass data pass in bi-directional and the out keyword is used to pass the data only in unidirectional i.e. returning the data.

```csharp
using System;
namespace RefvsOutDemo
{
    class Program
    {
        static void Main(string[] args)
        {
            //First Declare the Variables
            int Addition = 0;
            int Multiplication = 0;
            int Subtraction = 0;
            int Division = 0;
            //While calling the Method, decorate the out keyword for out arguments
            //Addition, Multiplication, Subtraction, and Division variables values will be updated by Math Function
            Math(200, 100, out Addition, out Multiplication, out Subtraction, out Division);
            Console.WriteLine($"Addition: {Addition}");
            Console.WriteLine($"Multiplication: {Multiplication}");
            Console.WriteLine($"Subtraction: {Subtraction}");
            Console.WriteLine($"Division: {Division}");
  
            Console.ReadKey();
        }
        //Declaring Method with out Parameters
        public static void Math(int number1, int number2, out int Addition,
            out int Multiplication, out int Subtraction, out int Division)
        {
            Addition = number1 + number2; //This will Update the Addition variable Declared in Main Method
            Multiplication = number1 * number2; //This will Update the Multiplication variable Declared in Main Method
            Subtraction = number1 - number2; //This will Update the Subtraction variable Declared in Main Method
            Division = number1 / number2; //This will Update the Division variable Declared in Main Method
        }
    }
}
```

## Type Conversion

'Type Conversion' is a process of convert a value from one type (source type) to another type (destination type).

Eg: int -> long

1. Implicit Casting

(from lower-numerical-type to higher-numerical-type)

2. Explicit Casting

(from higher-numerical-type to lower-numerical-type)

## For And Foreach

for-for is faster, need modification,

foreach-no need modification, enumeration, inside loop Add method not recommended.

## Generic Method

```csharp
public static T Add<T>(T number1, T number2)
{
    dynamic a = number1;
    dynamic b = number2;
    return a + b;
}
```

## Thread

Threads in C# allow you to perform multiple operations simultaneously, making your applications more responsive and efficient.

You can control thread behavior using various methods and properties:

* **Start** : Begins thread execution.
* **Join** : Waits for the thread to finish.
* **Abort** : Stops the thread (not recommended in .NET Core).
* **Sleep** : Pauses the thread for a specified time.

## 2D Array

**int[,] A = {{2, 5, 9},{6, 9, 15}};**

## Task

**Task** represents an asynchronous operation. It’s part of the `System.Threading.Tasks` namespace and is used to perform operations asynchronously on thread pool threads rather than the main thread.

## InstanceOf

We cannot create an instance of an interface.

We cannot create an instance of an Abstract Class.

No, you cannot create an instance of a static class in C#.

## Inherit

No, you cannot inherit a static class in C#

you  **cannot inherit a private class** .

Yes, you can inherit an abstract class in C#.

Yes, in C#, you can inherit one interface from another.

## Stack and Heap Memory

Stack Memory:Stores value types (e.g., int, struct) and method data (e.g., local variables, return addresses).
Fast, fixed-size, scope-based (auto-cleared when method ends).
Thread-specific, inherently thread-safe.

Heap Memory:Stores reference types (e.g., class, string, arrays).
Dynamic, managed by Garbage Collector (GC) for allocation/deallocation.
Slower, shared across threads, requires synchronization.

## **What is a Collection in C#?**

So in simple words, we can say a Collection in C# is a dynamic array**.** That means the collections in C# have the capability of storing multiple values but with the following features.

1. Size can be increased dynamically.
2. We can insert an element into the middle of a collection.
3. It also provides the facility to remove or delete elements from the middle of a collection.

The collections in C# are classes that represent a group of objects. With the help of C# Collections, we can perform different types of operations on objects such as Store, Update, Delete, Retrieve, Search, and Sort objects, etc. In short, all the data structure work can be performed by collections in C#. That means Collections standardize the way in which the objects are handled by our program.

##### **Types of Collections in C#**

There are 3 ways to work with collections. The three namespaces are given below:

1. System.Collections classes
2. System.Collections.Generic classes
3. System.Collections.Concurrent classes

## What is the difference between const and readonly in C#?

`const`: Can't be changed anywhere.

`readonly`: This value can only be changed in the constructor. Can't be changed in normal functions.

## FOR AND FOREACH

The foreach statement is used to iterate through the collection to get the information that you want, but can not be used to add or remove items from the source collection to avoid unpredictable side effects. If you need to add or remove items from the source collection, use a for loop.

If you are iterating through a collection of items, and do not care about the index values then foreach is more convenient, easier to write and safer: you can't get the number of items wrong.

If you need to process every second item in a collection for example, or process them ion the reverse order, then a for loop is the only practical way.

## DELEGATE

What is Func Generic Delegate in C#?

The Func Generic Delegate in C# is present in the System namespace. This delegate takes one or more input parameters and returns one out parameter. The last parameter is considered as the return value. The Func Generic Delegate in C# can take up to 16 input parameters of different or the same data types. It must have one return type. The return type is mandatory but the input parameter is not mandatory.

Note: Whenever your delegate returns some value, whether by taking any input parameter or not, you need to use the Func Generic delegate in C#.

##### What is Action Generic Delegate in C#?

The Action Generic Delegate in C# is also present in the System namespace. It takes one or more input parameters and returns nothing. This delegate can take a maximum of 16 input parameters of the different or same data types.

Note: Whenever your delegate does not return any value, whether by taking any input parameter or not, then you need to use the Action Generic delegate in C#.

##### What is Predicate Generic Delegate in C#?

The Predicate Generic Delegate in C# is also present in the System namespace. This delegate is used to verify certain criteria of the method and returns the output as Boolean, either True or False. It takes one input parameter and always returns a Boolean value which is mandatory. This delegate can take a maximum of 1 input parameter and always return the value of the Boolean type.

Note: Whenever your delegate returns a Boolean value, by taking only one input parameter, then you need to use the Predicate Generic delegate in C#.

Points to Remember while working with C# Generic Delegates:

1. Func, Action, and Predicate are Generic Inbuilt delegates that are present in the System namespace which is introduced in C# 3.
2. All these three delegates can be used with the method, [Anonymous Method](https://dotnettutorials.net/lesson/anonymous-method-c-sharp/), and [Lambda Expressions](https://dotnettutorials.net/lesson/lambda-expression-csharp/) in C#.
3. The Func delegates can contain a maximum of 16 input parameters and must have one return type and that will be the last parameter in the parameter list.
4. Action delegate can contain a maximum of 16 input parameters and does not have any return type.
5. The Predicate delegate should satisfy some criteria of a method and must have only one input parameter. By default, it is having one output parameter of return type and we don’t have to pass the output parameter to the Predicate.

## Concurrency

Concurrency means doing several things at the same time. For example, if we have to do a million tasks, then instead of doing them sequentially one by one, we can do them simultaneously, thus reducing the duration of the program execution.

## **What are Accessors in C#?**

The Assessors are nothing but special methods which are used to set and get the values from the underlying data member (i.e. variable) of a class. Assessors are of two types. They are as follows:

1. **Set Accessor**
2. **Get Accessor**

##### **What is a Set Accessor?**

The set accessor is used to set the data (i.e. value) into a data field i.e. a variable of a class. This set accessor contains a fixed variable named  value . Whenever we call the property to set the data, whatever data (value) we are supplying will come and store inside the variable called value by default. Using a set accessor, we cannot get the data.

**Syntax: **set { Data_Field_Name = value; }

##### What is Get Accessor?

The get accessor is used to get the data from the data field i.e. variable of a class. Using the get accessor, we can only get the data, we cannot set the data.

Syntax: get {return Data_Field_Name;}

##### What are Auto-Implemented Properties in C#?

If you do not have any additional logic while setting and getting the data from a data field i.e. from a variable of a class, then you can make use of the auto-implemented properties which was introduced as part of C# 3.0. The Auto-Implemented Property in C# reduces the amount of code that we have to write. When we use auto-implemented properties, then the C# compiler implicitly creates a private, anonymous field or variable for that property behind the scene which is going to hold the data.
Syntax: Access_specifier Datatype Property_Name { get; set; }
Example: public int A { get; set; }

## **IEnumerable and IQueryable**

IEnumerable in C# is an interface that defines one method, GetEnumerator, which returns an IEnumerator object. This interface is found in the **System.Collections** namespace. It is a key part of the .NET Framework and is used to iterate over a collection of objects.

###### **GetEnumerator Method:**

This is the only method defined in the IEnumerable interface. It returns an IEnumerator object, which provides the ability to iterate through the collection by exposing a Current property and MoveNext() and Reset() methods.

* **Current** : A property that gets the current element in the collection.
* **MoveNext()** : This advances the enumerator to the next element of the collection.
* **Reset():** Sets the enumerator to its initial position, which is before the first element in the collection.

IQueryable in C# is an interface that is used to query data from a data source. It is part of the System.Linq namespace and is a key component in LINQ (Language Integrated Query). Unlike IEnumerable, which is used for iterating over in-memory collections, IQueryable is designed for querying data sources where the query is not executed until the object is enumerated. This is particularly useful for remote data sources, like databases, enabling efficient querying by allowing the query to be executed on the server side.

##### **Key Differences Between IEnumerable and IQueryable in C#**

* **Execution Context:** IEnumerable executes in the client memory, whereas IQueryable executes on the data source.
* **Suitability:** IEnumerable is suitable for LINQ to Objects and working with in-memory data. IQueryable is suitable for LINQ to SQL or Entity Framework to interact with databases.
* **Performance:** IQueryable can perform better for large data sets as it allows the database to optimize and filter data.

##### **Choosing Between IEnumerable and IQueryable in C#:**

* Use IEnumerable when working with in-memory data collections where the data set is not excessively large.
* Use IQueryable when querying data from out-of-memory sources like databases, especially when dealing with large data sets, to take advantage of server-side processing and optimizations.

## **Types of Dependency Injection Design Pattern in C#.**

Constructor Injection
Property Injection
Method Injection

## What is thread pooling in C#?

**reuse of threads** from a pool managed by CLR instead of creating new ones. It improves performance, reduces overhead, and is widely used in background task execution.

## What is a race condition in multithreading?

A **race condition** happens in **multithreading** when two or more threads  **access shared data at the same time** , and the **final result depends on the order** in which the threads execute.

## Thread and Task

* **Thread** = low-level execution unit (manual control, expensive).
* **Task** = higher-level abstraction (async/await, parallelism, lightweight).
* In modern .NET, **prefer `Task`** unless you have a strong reason to use raw threads

## Difference between **ConcurrentDictionary** and regular Dictionary.

* Use **`Dictionary`** for **single-threaded** scenarios.
* Use **`ConcurrentDictionary`** when multiple threads might **read/write simultaneously** and you want **built-in thread safety** without using explicit locks.

## Cancellation tokens in async tasks

Use `CancellationTokenSource` to create a `CancellationToken` and pass it down to cancellable APIs; check `token.IsCancellationRequested` or call `ThrowIfCancellationRequested()`.

```csharp
using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

public class Demo {
    public async Task<string> FetchAsync(string url, CancellationToken token) {
        using var http = new HttpClient();
        using var resp = await http.GetAsync(url, token); // propagates cancellation
        token.ThrowIfCancellationRequested();
        return await resp.Content.ReadAsStringAsync(token);
    }

    public async Task Run() {
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));
        try { Console.WriteLine(await FetchAsync("https://example.com", cts.Token)); }
        catch (OperationCanceledException) { Console.WriteLine("Cancelled"); }
    }
}
```

## Parallel.For vs PLINQ (Parallel LINQ)

- **Parallel.For/ForEach**: imperative loops; best when you already have loop bodies and want parallel execution.
- **PLINQ (`AsParallel`)**: declarative query; easy composition of filters, projections, grouping with automatic parallelism.

```csharp
// Parallel.For
Parallel.For(0, 10_000, i => DoWork(i));

// PLINQ
var results = Enumerable.Range(0, 10_000)
    .AsParallel()
    .WithDegreeOfParallelism(Environment.ProcessorCount)
    .Select(DoWork)
    .ToList();
```

## Producer–Consumer pattern

Use a thread-safe queue to decouple producers from consumers.

```csharp
using System.Collections.Concurrent;
using System.Threading.Tasks;

var queue = new BlockingCollection<int>(boundedCapacity: 100);

// producer
_ = Task.Run(() => { for (int i = 0; i < 1000; i++) queue.Add(i); queue.CompleteAdding(); });

// consumers
var consumers = Enumerable.Range(0, 4)
    .Select(_ => Task.Run(() => { foreach (var item in queue.GetConsumingEnumerable()) Process(item); }))
    .ToArray();

Task.WaitAll(consumers);
```

## volatile keyword in C#

`volatile` ensures reads/writes to a field are not cached/reordered by the CPU/compiler across threads. It does not make compound operations atomic.

```csharp
volatile bool _running = true;

void Worker() { while (_running) { /* work */ } }
void Stop() { _running = false; } // other thread will observe change promptly
```

## Race condition and prevention

Race condition: multiple threads access/modify shared state without proper synchronization.

Prevent with locks, interlocked operations, immutability, or thread confinement.

```csharp
int _counter = 0;
object _gate = new object();

void SafeInc() { lock (_gate) { _counter++; } }
// or
void SafeInc2() { System.Threading.Interlocked.Increment(ref _counter); }
```

## Thread pooling in C# (detail)

`ThreadPool` reuses a pool of worker threads for short-lived tasks to avoid thread creation overhead. `Task.Run` queues work to the thread pool.

```csharp
await Task.Run(() => DoCpuBound()); // uses ThreadPool
```

## lock vs Mutex vs Semaphore

- **lock (`Monitor`)**: in-process, lightweight, exclusive access within same AppDomain/process.
- **Mutex**: can be cross-process; heavier; exclusive access system-wide if named.
- **Semaphore/SemaphoreSlim**: allow up to N concurrent entrants; `SemaphoreSlim` is in-process optimized.

```csharp
// lock
lock (_gate) { /* critical section */ }

// SemaphoreSlim (limit concurrency to 3)
static readonly SemaphoreSlim _sem = new SemaphoreSlim(3);
await _sem.WaitAsync();
try { await DoWorkAsync(); }
finally { _sem.Release(); }
```

## async/await pitfalls and avoiding deadlocks

- Avoid blocking on async (`.Result`, `.Wait()`), which can deadlock in single-threaded contexts (e.g., UI/ASP.NET old SynchronizationContext).
- Use `await` all the way; for library code, consider `ConfigureAwait(false)` to avoid capturing context.
- Handle exceptions with `try/catch` around `await`.

```csharp
// Bad: var s = GetAsync().Result; // can deadlock
// Good:
string s = await GetAsync().ConfigureAwait(false);
```

## Record types vs classes

`record` provides built-in value-based equality, immutability by default, and with-expressions.

```csharp
public record Person(string Name, int Age);

var p1 = new Person("Ann", 30);
var p2 = new Person("Ann", 30);
Console.WriteLine(p1 == p2); // true (value equality)
var p3 = p1 with { Age = 31 }; // copy with change
```

## Nullable reference types (NRT)

Annotate reference types as nullable (`string?`) or non-nullable (`string`). Compiler warns about possible null misuse, improving safety.

```csharp
#nullable enable
string name = "Bob";    // non-nullable
string? nick = null;     // nullable
int len = name.Length;   // ok
// int n = nick.Length;  // warning: possible null reference
```

## IEnumerable vs IQueryable vs List

- **IEnumerable `<T>`**: forward-only iteration over in-memory collections; LINQ to Objects; executes immediately when enumerated.
- **IQueryable `<T>`**: represents a query to be translated/executed by a provider (e.g., EF Core); deferred execution on server.
- **List `<T>`**: concrete, resizable in-memory collection supporting indexing and mutation.

```csharp
IEnumerable<int> seq = Enumerable.Range(1, 10).Where(x => x % 2 == 0);
List<int> list = seq.ToList();
IQueryable<User> q = dbContext.Users.Where(u => u.IsActive); // translated to SQL
```

## async/await vs Task.Run

- **async/await**: language features for composing asynchronous operations. They do not create threads; they await non-blocking operations.
- **Task.Run**: schedules CPU-bound work on the thread pool. Use sparingly to offload CPU work from the UI thread; not for I/O that already has async APIs.

```csharp
// I/O-bound
var data = await httpClient.GetStringAsync(url); // no Task.Run needed

// CPU-bound
var result = await Task.Run(() => ComputeLargePrime());
```

## Difference between const, readonly, static.
