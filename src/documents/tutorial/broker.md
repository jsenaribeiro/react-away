# React Away

### [#](./index.md) | [i18n](./global.md) | [Storing](./storer.html) | [Routing](./router.md) | [Fetching](./syncer.md) | [Binding](./binder.md) | **Handling** | [Directive](./proper.md) | [CSS](./styler.md)

<hr />

## Life-cycle synonyms

Simple synonyms for easy life-cyle handling.

| Methods              | Label     | Description                          |
| -------------------- | --------- | ------------------------------------ |
| componentDidMount    | ```"mounted"``` | After React appends a node in DOM     |
| componentDidUpdate   | ```"updated"``` | After React updates values in DOM     |
| componentWillUnmount | ```"unmount"``` | After React removes a node from DOM |
| componentDidCatch    | ```"catched"``` | After React thrown an exception       |

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

The listeners also supports DOM, routing, exception and route events.

````js
import { listener } from 'react-away'

listener.on("mounted", _ => console.log("componentDidMount"))
listener.on("keydown", _ => console.log("DOM keydom event"))
listener.on("failure", _ => console.log("any kind of error"))
listener.on("/routed", _ => console.log("Entered in route"))
listener.on("myEvent", e => console.log(e))
````

## Custom events

Custom event follows pub/sub models.

````js
listener.on("myevent", e => log("My event happens"))
listener.dispatch("myevent", "just a pub/sub testing...")
````

## Cancelable events

Cancellable event listener.

````js
import { listener } from 'react-away'

// cancel all subscribers of DOM 'click' event
listener.subscribers.filter(x => x.eventTag == "click").cancel()

// cancel a specific subscribed callback 
listener.subscribers.filter(x => x.callback == callback).cancel()
````

