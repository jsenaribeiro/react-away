export { }

declare module 'react' {
   export interface HTMLAttributes<T> {
      /**
       * property for routing handler
       * that encapsulates a onClick
       * and executes a setRoute
       * with its value */
      onRoute?: string 

      /**
       * define the required route 
       * for enable the rendering 
       * for the component or element */
     route?: string

     /** Alternative to className */
     css?: string     
   }
}