import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#004A8F",
    padding: 10
  },
  headerGreetings: {
    color: "#FFFFFF",
    fontSize: 15
  },
  headerPageTitle: {
    color: "#FFFFFF",
    fontSize: 25
  },
  headerInfoContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  mainContainer: {
    height: 200,
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'space-around',
    alignItems: "center",
    marginTop: 15
  },
  mainButton: {
    width: 300,
    height: 35,
    justifyContent: "center",
    backgroundColor: "#004A8F",
    borderRadius: 3
  },
  mainButtonText: {
    color: "#FFFFFF",
    textAlign: "center"
  },
  generationButtonEnabled: {
    width: 300,
    height: 35,
    justifyContent: "center",
    backgroundColor: "#368C72",
    borderRadius: 3
  },
  generationButtonDisabled: {
    width: 300,
    height: 35,
    justifyContent: "center",
    backgroundColor: "#80B6CE",
    borderRadius: 3
  },
});

export default styles;