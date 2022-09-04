# React Away

### [#](./index.md) | [i18n](./global.md) | [Storing](./storer.html) | **Routing** | [Fetching](./syncer.md) | [Binding](./binder.md) | [Handling](./broker.md) | [Directive](./proper.md) | [CSS](./styler.md)

<hr />

## Quick start

The route and onRoute directives offers the basic routing features.

```tsx
const App => () => <>
   <Todo route="/todo" />
   <Hello route="/hello" />
   <Counter route="/counter" />
   
   <a onRoute="/todo">Todo</a> 
   <a onRoute="/hello">Hello</a> 
   <a onRoute="/counter">Counter</a> 
</>
```

## Router functions

Each **onRoute** attribute, **setRoute** and **letRoute** functions as its router use cases.

```tsx
import { setRoute, isRouted } from 'react-away/router'

const App = (props: any) => <>
   { isRouted("/hello") && <Hello /> }
   <Hello hidden={isRouted("/hello")} /> 
   <a onClick={e => setRoute("/hello")}>Hello</a> 
   <a onClick={e => setRoute("/detail/:id")}>Hello</a> 
   <button onClick={e => setRoute(-3)}>Go back 3 routes</button>
</>

const Detail = (props: any) => <>
   <h1>ID: { getRoute("id") }</h1>
</>

const Hello = (props: any) => <h1>Hello</h1>

const goBack3 = () => setRoute(-3)
```

## History navigation

Numeric arguments in **setRoute** enables history navigation.

```tsx
setRoute("/") // change route to "/"
setRoute(-2)  // goes back two routes
setRoute(3)   // try to advance eleven routes
```

## Route parameters

The **GetRoute** returns its queried route parameters or the current route (when no args).

```tsx
const App = (props: any) => <>
   <a route="/user/:id">User</a>
</>

getRoute()     // current route
getRoute("id") // route parameter
```

## Routing states

The **setRoute** could pass states  and be received by as getRoute parameter.

```tsx
setRoute("/", { ok:true}) 
const ok = getRoute("ok")
```