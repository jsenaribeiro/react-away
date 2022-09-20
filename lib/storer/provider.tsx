/** @module Storing */

import React from "react"
import { cloneComponent } from '../cloner'
import { createProxy } from './proxy'
import { context } from "../shared"
import { listener } from './listener'
import { router } from "../router"
import { Global } from "../global"

declare const global: Global

/**
 * Store provider props
 */
export type ProviderProps = {
   src: any
   children?: any
}

/**
 * React Away provider class
 */
export class Provider extends React.Component<ProviderProps> {
   constructor(props: ProviderProps) {
      super(props)
      
      const refresh = () => this.setState({tick:new Date().getTime()})
      
      global.store = createProxy(props.src)

      context.render = (timeout: number = 1) => 
         ! context.enable ? undefined
         : setTimeout(() => refresh(), timeout)

      const route = router.getRoute()
      const value = router.getRoute("*")

      listener.dispatch(route, value)
   }

   public render() { 
      listener.dispatch("refresh", {})
      return cloneComponent(this)  
   }
   
   componentDidMount(): void { listener.register(true); listener.dispatch("mounted") }

   componentWillUnmount(): void { listener.register(false); listener.dispatch("unmount") }

   componentDidCatch = (error: Error, info: React.ErrorInfo) => 
      listener.dispatch("catched", { error, errorInfo: info })

   componentDidUpdate = (props: Readonly<any>, state: Readonly<any>, snapshot?: any) => 
      listener.dispatch("updated", { prevProps: props, prevState: state, snapshot })
}

