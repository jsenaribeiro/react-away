import React from 'react'
import ReactClassicDOM from 'react-dom/client'
import { Provider } from './storer/provider'
import { I18nEVO } from './storer/i18n'
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

/**
 * React Away startup class
 */
export default class ReactDOM {
   /**
    * Startup the React application with ReactDOM framework
    * @param {boolean} strict enable/disable strict mode
    * @param {string} query query selector for HTML element root
    * @param {JSX.Element} app App component
    * @param {object} store store object with EVO standard directives
    */
   static createRoot(strict: boolean, query: string, app: JSX.Element, context: any): I18nEVO

   /**
    * Startup the React application with ReactDOM framework
    * @param {boolean} strict enable/disable strict mode
    * @param {string} query query selector for HTML element root
    * @param {JSX.Element} app App component
    * @param {object} store store object
    * @param {Directive[]} directives inject custom directives
    */
   static createRoot(strict: boolean, query: string, app: JSX.Element, context: any, directives: any[]): I18nEVO

   public static createRoot(
      strict: boolean,
      query: string,
      app: JSX.Element,
      context: any,
      directives: any[] = []): I18nEVO {

      if (!!directives.length) 
         directives.forEach((d: Directive) => render.directives.push(d))

      render.context = context
      render.stricted = strict

      const root = document.querySelector(query) as HTMLElement
      const wrap = <Provider src={context}>{app}</Provider>
      const main = strict ? <React.StrictMode>{wrap}</React.StrictMode> : wrap 

      ReactClassicDOM.createRoot(root).render(main as JSX.Element)

      return new I18nEVO()
   }
}