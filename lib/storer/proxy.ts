/** @module Storing */

type record = Record<any, any>

declare global {
   interface Object {
      toObject(): any
   }
}

declare const global: record

Object.prototype.toObject = function() {
   return JSON.parse(JSON.stringify(this))
}

import { context } from '../shared'

/**
 * Generate a deep proxy object
 * @param {object} store initial store object
 * @returns {Proxy} deep proxy object
 */
export function createProxy(store: record): ProxyConstructor

/**
 * Generate a deep proxy object for local state
 * @param {object} store initial store object
 * @returns {Proxy} deep proxy object
 */
 export function createProxy(index: number): ProxyConstructor

export function  createProxy(indexOrObject: record|number): ProxyConstructor {
   return typeof indexOrObject === "number"
      ? createProxyLocal(indexOrObject as number)
      : createProxyGlobal(indexOrObject as record)
}

function createProxyLocal(index: number) {
   if (!window['state']) window['state'] = { } as any
   if (!window['state'][index]) window['state'][index] = objectProxy({})
   
   return window['state'][index]
}

function createProxyGlobal(store: record) {
   return objectProxy(store)
}

function get(refer: any, field: string) {
   return refer[field]
}

function set(refer: any, field: string, value: any): boolean {
   const isNew = !Object.keys(refer).includes(field)
   const isArray = Array.isArray(value)
   const isObject = typeof value === "object" && !isArray

   setTimeout(() => context.render(), 1)

   refer[field] = isArray ? arrayProxy(value) 
      : isNew && isObject ? objectProxy(value)
      : value   

   context.asyncs
      .filter(x => x.isRelated(refer))
      .forEach(x => x.outOfSync = true)

   return true
}

function objectProxy(ref: any): ProxyConstructor {
   const proxy = {} as any

   for (const field in ref) {
      if (Array.isArray(ref[field])) 
         proxy[field] = arrayProxy(ref[field])

      else if (typeof ref[field] == "object")
         proxy[field] = objectProxy(ref[field])

      else proxy[field] = ref[field]
   }

   return new Proxy(proxy, { set, get })
}

function arrayProxy(ref: any[]): ProxyConstructor {
   const array = ref.map((x:any) => objectProxy(x))

   return new Proxy(array, { set, get })
}