# CLI-Common Language Infrastructure

cmd: developer command prompt->ildasm

platform-neutral environment for executing applications written in multiple high-level programming languages

c# code -> IL code -> Jit Compiler-> Hardware

## CLR-Common Language Runtime

Runtime enginer to execute application

## CLS-Common Language Specification

## BCL- Base Class Library

Console, String, StringBuilder, convert, Thread, Task

# Value Type vs Reference Types

System.value

struct, int char

Syste,.Object

classes,delegate, string, array

# What is a managed and unmanaged code

Managed code lets you run the code on a managed CLR runtime environment in the .NET framework.
Unmanaged code is when the code doesn’t run on CLR, it is an unmanaged code that works outside the .NET framework.

# Garbage Collection

Garbage Collection is a process of deleting objects from memory, to free-up memory; so the same memory can be re-used

**When GC gets triggered?**

There are NO specific timings for GC to get triggered.

GC automatically gets trigged in the following conditions:

- When the "heap" is full or free space is too low.
- When we call GC.Collect() explicitly.

#### Generations in GC

Heap contains three segments (called generations):

* Generation 2 [Long-Lived Generation]-

These are usually long-lived objects, such as:

* Static objects
* Application-level caches
* Singleton services
* Objects used throughout the application lifetime

* Generation 1 [Survival Generation] - Generation 1 acts as a middle area between short-lived and long-lived objects.
* Generation 0 [Short-Lived Generation] -This contains newly created, short-lived objects.

These are usually long-lived objects, such as:

* Static objects
* Application-level caches
* Singleton services
* Objects used throughout the application lifetime

.NET GC uses three generations: Gen 0 for newly created short-lived objects, Gen 1 for objects that survive a Gen 0 collection, and Gen 2 for long-lived objects. The purpose is performance, because most objects die young, so GC frequently collects the smaller Gen 0 instead of scanning the entire heap. A Gen 2 collection is more expensive and usually includes all generations.

# IDisposable

The "IDisposable" interface of "System" namespace, has a method called "Dispose", which is used to close un-managed resources that are created during the life-time of the object.

#### Using Declaration

You can prefix "using" keyword before the local variable declaration, in order to call "Dispose" method when that variable goes out of scope.

**Creating object**

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="kwd">public</span><span class="pln"></span><span class="kwd">void</span><span class="pln"></span><span class="typ">Method</span><span class="pun">(</span><span class="pln"></span><span class="pun">)</span></p></li><li class="L1" data-node-id="20240811143924-8sk6xs9"><p><span class="pun">{</span></p></li><li class="L2"><p><span class="pln"></span><span class="kwd">using</span><span class="pln"></span><span class="typ">ClassName</span><span class="pln"> referenceVariable </span><span class="pun">=</span><span class="pln"></span><span class="kwd">new</span><span class="pln"></span><span class="typ">ClassName</span><span class="pun">(</span><span class="pln"></span><span class="pun">);</span></p></li><li class="L3" data-node-id="20240811143924-9hjeuzn"><p><span class="pln"> </span></p></li><li class="L4"><p><span class="pln"></span><span class="com">//do work here</span></p></li><li class="L5" data-node-id="20240811143924-yfl589q"><p><span class="pln"> </span></p></li><li class="L6"><p><span class="pun">}</span><span class="pln"></span><span class="com">//Dispose will be called automatically here</span></p></li></ol></pre>

# Destructor

Destructor is a special method of the class, which is used to close un-managed resources (such as database connections and file connections), that are opened during the class execution.

## Filalize

# Base Keyword

The `base` keyword is used to refer to the base class when chaining constructors or when you want to access a member (method, property, anything) in the base class that has been overridden or hidden in the current class. For example,

```
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

# Ref and Out

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

# Type Conversion

'Type Conversion' is a process of convert a value from one type (source type) to another type (destination type).

Eg: int -> long

1. Implicit Casting

(from lower-numerical-type to higher-numerical-type)

2. Explicit Casting

(from higher-numerical-type to lower-numerical-type)

# Delegate

# EVENT

# For And Foreach

for-for is faster, need modification,

foreach-no need modification, enumeration, inside loop Add method not recommended.

# Generic Method

```csharp
public static T Add<T>(T number1, T number2)
{
    dynamic a = number1;
    dynamic b = number2;
    return a + b;
}
```

# Thread

Threads in C# allow you to perform multiple operations simultaneously, making your applications more responsive and efficient.

You can control thread behavior using various methods and properties:

* **Start** : Begins thread execution.
* **Join** : Waits for the thread to finish.
* **Abort** : Stops the thread (not recommended in .NET Core).
* **Sleep** : Pauses the thread for a specified time.

# 2D Array

**int[,] A = {{2, 5, 9},{6, 9, 15}};**

# Task

**Task** represents an asynchronous operation. It’s part of the `System.Threading.Tasks` namespace and is used to perform operations asynchronously on thread pool threads rather than the main thread.

# InstanceOf

We cannot create an instance of an interface.

We cannot create an instance of an Abstract Class.

No, you cannot create an instance of a static class in C#.

# Inherit

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

# FOR AND FOREACH

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

| ˛ |  |  |
| -- | - | - |

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

# ICollection vs IList

Use it when you only need to add, remove, count, or loop through items.

IList<T></t> inherits from ICollection<T></t> and additionally supports indexing and position-based operations.

# C# Interview Questions and Answers

## Difference between IEnumerable, IQueryable, ICollection and IList

**IEnumerable<T>** is used to iterate over a sequence of items. It is best for in-memory collections and supports forward-only iteration using `foreach`. LINQ queries on `IEnumerable` are executed in memory.

**IQueryable<T>** is used to build queries against external data sources like databases. It stores the query as an expression tree, so providers like Entity Framework can translate it into SQL and execute it on the server.

**ICollection<T>** extends `IEnumerable<T>` and adds collection operations such as `Add`, `Remove`, `Contains`, `Count`, and `Clear`. Use it when you need to modify a collection but do not need index-based access.

**IList<T>** extends `ICollection<T>` and adds index-based access using `collection[index]`, plus insert and remove operations by position. Use it when item order and positions matter.

## What is deferred execution in LINQ?

Deferred execution means a LINQ query is not executed when it is created. It runs only when the result is actually enumerated, such as by using `foreach`, `ToList()`, `ToArray()`, `First()`, `Count()`, or similar terminal operations.

Example:

```csharp
var query = users.Where(u => u.IsActive); // query is only defined here
var list = query.ToList();                // query executes here
```

Deferred execution allows queries to be composed step by step before they run.

## What happens when you call ToList() on an IQueryable?

Calling `ToList()` on an `IQueryable<T>` executes the query immediately. For Entity Framework or LINQ to SQL, the expression tree is translated into SQL, sent to the database, executed there, and the returned rows are materialized into a `List<T>` in memory.

After `ToList()`, further LINQ operations run in memory on the list, not in the database.

## Difference between async/await, Task, thread and process

**Process** is an independent running program with its own memory space.

**Thread** is an execution path inside a process. A process can have multiple threads sharing the same memory.

**Task** represents an asynchronous operation. It may use a thread, but it does not always mean a dedicated thread is running. For example, I/O work can be represented by a `Task` while no thread is blocked waiting.

**async/await** is a language feature that makes asynchronous code easier to write. `async` marks a method as asynchronous, and `await` pauses the method until the awaited `Task` completes without blocking the current thread.

## Can an async method still block a thread?

Yes. An `async` method can still block a thread if it contains blocking calls such as `Thread.Sleep`, `.Result`, `.Wait()`, synchronous file/database/network calls, or CPU-heavy work without offloading it appropriately.

Example:

```csharp
public async Task DoWorkAsync()
{
    Thread.Sleep(5000); // blocks the thread
    await Task.Delay(1000);
}
```

`async` does not automatically make every operation non-blocking.

## What causes deadlocks in asynchronous code?

Deadlocks commonly happen when asynchronous code is forced to run synchronously, especially by calling `.Result` or `.Wait()` on a `Task`.

In UI apps or older ASP.NET apps, the awaited operation may try to resume on the original synchronization context. But that context is blocked waiting for `.Result` or `.Wait()`, so the continuation cannot run and the caller waits forever.

## Why should .Result and .Wait() generally be avoided?

`.Result` and `.Wait()` block the current thread until the task completes. This can cause deadlocks, thread pool starvation, poor scalability, and less responsive applications.

Prefer using `await`:

```csharp
var result = await GetDataAsync();
```

Use synchronous blocking only when you are certain it is safe and necessary.

## Difference between value types and reference types

**Value types** store the actual value. Examples include `int`, `bool`, `double`, `DateTime`, `enum`, and `struct`. Assigning one value type variable to another usually copies the value.

**Reference types** store a reference to an object in memory. Examples include `class`, `string`, arrays, delegates, and interfaces. Assigning one reference variable to another copies the reference, so both variables can point to the same object.

Value types usually live on the stack or inline inside other objects, while reference type objects live on the managed heap.

## Difference between ref, out and in

**ref** passes an argument by reference. The variable must be initialized before it is passed, and the method can read and modify it.

**out** passes an argument by reference for output. The variable does not need to be initialized before the call, but the called method must assign it before returning.

**in** passes an argument by reference as read-only. It avoids copying large value types while preventing the method from modifying the value.

Example:

```csharp
void Update(ref int x) { x++; }
void Create(out int x) { x = 10; }
void Read(in int x) { Console.WriteLine(x); }
```

## What is boxing and unboxing?

**Boxing** is converting a value type to `object` or an interface type. The value is copied into an object on the heap.

```csharp
int number = 10;
object boxed = number; // boxing
```

**Unboxing** is converting the boxed object back to the original value type.

```csharp
int unboxed = (int)boxed; // unboxing
```

Boxing and unboxing can affect performance if done frequently.

## Difference between abstract class and interface

An **abstract class** can contain implemented methods, abstract methods, fields, constructors, properties, and access modifiers. A class can inherit from only one abstract class.

An **interface** defines a contract that a type must implement. A class can implement multiple interfaces. Modern C# interfaces can contain default implementations, but they are still mainly used to define capabilities or contracts.

Use an abstract class when you want to share common base behavior. Use an interface when you want to define what a type can do.

## When would you choose an interface over an abstract class?

Choose an interface when different unrelated classes should follow the same contract, when multiple inheritance of behavior is not needed, or when you want loose coupling for dependency injection and testing.

Example: `IRepository`, `ILogger`, and `IPaymentGateway` are good interface candidates because many different implementations can exist.

## Explain method overloading and method overriding

**Method overloading** means having multiple methods with the same name but different parameter lists in the same class. It is compile-time polymorphism.

```csharp
void Print(string value) { }
void Print(int value) { }
```

**Method overriding** means redefining a base class virtual or abstract method in a derived class. It is runtime polymorphism.

```csharp
class Animal
{
    public virtual void Speak() { }
}

class Dog : Animal
{
    public override void Speak() { }
}
```

## Difference between virtual, override and new

**virtual** allows a base class method to be overridden in a derived class.

**override** replaces the base class virtual or abstract implementation.

**new** hides a member from the base class instead of overriding it. Which method gets called can depend on the reference type.

```csharp
class Base
{
    public virtual void Show() { }
}

class Derived : Base
{
    public override void Show() { }
}
```

Use `override` for polymorphic behavior. Use `new` only when you intentionally want to hide a base member.

## What is an immutable class? How would you create one?

An immutable class is a class whose state cannot be changed after the object is created.

To create one:

* Make the class properties read-only or `init`-only.
* Set values through the constructor.
* Avoid setters that mutate state.
* Use read-only collections or defensive copies for collection properties.
* Mark the class as `sealed` if inheritance could break immutability.

Example:

```csharp
public sealed class Person
{
    public string Name { get; }
    public int Age { get; }

    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}
```

## What are delegates, events, Func, Action and Predicate?

**Delegate** is a type-safe reference to a method.

```csharp
public delegate int Calculator(int a, int b);
```

**Event** is a wrapper around a delegate used for publish-subscribe communication. It allows a class to notify subscribers when something happens.

**Func** is a built-in generic delegate that returns a value. The last generic type is the return type.

```csharp
Func<int, int, int> add = (a, b) => a + b;
```

**Action** is a built-in generic delegate that returns `void`.

```csharp
Action<string> log = message => Console.WriteLine(message);
```

**Predicate<T>** is a delegate that takes one input and returns `bool`.

```csharp
Predicate<int> isEven = x => x % 2 == 0;
```

## Explain covariance and contravariance

Covariance and contravariance allow more flexible assignment of generic types and delegates while preserving type safety.

**Covariance** uses `out` and allows a more derived return type.

```csharp
IEnumerable<string> strings = new List<string>();
IEnumerable<object> objects = strings;
```

Because `string` is an `object`, `IEnumerable<string>` can be used as `IEnumerable<object>`.

**Contravariance** uses `in` and allows a less derived input type.

```csharp
Action<object> handleObject = obj => Console.WriteLine(obj);
Action<string> handleString = handleObject;
```

An action that can handle any `object` can also handle a `string`.

## What is reflection, and where have you used it?

Reflection is the ability to inspect metadata about types, methods, properties, attributes, and assemblies at runtime. It can also be used to create objects or invoke members dynamically.

Common uses include:

* Reading custom attributes.
* Building serializers and mappers.
* Dependency injection container scanning.
* Unit test discovery.
* Loading plugins or assemblies dynamically.

Example:

```csharp
Type type = typeof(Person);
var properties = type.GetProperties();
```

Reflection is powerful but should be used carefully because it can be slower and less type-safe than normal code.

## What is dependency injection?

Dependency injection is a design pattern where a class receives its dependencies from outside instead of creating them directly. It improves loose coupling, testability, and maintainability.

Example:

```csharp
public class OrderService
{
    private readonly ILogger _logger;

    public OrderService(ILogger logger)
    {
        _logger = logger;
    }
}
```

Here, `OrderService` depends on `ILogger`, but it does not create the logger itself.

## Explain transient, scoped and singleton lifetimes

**Transient** creates a new instance every time the service is requested. Use it for lightweight, stateless services.

**Scoped** creates one instance per scope. In ASP.NET Core, a scope is usually one HTTP request. Use it for services that should share state during a single request, such as Entity Framework `DbContext`.

**Singleton** creates one instance for the entire application lifetime. Use it for stateless, thread-safe services or shared caches.

Be careful not to inject a scoped service into a singleton, because the singleton lives longer than the scoped dependency.
