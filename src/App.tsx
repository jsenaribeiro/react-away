import './App.css'
import { Hello } from './screens/hello'
import Counter from './screens/counter/counter'
import { Params } from './screens/params'
import { TodoList } from './screens/todo'
import { Form } from './screens/form'
import { useLanguage  } from '../lib'
import { Auth } from './screens/auth'
import { Locale } from './locales'

useLanguage("pt")

declare const locale: Locale

export default (props: any) => <>
   <h1>React Away</h1>
   <hr />
   <div>
      <button onRoute="/">Home</button>
      <button onRoute="/hello">Hello</button>
      <button onRoute="/counter">Counter</button> 
      <button onRoute="/params/1">Params</button> 
      <button onRoute="/login">Login</button>
      <button onRoute="/todo">Todo</button>
      <button onRoute="/form">Form</button>
   </div>

   <section>
      <Hello route="/hello" />      
      <Counter route="/counter" />
      <Params route="/params/:id" />
      <TodoList route="/todo" />
      <Form route="/form"/>
      <Auth route="/login" />
   </section>

   <section route="/">
      <h2>{ locale.welcome }</h2>
   </section>
</>
