# React Away

### **#** | [i18n](./global.md) | [Storing](./storer.html) | [Routing](./router.md) | [Fetching](./syncer.md) | [Binding](./binder.md) | [Handling](./broker.md) | [Directive](./proper.md) | [CSS](./styler.md)

<hr />

## [Agile state management](preview/storer.md)

ReactDOM settings just replaces ReactDOM.

````tsx
ReactDOM.createRoot(true, "#root", <App />, { hello: "world" }) 
````

Then just import store from 'react-away'.

````ts
declare const store: any

const HelloWorld = () => <> 
   <h1>Hello, { store.hello }</h1>
   <input value={store.hello} onInput={e => store.hello = e.target.value} />
</>
````

## [Global routing props](preview/router.md)

Propert rotuting with support to history navigation and route parameters.

```tsx
const App => () => <>
   <Todo route="/todo" />
   <a onRoute="/todo">Todo</a> 
</>
````

## [Two-way data binding](preview/binder.md)

Two-way data binding directive with bind property.

````html
<input value={store.who} onInput={e => store.who = e.target.value}/>

<input bind="who" /> <!-- two-way data bind with string syntax -->
````

## [State synchonizers](preview/syncer.md)

RESTful API abstraction with synchronizers based in store object.

````ts
import { todoAsync, syncher } from './todo'

const { onSave } = todoAsync()

const TodoItem = () => <>   
   <input bind="todo.item" />
   <button onClick={onAdd}>Add</button>
   <button onClick={onSave}>Save</button>
   <progress shown={syncher.isLoading} />
</>

const onAdd = async (e:any) => store.todo.list.push(store.todo.item)
````

## [Built-in globalization](preview/global.md)

Native globalization support in ReactDOM.createRoot

````ts
import locales from './locales'

ReactDOM.createRoot(true, "#root", <App/>, context)
   .globalization(locales, true)
````

It supports parametrization with functions.

````tsx
declare const locale: any

const App = () => <>
   <h1> { locale.title } </h1>
   <h2>Hello, { locale.hello("World") }</h2>
</>
````

## [Custom directives](preview/proper.md)

Attribute injection with directives in rendering time.

````tsx
const noWrap = props => ! props.full ? props
   : ({...props, style: { whiteSpace:"nowrap" } })

ReactDOM.createRoot(true, "#root", <App/>, context, [css])

const Example = () => <h1 noWrap>This text doesn't wrap</h1>
````

## [Event managament](preview/broker.md)

The listener and dispatch handles DOM, React and custom events. 

````js
import { listener } from 'react-away'

listener.on("mounted", _ => console.log("componentDidMount"))
listener.on("keydown", _ => console.log("DOM keydom event"))
listener.on("myevent", _ => console.log("My event happens"))
listener.on("failure", _ => console.log("any kind of error"))

listener.on("myevent", console.warn) 
listener.dispatch("myevent", "hello world...")
````

## [Styling improvements](preview/style.md)

Component-scoped CSS and routed element styling.

````css
button.App { color:black }      /* scoped by component Name as CSS class */
a.routed { filter: invert(1) }  /* styled current onRoute handler element */
````

A alternative className suggar syntax with css props.

````css
.red { color:red }
````

````tsx
const App = () => <> <h1 css='red'> title </h1> </>
````

