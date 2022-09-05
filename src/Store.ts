import { Login } from "../lib"

export type Work = "dev"|"test"

export interface Profile { name: string, date: Date, term: boolean, work:Work }

export interface Task { code: number, text:string, done:boolean }

export interface Todo { 
   text: string,
   list: Task[]
}

export default class Store {   
   app: string = "React Away"
   hello: string = "World"
   counter: number = 0
   credential: Login = { 
      username: "",
      password: ""
   }
   profile: Profile = { 
      term: true,
      name: "john sena",
      date: new Date(1980,11,5),
      work: "dev"
   }
   todo: Todo = {  
      text: "",
      list: []
   }
}