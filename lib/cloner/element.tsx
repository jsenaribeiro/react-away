import { cloneChildren, properHandler } from "./shared"
import { ChildArgs } from "./types"

export default function cloneElement(args: ChildArgs) {
   const { tag, child, component } = args
   const nodeArgs = { ...args, tag: child.type }
   const newProps = properHandler(args.child.props, nodeArgs)
   const children = cloneChildren({ tag, children: newProps.children, component })

   return {...child, props: { ...newProps, children }}
}