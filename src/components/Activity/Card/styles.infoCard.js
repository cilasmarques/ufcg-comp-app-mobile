import { StyleSheet } from "react-native"

// CONSTANTS
import { ACTIVITY_STATE_APPROVED, ACTIVITY_STATE_REJECTED } from "../../../utils/constants";

const styles = StyleSheet.create({
  activityContainerView: status => ({
    backgroundColor: (status === ACTIVITY_STATE_APPROVED) ? "#368C72" : (status === ACTIVITY_STATE_REJECTED) ? "#8C3636" : "black",
    borderRadius: 10,
    marginBottom: 10,
    
    alignItems: "center",
  }),
  tableContainerView: status => ({
    minWidth: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: (status === ACTIVITY_STATE_APPROVED) ? "#368C72" : (status === ACTIVITY_STATE_REJECTED) ? "#8C3636" : "black",
    borderWidth: 3,
  }),
  activityInfoText: {
    color: "white",
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  tableHead: {
    height: 40,
    backgroundColor: '#f1f8ff'
  },
  tableBorder: {
    borderWidth: 1,
    borderColor: '#C1C0B9'
  },
  tableText: {
    margin: 6
  },
});

export default styles;