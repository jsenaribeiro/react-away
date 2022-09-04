import { getRoute } from "../../../lib"

export const Params = (props: any) => <>
   <h2>Params /:id</h2>
   <h1>ID <b>{ getRoute("id") }</b></h1>
   <sub>{JSON.stringify(getRoute())}</sub>
</>