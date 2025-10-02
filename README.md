# Design Patterns
## Command Pattern

Command pattern is used to decouple objects
that execute a certain task from the object that call the method.

Normally when you create class it would contain methods that accomplish certain task.
But there are downsides to invoking  the methods directly on the instantiated object. 
This is the case where we may want to rename methods later, but in a large code base
it would be tedious work to rename all the methods in all instances of that class.
So to avoid that issue we can use command pattern so that object that is instantiated
from that class and method function are decoupled. For that we will need two separate 
class: one for creating command and one for the main class.

### Pros
The command pattern make decoupling methods from the object that executes the operation
possible which give more control if the commands have limited lifespan, should be queued
and executed at specific times.

### Cons
The use cases for the command pattern are quite limited and often adds unnecessary boilerplate
to an application.


