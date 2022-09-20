import { Global } from '../global'
import { context } from '../shared'
import { Exception } from '../types/error'
import { ApiAsync } from './class'
import { loadAsync } from './load'
import { saveAsync } from './save'

declare const global: Global

export interface ISyncher<T=any> {
   exception: Exception 
   isLoading: boolean 
   isSuccess: boolean
   isFailure: boolean
   outOfSync: boolean 
   canceller():void
   loadAsync(filter?: any): Promise<any>
   saveAsync(reload: boolean): Promise<void>
   isRelated(refer: any): boolean
   onSave(e: any):void
   onLoad(e: any):void
}

export default class Syncher<T=any> implements ISyncher {
   public api: ApiAsync

   constructor(that: ApiAsync) {
      this.api = that
      context.asyncs.push(this)
   }

   public exception: Exception = new Exception("")
   public isLoading: boolean = false
   public isSuccess: boolean = false
   public isFailure: boolean = false
   public outOfSync: boolean = true
   public canceller: () => void = () => { }

   public onSave = (e: any) => saveAsync(this, false)
   public onLoad = (e: any) => loadAsync(this, {})

   public loadAsync = async (filter?: any): Promise<any> => await loadAsync(this, filter || {})
   public saveAsync = async (reload: boolean): Promise<void> => await saveAsync(this, reload)

   public isRelated(refer: any): boolean {
      const mapped = this.api.config.map(global.store)
      
      return Array.isArray(mapped)
         ? mapped.some(x => x === refer)
         : mapped === refer
   }
}