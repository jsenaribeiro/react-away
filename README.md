# React Away

**React Away** is a Single-Page Application micro-framework for agile stateful React designed for fully declarative component styles with those features:

* [Introduction video](https://www.youtube.com/watch?v=D98B_zZ2_pE)
* [Documentation site](https://github.com/jsenaribeiro/react-away/wiki)

## Quick Start

Installation, configuration and implementation.

```shell
> npm create vite@latest --template react-ts
> npm i &&  npm i react-away --save
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