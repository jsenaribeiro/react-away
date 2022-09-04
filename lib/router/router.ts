/** @module Routing */

import { context } from "../shared"
import { listener } from "../storer"

export interface RouteQuery {
   regex: string;
   names: string[];
}

/**
 * Router class
 */
export class Router {   
   public listeners: Record<string, Function[]> = {} 
   
   /**
    * Get the current route
    */
   public getRoute():string;

   /**
    * Get the route parameter by argument
    * @param parameter router parameter label
    * @returns route parameter value
    */
   public getRoute<T=any>(parameter: string):T;

   /**
    * Change the current route
    * @param {string} route the new route
    * @param {object} state state to route
    */   
   public getRoute<T=any>(parameter?: string): T {  
      const route = window.location.hash.slice(1)
      const param: Record<string, any> = { }
      const match = (x: any) => new RegExp(x.regex, "gi").test(route)
      const tests = context.routes.filter(match) 
      const parse = (data: string): any => {
         const content = data.toLowerCase()
         const numeric = /^\d+$/.test(content)
         const logical = /true|false/.test(content)
         const parsing = numeric || logical

         return parsing ? JSON.parse(content) : data
      }

      if (!parameter) return route as any as T

      if (!tests || !tests.length) return route as any as T

      for (const found of tests) {
         if (!found || !found.regex) continue

         const regexp = new RegExp(found.regex, "gi")
         const params = [...route.matchAll(regexp)]
   
         if (!params) continue
         
         for (let i=0; i < found.names.length; i++)
            param[found.names[i].slice(1)] = parse(params[0][i+1])
      }

      return parameter === "*" ? param : param[parameter]
   }

   /**
    * Change the current route
    * @param {string} route the new route
    * @param {object} state state to route
    */
   public setRoute(route: string, state?: any): void;

   /**
    * History route navigation
    * @param {number} steps number of navigation steps
    */
   public setRoute(steps: number): void;

   public setRoute(route: string | number | undefined, state?: any): void {
      const that = this

      const setRouteString = (route: string) => {
         const listeners = router.listeners

         if (listeners[route]?.length > 0) 
            listeners[route].forEach(f => f())
         
         window.location.hash = route

         listener.dispatch(route, state)
         
         context.render()
      }
   
      const setRouteNumber = (index: number) => {
         if (index > 0) while(index-- > 0) window.history.go()
         if (index < 0) while(index++ < 0) window.history.back()
         context.render()
      }

      typeof route == "string" ? setRouteString(route)
         : typeof route == "number" ? setRouteNumber(route)
         : context.render()
   }

   /**
    * Check if the argument is routed
    * @param {string} route route to check
    */
   public isRouted(route: string): boolean {
      if (!route) return false

      const current = window.location.hash.slice(1)
      const routing = current.split('/')
      const queried = route.split('/')

      if (current === "/") return route === current

      for (let i=0; i<queried.length; i++) {
         if (routing[i] == undefined) continue
         if (queried[i] == undefined) continue
         if (routing[i].length == 0) continue
         if (queried[i][0] === ":") continue
         if (routing[i] !== queried[i]) return false
      }

      return true
   }
}

export const router = new Router()