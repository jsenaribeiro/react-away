# React Away

### [#](./index.md) | [i18n](./global.md) | **Storing** | [Routing](./router.md) | [Fetching](./syncer.md) | [Binding](./binder.md) | [Handling](./broker.md) | [Directive](./proper.md) | [CSS](./styler.md)

<hr />

## Configuration

Bellow a basic React settings.

````tsx
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
   .render(<React.StrictMode><App /></React.StrictMode>)
````

React Away replaces React with its ReactDOM (avoid providers).

````tsx
import ReactDOM from 'react-away'

ReactDOM.createRoot(true, "#root", <App />, Store)
````

React Away has a easier API with extra features.

````tsx
ReactDOM.createRoot(     
   strict: boolean,         // define strict mode
   root: string,            // root query selector
   app: JSX.Element,        // App JSX Element
   store: any,              // object story
   directives: Directive[]  // custom directives
)
````

## Self-rendering

The store object is expose as a global object, available globally in all part of application as SSOT without imports.

```ts
declare const store: any // required only for typescript

const HelloWorld = () => <>
   <h1>Hello, { store.who || "World" }</h1>
   <input value={store.who} onInput={e => store.who = e.target.value}/>
</>
```

## Local state

React Away define a local state using the second arguments in a functional component, as bellow (all fields are started undefined).

````tsx
const Hello = (props: any, state: any) = <>
   <h1>{ state.hello || "World" }</h1>
   <input value={state.hello} onInput={onInput(state)} /> 
</>

const onInput = (s: any) => (e: any) => s.hello = e.target.value
````

## Multiple stores

The useStore offes multiple stores exposing inside store object.

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

