import './global'

export * from './storer'
export * from './auther'
export * from './syncer'
export * from './native'
export * from './types'
export { default, render, type Class } from './dom'
import { router } from './router'

export const setRoute = router.setRoute
export const getRoute = router.getRoute
export const isRouted = router.isRouted