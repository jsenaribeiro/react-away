/** @module Synching */

import { ApiAsync } from "./class"
import { ISyncApi, ISyncApiArgs, SyncApi } from "./interfaces"

/**
 * Default synchronizer configuration
 */
const defaultSyncApi = {
   route: "/",
   uid: "id",
   timeout: 5000,
   caching: 1000,
   avoidId: false,
   pooling: 0,
   retries: 0,
   idRoute: true,
   catcher: (err: any) => err?.message,
   querier: (_: any) => ({})
}

export const error = (text: string) => new Error("REACT-EVO (syncer): " + text)

export const defineSync = <D,T>(arg: ISyncApi<D,T>): SyncApi<D,T> => 
({
   map: arg.map,
   url: arg.url || "",
   uid: arg.uid || defaultSyncApi.uid,
   route: arg.route || defaultSyncApi.route,
   avoidId: arg.avoidId || defaultSyncApi.avoidId,
   caching: arg.caching || defaultSyncApi.caching,
   pooling: arg.pooling || defaultSyncApi.pooling,
   retries: arg.retries || defaultSyncApi.retries,
   timeout: arg.timeout || defaultSyncApi.timeout,
   inIdURL: arg.inIdURL || defaultSyncApi.idRoute,
   catcher: arg.catcher || defaultSyncApi.catcher
}) 

/**
 * Synchronizer modular hook
 * @param {ISyncApiArgs} settings custom configuration
 * @returns synchronizable state handler
 */
export function synchronizer<D=any, T=any>(settings: ISyncApiArgs<D,T>) {
   return new ApiAsync<D, T>(settings).build()
}