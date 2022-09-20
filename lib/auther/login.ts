/** @module Authoring */

import { decode, encode } from 'base-64'

import { router } from '../router'
import { context } from '../shared'
import { listener } from '../storer'
import { Login } from './types'

const INVALID = "invalid" 
const UNAUTHORIZED = "unauthorized"

declare const global: any

/**
 * Get the current decoded token
 * @returns decoded token
 */
export function logon() { 
   const token = sessionStorage.getItem("token")
   return token ? parseJWT(token) : undefined
}

/**
 * Remove current logged user token
 */
export function logout(): void  { 
   sessionStorage.removeItem("token") 
   router.setRoute("/")
   // context.render()
}

/**
 * Authenticate with current username and password
 */
export function login(): Promise<any>

/**
 * Authentication request
 * @param {string} username username
 * @param {string} password password
 */
export function login(username: string, password: string): Promise<any>
export function login(username: string, password: string, timeout: number): Promise<any>
export function login(username: string, password: string, timeout: number, retry: number): Promise<any>
export async function login(username?: string, password?: string, timeout = 1000, retry = 7) {
   const none = username === undefined && password === username
   const credential = none
      ? sessionStorage.getItem("login") || ""
      : context.config.encript 
      ? encode(`${username}:${password}`)
      : JSON.stringify({ username, password })

   if (!credential) throw new Error("login: no credential")

   const headers = new Headers() 

   headers.append("content-type", "application/json; charset=UTF-8")

   if (context.config.method === "GET") 
      headers.append("Authorization", `Basic ${credential}`)

   const body = context.config.method === "POST" ? credential : undefined

   try {
      const settings: RequestInit = { body, headers }
      const response = await fetch(context.config.address, settings)
      
      if (response.status === 401) throw UNAUTHORIZED
      if (response.ok === false) throw INVALID

      const value = await response.json()
      const token = context.config.getToken(value)
   
      sessionStorage.setItem("token", token)
      sessionStorage.setItem("login", credential)

      router.setRoute(context.config.routes.success)
   }
   catch (ex: any) {
      const relogin = () => username && password 
         ? login(username, password, timeout * 2)
         : login()

      if (ex === UNAUTHORIZED && context.config.relogin) 
         setTimeout(relogin, timeout)

      else router.setRoute(context.config.routes.failure)

      listener.dispatch("failure", ex)
   }      
   finally {
      return context.config
   }
}

export type JWT = { exp: number, iat: number, sub:string, iss:string, aud:string }

export function parseJWT(token?: string | null): Login & JWT {
   if (!token) return {} as any

   const parseJwtArray = (c: string): string => 
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)

   const address = token.split('.')[1]
   const base64 = address.replace(/-/g, '+').replace(/_/g, '/')
   const array = decode(base64).split('')
   const payload = decodeURIComponent(array.map(parseJwtArray).join(''))

   return JSON.parse(payload)
}