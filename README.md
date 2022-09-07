# React Away

### **React Away** is a Single-Page Application micro-framework for agile stateful React designed for fully declarative component styles with those features:


* **[Declarative style](#declarative-style)**:  Functional component with no imperative code                 
* **[Routing properties](#routing-properties)**:  Declarative routing with history and parameters  
* **[State management](#state-management)**:  Asynchronous self-rendering proxy states                     
* **[Event management](#event-management)**:  Cancelable multi-listener handler                            
* **[Lite globalization](#lite-globalization)**:  Built-in I18n typed-driven localization                      
* **[API synchronization](#api-synchronization)**:  RESTful abstraction with JWT, cache, retries, etc            
* **[Directive handling ](#directive-handling)**:  Property injection with dual binding and scoped CSS  

## Related links

* [Introduction video](https://www.youtube.com/watch?v=ngZNQfpTC10)
* [Documentation site](https://jsenaribeiro.github.io/react-away/)

## Quick Start

Installation, configuration and implementation.

```shell
> npm create vite@latest --template react-ts
> npm i 
> npm i react-away --save
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



## Declarative Style

A Counter component in stateful classic component style.

````tsx
class ClassicCounter extends React.Component {    
   constructor(props: any) { super(props); this.state = { count: 0 }}
   setCounter = e => this.setState({ count:this.state.count + 1 })
   render = () => <>
      <label>count: {this.state.count}</label>
      <button onClick={setCounter}>Add</button>
   </>
}
````

The same component in a stateful functional component style.

````tsx
function FunctionalCounter(props: any) {
   const [count, setCount] = React.useState(0)
   return (<>
     <label>count: {count}</label>
     <button onClick={_ => setCount(count + 1)}>Add</button>
   </>)
}
````

And in the proposal fully declarative functional component style.

````tsx
const FunctionalDeclarativeCounter = (props: any) => <>
   <label>count: {store.count}</label>
   <button onClick={e => store.count++}>Add</button>
</>
````

## Routing properties

Declarative routing with props directives and history navigation.

````tsx
export const App = (props: any) => <>
   <button onRoute="/">Home</button>
   <button onRoute="/hello">Hello</button>
   <button onClick={() => setRoute(-1)}>Back</button>

   <section>
      <Hello route="/hello" />    
   </section>
</>
````

It also route parametrization with react-router-dom syntax.

````tsx
export const App = (props: any) => <>
   <button onRoute="/">Home</button>
   <button onRoute="/hello/John">Hello</button>
   <button onClick={() => setRoute(-1)}>Back</button>

   <section>
      <Hello route="/hello/:name" />    
   </section>
</>
````

````tsx
import { getRoute } from 'react-away'

export const Hello = (props: any) => <>
   <h2> Hello, { getRoute("name") }</h2>
</>
````

## State management

Async renderable local state handling as second argument.

````tsx
const Hello = (props, state) => <>
  <h1>Hello, { state.hello }</h1>
  { setTimeout(() => state.hello="World", 100) }
</>
````

Async renderable global state management as a globally exposed instace class.

````tsx
import ReactDOM from 'react-away'
export class Store { user: { name: "john" } }

ReactDOM.createRoot(true, "#root", <App />, Store)
````

````tsx
declare const store: Store

const Hello = (props) => <>
  <h1>Hello, { store.hello }</h1>
</>

fetch(url).then(x => x.json()).then(x => store.hello = x)
````

Async renderable shred state distributed by modular export/import semantics.

````tsx
export default useState({ hello: "world" })
````

````tsx
import share from './share'

const Hello = (props) => <>
  <h1>Hello, { share.hello }</h1>
</>
````

## Event Management

An useEffect replacer that supports React life-cycle synonims.

* **mounted**: componentDidMount    
* **updated**: componentDidUpdated  
* **unmount**: componentWillUnmount 
* **catched**: componentDidCatch    

It also supports DOM events, caught exceptions, routing changes and custom events.

````tsx
import { listener } from 'react-away'

listener.on("mounted", _ => console.log("componentDidMount"))
listener.on("keydown", _ => console.log("DOM keydom event"))
listener.on("failure", _ => console.log("any kind of error"))
listener.on("/routed", _ => console.log("Entered in route"))
listener.on("myEvent", e => console.log(e))
````

With cancelable feature by event tag or callback reference.

````tsx
listener.subscribers.filter(...).cancel()
````

## Lite globalization

Object-oriented localization (instead JSON).

```tsx
import { I18N } from 'react-away'

// typed-driven locales
// parameters with functions
export default interface Locale extends I18N { 
    welcome: string 
    hello(who:string):string
}   
````

I18n interfaces offers basic localization as currency format.

````tsx
import Locale from './locale'

const en: Locale = {
   language: "en",
   identity: "English",
   currency: (value) => `$ ${value.toFixed(2)}`,
   datetime: (value) => value.toISOString(),
   welcome: "Welcome",
   hello: (who) => `Hello, ${who}`
}

const pt: Locale = {
   language: "pt",
   identity: "Português",
   currency: (value) => `R$ ${value.toFixed(2)}`,
   datetime: (value) => value.toISOString(),
   welcome: "Bem-vindo",
   hello: (who) => `Olá, ${who}`
}
````

Locales are registered in createRoot.

````tsx
import ReactDOM from 'react-away'
import en from './locales/en'
import pt from './locales/pt'

ReactDOM.createRoot(true, "#root", <App />)
   .globalization([en, pt], true)  
````

It uses browser language as default, or defined by useLanguage function.

````tsx
import { useLanguage } from 'react-away'

declare const locale: any

useLanguage("pt")

const App = () => <>
   <h1> { locale.title } </h1>
   <h2>Hello, { locale.hello("John") }</h2>
</>
````

## API Synchronization

Synchronizers maps an RESTful API.

````tsx
import { synchronizer } from 'react-away'

export default synchronizer({
   // RESTful api
   uid: "id",
   url: "http://localhost:3000/hello",
   map: (s: Store) => s.hello,
    
   // flexible adaptation
   update: {
      route: "/update",
      hasIdField: false,
   },
    
   // advanced settings
   timeout: 9000 
   caching: 3000 
   pooling: 1000 
   retries: 3    
})
````

Supporting JWT Bearer authentication.

````tsx
import ReactDOM, { login, logon, logout }  from 'react-away'
import locales from './locales'

ReactDOM.createRoot(true, "#root", <App />)
        .authentication("GET", false, true)
           .login("http://localhost:4000/login")
           .token(s => s.access_token)
           .route("/", "/unauthorized")
````
````tsx
await login("test", 123)
const user = logon()
logout()
````

Synchronizers abstrascts APIs with save and load semantics.

````tsx
import { syncher } from 'react-away'
import { helloApi } from './helloApi'

const Hello = (props) => <>
   { helloApi.isLoading && <progress /> }

   <h1>Hello, { store.hello }</h1>

   <button onClick={onLoad}>Load</button>
   <button onClick={onSave}>Save</button>

   <input value={store.hello} onInput={e => store.hello = e.target.value}>
</>
````

## Directive handling
* **property injection**: inject external properties inside elements and components
* **dependency injection**: a component has props, a directive has components
* **component tree handling**: it handle element in component tree in rendering time

Two-way data binding with bind directive.

````tsx
declare const store: any

const oneWayDataBinding = (props: any) => <>
    <input onInput={e=>store.who=e.target.value}
           value={store.who} />
</>

const twoWayDataBinding = (props: any, state: any) => <>
    <input local bind={s => s.who} />
    <input local bind="who" />
    <input bind={s => s.who} />
    <input bind="who" />
</>
````

Scoped CSS as component tag as CSS class name.

````css
/* style.css */
h1 { color: blue }
h1.Hello { color:red }
````

````tsx
import './style.css'
const App = () => <h1> My blue title </h1>
const Hello = () => <h1> My red title </h1>
````

Custom directive has very similar syntax to functional components.

````tsx
import ReactDOM from 'react-away'

export const clickedLabel(props: any, args: DirectiveArgs) => 
   args.tag !== "label" ?  props : ({ onClick:() => alert('clicked label...') })

ReactDOM.createRoot(true, "#root", <App/>, context, [clickedLabel])

//  only for TypeScript (with new props directives)
declare module 'react' {
   export interface HTMLAttributes<T> { 
      newAttribute: boolean 
   } 
}
````