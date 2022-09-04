# React Away

### [#](./index.md) | [i18n](./global.md) | [Storing](./storer.html) | [Routing](./router.md) | [Fetching](./syncer.md) | [Binding](./binder.md) | [Handling](./broker.md) | **Directive** | [CSS](./styler.md)

<hr />

## Configuration

As the App component, directives are registered ReactDOM createRoot.

````tsx
ReactDOM.createRoot(     
   strict: boolean,        // define strict mode
   root: string,           // root query selector
   app: JSX.Element,       // App JSX Element
   context: any,           // object story
   directives: Directive[] // custom directives
)
````

## Customization

Directive signature is simillar to functional components. Receiving and returning props;

````tsx
function (props: CustomProps): CustomProps
````

The tag enables select specific elements or components to apply the directive.

````tsx
function(props: any, tag: string) => tag == "input" ?  props : ({...props})

function cssProps(props: any) => ({...props, className: props.css})
````

In TypeScript, it is required declaration for new attributes.

````tsx
declare module 'react' {
   export interface HTMLAttributes<T> { 
      myNewGlobalAttribute: boolean 
   } 
}
````

To apply yours directives, register it in ReactDOM.createRoot.

````tsx
import cssPropsAsClassNameAlternative from './propers/cssClassName'

const customDirectives = [cssPropsAsClassNameAlternative]

ReactDOM.createRoot(true, "#root", <App/>, context, customDirectives)
````

````css
.red { color:red }
````

````tsx
const App = () => <h1 css='red'>I'm red</h1>
````