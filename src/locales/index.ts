import { I18N } from "../../lib/storer/i18n"
import enUs from "./en-us"
import ptBr from "./pt-br"

export interface Locale extends I18N {
   title: string,
   hello(who: string): string,
   welcome: string,
   stateManagement: string,
}

export default [
   enUs,
   ptBr
]