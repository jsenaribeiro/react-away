/**  @module Styling */

import { appendCss } from "./helper"

/**
 * Suggar syntax alterantive for className
 * @param {object} props current props
 * @returns {object} css props as className alterantive
 */
export const cssClassNameAlternative = (props: any) =>
   ! props ? props : { ...props, ...appendCss(props, props.css) }   