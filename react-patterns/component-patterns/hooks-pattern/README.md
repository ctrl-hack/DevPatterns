# Hooks Pattern

React Hooks allow you to use state and other React features in functional components, providing a more direct API to the React concepts you already know.

## Problem

Before Hooks, you needed class components to:
- Use state
- Use lifecycle methods
- Share logic between components
- Access React features

This led to:
- Verbose class syntax
- Confusing `this` binding
- Difficult component logic reuse
- Complex component hierarchies

## Solution

Hooks provide a way to:
- Use state in functional components
- Share logic between components
- Access all React features
- Create cleaner, more readable code

## Built-in Hooks

### useState
Manage state in functional components:

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

### useEffect
Handle side effects and lifecycle events:

```javascript
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]); // Dependency array
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### useContext
Access context values without nested consumers:

```javascript
import React, { useContext } from 'react';

const ThemeContext = React.createContext();

function Button() {
  const theme = useContext(ThemeContext);
  
  return (
    <button style={{ backgroundColor: theme.bg, color: theme.color }}>
      Click me
    </button>
  );
}

function App() {
  const theme = { bg: 'blue', color: 'white' };
  
  return (
    <ThemeContext.Provider value={theme}>
      <Button />
    </ThemeContext.Provider>
  );
}
```

## Custom Hooks

Create reusable logic by extracting it into custom hooks:

### useCounter Hook
```javascript
import { useState, useCallback } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
}

// Usage
function CounterComponent() {
  const { count, increment, decrement, reset } = useCounter(10);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### useFetch Hook
```javascript
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url, {
          signal: abortController.signal
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
    return () => abortController.abort();
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserList() {
  const { data: users, loading, error } = useFetch('/api/users');
  
  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### useLocalStorage Hook
```javascript
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

## Hook Rules

1. **Only call Hooks at the top level** - Don't call Hooks inside loops, conditions, or nested functions
2. **Only call Hooks from React functions** - Call from React function components or custom Hooks

```javascript
// ❌ Wrong - conditional hook
function WrongComponent({ condition }) {
  if (condition) {
    const [count, setCount] = useState(0); // Don't do this!
  }
}

// ✅ Correct - hook at top level
function CorrectComponent({ condition }) {
  const [count, setCount] = useState(0);
  
  if (condition) {
    // Use the hook result conditionally
    return <div>Count: {count}</div>;
  }
  
  return <div>No condition</div>;
}
```

## Advanced Patterns

### useReducer for Complex State
```javascript
import React, { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.step };
    case 'reset':
      return initialState;
    default:
      throw new Error('Unknown action type');
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <p>Step: {state.step}</p>
      <input 
        type="number" 
        value={state.step} 
        onChange={(e) => dispatch({ type: 'setStep', step: Number(e.target.value) })}
      />
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
```

### useCallback and useMemo for Performance
```javascript
import React, { useState, useMemo, useCallback } from 'react';

function ExpensiveComponent({ items, filter }) {
  const [count, setCount] = useState(0);
  
  // Memoize expensive calculation
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => item.name.includes(filter));
  }, [items, filter]);
  
  // Memoize callback to prevent child re-renders
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
      <ItemList items={filteredItems} />
    </div>
  );
}
```

## Use Cases

### ✅ Good Use Cases
- **State management** in functional components
- **Side effects** (API calls, subscriptions, DOM manipulation)
- **Logic reuse** across components
- **Context consumption** without render props
- **Performance optimization** with memoization

### ❌ Avoid When
- Class components work better for your use case
- You need complex lifecycle methods (rare)
- Team is not familiar with functional programming concepts

## Pros and Cons

### Pros ✅
- Simpler, more readable code
- Better logic reuse with custom hooks
- No `this` binding confusion
- Easier to test
- Better TypeScript integration
- Smaller bundle size

### Cons ❌
- Learning curve for class component developers
- Easy to create infinite loops in useEffect
- Performance pitfalls with dependencies
- Mental model shift required

## Migration from Class Components

### Class Component
```javascript
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: true };
  }
  
  async componentDidMount() {
    const user = await fetchUser(this.props.userId);
    this.setState({ user, loading: false });
  }
  
  render() {
    if (this.state.loading) return <div>Loading...</div>;
    return <div>{this.state.user.name}</div>;
  }
}
```

### Hooks Version
```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUser(userId).then(user => {
      setUser(user);
      setLoading(false);
    });
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

## Testing Hooks

### Testing Custom Hooks
```javascript
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });
  
  it('should increment count', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

## Related Patterns

- **Custom Hooks**: Extract and reuse stateful logic
- **Provider Pattern**: Often used with useContext
- **Compound Component**: Can be implemented with hooks
- **State Reducer**: useReducer for complex state management

## Summary

Hooks represent a paradigm shift in React development, enabling:
- Functional components with full React capabilities  
- Better code reuse through custom hooks
- Simpler, more readable component code
- Improved testing and TypeScript experience

The Hooks pattern has become the standard for modern React development, replacing class components in most use cases.