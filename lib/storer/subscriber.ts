import { listener } from './listener'
import { Action, DOMEventLabel,EventLabel, ReactEventLabel, RouteEventLabel } from "./types"

export class Subscriber  {
   public eventTag: string
   public callback: Action

   /**
    * Generate a subscriber for life-cycle synonym
    * @param eventTag life-cycle event label synonym
    * @param callback reactive function after event
    */
   constructor(eventTag: EventLabel, callback: Action);
   
   /**
    * Generate a subscriber for React life-cycle
    * @param eventTag React life-cycle event label
    * @param callback reactive function after event
    */
   constructor(eventTag: ReactEventLabel, callback: Action);
   
   /**
    * Generate a subscriber for routing event
    * @param eventTag routing event label
    * @param callback reactive function after event
    */
   constructor(eventTag: RouteEventLabel, callback: Action);
   
   /**
    * Generate a subscriber for global DOM event
    * @param eventTag global DOM event label
    * @param callback reactive function after event
    */
   constructor(eventTag: DOMEventLabel, callback: Action);

   /**
    * Generate a subscriber for custom event
    * @param eventTag custom event label
    * @param callback reactive function after event
    */
   constructor(eventTag: string, callback: Action);

   constructor(eventTag: string, callback: Action) {      
      this.eventTag = eventTag
      this.callback = callback
   }

   public cancel() {
      const handlerString = this.callback.toString()
      const relatedEvents = listener.events[this.eventTag]
      
      relatedEvents  
         .filter(f => f.toString() === handlerString)
         .map(f => relatedEvents.indexOf(f))
         .forEach(i => delete relatedEvents[i])
   }
}