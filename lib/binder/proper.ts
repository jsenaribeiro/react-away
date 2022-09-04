import { DirectiveArgs } from '../cloner'
import { twoWayDataBindingForm} from './form'
import { twoWayDataBindingControl } from './input'

export default (props: any, args: DirectiveArgs) => {
   const prop1 = twoWayDataBindingForm(props, args)
   const prop2 = twoWayDataBindingControl(prop1, args)

   return prop2
}

