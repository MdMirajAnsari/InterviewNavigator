## **METHOD OVERLOADING AND METHOD OVERRIDING**

CT- Method Overloading

RT - Method Overriding

Method overloading deals with the notion of having two or more methods in the same class with the same name but different arguments.

Return Type is not considered as part of Method Overloading

void foo(int a)
void foo(int a, float b)

```csharp
using System;


public class Program
{
    // Method overload for a single integer parameter
    public void Print(int a)
    {
        Console.WriteLine($"Integer: {a}");
    }

    // Method overload for an integer and a float parameter
    public void Print(int a, float b)
    {
        Console.WriteLine($"Integer: {a}, Float: {b}");
    }

    // Method overload for a single string parameter
    public void Print(string message)
    {
        Console.WriteLine($"Message: {message}");
    }

    public static void Main(string[] args)
    {
        Program ex = new Program();

        ex.Print(5);                // Calls Print(int a)
        ex.Print(5, 3.14f);         // Calls Print(int a, float b)
        ex.Print("Hello World!");   // Calls Print(string message)
    }
}

```

Method overriding means having two methods with the same arguments, but different implementations. One of them would exist in the parent class, while another will be in the derived, or child class.

```csharp
public class BaseClass
{
    public virtual void Display()
    {
        Console.WriteLine("Display from BaseClass");
    }
}public class DerivedClass : BaseClass
{
    public override void Display()
    {
        Console.WriteLine("Display from DerivedClass");
    }
}class Program
{
    static void Main()
    {
        BaseClass obj = new DerivedClass();
        obj.Display();   // Calls Display() from DerivedClass
    }
}
```

## **Dynamic Polymorphism or Runtime Polymorphism**

The function call is bounded to the class at the time of compilation, if the function is going to be executed by CLR from a different class at run-time rather than the class bounded at compilation-time, then it is called Run-Time Polymorphism

```csharp
Class1 obj1 = new Class2();
obj1.show(); 
```

## **Static Polymorphism or Compile Time Polymorphism**

The function call is bounded to the class at the time of compilation, if the function is going to be executed from the same bounded class at run-time, then it is called Compile-Time Polymorphism

```csharp
Class1 obj1 = new Class1();
obj1.show();
```

## Struct and Class

A structure is a value type so it is stored on the stack, but a class is a reference type and is stored on the heap.

A structure doesn't support inheritance, and polymorphism, but a class supports both.

By default, all the struct members are public but class members are by default private in nature.

As a structure is a value type, we can't assign null to a struct object, but it is not the case for a class.

## Difference between the Equality Operator (==) and Equals() Method in C#

* **==** Operator**: This is a comparison operator used to check if two things are "equal." For reference types (like objects), it usually checks if both variables point to the **same memory location** (reference equality). For value types (like **int**, **double**), it checks if the values are the same.**
* **Equals()** Method**: This is a method defined in the **Object** class that every .NET type inherits. By default, it checks reference equality for reference types (like **==**), but you can override it to compare the **actual content** of objects (like the values of their properties).**

## IMPLICITLY AND EXPLICITLY VARIABLE

**implicitly**

var word = "ABC";

var num = 5;

**explicitly**

string word ="ABC";

int num =5;

* **Implicitly Declared Variables** (using **var**):
  * **You use the **var** keyword, and the C# compiler **infers** (guesses) the type of the variable based on the value assigned to it.**
  * **The type is determined at **compile time**, so it’s still strongly typed (not dynamic).**
  * **Example: **var word = "ABC";** → The compiler infers **word** is a **string** because **"ABC"** is a string literal.**
* **Explicitly Declared Variables**:
  * **You explicitly specify the type of the variable (e.g., **string**, **int**) when declaring it.**
  * **You tell the compiler exactly what type the variable is, leaving no room for inference.**
  * **Example: **string word = "ABC";** → You explicitly say **word** is a **string**.**

## DATA HIDING

making the members of a class non-public

```csharp
using System;

class BaseClass{

	public virtual void Method1(){
	Console.WriteLine("BaseClass M1");
	}

	public virtual void Method2(){
	Console.WriteLine("BaseClass M2");
	}
}

class DerivedClass: BaseClass{
	public override void Method1(){
	Console.WriteLine("DerivedClass M1");
	}

	public new void Method2(){
	Console.WriteLine("DerivedClass M2");
	}
}



public class Program
{
	public static void Main()
	{
		BaseClass b = new BaseClass();
		b.Method1(); //BaseClass M1
		b.Method2(); //BaseClass M2

		BaseClass c = new DerivedClass();
		c.Method1(); //DerivedClass M1
		c.Method2(); //BaseClass M2

		DerivedClass k = new DerivedClass();
		k.Method1(); //DerivedClass M1
		k.method2(); //DerivedClass M2

	}
}
```

## ACCESS MODIFIER

Protected:- members can be used in the derived classess, but they can't be used outside.


## Delagate

A delagate is pointer to a function

```csharp
using System;

public class Program
{
    // Step 1: Declare a delegate type
    public delegate void MyDelegate(string message);

    // Method 1
    public static void MethodA(string msg)
    {
        Console.WriteLine("MethodA called with: " + msg);
    }

    // Method 2
    public static void MethodB(string msg)
    {
        Console.WriteLine("MethodB called with: " + msg);
    }

    public static void Main()
    {
        // Step 2: Create delegate instance pointing to MethodA
        MyDelegate del = MethodA;
        del("Hello");

        // Step 3: Reassign to MethodB
        del = MethodB;
        del("World");
    }
}

```

## Multicast Delegate

```csharp
using System;

public class Program
{
    public delegate void MyDelegate(string message);

    public static void MethodA(string msg)
    {
        Console.WriteLine("MethodA: " + msg);
    }

    public static void MethodB(string msg)
    {
        Console.WriteLine("MethodB: " + msg);
    }

    public static void Main()
    {
        MyDelegate del = MethodA;
        del += MethodB;   // Adding another method

        del("Multicast Delegate Example");

        // Removing MethodA
        del -= MethodA;
        del("Only MethodB is called now");
    }
}

```

## Events

An **event** is a wrapper around a delegate.

It provides a **publisher-subscriber** model.

```csharp
using System;

public class Publisher
{
    // Step 1: Declare a delegate
    public delegate void Notify(string message);

    // Step 2: Declare an event based on that delegate
    public event Notify OnPublish;

    public void PublishMessage(string msg)
    {
        Console.WriteLine("Publisher: Publishing message...");
        OnPublish?.Invoke(msg); // Invoke event if not null
    }
}

public class Subscriber
{
    public void ReceiveMessage(string msg)
    {
        Console.WriteLine("Subscriber received: " + msg);
    }
}

public class Program
{
    public static void Main()
    {
        Publisher pub = new Publisher();
        Subscriber sub1 = new Subscriber();
        Subscriber sub2 = new Subscriber();

        // Step 3: Subscribers subscribe to the event
        pub.OnPublish += sub1.ReceiveMessage;
        pub.OnPublish += sub2.ReceiveMessage;

        pub.PublishMessage("Hello Subscribers!");

        // Step 4: Unsubscribe one subscriber
        pub.OnPublish -= sub2.ReceiveMessage;

        pub.PublishMessage("Only Sub1 will receive this");
    }
}

```

## Generic Delegates (Built-in)

## (a) **Func<T, TResult>**

* Returns a value.
* Can have 0 to 16 input parameters.

```csharp
Func<int, int, int> add = (a, b) => a + b;
Console.WriteLine(add(5, 10));  // 15

```


## (b) **Action`<T>`**

* Does **not return** a value.
* Can have 0 to 16 input parameters.
* ```csharp
  Action<string> greet = name => Console.WriteLine("Hello " + name);
  greet("Miraj");

  ```


## (c) **Predicate`<T>`**

* Returns a **bool** only.
* Used for conditions/filters.
  ```csharp
  Predicate<int> isEven = num => num % 2 == 0;
  Console.WriteLine(isEven(10));  // True

  ```
