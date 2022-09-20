//REDO /** @module Authoring */

import AuthenticatorRoute from "./route"

/**
 * Authentication Token fluent class
 */
export default class AuthenticatorToken  {
   private url = ""
   private app: JSX.Element
   private encript = false
   private relogin = false
   private method: "GET"|"POST" = "POST"
   
   constructor(
      app: JSX.Element,
      url: string, 
      method: "GET"|"POST", 
      encript: boolean,
      relogin: boolean) {
         this.method = method
         this.encript = encript
         this.relogin = relogin
         this.url = url
         this.app = app
   }   

   /**
    * Select the field of token in response object
    * @param {function} getToken selector function for token field
    * @returns return an fluent route class
    */
   public token(getToken: (data: any) => any): AuthenticatorRoute {
       return new AuthenticatorRoute(
         this.app, 
         this.url, 
         this.method, 
         this.encript, 
         this.relogin,
         getToken
      )
   }
}