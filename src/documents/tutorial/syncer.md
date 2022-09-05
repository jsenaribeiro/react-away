# React Away

### [#](./index.md) | [i18n](./global.md) | [Storing](./storer.html) | [Routing](./router.md) | **Fetching** | [Binding](./binder.md) | [Handling](./broker.md) | [Directive](./proper.md) | [CSS](./styler.md)

<hr />


React Away synchronizers abstracts RESTful APIs as remove state management.

## Configuration

Create your synchronizer for your stored object.

````tsx
import { synchronizer } from 'react-away'

export const todoAsync = synchronizer({
   uid: "id",
   url: "http://sample/todo",
   map: (store: any) => store.todos
})
````

## Contextual state

A syncher object offers a contextual state information.

````tsx
import { todoApi } from './todoApi'

syncher.exception  // current error message and validations
syncher.isSuccess  // self-rendering success flag for savings
syncher.isLoading  // self-rendering current loading state
syncher.outOfSync  // flag for out of sync remote states
syncher.canceller  // request cancellation function
````

## Save/load example

It returns the mapped synced list with true argument.

````tsx
import helloApi from './helloApi'

declare const store: any

const Hello = (props: any) => <>
   <h1>Hello, { store.hello }</h1>
   <input bind={e => e.hello} />
   
   <button onClick={todoApi.onLoad}>Load</button>
   <button onClick={todoApi.onSave}>Save</button>
</>
````

## Loading flag

The syncher object expose a self-rendering loading flag.

````tsx
import { syncher } from 'react-away'
import { todoAsync } from './todo'

const Todo = () => <progress hidden={!syncher.isLoading} />
````

## Settings

It supports cancellation, timeout, poolin and cache.

````tsx
import { synchronizer, syncher } from 'react-away'

export const todoAsync = synchronizer({
   timeout: 9000 // overall timeout for an request
   caching: 3000 // timeout cache-key expiration
   pooling: 1000 // delay for request looping
   retries: 3    // retries after for an request
})

syncher.canceller.abort() // request cancellation
````

## Authentication

JWT Bearer authentication integrated to synchornizers.

````tsx
ReactDOM.createRoot(false, "#root", <App />, domain)
   .authentication("GET", false, true)
      .login("http://localhost:4000/login")
      .token(s => s.access_token)
      .route("/", "/unauthorized")
````

The login, logon and logout functions for full authentication cycle.

````tsx
import { login, logon, logout } from 'react-away'

await login(username, password) // authenticating user
const current = logon() // return JWT token decoded object
logout() // finish the token session
````