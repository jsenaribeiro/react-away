//REDO /** @module Authoring */

import { context } from "../shared"
import AuthenticatorConfig from "./config"

interface BuildApp { build: () => JSX.Element }

/**
 * Authenticator fluent class
 */
export default class AuthenticatorRoute {
   private app: JSX.Element
   private url = ""
   private encript = false
   private relogin = false
   private method: "GET"|"POST" = "POST"
   private getToken: (data: any) => any = (x => x)
   
   constructor(
      app: JSX.Element,
      url: string, 
      method: "GET"|"POST",
      encript: boolean,
      relogin: boolean,
      getToken: (data: any) => any = (x => x)) {
         this.getToken = getToken
         this.encript = encript
         this.relogin = relogin
         this.method = method
         this.url = url
         this.app = app
   }   

   public route(successRoute: string, failureRoute: string, timeout:number = 1000): BuildApp  {
      context.config = {
         address: this.url,
         encript: this.encript,
         getToken: this.getToken,
         method: this.method,
         relogin: this.relogin,
         routes: {
            failure: failureRoute,
            success: successRoute
         }
      }

      return { build: () => this.app }
   }
}
