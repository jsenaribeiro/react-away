import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from './storer/provider'
import { I18N, I18nFluent, I18nRegistry } from './storer/i18n'
import formerProper from './binder'
import stylerProper from './styler'
import { Directive } from './storer'
import { Global } from './global'
import AuthenticatorFluent from './auther'

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

declare const global: Global

export type Class = new(...args:any[]) => any

interface Registry {
   build(): JSX.Element,
   globalization(locales: I18N[], firstIsDefault: boolean): I18nRegistry
}

/**
 * Startup the React application for web or mobile
 * @param {boolean} strict enable/disable strict mode
 * @param {JSX.Element} App App component
 */
export function registry(strict:boolean, App: (props?: any) => JSX.Element): Registry

/**
 * Startup the React application for web or mobile
 * @param {boolean} strict enable/disable strict mode
 * @param {JSX.Element} App App component
 * @param {class} store class object
 */
export function registry(strict:boolean, App: () => JSX.Element, Store: Class): Registry

/**
 * Startup the React application for web or mobile
 * @param {boolean} strict enable/disable strict mode
 * @param {JSX.Element} App App component
 * @param {class} store class object
 * @param {Directive[]} directives inject custom directives
 */
export function registry(strict:boolean, App: () => JSX.Element, Store: Class, directives: Directive[]): Registry

export function registry(strict:boolean, App: () => JSX.Element, Store?:Class, directives: Directive[] = []): Registry {
   if (!!directives.length) directives.forEach((d: Directive) => render.directives.push(d))

   render.context = Store ? new Store() : { }
   render.stricted = strict

   const Wrap = () => <Provider src={render.context}><App /></Provider>
   const main = strict ? <React.StrictMode><Wrap /></React.StrictMode> : <Wrap />

   console.log(global)

   if (global.isWeb) {
      const root = eval('document')?.querySelector("#root") as HTMLElement
      if (!root.innerText) ReactDOM.createRoot(root).render(main)
   }

   return {
      build: () => main,
      globalization: new I18nFluent(main).globalization
   }
}