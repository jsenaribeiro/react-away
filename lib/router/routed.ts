/** @module Routing */

import { Global } from "../global"
import { context } from "../shared"

declare const global: Global

/**
 * Evaluate if the element is routed if there is a route props
 * @param {JSX.Element} child current element
 * @returns {boolean} check if the child element is routed
 */
export function inRouted(child: JSX.Element): boolean {
   if (!child?.props?.route) return true

   const elementRoute = child.props.route as string
   const currentRoute = global.route
   const patternRoute = elementRoute
      .replace(/\/:.+?\//gi, "/(.+)/")
      .replace(/\/:.+?$/gi, "/(.+)")
      .replace(/\//g, "\/")

   if (elementRoute === "/" && currentRoute === "/") return true

   const models = elementRoute.split('/')
   const labels = models.filter(m => m[0] == ":")

   const already = context.routes
      .filter(x => x.regex == patternRoute)
      .some(x => x.names.every((p:any) => labels.includes(p)))

   if (already == false) context.routes
      .push({regex: patternRoute, names: labels})

   var has = new RegExp(patternRoute, "gi")
      .test(currentRoute) && elementRoute != "/"

   return has
}