import React, { useState } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import styles from "../styles";
import CheckBox from "expo-checkbox";
import ToDoRepository from "./ToDoRepository";

const ToDo = ({ todo, callParent }) => {
  const toDoRepository = new ToDoRepository();
  const [isTodoCompleted, setIsTodoCompleted] = useState(todo.isCompleted);

  async function toggleToDoCompletion(todo) {
    todo.isCompleted = !todo.isCompleted;
    setIsTodoCompleted(todo.isCompleted);
    await toDoRepository.update(todo);
    callParent();
  }

  async function deleteToDo(todo) {
    await toDoRepository.delete(todo);
    callParent();
  }

  return (
    <View style={[styles.row, styles.todo]}>
      <TouchableOpacity
        onPress={() => toggleToDoCompletion(todo)}
        onLongPress={() => deleteToDo(todo)}
      >
        <Text style={styles.text}>{todo.description}</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <CheckBox
          value={isTodoCompleted}
          onValueChange={() => toggleToDoCompletion(todo)}
          color={isTodoCompleted ? "#4630EB" : undefined}
        />
      </View>
    </View>
  );
};
export default ToDo;
