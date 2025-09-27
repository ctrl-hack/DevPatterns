# Observer Pattern

The Observer pattern defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

## Problem

You need to maintain consistency between related objects without making them tightly coupled. For example:
- Model-View architectures
- Event handling systems
- Reactive programming
- State management

## Solution

The Observer pattern involves:
1. **Subject**: Maintains a list of observers and notifies them of changes
2. **Observer**: Defines an interface for objects that should be notified
3. **ConcreteObserver**: Implements the Observer interface

## Implementation

### Basic Observer Pattern

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  
  addObserver(observer) {
    this.observers.push(observer);
  }
  
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notifyObservers(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  
  update(data) {
    console.log(`${this.name} received:`, data);
  }
}

// Usage
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');

subject.addObserver(observer1);
subject.addObserver(observer2);

subject.notifyObservers('Hello Observers!');
```

### Event-Driven Observer

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
  
  once(event, callback) {
    const onceWrapper = (data) => {
      callback(data);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }
}
```

### Modern JavaScript Observer (using Proxy)

```javascript
function createObservable(target, onChange) {
  return new Proxy(target, {
    set(obj, prop, value) {
      const oldValue = obj[prop];
      obj[prop] = value;
      onChange(prop, value, oldValue);
      return true;
    }
  });
}

// Usage
const data = createObservable({ name: '', age: 0 }, (prop, newVal, oldVal) => {
  console.log(`${prop} changed from ${oldVal} to ${newVal}`);
});

data.name = 'John'; // Triggers observer
data.age = 30;      // Triggers observer
```

## Use Cases

### ✅ Good Use Cases
- **UI Updates**: Model changes update multiple views
- **Event Systems**: DOM events, custom events
- **State Management**: Redux-like patterns
- **Real-time Updates**: WebSocket data updates
- **Logging**: Multiple loggers for different outputs
- **Caching**: Cache invalidation across systems

### ❌ Avoid When
- Simple one-to-one relationships
- Performance is critical (many observers)
- Complex dependency chains
- Memory leaks are a concern

## Pros and Cons

### Pros ✅
- Loose coupling between subject and observers
- Dynamic relationships (add/remove at runtime)
- Supports broadcast communication
- Follows Open/Closed Principle

### Cons ❌
- Can cause memory leaks if observers aren't removed
- Unexpected cascading updates
- Hard to debug complex notification chains
- Performance overhead with many observers

## Modern JavaScript Alternatives

### Custom Events
```javascript
// Using DOM events for decoupling
const eventBus = document.createElement('div');

// Observer
eventBus.addEventListener('userLogin', (event) => {
  console.log('User logged in:', event.detail);
});

// Subject
function loginUser(userData) {
  // Login logic...
  eventBus.dispatchEvent(new CustomEvent('userLogin', { 
    detail: userData 
  }));
}
```

### RxJS Observables
```javascript
import { Subject } from 'rxjs';

const subject = new Subject();

// Observer
subject.subscribe(data => console.log('Observer 1:', data));
subject.subscribe(data => console.log('Observer 2:', data));

// Emit data
subject.next('Hello RxJS!');
```

### Vue.js Reactivity
```javascript
import { ref, watchEffect } from 'vue';

const count = ref(0);

// Observer
watchEffect(() => {
  console.log('Count changed:', count.value);
});

// Subject
count.value = 1; // Triggers observer
```

## Implementation Patterns

### Push vs Pull

**Push Model** (Subject pushes data to observers):
```javascript
notifyObservers(data) {
  this.observers.forEach(observer => observer.update(data));
}
```

**Pull Model** (Observers pull data from subject):
```javascript
notifyObservers() {
  this.observers.forEach(observer => observer.update(this));
}
```

### Filtered Notifications
```javascript
class FilteredSubject {
  constructor() {
    this.observers = new Map();
  }
  
  addObserver(observer, filter = () => true) {
    this.observers.set(observer, filter);
  }
  
  notifyObservers(data) {
    this.observers.forEach((filter, observer) => {
      if (filter(data)) {
        observer.update(data);
      }
    });
  }
}
```

## Testing

Observer patterns are generally easy to test:

```javascript
describe('Observer Pattern', () => {
  let subject, observer1, observer2;
  
  beforeEach(() => {
    subject = new Subject();
    observer1 = new Observer('Test Observer 1');
    observer2 = new Observer('Test Observer 2');
  });
  
  test('should notify all observers', () => {
    const spy1 = jest.spyOn(observer1, 'update');
    const spy2 = jest.spyOn(observer2, 'update');
    
    subject.addObserver(observer1);
    subject.addObserver(observer2);
    
    subject.notifyObservers('test data');
    
    expect(spy1).toHaveBeenCalledWith('test data');
    expect(spy2).toHaveBeenCalledWith('test data');
  });
});
```

## Related Patterns

- **Model-View-Controller**: Uses Observer to keep views synchronized
- **Mediator**: Can use Observer for communication between components
- **Command**: Can use Observer to notify about command execution
- **State**: Can use Observer to notify about state changes

## Memory Management

Always remember to clean up observers to prevent memory leaks:

```javascript
class Component {
  constructor() {
    this.cleanup = [];
  }
  
  subscribe(subject, callback) {
    subject.addObserver(callback);
    this.cleanup.push(() => subject.removeObserver(callback));
  }
  
  destroy() {
    this.cleanup.forEach(fn => fn());
    this.cleanup = [];
  }
}
```

## Summary

The Observer pattern is fundamental for creating loosely coupled, event-driven systems. While modern JavaScript offers many alternatives (Promises, async/await, reactive frameworks), understanding the Observer pattern helps you recognize and implement these concepts effectively in your applications.