import { Global } from "../global"
import { context } from "../shared"
import { listener } from "../storer"
import { Router } from "./router"

declare const global: Global

export default function setRoute(router: Router, route: string, state?: any) {
   listener.dispatch(route, state)
   router.cursor++
   router.routes.push(route)
   router.routes.splice(router.cursor+1)   
   global.route = route
   context.render()
}