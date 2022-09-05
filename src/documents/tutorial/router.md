# React Away

### [#](./index.md) | [i18n](./global.md) | [Storing](./storer.html) | **Routing** | [Fetching](./syncer.md) | [Binding](./binder.md) | [Handling](./broker.md) | [Directive](./proper.md) | [CSS](./styler.md)

<hr />

## Quick start

The route and onRoute directives offers routing props.

```tsx
const App => () => <>
   <Hello route="/hello" /> 

   <a onRoute="/">Home</a> 
   <a onRoute="/hello">Hello</a> 
</>
```

## Router functions

Each **onRoute** attribute, **setRoute** and **letRoute** functions as its router use cases.

```tsx
import { setRoute, isRouted } from 'react-away/router'

isRouted("/hello") // check the route
setRoute("/hello") // change the route
```
## History navigation

Numeric arguments in **setRoute** enables history navigation.

```tsx
setRoute("/") // change route to "/"
setRoute(-2)  // goes back two routes
setRoute(3)   // try to advance eleven routes
```

## Route parameters

The **GetRoute** get a route parameters.

```tsx
const App = (props: any) => <>
   <a route="/user/:id">User</a>
</>

getRoute()     // current route
getRoute("id") // route parameter
```

## Routing states

The **setRoute** could pass states and read by getRoute.

```tsx
setRoute("/", { ok:true}) 
const ok = getRoute("ok")
```