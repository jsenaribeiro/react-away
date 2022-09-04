# React Away

### [#](./index.md) | **i18n** | [Storing](./storer.html) | [Routing](./router.md) | [Fetching](./syncer.md) | [Binding](./binder.md) | [Handling](./broker.md) | [Directive](./proper.md) | [CSS](./styler.md)

<hr />

## I18N interface 

I18N interface offers a essential localization with currency, datetime, language and identity (label).

````ts
export interface I18N { 
   identity: string
   language: string
   datetime(value: Date): string
   currency(value: number): string
}
````

## Typed-oriented locales

Create your locales as just objects (no JSON parsing cost and type-check enable with TypeScript).

```ts
export interface Locale { title: string, hello: string }   // in locale.ts
export default { hello: "alô mundo", title: "meu título" } // in pt-br.ts
export default { hello: "hello world", title: "my title" } // in en-us.ts
```

## Functional parametrization

Parametrized translation with simple functions

````ts
export default Locale extends I18N {
   welcome: string,
   hello: (who: string) => string
}

export const en:Locale = {
   language: "en",
   identity: "English",
   currency: (money: number) => `$ ${money.toFixed(2)}`,
   datetime: (value: Date) => value.toUTCString(),
   welcome: "Welcome",
   hello: (who: string) => `Hello ${who}`
}

const cssPropsExceptForm = (props: any, args: DirectiveArgs) => 
   args.tag == "form" : props : ({...props, className: props.css })


import { cssPropsExceptForm } from './cssPropsExceptForm'

const directives = [cssPropsExceptForm]

ReactDOM.createRoot(true, "#root", <App />, store, directives)

function directive(props: Props<T>, args: DirectiveArgs): Props<T|any>


````

## Startup configuration

Join all locales with globalization object with its path.

```ts
import ReactDOM from 'react-away'
import locales from './locales'

ReactDOM.createRoot(true, "#root", <App />, context)
   .globalization(locales, true)  

export default Locale extends I18N {
   hello(who: string): string
}

export default synchronizer({
   uid: "id",
   url: "http://localhost:3000/hello",
   map: (s: Store) => s.hello,

   update: {
      route: "/update",
      hasIdField: false,
   }
})


import { login, logon, logout } from 'react-away'

await login("test", 123)
const user = logon()
logout()

import { syncher } from 'react-away'
import { helloAsync } from '../asyncs/hello'

declare const store: any
const { onSave } = helloAsync()
const Hello = (props) => <>
   { syncher.isLoading && <progress /> }
   <h1>Hello, { store.hello }</h1>
   <button onClick={onSave}>Save</button>
   <input bind="hello" />
</>

import { listener } from 'react-away'

listener.on("custom", e => log(e))
listener.dispatch("custom", true)

```

## Changing language

Navigation language is selected by default, the useLanguage change the current language manually.

```ts
import { useLanguage } from 'react-away'

declare const locale: any

useLanguage("pt")

const App = () => <>
   <h1> { locale.title } </h1>
   <h2>Hello, { locale.hello("Mundo") }</h2>
</>
```

## 