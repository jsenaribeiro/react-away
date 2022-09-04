import { Store } from "../../context"
import "./counter.css"

declare const store: Store

const Counter = (props: any) => <>
   <h3>Counter: { store.counter }</h3>
   <button onClick={onCount(+1)}>+</button>
   <button onClick={onCount(-1)}>-</button>
</>

const onCount = (value: number) => (e:any) => store.counter += value

export default Counter