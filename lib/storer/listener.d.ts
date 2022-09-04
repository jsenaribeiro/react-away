import { Action, DOMEventLabel, EventLabel, ReactEventLabel, RouteEventLabel } from "./types"
import { Subscriber } from './subscriber'

export interface IListener {
   labels: string[]
   bounds: Subscriber[]
   events: Record<string, Action[]>

   /**
    * Generate a Life-cycle event listener
    * @param {string} event React Life-cycle label
    * @param {function} callback Reactive function handler
    */
    on(event: EventLabel, callback: Action): void

   /**
     * Generate a React Life-cycle event listener
     * @param {string} event React Life-cycle label
     * @param {function} callback Reactive function handler
     */
    on(event: ReactEventLabel, callback: Action): void
 
   /**
     * Generate a DOM event listener
     * @param {string} event DOM event label
     * @param {function} callback Reactive function handler
     */
    on(event: DOMEventLabel, callback: Action): void
    
   /**
     * Generate a route event listener
     * @param {string} event Route event label
     * @param {function} callback Reactive function handler
     */
    on(event: RouteEventLabel, callback: Action): void
    
   /**
     * Generate a error event listener
     * @param {string} event any kind of error
     * @param {function} callback Reactive function handler
     */
    on(event: "failure", callback: Action): void
    
   /**
     * Generate a custom event listener
     * @param {string} event Custom event label
     * @param {function} callback Reactive function handler
     */
    on(event: string, callback: Action): void

   /**
    * Event registry
    * @param {boolean} add is add (else remove)?
    */
   register(add: boolean): void

   /**
    * Generate a Life-cycle event dispatch
    * @param {string} event React Life-cycle labe
    */
    dispatch(event: EventLabel): void

   /**
    * Generate a Life-cycle event dispatch
    * @param {string} event React Life-cycle label
    * @param {object} value content as event args
    */
    dispatch(event: EventLabel, value: any): void

   /**
     * Generate a React Life-cycle event dispatch
     * @param {string} event React Life-cycle label
     */
    dispatch(event: ReactEventLabel): void

   /**
     * Generate a React Life-cycle event dispatch
     * @param {string} event React Life-cycle label
     * @param {object} value content as event args
     */
    dispatch(event: ReactEventLabel, value: any): void
    
   /**
     * Generate a DOM event dispatch
     * @param {string} event DOM event label
     * @param {object} value content as event args
     */
    dispatch(event: DOMEventLabel): void
 
   /**
     * Generate a DOM event dispatch
     * @param {string} event DOM event label
     * @param {object} value content as event args
     */
    dispatch(event: DOMEventLabel, value: any): void
    
   /**
     * Generate a route event dispatch
     * @param {string} event Route event label
     */
    dispatch(event: RouteEventLabel): void
    
   /**
     * Generate a route event dispatch
     * @param {string} event Route event label
     * @param {object} value content as event args
     */
   dispatch(event: RouteEventLabel, value: any): void

   /**
    * Generate a custom event dispatch
    * @param {string} event cusom event label
    */
   dispatch(event: string): void

   /**
    * Dispatching an error information
    * @param event any kind of error
    * @param value error context information
    */
   dispatch(event: "failure", value: any): void

   /**
    * Generate a custom event dispatch
    * @param {string} event cusom event label
    * @param {object} value content as event args
    */
   dispatch(event: string, value: any): void
}