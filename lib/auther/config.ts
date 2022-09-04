/** @module Authoring */

/**
 * Authenticator configuration object
 */
export default interface AuthenticatorConfig {
   address: string
   encript: boolean
   relogin: boolean
   method: "GET"|"POST"
   getToken: (data: any) => any
   routes: {
      success: string
      failure: string
   }
}