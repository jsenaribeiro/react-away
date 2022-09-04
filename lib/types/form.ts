import { Validation } from "./error";
import { Bind } from "./shared";

export { }

declare module 'react' { 
   export interface FormHTMLAttributes<T>  {
     /**
      * Encapsulates onSubmit with preventDefault
      * and appling two-way data binding in all
      * inner form elements based in its name.
      * @param errors List of validation errors from elements
      */
     onCommit?: (errors: Validation[]) => void;
      
     /** Input two-way data binding */
     bind?: Bind
   }
}