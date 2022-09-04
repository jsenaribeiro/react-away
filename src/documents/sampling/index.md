## **Common | [Todo](./basic.md) | [Todo + Fetching](./async.md)**

<hr/>

## Index.ts

````tsx
import App from './App'
import Store from './Store'
import ReactDOM, from 'react-away'

ReactDOM.createRoot(false, "#root", <App />, new Store())
````

## Store.ts

````tsx 
export default class Store {
   public todos: Todo[] = []
}

export class Todo {
   public code: number
   public text: string
   public done: boolean

   constructor(text: string) {
      this.code = new Date().getTime()
      this.text = text
      this.done = false
   }
}
```` 