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


````ts
export interface Locale { welcome: string }   

````

````ts
import { Locale } from './locale'

const en: Locale = {
   language: "en",
   identity: "English",
   currency: (value) => `$ ${value.toFixed(2)}`,
   datetime: (value) => value.toISOString(),
   welcome: "Welcome"
}

export default en

````

## Functional parametrization

Parametrized translation with simple functions

````ts
export default Locale extends I18N {
   welcome: string,
   hello: (who: string) => string
}
````

## Startup configuration

Join all locales with globalization object with its path.

```ts
import ReactDOM from 'react-away'
import locales from './locales'

ReactDOM.createRoot(true, "#root", <App />, Store)
   .globalization(locales, true)  

export default Locale extends I18N {
   hello(who: string): string
}
```

## Changing language

The default navigation language could be changed by useLanguage.

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