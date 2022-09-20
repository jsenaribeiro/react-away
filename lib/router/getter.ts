import { context } from "../shared"

export default function getRoute<T=any>(parameter?: string): T {  
   const route = context.routed
   const param: Record<string, any> = { }
   const match = (x: any) => new RegExp(x.regex, "gi").test(route)
   const tests = context.routes.filter(match) 
   const parse = (data: string): any => {
      const content = data.toLowerCase()
      const numeric = /^\d+$/.test(content)
      const logical = /true|false/.test(content)
      const parsing = numeric || logical

      return parsing ? JSON.parse(content) : data
   }

   if (!parameter) return route as any as T

   if (!tests || !tests.length) return route as any as T

   for (const found of tests) {
      if (!found || !found.regex) continue

      const regexp = new RegExp(found.regex, "gi")
      const params = [...route.matchAll(regexp)]

      if (!params) continue
      
      for (let i=0; i < found.names.length; i++)
         param[found.names[i].slice(1)] = parse(params[0][i+1])
   }

   return parameter === "*" ? param : param[parameter]
}