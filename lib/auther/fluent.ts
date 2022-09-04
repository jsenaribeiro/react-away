import { Authenticator } from "./setup"

/**
 * Authetication settings for ReactDOM startup
 */
export default class AuthenticationFluent {
   public authentication(method: "GET"|"POST", relogin: boolean, encript: boolean) {
      return new Authenticator(method, relogin, encript) 
   }
}