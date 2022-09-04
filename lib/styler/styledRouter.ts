/**  @module Styling */

import { context } from "../shared"
import { appendCss } from './helper'
import { router } from '../router'

/**
 * Directive for routing render
 * @param {object} props current props
 * @returns {object} encapsulated isRouted
 */
export function routeHandling(props: any) {
   if (!props?.route) return props

   // applies in JSX elements the route visibility 
   if (!router.isRouted(props.route))
      props.hidden = true

   return { ...props }
}

/**
 * Directive for routing handler
 * @param {object} props current props
 * @returns {object} encapsulated setRoute
 */
export function onRouteHandling(props: any) {
   if (!props?.onRoute) return props
      
   let newProps = { ...props }

   // applies onClick event for onRoute
   newProps = {...newProps, onClick:(e:any) => 
      router.setRoute(newProps.onRoute)}
   
   // applies active-route className when element 
   // with onRoute property is in current route
   let isRouted = router.isRouted(newProps.onRoute)
   if (isRouted) newProps = {...newProps, ...appendCss(newProps, "routed")}   

   return {
      ...props,
      ...newProps
   }
}