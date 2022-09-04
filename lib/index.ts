export * from './storer'
export * from './auther'
export * from './syncer'
export * from './types'
export { default, render } from './root'
import { router } from './router'

export const setRoute = router.setRoute
export const getRoute = router.getRoute
export const isRouted = router.isRouted