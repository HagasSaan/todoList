import {
  Button,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import toDoRepository from "../ToDoRepository";
import styles from "../../styles";

const AddToDoScreen = ({ route, navigation }) => {
  const { toDoRepository } = route.params;
  const [description, setDescription] = useState("");

  function addToDo() {
    let todo = {
      description: description,
      isCompleted: false,
    };

    toDoRepository.create(todo);
    console.log(toDoRepository.read());
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={description}
        onChangeText={(description) => setDescription(description)}
        placeholder="Description"
      ></TextInput>

      <TouchableOpacity style={styles.button} onPress={addToDo}>
        <Text style={styles.text}>Add ToDo</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddToDoScreen;
