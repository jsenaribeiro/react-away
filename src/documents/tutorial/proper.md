# React Away

### [#](./index.md) | [i18n](./global.md) | [Storing](./storer.html) | [Routing](./router.md) | [Fetching](./syncer.md) | [Binding](./binder.md) | [Handling](./broker.md) | **Directive** | [CSS](./styler.md)

<hr />

## Configuration

Directives are registered ReactDOM createRoot.

````tsx
ReactDOM.createRoot(     
   strict: boolean,        // define strict mode
   root: string,           // root query selector
   app: JSX.Element,       // App JSX Element
   store: Class,           // store Class
   directives: Directive[] // custom directives
)
````

## Customization

Directive signature is a funciton that receives and returns props.

````tsx
function diretive(props: any, args: DirectiveArgs): any
````

The tag enables selective directive scope.

````tsx
function(props: any, args: DirectiveArgs) => 
   args.tag !== "input" ?  props : /* changed props here */
````

TypeScript requires a module declaration for the new attributes.

````tsx
declare module 'react' {
   export interface HTMLAttributes<T> { 
      myNewGlobalAttribute: boolean 
   } 
}
````

## Registration

React Away createRoot is the register for directives.

````tsx
import myDirective from './propers/cssClassName'

ReactDOM.createRoot(true, "#root", <App/>, context, [myDirective])
````