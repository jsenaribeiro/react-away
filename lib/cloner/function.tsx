import React from "react"
import { context } from "."
import { createProxy } from "../storer/proxy"
import { deepClone, properHandler } from "./shared"
import { ChildArgs } from "./types"

export default function cloneFunction(args: ChildArgs) {  
   const child = args.child 
   context.count++

   return {
      ...child,
      type: function(props: any) { 
         const tagLabel = child.type.name as string
         const argState = createProxy(context.count)
         const newChild = child.type(props, argState)
         const letParam = (c:any) => ({tag: tagLabel, child:c, component: child.type})
         const newProps = properHandler(newChild.props, letParam(newChild))
      
         const children = React
            .Children.map(newProps.children, 
               (c:any) => deepClone(letParam(c)))
        
         return ({...newChild, props:{ ...newProps, children }})
      }      
   }
}