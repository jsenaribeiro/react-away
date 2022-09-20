import { Global } from "../global"

declare const global: Global

export default function isRouted(route: string): boolean {
   if (!route) return false

   const current = global.route
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