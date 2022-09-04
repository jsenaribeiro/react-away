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

Get contextual state with syncher object

````tsx
import { syncher } from 'react-away'

syncher.exception  // current error message and validations
syncher.isSuccess  // self-rendering success flag for savings
syncher.isLoading  // self-rendering current loading state
syncher.outOfSync  // flag for out of sync remote states
syncher.canceller  // request cancellation function
````

## CRUD example

It returns the mapped synced list with true argument.

````tsx
import { listener } from 'react-away'
import { todoAsync } from './todo'

const { onSave, loadAsync } = todoAsync()

listener.on("/todo", x => loadAsync())

const Todo = (props: any) => <>
   <h1>TODO List</h1>
   <input bind="text" />
   <button onClick={onAdd}>Add</button>
   <button onClick={onSave}>Save</button>
	{ todoAsync()?.map(TodoItem) }
</>

const TodoItem = (task) => <>
	<li key={id}>
      <a onClick={_ => store.todo.item = task}>=</a> |
      <a onClick={onDrop(task.id)}>-</a> |
      { task }
   </li>
</>

const onAdd = (state: any) => async (event: any) => {
   if (!state.id) store.todos.push(state)
   else store.todos
      .filter(x => x.id === state.id)
      .forEach((_,i) => store.todos[i] = state)
   }

   if (!state.id) state.text = ""
}

const onDrop = (id:string) = (e:any) => 
   store.todos = store.todos.filter(x => x.id != id)
````

## Loading

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
   etc...,

   timeout: 9000 // overall timeout for an request
   caching: 3000 // timeout cache-key expiration
   retries: 3    // retries after for an request
   pooling: 1000 // delay for request looping
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

await login(username, password)

logon() // return JWT token decoded object

logout() // finish the token session
````