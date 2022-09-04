import React from "react"
import { deepClone, properHandler } from "./shared"
import { createProxy } from "../storer/proxy"
import { ChildArgs } from "./types"
import { context } from "."

declare const window: any

export default function cloneClass(args: ChildArgs) {
   return args.child
}

function cloneClassFail(args: ChildArgs) {   
   const child = args.child
   context.count++

   function clone(props: any) {
      const tagLabel = child.type.name as string
      const argState = createProxy(context.count)
      const letParam = (child:any) => ({tag: tagLabel, child, component: child.type})
      const letProps = properHandler(props, letParam(child))
   
      const children = React
         .Children.map(letProps.children, 
            (c:any) => deepClone(letParam(c)))
   
      const newProps = { ...props, ...letProps, children }
   
      console.log(tagLabel, {child:child, newProps})
   
      return new child.type({ hidden:true } , argState)
   }

   function test(props:any) {
      
      const newProps = {
         ...child.props,
         hidden: true
      } 

      React.Component.call(child.type, newProps, {})

      const newChild = {  ...child, props: newProps }

      child.type.prototype.constructor.props = newProps
      console.log("test", child.type.prototype.constructor.props)
      
      const info = new newChild.type(newProps, {})

      console.log(child.props, info.props, newChild.props)

      

      return info
   }

   return { ...args.child, type: test }
}



// class CloneClass extends React.Component {
//    public state: any
//    public child: any

//    constructor(props: any, state:any, child: any) {
//       super(props)
//       this.state = state
//       this.child = child

//       clone(prop)
//    }

//    public render() {
//       return this.child.render()
//    }
// }