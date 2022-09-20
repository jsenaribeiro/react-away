/** @module Synching */

import { defineSync, error } from './functions'
import { ISyncApiArgs, SyncApiArgs } from './interfaces'
import { login } from '../auther'
import { parseJWT } from '../auther/login'
import { listener } from '../storer/listener'
import Syncher from './syncher'

var that = {} as any

declare const global: any

/**
 * Synchronizer configurator class
 */
export class ApiAsync<D=any, T=any> {   
   public reload: boolean = false
   public config: SyncApiArgs<D,T>
   public synced = undefined as any|any[]
   public actual = undefined as any|any[]
   public isEqual = (x:any, y:any) => JSON.stringify(x) === JSON.stringify(y)
   public hasIdField = (x:any) => !this.config.avoidId && Object.keys(x).includes(this.config.uid)   

   constructor(settings: ISyncApiArgs) {
      if (!settings.url) throw error("URL is required")
      if (!settings.map) throw error("map is required")

      that = this
      
      this.config = {
         ...defineSync(settings),
         search: settings.search && defineSync(settings.search),
         create: settings.create && defineSync(settings.create),
         update: settings.update && defineSync(settings.update),
         delete: settings.delete && defineSync(settings.delete)
      } 

      fetch(settings.url)
         .then(x => x.json())
         .then(x => this.synced = x)
         .catch(x => listener.dispatch("failure", x))
   }
   
   public build = (): Syncher => new Syncher(this)

   public async headers(): Promise<Headers> {
      const headers = new Headers()
      const jsonToken = sessionStorage.getItem("token") || ""
      const token = jsonToken && parseJWT(jsonToken)
      const expired = token ? token.exp * 1000 < Date.now() : false

      if (expired) {
         try { await login() }
         catch(ex: any) { 
            sessionStorage.removeItem("token") 
            listener.dispatch("failure", ex)
         }
      }

      headers.append("Authorization", jsonToken)
      headers.append("Content-Type", "application/json; charset=UTF-8")

      return headers
   }
}
