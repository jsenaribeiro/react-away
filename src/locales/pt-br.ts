import { Locale } from "."

export default <Locale> {
   identity: "Português",
   language: "pt",
   currency,
   datetime,
   hello: "alô mundo",
   title: "Título",
   welcome: "Bem vindo a evolução do React com estados",
   stateManagement: "Gerenciamento de Estado"
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