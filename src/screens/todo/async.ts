import { synchronizer } from "../../../lib"
import { Store } from "../../context"

export default synchronizer({
   uid: "code",
   url: "http://localhost:3000/todo",
   map: (s: Store) => s.todo.list,
   timeout: 300000
})