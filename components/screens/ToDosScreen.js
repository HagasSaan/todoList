import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useCallback } from "react";
import styles from "../../styles";
import CheckBox from "expo-checkbox";

import ToDo from "../ToDo";
import ToDoRepository from "../ToDoRepository";

const ToDosScreen = ({ navigation }) => {
  const toDoRepository = new ToDoRepository();
  const [todos, setTodos] = useState(toDoRepository.read());
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [showCompetedToDos, setShowCompetedToDos] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView>
        {todos
          .filter((todo) => !todo.isCompleted || showCompetedToDos)
          .map((todo) => (
            <ToDo key={todo.id} todo={todo}></ToDo>
          ))}
      </ScrollView>

      <View style={styles.column}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setShowCompetedToDos(!showCompetedToDos)}
          >
            <Text style={styles.text}>Show Completed ToDos</Text>
          </TouchableOpacity>
          <CheckBox
            value={showCompetedToDos}
            onValueChange={() => setShowCompetedToDos(!showCompetedToDos)}
            color={showCompetedToDos ? "#4630EB" : undefined}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Add ToDo", { toDoRepository: toDoRepository })
          }
        >
          <Text style={styles.text}>Add ToDo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={forceUpdate}>
          <Text style={styles.text}>Refresh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToDosScreen;
