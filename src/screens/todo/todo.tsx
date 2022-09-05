import { useStore, listener } from "../../../lib"
import { Store, Task, Todo } from "../../Store"
import todoApi from './async'
import { Loader } from "../../components/loader/loader"
import { Locale } from "../../locales"
import './todo.css'

const { loadAsync, onSave, onLoad } = todoApi

useStore<Store, Todo>(s => s.todo)

listener.on("/todo", () => loadAsync())

declare const todo: Todo
declare const store: Store
declare const locale: Locale

export const TodoList = (props: any) => <>
   { todoApi.isLoading && <Loader /> }

   <label css="error">{ todoApi.exception?.message }</label>

   <h1><sub>TODO List</sub></h1>

   <fieldset>
      <legend>Add new task</legend>
      <input onKeyUp={onEnter} bind="todo.text" />
      <button onClick={onAdd}>Add</button>
      <button onClick={onLoad}>Load</button>
      <button onClick={onSave}>Save</button>
      <button onClick={onStop}>Stop</button>
   </fieldset>

   <ul>{ todo?.list?.map(TodoItem) }</ul>
</>

const TodoItem = (task: Task) =>
   <li className="item" key={task.code}>      
      <label> • { task.text }</label>
      <span><i className="del" onClick={onDrop(task.code)}>✕</i></span>
      <span><i onClick={onDone(task)} className={task.done ? 'done' : 'none'}>✓</i></span>
   </li>

const onEnter = (e:KeyboardEvent|any) => e.key.toLowerCase() == "enter" && onAdd()

const onDrop = (code: any) => () => todo.list
   .filter(x => x.code === code)
   .map(x => todo.list.indexOf(x))
   .forEach(i => todo.list.splice(i, 1))

const onDone = (task: Task) => () => todo.list
   .filter(x => x.code === task.code)
   .forEach(x => x.done = !x.done)

const onAdd = async () => {
   const guid = new Date().getTime()
   const data = {code: guid, text: todo.text, done: false}

   todo.list.push(data)
   todo.text = ""

   console.log(todo.list)
}

const onStop = () => todoApi.canceller()