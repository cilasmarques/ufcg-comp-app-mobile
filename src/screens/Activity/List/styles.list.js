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
    marginTop: 5,
    maxHeight: "70%",
  },
});

export default styles;