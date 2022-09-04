import React from "react"
import { Store } from "../../context"
import { Locale } from "../../locales"
import "./hello.css"

declare const store: Store
declare const locale: Locale

interface State { hello?: string }

export const Hello = (props: any, state: State) => <>
   <fieldset className="anyway">
      <legend css="primary"> { locale.stateManagement } </legend>

      <section>
         <aside>
            <h3>Local state</h3>
            <input local bind="hello" />
            <label>Hello, { state.hello || "World" }</label>
         </aside>

         <aside>
            <h3>Global state</h3>
            <input bind="hello" />
            <label>Hello, { store.hello }</label>
         </aside>         
      </section>

   </fieldset>
</>

// export class Hello extends React.Component {
//    public state: any = {};

//    constructor(props: any, state: any) {
//       super(props)
//       console.warn("Hello", props, state)
//       setTimeout(() => this.setState(state), 1500)
//    }

//    public render() {
//       console.log("render", this.props, this.state)
//       return (
//          <fieldset className="anyway">
//             <legend css="primary"> { locale.stateManagement } </legend>
      
//             <section>
//                <aside>
//                   <h3>Local state</h3>
//                   <input local bind="hello" />
//                   <label>Hello, { this.state.hello || "World" }</label>
//                </aside>
      
//                <aside>
//                   <h3>Global state</h3>
//                   <input bind="hello" />
//                   <label>Hello, { store.hello }</label>
//                </aside>         
//             </section>
   
//             <code>{ JSON.stringify(this.state) }</code>
//          </fieldset>         
//       )
//    }
// }