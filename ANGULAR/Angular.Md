# **Life Cycle**

# Async Pipe

# **BehaviorSubject**

A Subject or Observable doesn't have a current value. When a value is emitted, it is passed to subscribers and the Observable is done with it.

If you want to have a current value, use BehaviorSubject which is designed for exactly that purpose. BehaviorSubject keeps the last emitted value and emits it immediately to new subscribers.

It also has a method getValue() to get the current value.

# Observable and Observer

Pattern matching of message passing from publisher to subscriber

1. **Observable** is like a youtube channel of someone else. (( It uploads new videos(data) from time to time, **so it is a data source** for you))
2. Your youtube account is an **Observer**
3. Your youtube account **(Observer)** can only get notifications about whether someone else's youtube channel **(Observable)** has uploaded a new video **(has new data)** or made a livestream **(new event)** only if you have **subscribed** to that channel

**(Observer subscribes Observable to listen for new data/any event)**

where observable is a data source, subscribe is like a method/function , Observer is generally on your side

# @Input Binding

This decorator allows a parent component to pass data to a child component.

```
class ChildComponent
{
	@Input("someInputName"): propertyName: dataType
}

<app-child [someInputName]="valueOfParent">
</app-child>

```

# @Output Binding

This decorator, combined with `EventEmitter`, allows a child component to send data back to the parent component.

```
classComponent
{
	@Output("someOutputName") : eventName: EventEmitter = new EventEmitter();
}

<app-child (someOutputName)="methodName()">
</app-child>
```

# Rxjs Subject

Plain Observable unicast the values to observable

subject class multicast the values to all observer at-a-time.

Subject = Observable + Array of Observers

```
var mySubject = new Subject<dataType>();
subject.next(data);

mySubject.subscribe((data)=>{
//so something
})
```

# Rxjs BehaviourSubject

BehaviourSubject stores the current value which is lastly broadcast to the observer.

# ContentChild && ContentChildren

child to grandChild

# ElementRef

Represent plain html tags of the template

```
<div #refvariable></div>

class Component
{
	@ViewChild("refvariable"): variableName:ElementRef
}
```

# Observable

handling asynchronous or even synchronous events.

To start receiving values from an observable, you need to subscribe to it.

Subscriptions can be cancelled using the `unsubscribe` method, which helps in avoiding memory leaks.
