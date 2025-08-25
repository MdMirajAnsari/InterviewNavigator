## **Difference between Class and Objects in C#**

a Class is a template or blueprint for creating Objects, and every Object in C# must belong to a Class

# Constructor

It is a special method present inside a class responsible for initializing the variables of that class.

The constructor method does not return any value.

The Constructors are responsible for two things. One is the object initialization and the other one is memory allocation. The role of the new keyword is to create the object and the role of the constructor is to initialize the variables.

The compiler defined this constructor for us. And we call this an Implicit Constructor. And if we defined the same thing, then it is called an explicit constructor.

If we don’t have a constructor, then we cannot create an instance of the class.

Every variable we declared inside a class and every field we declared inside a class has a default value. All numeric types are initialized with 0, Boolean types initialized with false, and string and object types initialized with null. For a better understanding, please have a look at the below image.

the initialization is performed for each and all variables present in the class and this is the responsibility of the constructor. That is why a constructor is very important for us inside a class.

**Static Constructor**

In a static constructor, you cannot use any access specifiers like public, private, and protected.

Static Constructors are responsible for initializing static variables and these constructors are never called explicitly. They are called Implicitly and moreover, these constructors are the first to execute in any class

Static Constructors execute immediately once the execution of a class start and moreover, it is the first block of code to run under a class whereas non-static constructors execute only after creating the instance of the class as well as each and every time the instance of the class is created.

Static Constructors cannot be parameterized, so overloading of the static constructors is not possible in C#.

**private constructor**

When a class contains a private constructor then we cannot create an object for the class outside of the class. So, private constructors are used to create an object for the class within the same class. Generally, private constructors are used in the Remoting concept.

We need to use the private constructor in C# when the class contains only static members.

##### **When to use Private Constructors in C#?**

private constructor is used to implement Singleton Design Pattern.

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

* Generation 2 [Long-Lived Generation]
* Generation 1 [Survival Generation]
* Generation 0 [Short-Lived Generation]

# IDisposable

The "IDisposable" interface of "System" namespace, has a method called "Dispose", which is used to close un-managed resources that are created during the life-time of the object.

#### Using Declaration

You can prefix "using" keyword before the local variable declaration, in order to call "Dispose" method when that variable goes out of scope.

**Creating object**

<pre class="prettyprint linenums prettyprinted" role="presentation"><ol class="linenums"><li class="L0"><p><span class="kwd">public</span><span class="pln"></span><span class="kwd">void</span><span class="pln"></span><span class="typ">Method</span><span class="pun">(</span><span class="pln"></span><span class="pun">)</span></p></li><li class="L1" data-node-id="20240811143924-8sk6xs9"><p><span class="pun">{</span></p></li><li class="L2"><p><span class="pln"></span><span class="kwd">using</span><span class="pln"></span><span class="typ">ClassName</span><span class="pln"> referenceVariable </span><span class="pun">=</span><span class="pln"></span><span class="kwd">new</span><span class="pln"></span><span class="typ">ClassName</span><span class="pun">(</span><span class="pln"></span><span class="pun">);</span></p></li><li class="L3" data-node-id="20240811143924-9hjeuzn"><p><span class="pln"> </span></p></li><li class="L4"><p><span class="pln"></span><span class="com">//do work here</span></p></li><li class="L5" data-node-id="20240811143924-yfl589q"><p><span class="pln"> </span></p></li><li class="L6"><p><span class="pun">}</span><span class="pln"></span><span class="com">//Dispose will be called automatically here</span></p></li></ol></pre>

# Destructor

Destructor is a special method of the class, which is used to close un-managed resources (such as database connections and file connections), that are opened during the class execution.

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

## Explain the difference between const and readonly.

## What is thread pooling in C#?

## What is a race condition in multithreading?

## Thread and Task
