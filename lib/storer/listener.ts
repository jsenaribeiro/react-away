import { context } from "../shared"
import { IListener } from './listener.d'
import { Subscriber } from './subscriber'
import { Action } from "./types"

class Listener implements IListener {
   public labels = ["mounted", "updated", "unmount", "catched", "refresh"]
   public events = {} as Record<string, Action[]>
   public bounds: Subscriber[] = []   

   public on(evt: string, fnc: Action): void {
      this.events[evt] = this.events[evt] || []
      this.events[evt].push(fnc)
      this.bounds.push(new Subscriber(evt, fnc))
   }
   
   public register(add: boolean) {
      const listening = add 
         ? window.addEventListener 
         : window.removeEventListener

      const registration = (lbl: string, fns: Action[]) => 
         fns.forEach(f => listening(lbl, f))

      const isDOMevent = (event: string) =>
         typeof (document.body as any)["on" + event] !== undefined

      Object.keys(this.events)
         .filter(k => isDOMevent(k))
         .filter(k => !k.startsWith("/"))
         .filter(k => !this.labels.includes(k))
         .forEach(k => registration(k, this.events[k]))

      if (add) window.addEventListener("hashchange", x => context.render())
      else window.removeEventListener("hashchange", x => context.render())
      return window.onbeforeunload = (e) => console.log("onbeforeunload")
   }

   public dispatch(evt: string, arg: any = {}) {
      const same: Record<string,string> = {
         componentDidMount: "mounted",
         componentDidCatch: "catched",
         componentDidUpdate: "updated",
         componentWillUnmount: "unmount",
         render: "refresh"
      }
   
      if (evt in same) evt = same[evt]
      if (!this.events[evt]) return false
      else this.events[evt].forEach(f => f(arg))
      return true
   }
}

export const listener: IListener = new Listener()