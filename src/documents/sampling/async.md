## **[Common](./index.md) | [Todo](./basic.md) | Todo + Fetching**

<hr/>

## Todo.tsx

````tsx
import { listener } from 'react-away'
import Store, { Todo } from "../../Store"
import todoApi from './todoApi'
import './todo.css'

declare const store: Store

listener.on("/todo", () => todoApi.loadAsync()) 

export const TodoList = (props: any, state: any) => <>
   { todoApi.isLoading && <progress /> }
   { todoApi.isSuccess && <Alert color='green'>Saved with success</Alert> }   
   { todoApi.isFailure && <Alert color='red'>{todoApi?.exception?.message}</Alert> }

   <h1>Todo List</h1>

   <fieldset>
      <legend>ADD NEW TODO</legend>
      <input local bind="text"/>
      <button onClick={onAdd(state)}>Add</button>
      <button onClick={todoApi.onSave}>Save</button>
   </fieldset>

   <section className="crud">
      <ul>{ store.todos.map(TodoItem) }</ul>
   </section>
</>

const TodoItem = (todo: Todo) => <>
   <li key={todo.code}>
      <label>{ todo.text }</label>
      <button onClick={onDrop(todo)}> ✕ </button>
      <button css={isDone(todo)} onClick={onDone(todo)}> ✓ </button>
   </li>
</>

const isDone = (todo: Todo) => todo.done ? 'selected' : ''

const onAdd = (state:any) => () => {
   const todo = new Todo(state.text)
   store.todos.push(todo)
   state.text = ""
}

const onDrop = (todo: Todo) => () => store.todos
   .filter(x => x.code === todo.code)
   .map(x => store.todos.indexOf(x))
   .map(i => store.todos.splice(i, 1))

const onDone = (todo: Todo) => () => store.todos
   .filter(x => x.code == todo.code)
   .map(x => x.done = !x.done)
````

## todoApi.ts

````tsx 
import Store from "../../Store"
import { synchronizer } from "react-away"

export default synchronizer({
   uid: "code",
   map: (s:Store) => s.todos,
   url: "http://localhost:3000/todo"
})
```` 

## alert.tsx

````tsx 
export const Alert = (props: any, state: any) => <>
   { state.timeout ? undefined : setTimeout(() => state.timeout = true, 1000) }
   { state.timeout ? undefined : <label style={{color:props.color}}>{ props.children }</label> }
</>
````