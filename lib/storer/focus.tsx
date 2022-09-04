// bugfix: to return to original focus after the cloning
export const focus = (fn: () => any, timeout = 1) => {
   //console.log("render...")
   
   // get all element with same tag of current fucused element
   const getAllTagOfFocusedElement = () => Array.from(document
         .querySelectorAll<HTMLElement>(focused?.tagName ?? "."))

   // get the current fucused element
   const focused = document.activeElement

   // get the index element with focused tag name
   const index = getAllTagOfFocusedElement()
      .map((x, i) => x === focused ? i : -1)
      .find(x => x >= 0) || 0

   // refocus the original element after 33 ms with the index
   setTimeout(() => getAllTagOfFocusedElement()[index]?.focus(), timeout)

   // executes original function
   return fn()
}