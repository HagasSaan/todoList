import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ToDosScreen from "./components/screens/ToDosScreen";
import AddToDoScreen from "./components/screens/AddToDoScreen";
import HomeScreen from "./components/screens/HomeScreen";
import RegisterScreen from "./components/screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ToDos" component={ToDosScreen} />
        <Stack.Screen name="Add ToDo" component={AddToDoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
