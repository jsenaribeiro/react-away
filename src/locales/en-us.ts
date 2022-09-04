import { Locale } from "."

export default <Locale> {
   identity: "English",
   language: "en",
   currency,
   datetime,
   hello: "hello world",
   title: "Title",
   welcome: "Welcome to the stateful React evolution",
   stateManagement: "State Management"
}



function currency(value: number) {
   return `R$ ${value.toFixed(2).replace('.', ',')}`
}

function datetime(value: Date) {
   const { getDate, getMonth, getFullYear } = value

   const d = getDate().toString().padStart(2, '0')
   const m = (getMonth()+1).toString().padStart(2, '0')
   const y = getFullYear().toString().padStart(2, '0')

   return `${d}/${m}/${y}`
}