# React Away

### **React Away** is a React SPA micro-framework with an agile stateful approach with self-rendering states, RESTful synchornizers, property directives, two-way data binding, component-scoped CSS, routing directives, among others.

<br/>

> YouTube [React Away tutorial](https://www.youtube.com/watch?v=9ugQcP9clMQ)


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

# Summary

| #    | Features                                    | Description                                                  |
| ---- | ------------------------------------------- | ------------------------------------------------------------ |
| 1    | [Declarative style](#1-declarative-style)   | Functional component with no imperative code                 |
| 2    | [State management](#state-management)       | Asynchronous self-rendering proxy states                     |
| 3    | [Event management](#event-management)       | Cancelable multi-listener handler                            |
| 4    | [Lite globalization](#lite-globalization)   | Built-in I18n typed-driven localization                      |
| 5    | [API synchronization](#api-synchronization) | RESTful abstraction with JWT, cache, retries, etc            |
| 6    | [Routing properties](#routing-properties)   | Declarative routing with history navigation and route parameters |
| 7    | [Directive handling ](#directive-handling)  | Property programming with two-way data binding and component-scoped CSS |

## Declarative Style

Like hooks intruduced stateful functional components, here it is intruduced a fully declarative funcional components with states.

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

````tsx
function FunctionalCounter(props: any) {
   const [count, setCount] = React.useState(0)
   return (<>
     <label>count: {count}</label>
     <button onClick={_ => setCount(count + 1)}>Add</button>
   </>)
}
````

````tsx
const FunctionalDeclarativeCounter = (props: any) => <>
   <label>count: {store.count}</label>
   <button onClick={e => store.count++}>Add</button>
</>
````

## State Management

### Local State Handling

````tsx
const Hello = (props, state) => <>
  <h1>Hello, { state.hello }</h1>
  { setTimeout(() => state.hello="World", 100) }
</>
````

### Global state management

````tsx
ReactDOM.createRoot(true, "#root", <App />, store)
````

````tsx
declare const store: Store

const Hello = (props) => <>
  <h1>Hello, { store.hello }</h1>
</>

fetch(url).then(x => x.json()).then(x => store.hello = x)
````

### Partial state distribution

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

### Multi-listening

* React Life-Cycle
* DOM listeners
* Routing changes 
* Handled Exception (failure)
* Custom messaging

### Cancelable events

````tsx
// tagName || callback
listener.subscribers.filter(...).cancel()
````


### Life-cycle synonyms

| synonym | life-cycle           |
| ------- | -------------------- |
| mounted | componentDidMount    |
| updated | componentDidUpdated  |
| unmount | componentWillUnmount |
| catched | componentDidCatch    |

## Lite globalization

### Definition

```tsx
import { I18N } from 'react-away'

// typed-driven locales
// parameters with functions
interface Locale extends I18N { 
    welcome: string 
    hello(who:string):string
}   

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

export default [en,pt]
```

### Configuration

````tsx
import ReactDOM from 'react-away'
import locales from './locales'

ReactDOM.createRoot(true, "#root", <App />)
   .globalization(locales, true)  
````

### Implementation

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

### Configuration

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

### Authentication

````tsx
import ReactDOM, { login, logon, logout }  from 'react-away'
import locales from './locales'

ReactDOM.createRoot(true, "#root", <App />)
        .globalization(locales, true) 
        .authentication("GET", false, true)
           .login("http://localhost:4000/login")
           .token(s => s.access_token)
           .route("/", "/unauthorized")


await login("test", 123)
const user = logon()
logout()

````

### Implementation

````tsx
import { syncher } from 'react-away'
import { helloApi } from './helloApi'

const Hello = (props) => <>
   { helloApi.isLoading && <progress /> }

   <h1>Hello, { store.hello }</h1>

   <button onClick={onLoad}>Load</button>
   <button onClick={onSave}>Save</button>

   <input bind="hello" /> 
</>

````

## Routing properties

### Declaration

````tsx
export const App = (props: any) => <>
   <button onRoute="/">Home</button>
   <button onRoute="/hello">Hello</button>

   <section>
      <Hello route="/hello" />    
   </section>
</>
````

### Parameters

````tsx
export const App = (props: any) => <>
   <button onRoute="/">Home</button>
   <button onRoute="/hello/John">Hello</button>

   <section>
      <Hello route="/hello/:name" />    
   </section>
</>
````

````tsx
import { Locale } from '../locales'

export const Hello = (props: any) => <>
   <h2> Hello, { getRoute("name") }</h2>
</>
````

### Navigation

````tsx
import { setRoute } from 'react-away'

export const App = (props: any) => <>
   <button onRoute="/">Home</button>
   <button onRoute="/hello/John">Hello</button>
   <button onClick={() => setRoute(-1)}>Back</button>

   <section>
      <Hello route="/hello/:name" />    
   </section>
</>
````

## Directive handling

### Two-Way Data Binding

````tsx
declare const store: any

const global2wayDataBinding = (props: any) => <>
    <input value={store.who} onInput={e => store.who = e.target.value}/>
    <input bind={s => s.who} />
    <input bind="who" />
</>

const local2wayDataBinding = (props: any, state: any) => <>
    <input value={state.who} onInput={e => state.who = e.target.value}/>
    <input local bind={s => s.who} />
    <input local bind="who" />
</>
````

### Component-Scoped CSS

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

### Custom Directive Programming

### Implementation

````tsx
import ReactDOM from 'react-away'

export const clickedLabel(props: any, args: DirectiveArgs) => 
   args.tag !== "label" ?  props : ({ onClick:() => alert('clicked label...') })

ReactDOM.createRoot(true, "#root", <App/>, context, [clickedLabel])
````

For new properties, TypeScript requires module declaration

````tsx
declare module 'react' {
   export interface HTMLAttributes<T> { 
      newAttribute: boolean 
   } 
}
````

### Explanation

* **what a directive could do?** routing props, two-way data binding, component-scoped css, etc.
* **when use it instead of components?** when you don't want new components for new behaviors
* **is like an Angular rattribute directive?** it doesn't need a new property, could just change props

### Conception

* **property injection**: inject external properties inside elements and components
* **dependency injection**: a component has props, a directive has components
* **component tree handling**: it handle element in component tree in rendering time
