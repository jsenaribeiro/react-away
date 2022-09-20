import React from 'react'
import ReactClassicDOM from 'react-dom/client'
import { Provider } from './storer/provider'
import { I18nFluent } from './storer/i18n'
import formerProper from './binder'
import stylerProper from './styler'
import { Directive } from './storer'

interface ContextRender {
   stricted: boolean
   context: any
   directives: Directive[]
}

export const render: ContextRender = {
   context: {} as any,
   stricted: false,
   directives: [
      formerProper,
      stylerProper
   ]
}

export type Class = new(...args:any[]) => any

/**
 * React Away startup class
 */
export default class ReactDOM {
   /**
    * Startup the React application with ReactDOM framework
    * @param {boolean} strict enable/disable strict mode
    * @param {string} query query selector for HTML element root
    * @param {JSX.Element} app App component
    * @param {object} store class object with directives
    */
   static createRoot(strict: boolean, query: string, app: JSX.Element, Store: Class): I18nFluent

   /**
    * Startup the React application with ReactDOM framework
    * @param {boolean} strict enable/disable strict mode
    * @param {string} query query selector for HTML element root
    * @param {JSX.Element} app App component
    * @param {class} store class object
    * @param {Directive[]} directives inject custom directives
    */
   static createRoot(strict: boolean, query: string, app: JSX.Element, Store: Class, directives: any[]): I18nFluent

   public static createRoot(
      strict: boolean,
      query: string,
      app: JSX.Element,
      Store: Class,
      directives: any[] = []): I18nFluent {

      if (!!directives.length) 
         directives.forEach((d: Directive) => render.directives.push(d))

      render.context = new Store()
      render.stricted = strict

      const root = document.querySelector(query) as HTMLElement
      const wrap = <Provider src={render.context}>{app}</Provider>
      const main = strict ? <React.StrictMode>{wrap}</React.StrictMode> : wrap 

      ReactClassicDOM.createRoot(root).render(main as JSX.Element)

      return new I18nFluent()
   }
}