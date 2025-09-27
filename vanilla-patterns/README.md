# Vanilla JavaScript Patterns

This section contains fundamental patterns that work in any JavaScript environment, without framework dependencies.

## 🎯 Design Patterns

Classic software design patterns help solve common problems in software design. These patterns provide tested, proven development paradigms that can make your code more flexible, reusable, and maintainable.

### Pattern Categories

#### Creational Patterns
Deal with object creation mechanisms, trying to create objects in a manner suitable to the situation.

- **[Singleton](./design-patterns/singleton)** - Ensure a class has only one instance
- **[Factory](./design-patterns/factory)** - Create objects without specifying their exact classes
- **[Abstract Factory](./design-patterns/abstract-factory)** - Create families of related objects
- **[Builder](./design-patterns/builder)** - Construct complex objects step by step
- **[Prototype](./design-patterns/prototype)** - Clone objects using a prototypical instance

#### Structural Patterns
Deal with object composition and typically identify simple ways to realize relationships between entities.

- **[Adapter](./design-patterns/adapter)** - Allow incompatible interfaces to work together
- **[Bridge](./design-patterns/bridge)** - Separate abstraction from implementation
- **[Composite](./design-patterns/composite)** - Compose objects into tree structures
- **[Decorator](./design-patterns/decorator)** - Add behavior to objects dynamically
- **[Facade](./design-patterns/facade)** - Provide a simplified interface
- **[Flyweight](./design-patterns/flyweight)** - Share efficiently to support large numbers of objects
- **[Proxy](./design-patterns/proxy)** - Provide a placeholder/surrogate for another object

#### Behavioral Patterns
Focus on communication between objects and the assignment of responsibilities.

- **[Chain of Responsibility](./design-patterns/chain-of-responsibility)** - Pass requests along a chain
- **[Command](./design-patterns/command)** - Encapsulate requests as objects
- **[Iterator](./design-patterns/iterator)** - Access elements sequentially
- **[Mediator](./design-patterns/mediator)** - Define how objects interact
- **[Memento](./design-patterns/memento)** - Capture and restore object states
- **[Observer](./design-patterns/observer)** - Define a one-to-many dependency
- **[State](./design-patterns/state)** - Alter behavior when internal state changes
- **[Strategy](./design-patterns/strategy)** - Define a family of algorithms
- **[Template Method](./design-patterns/template-method)** - Define algorithm skeleton
- **[Visitor](./design-patterns/visitor)** - Define operations on object structures

## ⚡ Performance Patterns

Modern web applications need to be fast and efficient. These patterns help optimize loading, bundling, and runtime performance.

- **[Bundling](./performance-patterns/bundling)** - Combine multiple files into single bundles
- **[Code Splitting](./performance-patterns/code-splitting)** - Split code into smaller chunks
- **[Tree Shaking](./performance-patterns/tree-shaking)** - Remove unused code
- **[Preload](./performance-patterns/preload)** - Load critical resources early
- **[Prefetch](./performance-patterns/prefetch)** - Load resources for next navigation
- **[Import on Visibility](./performance-patterns/import-on-visibility)** - Load when element becomes visible
- **[Import on Interaction](./performance-patterns/import-on-interaction)** - Load on user interaction
- **[Route-based Splitting](./performance-patterns/route-based-splitting)** - Split by application routes
- **[Bundle Splitting](./performance-patterns/bundle-splitting)** - Optimize bundle distribution

## Getting Started

1. Start with a simple pattern like **Singleton** to understand the basics
2. Move to **Observer** to learn about event-driven architecture
3. Explore **Factory** patterns for object creation
4. Learn performance patterns to optimize your applications

Each pattern includes:
- Detailed explanation
- JavaScript implementation
- Practical examples  
- Use cases and benefits
- Common pitfalls to avoid