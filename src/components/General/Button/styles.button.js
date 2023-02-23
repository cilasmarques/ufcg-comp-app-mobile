import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  button: {
    width: 300,
    height: 35,
    justifyContent: "center",
    backgroundColor: "#004A8F",
    borderRadius: 3
  },
  buttonDisabled: {
    width: 300,
    height: 35,
    justifyContent: "center",
    backgroundColor: "#80B6CE",
    borderRadius: 3
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
  },
  documentPickerView: {
    display: 'flex',
    textAlign: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  documentPickerButton: {
    width: "45%",
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#004A8F",
  },
  documentPickerButtonText: {
    color: "#004A8F",
    fontWeight: "bold",
    alignSelf: "center",
  },
  documentPickerFileName: {
    width: "52%",
    maxHeight: 70,
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#004A8F",
    overflow: "hidden",
    fontSize: 12,
  },
});

export default styles;