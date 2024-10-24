import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import styles from "../../styles";
import CheckBox from "expo-checkbox";

import ToDo from "../ToDo";
import ToDoRepository from "../ToDoRepository";

const ToDosScreen = ({ navigation }) => {
  const toDoRepository = new ToDoRepository();
  const [todos, setTodos] = useState();
  const [showCompetedToDos, setShowCompetedToDos] = useState(false);

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => {
    console.log("force update called");
    toDoRepository.read().then((todos) => {
      console.log(todos);
      setTodos(todos);
    });

    updateState({});
  }, []);

  function toggleShowCompletedToDos() {
    setShowCompetedToDos(!showCompetedToDos);
    forceUpdate();
  }

  return (
    <View style={styles.container} onLayout={forceUpdate}>
      <ScrollView>
        {todos &&
          todos
            .filter((todo) => !todo.isCompleted || showCompetedToDos)
            .map((todo) => (
              <ToDo callParent={forceUpdate} key={todo.id} todo={todo}></ToDo>
            ))}
      </ScrollView>

      <View style={styles.column}>
        <View style={styles.row}>
          <TouchableOpacity onPress={toggleShowCompletedToDos}>
            <Text style={styles.text}>Show Completed ToDos</Text>
          </TouchableOpacity>
          <CheckBox
            value={showCompetedToDos}
            onValueChange={toggleShowCompletedToDos}
            color={showCompetedToDos ? "#4630EB" : undefined}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Add ToDo")}
        >
          <Text style={styles.text}>Add ToDo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ToDosScreen;
