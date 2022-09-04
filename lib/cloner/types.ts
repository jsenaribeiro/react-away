import React from "react"

type ClassComponent = { new(...args: any[]): React.Component }

export type TagType = "class"|"function"|"fragment"|"element"
export type Directive = (props: any, args: DirectiveArgs) => any
export interface ChildArgs { tag: string, child:any, component: Function }
export interface ChildrenArgs { tag: string, children:any, component: Function }
export interface DirectiveArgs { id: number, tag: string, component: Function }