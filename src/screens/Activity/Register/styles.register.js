import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    //center the content horizontally
  },
  mainTitle: {
    padding: 5,
    fontSize: 26,
    fontWeight: "bold",
    color: "#004A8F",
  },
  registerBoxView: {
    display: 'flex',
    justifyContent: "space-around",
    width: "100%",
    height: 420,
    padding: 10,
    gap: 10,
  },
  invariantContentView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "55%",
    padding: 15,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  footerButton: {
    backgroundColor: "#004A8F"
  },
});

export default styles;