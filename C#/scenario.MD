## when to use abstract class and when we go for interface when to choose

Choose an interface when:

* You only need to define what a class must do.
* Classes may have completely different implementations.
* You need multiple inheritance of contracts.
* You want loose coupling and dependency injection.
* You want easy unit testing and mocking.


Choose an abstract class when:

* Classes have a strong parent-child relationship.
* You need common fields, properties, or constructors.
* You want to provide shared method implementations.
* You want protected members.
* You need to force derived classes to implement some methods while reusing others.
