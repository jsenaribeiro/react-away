/** @module Authoring */

/**
 * Credential login authentication contract
 */
export interface Login { username:string, password:string }

/**
 * Semantic JWT token
 */
export interface Token {
   identity: string
   expireAt: number
   creation: number
   audience: string
   issuedBy: string
}