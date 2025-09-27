# DevPatterns

A comprehensive collection of development patterns inspired by [patterns.dev](https://www.patterns.dev/), organized from vanilla JavaScript fundamentals to advanced React patterns.

## 📚 Pattern Categories

### 🟨 Vanilla Patterns
Start your journey with fundamental patterns that work in any JavaScript environment.

#### 🎯 Design Patterns
Classic software design patterns implemented in vanilla JavaScript:
- **Creational**: [Singleton](./vanilla-patterns/design-patterns/singleton), [Factory](./vanilla-patterns/design-patterns/factory), [Abstract Factory](./vanilla-patterns/design-patterns/abstract-factory), [Builder](./vanilla-patterns/design-patterns/builder), [Prototype](./vanilla-patterns/design-patterns/prototype)
- **Structural**: [Adapter](./vanilla-patterns/design-patterns/adapter), [Bridge](./vanilla-patterns/design-patterns/bridge), [Composite](./vanilla-patterns/design-patterns/composite), [Decorator](./vanilla-patterns/design-patterns/decorator), [Facade](./vanilla-patterns/design-patterns/facade), [Flyweight](./vanilla-patterns/design-patterns/flyweight), [Proxy](./vanilla-patterns/design-patterns/proxy)
- **Behavioral**: [Chain of Responsibility](./vanilla-patterns/design-patterns/chain-of-responsibility), [Command](./vanilla-patterns/design-patterns/command), [Iterator](./vanilla-patterns/design-patterns/iterator), [Mediator](./vanilla-patterns/design-patterns/mediator), [Memento](./vanilla-patterns/design-patterns/memento), [Observer](./vanilla-patterns/design-patterns/observer), [State](./vanilla-patterns/design-patterns/state), [Strategy](./vanilla-patterns/design-patterns/strategy), [Template Method](./vanilla-patterns/design-patterns/template-method), [Visitor](./vanilla-patterns/design-patterns/visitor)

#### ⚡ Performance Patterns
Optimize your vanilla JavaScript applications:
- [Bundling](./vanilla-patterns/performance-patterns/bundling)
- [Code Splitting](./vanilla-patterns/performance-patterns/code-splitting) 
- [Tree Shaking](./vanilla-patterns/performance-patterns/tree-shaking)
- [Preload](./vanilla-patterns/performance-patterns/preload) & [Prefetch](./vanilla-patterns/performance-patterns/prefetch)
- [Import on Visibility](./vanilla-patterns/performance-patterns/import-on-visibility)
- [Import on Interaction](./vanilla-patterns/performance-patterns/import-on-interaction)
- [Route-based Splitting](./vanilla-patterns/performance-patterns/route-based-splitting)
- [Bundle Splitting](./vanilla-patterns/performance-patterns/bundle-splitting)

### ⚛️ React Patterns
Advanced patterns specifically for React applications.

#### 🧩 Component Patterns
Master React component design and composition:
- [Container/Presentational](./react-patterns/component-patterns/container-presentational)
- [Higher-Order Components](./react-patterns/component-patterns/higher-order-component)
- [Render Props](./react-patterns/component-patterns/render-props)
- [Hooks Pattern](./react-patterns/component-patterns/hooks-pattern)
- [Provider Pattern](./react-patterns/component-patterns/provider-pattern)
- [Compound Pattern](./react-patterns/component-patterns/compound-pattern)

#### 🖥️ Rendering Patterns
Optimize how and when your React components render:
- [Client-Side Rendering](./react-patterns/rendering-patterns/client-side-rendering)
- [Server-Side Rendering](./react-patterns/rendering-patterns/server-side-rendering)
- [Static Generation](./react-patterns/rendering-patterns/static-generation)
- [Incremental Static Generation](./react-patterns/rendering-patterns/incremental-static-generation)
- [Progressive Hydration](./react-patterns/rendering-patterns/progressive-hydration)
- [Streaming SSR](./react-patterns/rendering-patterns/streaming-ssr)
- [Selective Hydration](./react-patterns/rendering-patterns/selective-hydration)
- [Islands Architecture](./react-patterns/rendering-patterns/islands-architecture)

#### 🚀 Performance Patterns
React-specific performance optimizations:
- [Dynamic Imports](./react-patterns/performance-patterns/dynamic-imports)
- [React.lazy](./react-patterns/performance-patterns/react-lazy)
- [Code Splitting](./react-patterns/performance-patterns/code-splitting)
- [Bundle Splitting](./react-patterns/performance-patterns/bundle-splitting)
- [Tree Shaking](./react-patterns/performance-patterns/tree-shaking)
- [Virtualization](./react-patterns/performance-patterns/virtualization)
- [Memoization](./react-patterns/performance-patterns/memoization)

### 🌐 Modern Web Patterns
Cutting-edge patterns for modern web applications:
- [Micro Frontends](./modern-web-patterns/micro-frontends)
- [Module Federation](./modern-web-patterns/module-federation)
- [Web Workers](./modern-web-patterns/web-workers)
- [Service Workers](./modern-web-patterns/service-workers)
- [WebAssembly](./modern-web-patterns/web-assembly)
- [Streaming](./modern-web-patterns/streaming)
- [Progressive Web Apps](./modern-web-patterns/progressive-web-apps)

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ctrl-hack/DevPatterns.git
   cd DevPatterns
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Choose your starting point**:
   - **New to patterns?** Start with [vanilla-patterns/design-patterns/singleton](./vanilla-patterns/design-patterns/singleton)
   - **React developer?** Jump to [react-patterns/component-patterns](./react-patterns/component-patterns)
   - **Performance focused?** Explore performance patterns in both vanilla and React sections

## 📖 Learning Path

### Recommended Learning Sequence:

1. **Foundation** (Vanilla Patterns)
   - Start with Design Patterns (Singleton → Observer → Factory)
   - Learn Performance Patterns basics

2. **React Fundamentals**
   - Component Patterns (Container/Presentational → Hooks)
   - Basic Rendering Patterns (CSR → SSR)

3. **Advanced React**
   - Advanced Component Patterns (HOC → Render Props)
   - Advanced Rendering Patterns (SSG → Islands)
   - React Performance Patterns

4. **Modern Architecture**
   - Modern Web Patterns
   - Advanced Performance Optimization

## 🤝 Contributing

Each pattern directory contains:
- `README.md` - Pattern explanation and use cases
- `index.js` - Basic implementation
- `example/` - Practical examples
- `tests/` - Unit tests (where applicable)

Feel free to contribute implementations, examples, or improvements!

## 📚 Resources

- [Patterns.dev](https://www.patterns.dev/) - The inspiration for this repository
- [JavaScript Design Patterns](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)
- [React Patterns](https://reactpatterns.com/)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.