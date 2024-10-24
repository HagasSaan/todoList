import { auth, firestore, db } from "../firebaseConfig";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  collection,
} from "firebase/firestore";

export default class ToDoRepository {
  constructor() {
    this.user = auth.currentUser;

    onSnapshot(doc(firestore, "/users/" + this.user.uid), (snapshot) => {
      this.nextId = snapshot.data().nextId;
    });
  }

  create(todo) {
    console.log("create called for", todo);
    todo.id = this.nextId;
    setDoc(doc(firestore, "users/" + this.user.uid + "/todos/" + this.nextId), {
      id: todo.id,
      description: todo.description,
      isCompleted: todo.isCompleted,
    }).catch(() => {
      Alert.alert("Error writing document");
      console.log(error);
      return;
    });

    this.nextId += 1;
    setDoc(
      doc(firestore, "users/" + this.user.uid),
      { nextId: this.nextId },
      { merge: true },
    ).catch(() => {
      Alert.alert("Error writing document");
      console.log(error);
      return;
    });
  }

  read() {
    console.log("read called");
    return getDocs(
      collection(firestore, "users/" + this.user.uid + "/todos"),
    ).then(function (docs) {
      var todos = [];
      docs.forEach((doc) => {
        var todo = doc.data();
        todos.push({
          id: todo.id,
          description: todo.description,
          isCompleted: todo.isCompleted,
        });
      });
      return todos;
    });
  }

  async update(todo) {
    console.log("update called for ", todo);

    await setDoc(
      doc(firestore, "users/" + this.user.uid + "/todos/" + todo.id),
      {
        id: todo.id,
        description: todo.description,
        isCompleted: todo.isCompleted,
      },
    );
  }

  async delete(todo) {
    console.log("delete called for ", todo);
    await deleteDoc(
      doc(firestore, "users/" + this.user.uid + "/todos/" + todo.id),
    );
  }
}
