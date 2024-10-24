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
import ToDoRepository from "../ToDoRepository";
import styles from "../../styles";

const AddToDoScreen = ({ navigation }) => {
  const toDoRepository = new ToDoRepository();
  const [description, setDescription] = useState("");

  function addToDo() {
    let todo = {
      description: description,
      isCompleted: false,
    };

    toDoRepository.create(todo);
    Alert.alert("Success", "ToDo created");
    setDescription("");
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
