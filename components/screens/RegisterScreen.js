import React, { useState } from "react";
import { TouchableOpacity, Text, View, Alert, TextInput } from "react-native";

import { auth, firestore } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import styles from "../../styles";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then(function (_firebaseUser) {
        var user = auth.currentUser;
        setDoc(
          doc(firestore, "users/" + user.uid),
          { nextId: 1 },
          { merge: true },
        ).catch(() => {
          Alert.alert("Error writing document");
          console.log(error);
          return;
        });

        Alert.alert("Success!", "User registered");
        navigation.navigate("Home");
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == "auth/weak-password") {
          Alert.alert("Error :(", "The password is too weak.");
        } else {
          Alert.alert("Error :(", errorMessage);
        }
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.text}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
