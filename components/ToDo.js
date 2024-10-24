import React, { useState } from "react";
import { Text, TouchableOpacity, View, Alert } from "react-native";
import styles from "../styles";
import CheckBox from "expo-checkbox";
import toDoRepository from "./ToDoRepository";

const ToDo = ({ todo }) => {
  const [isTodoCompleted, setIsTodoCompleted] = useState(todo.isCompleted);

  function toggleToDoCompletion(todo) {
    todo.isCompleted = !todo.isCompleted;
    setIsTodoCompleted(todo.isCompleted);
    toDoRepository.update(todo);
    console.log(toDoRepository.read());
  }

  function deleteToDo(todo) {
    toDoRepository.delete(todo);
    console.log(toDoRepository.read());
  }

  function callAdditionalSettings(todo) {
    Alert.alert("long press");
  }

  return (
    <View style={[styles.row, styles.todo]}>
      <TouchableOpacity
        onPress={() => toggleToDoCompletion(todo)}
        onLongPress={() => callAdditionalSettings(todo)}
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
