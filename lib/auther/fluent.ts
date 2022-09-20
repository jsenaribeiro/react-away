import { Authenticator } from "./setup"

/**
 * Authetication settings for ReactDOM startup
 */
export default class AuthenticationFluent {
   private app: JSX.Element
   
   constructor(app: JSX.Element) { this.app = app }

   public authentication(method: "GET"|"POST", relogin: boolean, encript: boolean) {
      return new Authenticator(this.app, method, relogin, encript) 
   }
}