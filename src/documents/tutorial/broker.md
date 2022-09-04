# React Away

### [#](./index.md) | [i18n](./global.md) | [Storing](./storer.html) | [Routing](./router.md) | [Fetching](./syncer.md) | [Binding](./binder.md) | **Handling** | [Directive](./proper.md) | [CSS](./styler.md)

<hr />

## useEffect replacer

The listener replaces useEffect as a life-cycle handler.

````js
import { listener } from 'react-away'

listener.on("componentDidMount", x => log("componentDidMount by listener"))
listener.on("componentWillUnmount", x => log("componentWillUnmount by listener"))
````

Same implementation with React Hooks.

````js
function Sample() {
   useEffect(() => {
      log("componentDidMount by useEffect")
      return () => {
         log("componentWillUnmount by useEffect")
      }
   }))
}
````

## Full life-cycle

The listener is bound to root component and support all React life-cycle events.

````js
listener.on("componentDidMount", x => ...)
listener.on("componentDidUpdate", x => ...)
listener.on("componentWillUnmount", x => ...)
listener.on("componentDidCatch", x => ...)
listener.on("render", x => ...)
````

## Multiple listeners

The listeners also supports DOM, custom and route events.

````js
import { listener, dispatch } from 'react-away'

// React life-cycle event listener
listener.on("mounted", e => log("componentDidMount"))

// DOM event listener
listener.on("keydown", e => log("DOM keydom event"))

// routing event listener
listener.on("/routed", e => log("Route accessed"))
````

## Custom events

Custom pub/sub events.

````js
listener.on("myevent", e => log("My event happens"))
dispatch("myevent", "just a pub/sub testing...")
````

## Cancelable events

Cancellable event listener.

````js
import { listener } from 'react-away'

const callback = () => "anyway"
listener.on("custom", callback)

const subs = listener.subscribers

subs.filter(x => x.eventTag == "custom").cancel()
subs.filter(x => x.callback == callback).cancel()
````

## Life-cycle synonyms

Listener offers simple React life-cyle event synonyms for easy handling

| Methods              | Label     | Description                          |
| -------------------- | --------- | ------------------------------------ |
| componentDidMount    | ```"mounted"``` | After React appends a node in DOM     |
| componentDidUpdate   | ```"updated"``` | After React updates values in DOM     |
| componentWillUnmount | ```"unmount"``` | After React removes a node from DOM |
| componentDidCatch    | ```"catched"``` | After React thrown an exception       |