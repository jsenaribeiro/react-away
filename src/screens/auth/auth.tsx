import { Login, login, logon, logout } from "../../../lib"
import './auth.css'

export function Auth(props: any, state: Login) {
   return <>
      <h2 route="/unauthorized">Unauthorized</h2>

      <fieldset hidden={!!logon()}>
         <legend>Login</legend>

         <label>username</label>
         <input local bind="username" />
         
         <br/>
         
         <label>password</label>
         <input local bind="password" />

         <br/>

         <button onClick={e => login(state.username, state.password)}>Login</button>
      </fieldset>

      <br/><code hidden={!!logon()}>{ JSON.stringify(state) }</code>
      <br/>

      <section hidden={!logon()}>
         <pre>{ JSON.stringify(logon(), undefined, 3) }</pre><br/>
         <button onClick={e => logout()}>Logout { logon()?.username }</button>
      </section>   
   </>   
}