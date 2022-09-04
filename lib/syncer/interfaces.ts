/** @module Synching */

/**
 * Synchronizer pre-configuration object
 */
export interface ISyncApi<D,T> {
   url: string
   uid: string     
   map: (store: D) => T|T[]
   route?: string       
   avoidId?: boolean    
   inIdURL?: boolean    
   timeout?: number     
   retries?: number     
   caching?: number     
   pooling?: number
   catcher?: (err:any) => string   // err.message
   querier?: (store: D) => any
}

/**
 * Synchronizer configuration extensible object 
 * for deep customization based in specific action 
 */
export interface ISyncApiArgs<D=any,T=any> extends ISyncApi<D,T> {
   search?: ISyncApi<D,T>
   create?: ISyncApi<D,T>
   update?: ISyncApi<D,T>
   delete?: ISyncApi<D,T>
}

/**
 * Synchronizer configuration object
 */
export interface SyncApi<D,T> {
   url: string   
   map: (store: D) => T|T[]
   uid: string
   route: string  
   avoidId: boolean    
   inIdURL: boolean
   timeout: number
   retries: number
   caching: number
   pooling: number
   catcher: (data:any) => string
}

/**
 * Synchronizer argument object
 */
export interface SyncApiArgs<D,T> extends SyncApi<D,T> {  
   search?: SyncApi<D,T>
   create?: SyncApi<D,T>
   update?: SyncApi<D,T>
   delete?: SyncApi<D,T>
}

/**
 * Request HTTP semantic actions for POST, PUT and delete
 */
export type Action = "create"|"update"|"delete"
