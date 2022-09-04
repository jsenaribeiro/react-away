import { Validation } from "../../../lib"
import "./form.css"

// TODO: form two-way data binding
// ADVANTANGE: one render per submit (instead of per typing)
// native HTML validators
// validate function field

//onCommit={onCommit}
export const Form = (props: any) => <>
   <form bind="profile" onCommit={onSubmit}>
      <section>
         <label>Name</label>
         <input id="name" name="name" />
      </section>

      <section>
         <label>Date</label>
         <input type="date" name="date" />
      </section>
      
      <section>
         <label>Work</label>
         <input pattern="dev|test" name="work" />
      </section>

      <section>
         <label>Accepted all the contract terms?</label>
         <input name="term" type="checkbox" />         
      </section>

      <button>Submit</button>
   </form>
</>

function onSubmit(errors: Validation[]) {
   if (errors.length == 0){
      // fetch
   }
   else {
      // show errors
   }
   console.warn(errors)
}

function onExtraValidation(errors: Validation[]) {
   // adding new errors: errors.push()
   return errors
}