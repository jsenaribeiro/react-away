import { DirectiveArgs } from '../cloner'
import { cssClassNameAlternative } from './propCSS'
import { componentScopedCSS } from './scopedCSS'
import { routeHandling, onRouteHandling }  from './styledRouter'

export default (props: any, args: DirectiveArgs) => {
   const prop1 = componentScopedCSS(props, args)
   const prop2 = cssClassNameAlternative(prop1)
   const prop3 = onRouteHandling(prop2)
   const prop4 = routeHandling(prop3)

   return prop4
}