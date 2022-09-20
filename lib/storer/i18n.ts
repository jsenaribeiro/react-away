import { context } from "../shared"
import AuthenticatorFluent from '../auther'
import { Global } from "../global"
import { Authenticator } from "../auther/setup"

declare const global: Global

var initialized = false

export interface I18N { 
   identity: string
   language: string
   datetime(value: Date): string
   currency(value: number): string
}

const LOCALES: I18N[] = []

export interface I18nRegistry {
   build(): JSX.Element,
   authentication(method: "GET"|"POST", relogin: boolean, encript: boolean): Authenticator
}

/** 
 * Globalization fluent class 
 */
export class I18nFluent {   
   private app: JSX.Element
   
   constructor(app: JSX.Element) { this.app = app }

   public globalization(locales: I18N[], firstIsDefault = true): I18nRegistry {
      locales.forEach(l => LOCALES.push(l))
      const hasDefault = locales && locales.length > 1 && firstIsDefault
      if (hasDefault) global.i18n = locales[0]      
      initialized = true
      setIdiom(navigator.language, 3)
      return {
         build: () => this.app,
         authentication: new AuthenticatorFluent(this.app).authentication
      }
   }
}

/**
 * Modular hook for change current i18n language
 * @param {string} language required locale
 * @returns {object} selected or default locale
 */
export function useLanguage<T extends I18N>(language: string) { return setIdiom<T>(language, 3)}

function setIdiom<T extends I18N>(language: string, retry: number) {
   if (retry < 0) return
   if (initialized == false) setTimeout(() => setIdiom(language, retry-1), 99)

   global.idiom = language
   global.i18n = LOCALES.find(x => x.language === language) as T
      || LOCALES.find(x => x.language.startsWith(language)) as T
      || LOCALES.find(x => language.startsWith(x.language)) as T
      || global.i18n as T

   context.render()
}