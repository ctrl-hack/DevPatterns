/**
 * Observer Pattern Implementation
 * 
 * Defines a one-to-many dependency between objects so that when one object 
 * changes state, all its dependents are notified automatically.
 */

// Basic Observer Pattern
class Subject {
  constructor() {
    this.observers = [];
    this.state = null;
  }
  
  // Add observer to the list
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }
  
  // Remove observer from the list
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  // Notify all observers of state change
  notifyObservers(data = null) {
    this.observers.forEach(observer => {
      observer.update(data || this.state, this);
    });
  }
  
  // Set state and notify observers
  setState(state) {
    this.state = state;
    this.notifyObservers();
  }
  
  getState() {
    return this.state;
  }
  
  getObserverCount() {
    return this.observers.length;
  }
}

// Observer interface
class Observer {
  constructor(name) {
    this.name = name;
  }
  
  update(data, subject) {
    console.log(`${this.name} received update:`, data);
  }
}

// Event Emitter Pattern (Modern Observer)
class EventEmitter {
  constructor() {
    this.events = new Map();
  }
  
  // Subscribe to an event
  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(callback);
    
    // Return unsubscribe function
    return () => this.off(event, callback);
  }
  
  // Unsubscribe from an event
  off(event, callback) {
    if (this.events.has(event)) {
      const callbacks = this.events.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
      
      // Clean up empty event arrays
      if (callbacks.length === 0) {
        this.events.delete(event);
      }
    }
  }
  
  // Subscribe to an event only once
  once(event, callback) {
    const onceWrapper = (...args) => {
      callback(...args);
      this.off(event, onceWrapper);
    };
    return this.on(event, onceWrapper);
  }
  
  // Emit an event to all subscribers
  emit(event, ...args) {
    if (this.events.has(event)) {
      // Create a copy to avoid issues if callbacks modify the array
      const callbacks = [...this.events.get(event)];
      callbacks.forEach(callback => {
        try {
          callback(...args);
        } catch (error) {
          console.error(`Error in event handler for "${event}":`, error);
        }
      });
    }
  }
  
  // Get list of events
  eventNames() {
    return Array.from(this.events.keys());
  }
  
  // Get number of listeners for an event
  listenerCount(event) {
    return this.events.has(event) ? this.events.get(event).length : 0;
  }
  
  // Remove all listeners
  removeAllListeners(event = null) {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

// Observable with Proxy (Modern JavaScript)
function createObservable(target, handler = {}) {
  const {
    get: getHandler = () => {},
    set: setHandler = () => {},
    deleteProperty: deleteHandler = () => {}
  } = handler;
  
  return new Proxy(target, {
    get(obj, prop) {
      getHandler(prop, obj[prop]);
      return obj[prop];
    },
    
    set(obj, prop, value) {
      const oldValue = obj[prop];
      obj[prop] = value;
      setHandler(prop, value, oldValue);
      return true;
    },
    
    deleteProperty(obj, prop) {
      const oldValue = obj[prop];
      delete obj[prop];
      deleteHandler(prop, oldValue);
      return true;
    }
  });
}

// Filtered Observer (only notifies when condition is met)
class FilteredSubject extends Subject {
  constructor() {
    super();
    this.observerFilters = new Map();
  }
  
  addObserver(observer, filter = () => true) {
    super.addObserver(observer);
    this.observerFilters.set(observer, filter);
  }
  
  removeObserver(observer) {
    super.removeObserver(observer);
    this.observerFilters.delete(observer);
  }
  
  notifyObservers(data = null) {
    this.observers.forEach(observer => {
      const filter = this.observerFilters.get(observer);
      if (filter && filter(data || this.state)) {
        observer.update(data || this.state, this);
      }
    });
  }
}

// Async Observer (for handling async operations)
class AsyncSubject extends Subject {
  async notifyObserversAsync(data = null) {
    const promises = this.observers.map(async observer => {
      try {
        await observer.updateAsync(data || this.state, this);
      } catch (error) {
        console.error('Error in async observer:', error);
      }
    });
    
    await Promise.all(promises);
  }
  
  async setStateAsync(state) {
    this.state = state;
    await this.notifyObserversAsync();
  }
}

class AsyncObserver extends Observer {
  async updateAsync(data, subject) {
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log(`${this.name} async update:`, data);
  }
  
  // Fallback for sync calls
  update(data, subject) {
    this.updateAsync(data, subject);
  }
}

export {
  Subject,
  Observer,
  EventEmitter,
  createObservable,
  FilteredSubject,
  AsyncSubject,
  AsyncObserver
};

export default Subject;