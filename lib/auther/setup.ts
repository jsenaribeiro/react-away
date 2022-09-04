/** @module Authoring */

import AuthenticatorToken from "./token"

/**
 * Authenticator class
 */
export class Authenticator {
   private relogin = false
   private encript = false
   private method: "GET"|"POST"

   constructor(method: "GET"|"POST", relogin: boolean, encript: boolean) {
      this.encript = encript
      this.relogin = relogin
      this.method = method
   }

   /**
    * Receive the login URL addreess
    * @param address login URL
    * @returns fluent authenticator token class
    */
   public login(address: string): AuthenticatorToken {      
      return new AuthenticatorToken(address, this.method, this.encript, this.relogin)
   }
}