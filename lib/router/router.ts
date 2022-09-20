/** @module Routing */

import { Global } from "../global"
import { context } from "../shared"
import getRoute from "./getter"
import isRouted from "./routed"
import setRoute from "./setter"

declare const global: Global

export interface RouteQuery {
   regex: string;
   names: string[];
}

/**
 * Router class
 */
export class Router {      
   public cursor: number = 0
   public routes: string[] = []
   public get routed() { 
      console.log(this.routes, this.cursor)
      return this.routes[this.cursor] 
   }

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

   public getRoute<T=any>(parameter?: string): T { return getRoute<T>(parameter) }
  
   /**
    * Change the current route
    * @param {string} route the new route
    */
   public setRoute(route: string): void;

   /**
    * Change the current route
    * @param {string} route the new route
    * @param {object} state state to route
    */
   public setRoute(route: string, state: any): void;
   
   public setRoute(route: string, state?: any): void { 
      return setRoute(this, route, state) 
   }

   /**
    * Check if the argument is routed
    * @param {string} route route to check
    */
   public isRouted(route: string): boolean { return isRouted(route) }

   private move(type: "back"|"go") {
      eval(`history.${type}()`)
      global.route = eval('localtion.hash').slice(1)
   }

   public back() {
      if (router.cursor <= 0) return
      else router.cursor = router.cursor - 1
      try { router.move("back") } 
      catch { global.route = router.routed }
      finally { context.render() }
   }

   public next() {
      if (router.cursor >= router.routes.length-1) return
      else router.cursor = router.cursor + 1      
      try { router.move("go") } 
      catch { global.route = router.routed }
      finally { context.render() }
   }
}

export const router = new Router()