export type Lambda<T=any, U=any> = (x: T) => U
export type BiLambda<T=any, U=any> = (x: T, y: any) => U
export type Expression<T=any, U=any> = (f: Lambda<T, U>) => U

import AuthenticatorConfig from './auther/config'
import { valuer } from './storer/valuer'
import { I18N } from './storer'
import { Syncher } from './syncer'

declare const global: any

export const context = {
   enable: true,
   locale: {} as I18N,
   asyncs: [] as Syncher[],
   config: {} as AuthenticatorConfig,
   render: (timeout: number = 1) => { console.log("no render!") },
   storer: (field: any, value?: any) => valuer(global.store, field, value),
   routes: [] as { label:string, regex:string, param:string[] }[]
}

export const delay = async (timeout: number, action?: () => Promise<any>) => 
   new Promise((resolve: Function) => {      
      const wait = () => action ? action() : Promise.resolve()
      const done = async () => { await wait(); resolve() }
      setTimeout(done, timeout)
   }
)

