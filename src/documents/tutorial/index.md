# React Away

### **#** | [i18n](./global.md) | [Storing](./storer.html) | [Routing](./router.md) | [Fetching](./syncer.md) | [Binding](./binder.md) | [Handling](./broker.md) | [Directive](./proper.md) | [CSS](./styler.md)

<hr />

## [Agile state management](storer.html)

ReactDOM settings just replaces ReactDOM.

````tsx
import ReactDOM from 'react-away'

export class Store { hello: "world" }

ReactDOM.createRoot(true, "#root", <App />, Store) 
````

Then just import store from 'react-away'.

````ts
declare const store: any

const HelloWorld = () => <> 
   <h1>Hello, { store.hello }</h1>
   <input value={store.hello} onInput={e => store.hello = e.target.value} />
</>
````

## [Global routing props](router.html)

Propert rotuting with support to history navigation and route parameters.

```tsx
const App => () => <>
   <Todo route="/todo" />
   <a onRoute="/todo">Todo</a> 
</>
````

## [Two-way data binding](binder.html)

Two-way data binding directive with bind property.

````html
<input value={store.who} onInput={e => store.who = e.target.value}/>

<input bind="who" /> <!-- two-way data bind alternative -->
````

## [State synchonizers](syncer.html)

RESTful API abstraction with synchronizers based in store object.

````ts
import { todoApi } from './todoApi'

const TodoItem = () => <>   
   <input bind="todo.item" />
   <button onClick={onAdd}>Add</button>
   <button onClick={todoApi.onSave}>Save</button>
   <progress hidden={!todoApi.isLoading} />
</>

const onAdd = async (e:any) => 
   store.todo.list.push(store.todo.item)
````

## [Built-in globalization](global.html)

Native globalization support in ReactDOM.createRoot

````ts
import locales from './locales'

ReactDOM.createRoot(true, "#root", <App/>, Store)
   .globalization(locales, true)
````

With parametrization with simple functions.

````tsx
declare const locale: any

const App = () => <>
   <h1> { locale.title } </h1>
   <h2>Hello, { locale.hello("World") }</h2>
</>
````

## [Custom directives](proper.html)

Attribute injection with directives in rendering time.

````tsx
const noWrap = props => ! props.full ? props
   : ({...props, style: { whiteSpace: "nowrap" } })

ReactDOM.createRoot(true, "#root", <App/>, Store, [noWrap])

const Example = () => <h1 noWrap>This text doesn't wrap</h1>
````

## [Event managament](broker.html)

The listener and dispatch handles DOM, React and custom events. 

````js
import { listener } from 'react-away'

listener.on("mounted", _ => console.log("componentDidMount"))
listener.on("keydown", _ => console.log("DOM keydom event"))
listener.on("myevent", _ => console.log("My event happens"))
listener.on("failure", _ => console.log("any kind of error"))

listener.on("myevent", e => console.warn(e)) 
listener.dispatch("myevent", "hello world...")
````

## [Styling improvements](style.html)

Component-scoped CSS and routed element styling.

````css
button.App { color:black }      /* component-scoped CSS */
a.routed { filter: invert(1) }  /* styled routed button */
.test { color:red }             /* sample class name */
````

A alternative className suggar syntax with css props.


````tsx
const App = () => <> <h1 css='test'> sample </h1> </>
````

