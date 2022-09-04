## **[Common](./index.md) | Todo | [Todo + Fetching](./async.md)**

<hr />

## Todo.tsx

````tsx
import Store, { Todo } from "../../Store"
import './todo.css'

declare const store: Store

export const TodoList = (props: any, state: any) => <>
   <h1>Todo List</h1>

   <fieldset>
      <legend>ADD NEW TODO</legend>
      <input local bind="text"/>
      <button onClick={onAdd(state)}>Add</button>
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