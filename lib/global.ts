declare const global: any

export interface Global<T=any> {
   i18n: any
   store: T
   state: any
   route: string
   idiom: string
   isWeb: boolean
}

var locator = (route: string) => { routing = route }
var routing = "/"

try {
   eval(`window.location.hash='/'`)
   eval('window').global = eval('window')
   global.isWeb = true
   locator = route => {
      eval(`window.location.hash = "${route}"`)
      routing = route
      global.isWeb = true
   }
}
catch {
   console.log("catched")
   global.isWeb = false
}

Object.defineProperty(global, "route", {
   get() { return routing },
   set(value: string) { locator(value)  }
})

console.log("isWeb", global.isWeb)