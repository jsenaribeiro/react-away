import React from "react"
import { letRoute } from '../router/letter'
import { focus } from '../storer/focus'
import { render } from "../registry"
import { ChildArgs, ChildrenArgs, Directive, TagType } from './types'
import { context } from "."

import cloneFunction from './function'
import cloneElement from './element'
import cloneFragment from './fragment'
import cloneClass from './class'

declare const global: any

const letChildren = (tag: string, child: any) => {
   return ({tag, children: child.props.children, component: child})
}

/**
 * Deep component cloning
 * @param {object} root root component
 * @param {object} tag initial tag name
 * @returns deep cloned component three
 */
export const cloneComponent = (root: any, tag: string = "App") => 
   (context.count = 1) && focus(() => cloneChildren(letChildren(tag, root)))

export const cloneChildren = ({tag, children, component}: ChildrenArgs) =>
     React.Children.map(children, child => cloneChild({tag, child, component}))

export const cloneChild = (args: ChildArgs): any =>
   ! letRoute(args.child) ? undefined
   : React.isValidElement<any>(args.child) 
   ? clone(args)
   : args.child

const clone = (args: ChildArgs) => 
   React.cloneElement(deepClone(args), { },      
      cloneChildren({...args, children: args.child.props.children}))

export const deepClone = (args: ChildArgs) => 
   ! render.directives?.length ? args.child
   : when(args.child, "class") ? cloneClass(args)
   : when(args.child, "element") ? cloneElement(args)
   : when(args.child, "fragment") ? cloneFragment(args)
   : when(args.child, "function") ? cloneFunction(args) 
   : args.child

const when = (child: any, ...types: TagType[]) =>
      types.includes("class") && child?.type?.toString().startsWith("class")
   || types.includes("fragment") && child?.type?.toString() == 'Symbol(react.fragment)' 
   || types.includes("element") && typeof child?.type === "string"
   || types.includes((typeof child?.type) as TagType)

   export const properHandler = (props: any, {tag, component}: ChildArgs): any =>
      (render.directives as Directive[])
         .map(fn => fn(props, { id: context.count, tag, component }))
         .reduce((last, next) => ({...last, ...next}))