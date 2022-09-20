/** @module Binding */

import { DirectiveArgs } from "../cloner"
import { valuer } from "../storer/valuer"

declare const global: any

const isTwoWayDataBindingElement = (args: DirectiveArgs) => 
   ["input", "select", "textarea"].includes(args.tag)

interface Handle {
   props: any
   value: any
   event: (e: any) => any
}

/**
 * Directive for input two-way data binding
 * @param {object} props current props
 * @param {DirectiveArgs} args directive args
 * @returns handles bind props for two-way data binding
 */
export function twoWayDataBindingControl(props: any, args: DirectiveArgs) {
   if (!props?.bind) return props
   if (!isTwoWayDataBindingElement(args)) return props

   const field = props.bind
   const state = props.local ? global.state[args.id] : global.store
   const value = valuer(state, field)
   const event = (e:any) => valuer(state, field, e.target.value)
   const model = { props, value, event }

   return args.tag == "input" && props.type == "radio" ? radio(model)
      : args.tag == "input" && props.type == "checkbox" ? checkbox(model)
      : args.tag == "input" ? input(model)
      : args.tag == "select" ? select(model)
      : args.tag == "textarea" ? textarea(model)
      : props
}

const input = (h: Handle) => ({...h.props, value: h.value, onInput: h.event })
const textarea = (h: Handle) => ({...h.props, value: h.value, onChange: h.event })
const select = (h: Handle) => ({...h.props, value: h.value, onSelect: h.event })
const radio = (h: Handle) => ({...h.props, checked: h.value, onChange: h.event })
const checkbox = (h: Handle) => ({ ...h.props, checked: h.value, onInput: h.event })