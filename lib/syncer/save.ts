/** @module Synching */

import { context, delay } from '../shared'
import { ApiAsync } from './class'
import { Action } from './interfaces'
import {loadAsync} from './load'
import { aborter, handler } from './handler'
import Syncher from './syncher'

const FAILED_FETCH_SYNC = "(React Away) Sync failed: not possible to fetch data..."
const invalidMappedId = (key: string) => "(React Away) id field not correctly mapped (" + key + " field no found in entity)"

const same = (x: any, y: any) => JSON.stringify(x) === JSON.stringify(y)
const diff = (x: any, y: any) => same(x,y) === false

declare const global: any

async function preValidationAsync(that: ApiAsync, data: any, guid: string, retries = 3) {
   const noReady = !that.synced
   const failed =  !that.synced && !retries
   const hasUID = (obj: any) => Object.keys(obj).includes(guid)
   const retry = () => preValidationAsync(that, data, guid, retries-1)

   const noGUID = Array.isArray(data)
      ? data?.every(hasUID) === false
      : hasUID(data) === false

   if (failed) throw FAILED_FETCH_SYNC
   if (noReady) await delay(500, async () => await retry())
   if (noGUID) throw invalidMappedId(guid)
}

/**
 * Change request inference for POST, PUT and DELETE verbs
 * @param {Syncher} syncher Syncher instance
 * @param {boolean} reload send a GET request after a change request?
 */
export async function saveAsync(syncher: Syncher, reload: boolean) {
   const that = syncher.api
   const guid = that.config.uid
   const info = context.storer(that.config.map)
   const data = JSON.parse(JSON.stringify(info))
   const unit = !Array.isArray(data)
   
   await preValidationAsync(that, data, guid)

   that.reload = reload
   that.actual = data

   if (unit && !that.actual[guid]) action(syncher, "create", that.actual)

   else if (unit && that.actual[guid]) {
      const exists = unit 
         ? JSON.stringify(that.synced) === JSON.stringify(that.actual)
         : that.synced.some((x: any) => x[guid] === that.actual[guid])
      
      if (exists) action(syncher, "update", that.actual)
   }

   if (!unit && that.actual) {
      const createds = [] as any[]
      const deleteds = [] as any[]
      const updateds = [] as any[]

      that.actual.forEach((item: any) => {
         const creating = that.synced
            .every((x : any) => x[guid] !== item[guid])

         const updating = that.synced
            .filter((x : any) => x[guid] === item[guid])
            .some((x : any) => diff(x, item))
         
         if (creating) createds.push(item)
         if (updating) updateds.push(item)
      })

      that.synced.forEach((item: any) => {
         const identity = (x : any) => x[guid] !== item[guid]
         const deleting = item[guid] && that.actual.every(identity)

         if (deleting) deleteds.push(item)
      })

      createds.forEach(x => action(syncher, "create", x))
      updateds.forEach(x => action(syncher, "update", x))
      deleteds.forEach(x => action(syncher, "delete", x))

      console.debug({ createds, updateds, deleteds })

      const noAction 
         = createds.length 
         + updateds.length 
         + deleteds.length === 0

      if (noAction && that.reload) loadAsync(syncher, {})   
   }
}

/**
 * Executes the change request for POST, PUT and DELETE verbs
 * @param {Syncher} syncher Syncher instance
 * @param {Action} action change request label (create, update, delete)
 * @param {object} entity target entity object 
 */
async function action(syncher: Syncher, action: Action, entity: any) {
   const that = syncher.api
   const guid = entity[that.config.update?.uid || that.config.uid]
   
   const method 
      = action == "create" ? "POST" 
      : action == "update" ? "PUT"
      : "DELETE"

   const hasId = action === "create" ? false
      : that.config[action] ? (that.config as any)[action].inIdURL 
      : that.config.inIdURL

   const headers = await that.headers()
   const route = that.config[action]?.route || that.config.route
   const url = that.config.url + route + (hasId ? `/${guid}` : "").replace("//", "/")
   const body = JSON.stringify(entity)
   const settings: RequestInit = { 
      method, body, headers, 
      signal: aborter.signal
   }

   await handler(syncher, "SAVE", url, async () => 
   {
      const response = await fetch(url, settings)

      if (response.ok) await response.json()
      else throw { message: response.statusText }

      that.synced = that.actual

      if (that.reload) loadAsync(syncher, {})
   })
}