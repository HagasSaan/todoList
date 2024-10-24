import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderWidth: 1,
  },
  button: {
    borderWidth: 1,
    borderRadius: 4,
    width: "70%",
    margin: 5,
    padding: 5,
  },
  text: {
    textAlign: "center",
    marginRight: 5,
  },
  textInput: {
    borderWidth: 1,
    width: "70%",
    borderRadius: 4,
    padding: 5,
    margin: 5,
  },

  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  column: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  todo: {
    width: "100%",
    justifyContent: "space-between",
    padding: 5,
  },
});

export default styles;
