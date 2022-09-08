# React Away

**React Away** is a Single-Page Application micro-framework for agile stateful React designed for fully declarative component styles with those features:


* **[Declarative style](#declarative-style)**:  Functional component with no imperative code                 
* **[Routing properties](#routing-properties)**:  Declarative routing with history and parameters  
* **[State management](#state-management)**:  Asynchronous self-rendering proxy states                     
* **[Event management](#event-management)**:  Cancelable multi-listener handler                            
* **[Lite globalization](#lite-globalization)**:  Built-in I18n typed-driven localization                      
* **[API synchronization](#api-synchronization)**:  RESTful abstraction with JWT, cache, retries, etc            
* **[Directive handling ](#directive-handling)**:  Property injection with dual binding and scoped CSS  

## Related links

* [Introduction video](https://www.youtube.com/watch?v=D98B_zZ2_pE)
* [Documentation site](https://github.com/jsenaribeiro/react-away/wiki)

## Quick Start

Installation, configuration and implementation.

```shell
> npm create vite@latest --template react-ts
> npm i 
> npm i react-away --save
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