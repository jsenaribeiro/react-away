import { aborter } from "../syncer/handler"

/**
 * Validation error object 
 */
export class Validation {
   constructor()
   constructor(error: string)
   constructor(error: string, field: string)
   constructor(error: string, field: string, value: any)
   constructor(error?: string, field?: string, value?: any) {
      this.error = error || ""
      this.field = field || ""
      this.value = value || ""
   }

   error: string
   field: string
   value: any
}

/**
 * Error object with error message and invalid fiels
 */
export class Exception {
   constructor()
   constructor(error: any)
   constructor(error?: any, handler?: (err: any) => Exception) {
      if (error === undefined) 
         this.message = ""

      else if (handler) {
         const handled = handler(error)
         this.message = handled?.message
         this.invalid = handled?.invalid

         if (!!handled?.message) return
         if (!!handled?.invalid?.length) return
      }

      else if (error instanceof Validation) {
         this.invalid = [error]
         this.message = "Invalid fields"
      }

      else if (error instanceof Array<Validation>) {
         this.invalid = error
         this.message = "Invalid fields"
      }

      else if (error instanceof DOMException && error.message.includes("operation was aborted")) 
         this.message = aborter.signal?.reason || error.message

      else if (error instanceof DOMException) 
         this.message = error.message

      else if (typeof error === "string") 
         this.message = error

      else if (error instanceof Error) 
         this.message = error.message

      else if ('message' in error)
         this.message = error.message

      else if ('error' in error && typeof error['error'] === "string")
         this.message = error.message

      else if ('fail' in error && typeof error['fail'] === "string")
         this.message = error.message

      else if ('err' in error && typeof error['err'] === "string")
         this.message = error.message
   }

   public message: string = ""
   public invalid: Validation[] = []
}

export default new Exception()