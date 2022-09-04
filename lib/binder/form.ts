
/** @module Binding */

import { context } from '../shared'
import { DirectiveArgs } from '../cloner'

/**
 * Directive for two-way data binding in form element
 * @param {object} props current props
 * @param {DirectiveArgs} args directive args
 * @returns handled bind props for two-way data binding in uncontrolled components
 */
export function twoWayDataBindingForm(props: any, args: DirectiveArgs) {
   if (args.tag !== "form") return props
   if (!props?.bind) return props

   const currentOnSubmit = props.onSubmit

   function getChildren(names: string[], child: any) {
      const children: any[] = !!child?.props?.children?.map
         ? props.children.map((c:any) => getChildren(names, c))
         : []

      if (names.includes(props.name)) children.push(child)

      return children
   }

   const onSubmit = (e: any) => {
      e.preventDefault()
      e.stopPropagation()
      e.nativeEvent.submitter.onclick = "return false"

      const inputs = Array.from(e.target.elements) as any[]
      const names = inputs.map((x:any) => x.name) 
      const childrenGetByFormNames = props.children
         .flatMap((c:any) => getChildren(names, c).flatMap(x => x))
      
      childrenGetByFormNames // validate -> setCustomValidity
         .filter((x:any) => x.props.validate)
         .map((x:any) => [x.props.name, x.props.validate()])
         .filter((array: any[]) => !!array[1])
         .forEach((array: any[]) => {
            const [field, error] = array
            const input = inputs.find((i:any) => i.name == field)
            if (input) input.setCustomValidity(error)
         })

      const errors = inputs
         .filter((x:any) => !!x.validationMessage)
         .map((x:any) => ({
            error: x.validationMessage,
            value: x.value,
            field: x.name
         }))      

      if (errors.length === 0) inputs.forEach(i => {
         context.enable = false
         const field = props.bind + "." + i.name
         context.storer(field, i.value)
         setTimeout(() => context.enable = true, 11)
      })

      return props.onCommit(errors)
   }

   return {
      ...props,      
      method: "GET",
      onSubmit
   }
}