import {decode, encode} from 'base-64'

declare const global: any

export interface Global<T=any> {
   store: T
   state: any
   route: string
   locale: any
   back():void
   next():void
   atob(data: string): string
   btoa(data: string): string
   appendEvent(type: any, listener: (e: any) => any, options?: any): any
   removeEvent(type: any, listener: (ev: any) => any, options?: any): any
}

const getGlobal = () => {
   var isWeb = false

   try { eval('global') } catch { eval('window').global = eval('window') }

   try { isWeb = !!eval('location') }
   catch { isWeb = false }

   if (isWeb && !global.location.hash) {
      // initializing the hash root route in browser
      global.location.hash = window.location.hash || "/" 
   }

   console.log({global: global})

   Object.defineProperty(global, "route", {
      get() {  
         return isWeb 
            ? global.location.hash.slice(1) 
            : (global._route = global._route || '/');
      },
      set(value: string) {
         if (isWeb) global.location.hash = value
         else global._route = value
         global._history = global._history || []
         global._cursor = global._cursor || 0
         global._history.slice(0, global._cursor)
         global._history.push(value)         
      }
   })

   function back() {
      global._cursor = global._cursor || 0
      global._history = global._history || []
      if (global._history.length == 0) return
      if (global._cursor == 0) return

      global._route = global._history[--global._cursor]
   }

   function next() {
      global._cursor = global._cursor || 0
      global._history = global._history || []
      if (global._cursor >= global._history.length) return
      else global._route = global._history[++global._cursor]
   }   

   global.back = () => isWeb ? global.history.back() : back()
   global.next = () => isWeb ? global.history.go() : next()

   global.btoa = isWeb ? global.btoa : encode
   global.atob = isWeb ? global.atob : decode

   global.appendEvent = isWeb ? global.addEventListener : ((x,y,z) => null)
   global.removeEvent = isWeb ? global.removeEventListener : ((x,y,z) => null)
}

getGlobal()