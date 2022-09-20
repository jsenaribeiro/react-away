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

````

````tsx
import { useState, useEffect } from 'react'

function SemiDeclarativeCounter(props: any) {
   const [count, setCount] = React.useState(0)

   useEffect(() => setTimeout(() => setCount(count+1),1000 ))

   return (<>
     <label>count: {count}</label>
     <button onClick={_ => setCount(count + 1)}>Add</button>
   </>)
}

const FullyDeclarativeCounter = (props: any, state: any) => <>
   { setTimeout(() => state.count++, 1000) }
   <label>count: {store.count ?? store.count = 0}</label>
   <button onClick={e => store.count++}>Add</button>
</>


````

