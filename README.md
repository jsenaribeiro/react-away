# React Away

**React Away** is a React SPA micro-framework for storing, fetching, routing, globalization, authentication, etc that supports caching, pooling, directives, two-way data binding, etc. 

For more details, take a look into the React Away documentation.

|                       Section | Description                                                |
| ----------------------------: | ---------------------------------------------------------- |
| [Overview](./doc/overview.md) | Overrall introduction, installation, examples. |
|   [Preview](./doc/preview.md) | Commented features with sample codes  |
|     [Review](./doc/review.md) | Architecture, discursions, patterns, etc.       |

## Quick Start

Installation, configuration and implementation.

```cmd
npm i react-away --save
```

```tsx
import ReactDOM from 'react-away'

ReactDOM.createRoot(true, "#root", <App />, Store)
```

```tsx
import Store from './Store'

declare const store: Store

export const HelloWorld = () => <>
   <h1>Hello, {store.user.name} !</h1>
   Name: <input bind="user.name"} /> 
</>
```

## Features

Overall supported features

* declarative style
* self-rendering state
* two-way data binding
* remote state synchronizers
* cache, retries and pooling
* attribute programming
* component-scoped CSS
* property routing

## License
React Away is MIT licensed.das

````tsx
   <input local bind="hello" />
   <input value={state.hello} onInput={e => state.hello = e.target.value} />

````