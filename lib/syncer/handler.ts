
import { context, delay } from '../shared'
import { ApiAsync } from './class'
import { Exception } from '../types/error'
import { listener, Syncher } from '..'

var aborted = false

export const caching = {} as any
export const aborter = new AbortController()

export async function handler(that: Syncher, type: "LOAD"|"SAVE", 
   key: any, action: () => Promise<any>, retries = 1, pooling = false) {
   
   if (typeof action !== "function") console.warn(typeof action, action)

   const config = that.api.config

   const loop = () => handler(that, type, key, action, retries, true)
   const retry = () => handler(that, type, key, action, retries + 1)
   const cancel = () => aborter.abort("Request timeout...")
   const timeout = setTimeout(cancel, config.timeout) 

   that.canceller = () => {
      aborter.abort()
      aborted = true
   }

   try {      
      if (pooling == false) aborted = false
      if (pooling) console.log({pooling, aborted})

      that.isFailure = false
      that.isSuccess = false
      that.isLoading = true
      that.exception = new Exception()      
      context.render()

      if (config.pooling && !aborted)
         setTimeout(loop, config.pooling)

      if (type == "SAVE") await onCommand()
      if (type == "LOAD") return await onQuery()
   }
   catch(error: any) {      
      if (retries < config.retries) 
         return setTimeout(retry, 1000 * retries)
   
      that.isFailure = true
      that.exception = new Exception(error)
      console.error("ReactDOM: " + type, error)
      config.catcher && config.catcher(error)
      listener.dispatch("failure", error)
   }
   finally {
      clearTimeout(timeout)
      that.outOfSync = false
      that.isLoading = false
      context.render() 

      return Promise.resolve()
   }

   async function onQuery() {
      if (caching[key]) return caching[key]   
      else caching[key] = await action()
      const cacheTimeout = config.caching
      const clearCache = () => delete caching[key]
   
      setTimeout(clearCache, cacheTimeout)
   }

   async function onCommand() {
      await action()
      that.isSuccess = true
      setTimeout(() => that.isSuccess = false, 500)
   }
}


