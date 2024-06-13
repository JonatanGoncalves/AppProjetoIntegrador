import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "auto",
    width: "auto",
  },
  container_inner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 20,
  },
  input: {
    backgroundColor: "#FFF",
    width: "72%",
    marginVertical: 10,
    borderRadius: 9,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    opacity: 0.8,
    borderColor: "#FFF",
  },
  button: {
    borderColor: "#FFFF",
    borderWidth: 2,
  },
});
