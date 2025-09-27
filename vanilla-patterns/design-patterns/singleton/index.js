/**
 * Singleton Pattern Implementation
 * 
 * Ensures a class has only one instance and provides global access to it.
 */

// Class-based Singleton
class Singleton {
  constructor() {
    // Check if instance already exists
    if (Singleton.instance) {
      return Singleton.instance;
    }
    
    // Initialize the instance
    this.data = [];
    this.createdAt = new Date();
    
    // Store the instance
    Singleton.instance = this;
    return this;
  }
  
  addData(item) {
    this.data.push(item);
  }
  
  getData() {
    return this.data;
  }
  
  getCreationTime() {
    return this.createdAt;
  }
  
  // Static method to get instance
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

// Functional Singleton using IIFE (Immediately Invoked Function Expression)
const FunctionalSingleton = (function() {
  let instance;
  
  function createInstance() {
    // Private variables and methods
    let privateData = [];
    
    return {
      // Public methods
      addItem(item) {
        privateData.push(item);
      },
      
      getItems() {
        return [...privateData]; // Return copy to prevent direct mutation
      },
      
      getItemCount() {
        return privateData.length;
      },
      
      clearItems() {
        privateData = [];
      }
    };
  }
  
  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

// Module-based Singleton (ES6 modules are singletons by nature)
let moduleInstance = null;

class ModuleSingleton {
  constructor() {
    if (moduleInstance) {
      return moduleInstance;
    }
    
    this.config = {};
    this.initialized = false;
    moduleInstance = this;
    return this;
  }
  
  init(config) {
    if (!this.initialized) {
      this.config = { ...config };
      this.initialized = true;
    }
    return this;
  }
  
  getConfig(key) {
    return key ? this.config[key] : this.config;
  }
  
  setConfig(key, value) {
    if (this.initialized) {
      this.config[key] = value;
    }
    return this;
  }
}

// Export the class (the module system ensures singleton behavior)
export { Singleton, FunctionalSingleton, ModuleSingleton };

// Default export for main singleton
export default Singleton;