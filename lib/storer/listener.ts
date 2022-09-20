import { Global } from "../global"
import { context } from "../shared"
import { IListener } from './listener.d'
import { Subscriber } from './subscriber'
import { Action } from "./types"

declare const global: Global

class Listener implements IListener {
   public labels = ["mounted", "updated", "unmount", "catched", "refresh"]
   public events = {} as Record<string, Action[]>
   public bounds: Subscriber[] = []   

   public on(evt: string, fnc: Action): void {
      this.events[evt] = this.events[evt] || []
      this.events[evt].push(fnc)
      this.bounds.push(new Subscriber(evt, fnc))
   }

   private append(event: string, action: (e:any) => void) {
      if (global.isWeb === false) return
      else eval('window').addEventListener(event, action)
   }

   private remove(event: string, action: (e:any) => void) {
      if (global.isWeb === false) return
      else eval('window').removeEventListener(event, action)
   }

   private isDOMEvent(event: string) {
      if (global.isWeb === false || !eval('document.body')) return false
      else return typeof eval('document.body')["on" + event] !== undefined
   }
   
   public register(add: boolean) {
      const listening = add ? this.append : this.remove

      const registration = (lbl: string, fns: Action[]) => 
         fns.forEach(f => listening(lbl, f))

      Object.keys(this.events)
         .filter(k => !k.startsWith("/"))
         .filter(k => this.isDOMEvent(k))
         .filter(k => !this.labels.includes(k))
         .forEach(k => registration(k, this.events[k]))

      listening("hashchange", x => context.render())
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