export type Bind = string | ((x:any) => any) | Record<string,any>

export interface TwoWayDataBind {
   label?: string;
   
   local?: boolean
   
   /** Input two-way data binding */
   bind?: Bind

   /** custom validate */
   validate?: (value: any) => string | true;
}