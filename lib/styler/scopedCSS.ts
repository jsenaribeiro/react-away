/**  @module Styling */

import { appendCss } from "./helper"
import { Directive, DirectiveArgs } from "../cloner"

/**
 * Directive that injects component name as className in each inner element/component
 * @param {object} props current props
 * @param {DirectiveArgs} args directive args
 * @returns {object} className with container component tag name
 */
export const componentScopedCSS: Directive = (props: any, args: DirectiveArgs) => {
   return ({ ...props, ...appendCss(props, args.component.name || "errou") })
}
   
   