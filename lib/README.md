# React Away

**React Away** is a React SPA micro-framework with an agile stateful approach, RESTful synchornizers and property directives.

## Documentation

For tutorial, usage explanagem and reference documentation, please, access React Away [documentation](https://jsenaribeiro.github.io/react-away/) web site or the presentation video of React Away [presentation](https://www.youtube.com/watch?v=waia_IutrQQ) in YouTube.

## Features

* declarative style
* self-rendering state
* two-way data binding
* remote state synchronizers
* cache, retries and pooling
* attribute programming
* component-scoped CSS
* property routing

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

## License
React Away is MIT licensed.