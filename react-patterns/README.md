# React Patterns

This section covers patterns specific to React applications, from component design to rendering strategies and performance optimizations.

## 🧩 Component Patterns

Learn how to structure and compose React components effectively.

### Core Patterns

- **[Container/Presentational](./component-patterns/container-presentational)** - Separate data logic from presentation
- **[Higher-Order Components](./component-patterns/higher-order-component)** - Enhance components with additional functionality
- **[Render Props](./component-patterns/render-props)** - Share code between components using props
- **[Hooks Pattern](./component-patterns/hooks-pattern)** - Use state and lifecycle features in functional components
- **[Provider Pattern](./component-patterns/provider-pattern)** - Share data across component tree
- **[Compound Pattern](./component-patterns/compound-pattern)** - Create flexible, composable component APIs

### When to Use Each Pattern

- **Container/Presentational**: When you want to separate concerns and make components more reusable
- **HOCs**: When you need to enhance multiple components with similar functionality
- **Render Props**: When you need flexible, configurable component behavior
- **Hooks**: Modern React development (preferred for new applications)
- **Provider**: When you need to share state across multiple components
- **Compound**: When building complex UI components with multiple parts

## 🖥️ Rendering Patterns

Optimize how and when your React components render for better performance and user experience.

### Client-Side Patterns

- **[Client-Side Rendering](./rendering-patterns/client-side-rendering)** - Render components in the browser
- **[Progressive Hydration](./rendering-patterns/progressive-hydration)** - Hydrate components progressively
- **[Selective Hydration](./rendering-patterns/selective-hydration)** - Hydrate only necessary components

### Server-Side Patterns

- **[Server-Side Rendering](./rendering-patterns/server-side-rendering)** - Render on the server for faster initial loads
- **[Static Generation](./rendering-patterns/static-generation)** - Pre-build pages at build time
- **[Incremental Static Generation](./rendering-patterns/incremental-static-generation)** - Update static pages on demand
- **[Streaming SSR](./rendering-patterns/streaming-ssr)** - Stream HTML as it's generated

### Modern Patterns

- **[Islands Architecture](./rendering-patterns/islands-architecture)** - Combine static and dynamic content efficiently

## 🚀 Performance Patterns

React-specific optimizations to make your applications faster and more efficient.

### Code Loading Patterns

- **[Dynamic Imports](./performance-patterns/dynamic-imports)** - Load code on demand
- **[React.lazy](./performance-patterns/react-lazy)** - Lazy load React components
- **[Code Splitting](./performance-patterns/code-splitting)** - Split your app into smaller chunks

### Optimization Patterns

- **[Memoization](./performance-patterns/memoization)** - Prevent unnecessary re-renders with React.memo, useMemo, useCallback
- **[Virtualization](./performance-patterns/virtualization)** - Efficiently render large lists
- **[Tree Shaking](./performance-patterns/tree-shaking)** - Remove unused React code
- **[Bundle Splitting](./performance-patterns/bundle-splitting)** - Optimize how your React app is bundled

## Learning Path

### Beginner
1. Start with **Container/Presentational** pattern
2. Learn basic **Hooks Pattern**
3. Understand **Client-Side Rendering**
4. Try **React.lazy** for code splitting

### Intermediate  
1. Master **Provider Pattern** for state management
2. Learn **Server-Side Rendering**
3. Implement **Memoization** techniques
4. Explore **Higher-Order Components**

### Advanced
1. **Render Props** for advanced component composition
2. **Progressive Hydration** for performance
3. **Islands Architecture** for modern apps
4. **Compound Pattern** for complex UI components

## Prerequisites

- Basic React knowledge (components, props, state)
- Understanding of JavaScript ES6+ features
- Familiarity with React Hooks (for modern patterns)
- Basic understanding of build tools (webpack, Vite, etc.)

## Pattern Selection Guide

| Need | Recommended Pattern |
|------|-------------------|
| Separate logic from UI | Container/Presentational |
| Share functionality across components | HOC or Custom Hooks |
| Flexible component behavior | Render Props |
| Modern React development | Hooks Pattern |
| Global state management | Provider Pattern |
| Complex component APIs | Compound Pattern |
| SEO-friendly pages | SSR or Static Generation |
| Fast initial loads | SSR with Progressive Hydration |
| Large lists | Virtualization |
| Reduce bundle size | Code Splitting + Tree Shaking |