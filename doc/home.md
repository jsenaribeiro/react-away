## **React Away** is a React SPA micro-framework with an agile stateful approach with self-rendering states, RESTful synchornizers, property directives, two-way data binding, component-scoped CSS, routing directives, among others.

<br/>

# Quick Start

With npm installed, type the command bellow with npm (or yarn).

```console
> npm i react-away --save
> yarn add react-away
```

Replace ReactDOM pelo ReactDOM as bellow.

```tsx
ReactDOM.createRoot(true, "#root", <App />, Store)
```

And that is: state management and two-way data binding within a full declarative component.

```tsx
export const HelloWorld = () => <>
   <h1>Hello, {store.user.name} !</h1>
   Name: <input bind="user.name"} /> 
</>

const Hello = (props, state) => <>
   <h1>Hello, { state.hello }</h1>
   <input onInput={e => state.hello = e.target.value}
          value={state.hello} />
</>

import { synchornizer } from 'react-away'

export default synchornizer({
   url: "http://sample/hello",
   get: (s: store) => s.hello,
   set: (s: store, v: any) => s.hello = v
})

export default [pt, en]

```