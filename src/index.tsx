import './App.css'
import './index.css'
import Store from './Store'
import locales, { Locale } from './locales'
import { registry, router } from '../lib'
import { Hello, Counter, Params, TodoList, Form, Auth } from './screens'

declare const i18n: Locale

const App = () => <>
   <h1>React Away</h1>
   <hr />
   <div>
      <button onRoute="/">Home</button>
      <button onRoute="/hello">Hello</button>
      {/* <button onRoute="/counter">Counter</button>  */}
      <button onRoute="/params/1">Params</button> 
      <button onRoute="/login">Login</button>
      <button onRoute="/todo">Todo</button>
      <button onClick={router.back}>Back</button>
      {/* <button onRoute="/form">Form</button> */}
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
      <h2>{ i18n.welcome }</h2>
   </section>
</>

export default registry(false, App, Store)
   .globalization(locales, true)
   .authentication("GET", false, true)
      .login("http://localhost:4000/login")
      .token(s => s.access_token)
      .route("/", "/unauthorized")
      .build()