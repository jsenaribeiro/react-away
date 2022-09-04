import { TwoWayDataBind } from "./shared";

export { }

declare module 'react' {   
   export interface InputHTMLAttributes<T> extends TwoWayDataBind { } 
   export interface SelectHTMLAttributes<T> extends TwoWayDataBind { }  
   export interface TextareaHTMLAttributes<T> extends TwoWayDataBind { } 
}