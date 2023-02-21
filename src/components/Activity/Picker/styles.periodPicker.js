import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  variantContentView: {
    display: "flex",
    justifyContent: "space-around",
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
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
  datePickerButton: {
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#004A8F",
  },
  datePickerButtonText: {
    color: "#004A8F",
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    minHeight: 50,
    minWidth: 200,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center"
  },
});

export default styles;