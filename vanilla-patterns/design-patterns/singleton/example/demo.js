/**
 * Singleton Pattern Examples
 * 
 * Practical examples of using the Singleton pattern
 */

import { Singleton, FunctionalSingleton, ModuleSingleton } from '../index.js';

// Example 1: Basic Singleton Usage
console.log('=== Example 1: Basic Singleton ===');

const singleton1 = new Singleton();
const singleton2 = new Singleton();

console.log('Are instances equal?', singleton1 === singleton2); // true

singleton1.addData('First item');
singleton2.addData('Second item');

console.log('Data from singleton1:', singleton1.getData());
console.log('Data from singleton2:', singleton2.getData());

// Example 2: Using Static Method
console.log('\n=== Example 2: Static Method ===');

const singleton3 = Singleton.getInstance();
const singleton4 = Singleton.getInstance();

console.log('Static instances equal?', singleton3 === singleton4); // true
console.log('Same as previous instances?', singleton3 === singleton1); // true

// Example 3: Functional Singleton
console.log('\n=== Example 3: Functional Singleton ===');

const funcSingleton1 = FunctionalSingleton.getInstance();
const funcSingleton2 = FunctionalSingleton.getInstance();

console.log('Functional instances equal?', funcSingleton1 === funcSingleton2); // true

funcSingleton1.addItem('Item 1');
funcSingleton2.addItem('Item 2');

console.log('Items:', funcSingleton1.getItems());
console.log('Item count:', funcSingleton2.getItemCount());

// Example 4: Configuration Singleton
console.log('\n=== Example 4: Configuration Singleton ===');

const config1 = new ModuleSingleton();
const config2 = new ModuleSingleton();

console.log('Config instances equal?', config1 === config2); // true

config1.init({
  apiUrl: 'https://api.example.com',
  timeout: 5000,
  retries: 3
});

console.log('Config from instance 1:', config2.getConfig());
config2.setConfig('timeout', 10000);
console.log('Updated timeout:', config1.getConfig('timeout'));

// Example 5: Database Connection Simulator
console.log('\n=== Example 5: Database Connection ===');

class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    
    this.connectionId = Math.random().toString(36).substr(2, 9);
    this.connected = false;
    this.queries = [];
    
    DatabaseConnection.instance = this;
    return this;
  }
  
  connect() {
    if (!this.connected) {
      console.log(`Connecting to database with ID: ${this.connectionId}`);
      this.connected = true;
    } else {
      console.log('Already connected to database');
    }
    return this;
  }
  
  disconnect() {
    if (this.connected) {
      console.log('Disconnecting from database');
      this.connected = false;
    }
    return this;
  }
  
  query(sql) {
    if (!this.connected) {
      throw new Error('Not connected to database');
    }
    
    this.queries.push({ sql, timestamp: new Date() });
    console.log(`Executing: ${sql}`);
    return { success: true, results: [] };
  }
  
  getConnectionInfo() {
    return {
      id: this.connectionId,
      connected: this.connected,
      totalQueries: this.queries.length
    };
  }
}

const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();

console.log('Database instances equal?', db1 === db2); // true

db1.connect();
db2.query('SELECT * FROM users');
db1.query('SELECT * FROM products');

console.log('Connection info:', db2.getConnectionInfo());

// Example 6: Logger Singleton
console.log('\n=== Example 6: Logger Singleton ===');

class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    
    this.logs = [];
    this.level = 'INFO';
    Logger.instance = this;
    return this;
  }
  
  setLevel(level) {
    this.level = level;
    return this;
  }
  
  log(message, level = 'INFO') {
    const logEntry = {
      message,
      level,
      timestamp: new Date().toISOString(),
      id: this.logs.length + 1
    };
    
    this.logs.push(logEntry);
    console.log(`[${logEntry.timestamp}] ${level}: ${message}`);
    return this;
  }
  
  info(message) {
    return this.log(message, 'INFO');
  }
  
  warn(message) {
    return this.log(message, 'WARN');
  }
  
  error(message) {
    return this.log(message, 'ERROR');
  }
  
  getLogs(level = null) {
    return level ? 
      this.logs.filter(log => log.level === level) : 
      this.logs;
  }
}

const logger1 = new Logger();
const logger2 = new Logger();

console.log('Logger instances equal?', logger1 === logger2); // true

logger1.info('Application started');
logger2.warn('This is a warning');
logger1.error('Something went wrong');

console.log(`Total logs: ${logger2.getLogs().length}`);
console.log(`Error logs: ${logger1.getLogs('ERROR').length}`);