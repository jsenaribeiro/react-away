# React Away

### [#](./index.md) | [i18n](./global.md) | **Storing** | [Routing](./router.md) | [Fetching](./syncer.md) | [Binding](./binder.md) | [Handling](./broker.md) | [Directive](./proper.md) | [CSS](./styler.md)

<hr />

## Configuration

Bellow a basic React configuration.

````tsx
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
   .render(<React.StrictMode><App /></React.StrictMode>)
````

React Away just replaces ReactDOM with ReactDOM (without no provider).

````tsx
ReactDOM.createRoot(true, "#root", <App />, context)
````
````tsx
ReactDOM.createRoot(     // SIGNATURE
   strict: boolean,      // define strict mode
   root: string,         // root query selector
   app: JSX.Element,     // App JSX Element
   context: any,         // object story
   directives: Proper[]  // custom directives
)
````

## Contextual state

The configuration could be retrieved by render object

````tsx
import { render } from 'react-away'

render.context // original store context object
render.stricted // check if it is in strict mode
render.directives // all current registered directives
````

## Self-rendering

The store object is global (inside window), available globally in application as SSOT.

```ts
declare const store: any // declare is needed in typescript

const HelloWorld = () => <>
   <h1>Hello, { store.who || "World" }</h1>
   <input value={store.who} onInput={e => store.who = e.target.value}/>
</>
```

## Local state

React Away useState modular hook is also a self-rendering object.

````tsx

const Hello = (props: any, state: any) = <>
   <h1>{ state.hello || "World" }</h1>
   <input value={state.hello} onInput={onInput(state)} /> 
</>

const onInput = (s: any) => (e: any) => s.hello = e.target.value
````

## Multiple stores

The useStore inject in global scope a inner object of store object.

```tsx
useStore<Store>(s => s.profile.user)
useStore<Store>(s => s.todo)

declare const user: any
declare const todo: any

const User = () => <>
   <h1>{ atUser(s => s.name) }</h1>
   <input onInput={onUser(s,v) s.name = v} >
</>
```

