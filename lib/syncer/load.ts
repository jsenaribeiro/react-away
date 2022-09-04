/** @module Synching */

import Syncher from "./syncher"
import { aborter, handler } from './handler'
import { context } from '../shared'

/**
 * Loading request by HTTP get verb
 * @param {Syncher} syncher Syncher instance
 * @param {object} filter query object for query string GET request
 * @returns responde queried from RESTful API
 */
export async function loadAsync(syncher: Syncher, filter: any): Promise<any> {   
   const that = syncher.api
   const headers = await that.headers()
   const queries = filter && "?" + new URLSearchParams(filter)
   const settings: RequestInit = { headers, signal: aborter.signal }
   const route = that.config.search?.route || that.config.route
   const url = that.config.url + route + queries

   return await handler(syncher, "LOAD", route + queries, async () => 
   {
      const response = await fetch(url, settings)
      const result = await response.json()

      context.storer(that.config.map, result)

      return result
   });
}

