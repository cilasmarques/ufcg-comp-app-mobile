import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  mainTitle: {
    padding: 5,
    fontSize: 26,
    fontWeight: "bold",
    color: "#004A8F",
  },
  safeAreaView: {
    maxHeight: "70%",
  },
  scrollAreaView: {
    height: "100%",
    padding: 10,
    backgroundColor: "#80B6CE",
    borderRadius: 10,
  },
});

export default styles;