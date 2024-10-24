import { auth, firestore } from "../firebaseConfig";
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";

class ToDoRepository {
  constructor() {
    this.todos = [];
    this.nextId = 1;
    this.user = auth.currentUser;

    onSnapshot(doc(firestore, "/users/" + this.user.uid), (snapshot) => {
      let data = snapshot.data();
      console.log("fetched data", data, "for", user);
    });
  }

  create(todo) {
    console.log("create called for", todo);
    todo.id = this.nextId;
    this.todos.push(todo);
    this.nextId += 1;
  }

  read() {
    console.log("read called ", this.todos);
    return this.todos;
  }

  update(todo) {
    console.log("update called for ", todo);
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id == todo.id) {
        this.todos[i] = todo;
        return;
      }
    }
    console.log(this.todos);
  }

  delete(todo) {
    console.log("delete called for ", todo);
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].id == todo.id) {
        this.todos.splice(i, 1);
        return;
      }
    }
    console.log(this.todos);
  }
}

export default ToDoRepository;
