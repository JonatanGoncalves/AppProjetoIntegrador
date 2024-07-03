import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#225959",
  },
  container_inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  input: {
    color: "#FFFF",
    width: "72%",
    marginVertical: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6
  },
  button: {
    borderColor: "#FFFF",
    borderWidth: 2,
  }
});
