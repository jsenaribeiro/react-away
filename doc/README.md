# React Away

### **React Away** is a React SPA micro-framework with an agile stateful approach with self-rendering states, RESTful synchornizers, property directives, two-way data binding, component-scoped CSS, routing directives, among others.

<br/>

> YouTube [React Away tutorial](https://www.youtube.com/watch?v=9ugQcP9clMQ)


## Quick Start

Installation, configuration and implementation.

```cmd
npm i react-away --save
```

Configure replacing ReactDOM by ReactDOM.

```tsx
import ReactDOM from 'react-away'

export class Store { user: { name: "john" } }

ReactDOM.createRoot(true, "#root", <App />, Store)
```

Just use with self-rendeing states and two-way data binding.

```tsx
import Store from './Store'

declare const store: Store

export const HelloWorld = () => <>
   <h1>Hello, {store.user.name} !</h1>
   Name: <input bind="user.name"} /> 
</>
```