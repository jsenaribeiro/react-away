/**  @module Styling */

/**
 * Adds a new CSS class name in current className list
 * @param {object} props current properties
 * @param {string} newClass  new CSS class name to append
 * @returns {object} props with new CSS class name added
 */
 export function appendCss(props: any, newClass: string) {
    const noProps = !props 
    const noNewClass = !newClass
 
    if (noProps || noNewClass) return props 
    
    const classes = [props.className || "", newClass || ""]
    const className = classes.join(" ").trim()
 
    // classes.includes("del") && console.log("appendCSS", className)
    
    const newProps = {...props, className}
 
    return newProps
 }