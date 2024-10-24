import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
} from "react-native";
import { auth } from "../../firebaseConfig";
import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import styles from "../../styles";

const HomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function openLoginScreen() {
    signInWithEmailAndPassword(auth, email, password)
      .then(function (_firebaseUser) {
        console.log("signed in");
        var user = auth.currentUser;
        return navigation.navigate("ToDos", { email, password });
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === "auth/wrong-password") {
          Alert.alert("Wrong password.");
        } else {
          Alert.alert(errorMessage);
        }
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ToDo App </Text>
      <TextInput
        style={styles.textInput}
        onChangeText={(value) => setEmail(value)}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="email"
        value={email}
      />
      <TextInput
        style={styles.textInput}
        secureTextEntry={true}
        onChangeText={(value) => setPassword(value)}
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="password"
        value={password}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openLoginScreen}>
        <Text style={styles.text}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
