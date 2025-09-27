# Singleton Pattern

The Singleton pattern ensures that a class has only one instance and provides a global point of access to it.

## Problem

Sometimes you need exactly one instance of a class. For example:
- Database connection pools
- Logger instances
- Configuration objects
- Cache managers

## Solution

The Singleton pattern solves this by:
1. Making the constructor private
2. Providing a static method that returns the single instance
3. Storing the instance in a static variable

## Implementation

### Basic JavaScript Singleton

```javascript
class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    
    Singleton.instance = this;
    this.data = [];
    return this;
  }
  
  addData(item) {
    this.data.push(item);
  }
  
  getData() {
    return this.data;
  }
}

// Usage
const singleton1 = new Singleton();
const singleton2 = new Singleton();

console.log(singleton1 === singleton2); // true
```

### ES6 Module Singleton

```javascript
let instance = null;

class DatabaseConnection {
  constructor() {
    if (instance) {
      return instance;
    }
    
    this.connection = this.connect();
    instance = this;
    return this;
  }
  
  connect() {
    console.log('Creating database connection...');
    return { connected: true, id: Date.now() };
  }
  
  query(sql) {
    console.log(`Executing query: ${sql}`);
    return { results: [] };
  }
}

export default DatabaseConnection;
```

### Functional Singleton

```javascript
const createSingleton = (function() {
  let instance;
  
  function createInstance() {
    return {
      data: [],
      addItem(item) {
        this.data.push(item);
      },
      getItems() {
        return this.data;
      }
    };
  }
  
  return function() {
    if (!instance) {
      instance = createInstance();
    }
    return instance;
  };
})();

// Usage
const singleton1 = createSingleton();
const singleton2 = createSingleton();

console.log(singleton1 === singleton2); // true
```

## Use Cases

### ✅ Good Use Cases
- **Configuration objects**: Application settings that should be consistent
- **Logging**: Central logging system
- **Database connections**: Connection pools and managers
- **Caches**: Application-wide caching systems
- **State management**: Global application state

### ❌ Avoid When
- You need multiple instances
- Testing becomes difficult (hard to mock)
- It creates hidden dependencies
- It violates single responsibility principle

## Pros and Cons

### Pros ✅
- Guaranteed single instance
- Global access point
- Lazy initialization
- Memory efficient

### Cons ❌
- Difficult to test (global state)
- Hidden dependencies
- Violates Single Responsibility Principle
- Can become a "god object"
- Makes code tightly coupled

## Modern Alternatives

In modern JavaScript, consider these alternatives:

### ES6 Modules
```javascript
// config.js
export const config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

// Modules are singletons by nature
```

### Dependency Injection
```javascript
class UserService {
  constructor(database, logger) {
    this.database = database;
    this.logger = logger;
  }
}

// Inject dependencies instead of using global singletons
```

## Testing

Singletons can be difficult to test. Here are some strategies:

```javascript
class TestableConfig {
  constructor() {
    if (TestableConfig.instance && !process.env.NODE_ENV === 'test') {
      return TestableConfig.instance;
    }
    
    this.settings = {};
    TestableConfig.instance = this;
    return this;
  }
  
  // Add reset method for testing
  static reset() {
    TestableConfig.instance = null;
  }
}

// In tests
afterEach(() => {
  TestableConfig.reset();
});
```

## Related Patterns

- **Factory Pattern**: Often used together to control object creation
- **Abstract Factory**: May use Singleton to ensure single factory instance
- **Builder Pattern**: The director can be a Singleton

## Summary

The Singleton pattern ensures single instance creation but comes with trade-offs in testability and coupling. In modern JavaScript development, consider ES6 modules or dependency injection as alternatives that provide similar benefits with fewer drawbacks.