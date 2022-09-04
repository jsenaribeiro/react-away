/** @module Storing */

import { context } from "../shared"

type record = Record<string|symbol,any>

declare const window: any

const ERROR_ROOT_OBJECT = new Error("letStore only selects sub-objects")
const ERROR_VALUE_SELECTED = new Error("letStore only selects objects, not values")

/**
 * Instantiate in global scope an smaller inner object from store object
 * @param {function} select select an inner object from store object
 */
export function useStore<T=any, U=any>(select: (store: T) => U) {
   const parts: string[] = select.toString().split('.')
   if (parts.length < 2) throw ERROR_ROOT_OBJECT

   const field: string = parts[parts.length-1]
   window[field] = {}

   Object.defineProperty(window, field, {
      get: function() { 
         const selected = select(window.store) 
         const isNotAnObject = typeof selected != "object"
         if (isNotAnObject) throw ERROR_VALUE_SELECTED
         return selected
      },
      set: function(value:any) { 
         return context.storer(field, value)
      }
   })
}