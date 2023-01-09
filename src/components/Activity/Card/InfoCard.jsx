import { View, Text, StyleSheet } from "react-native";
import { Row, Rows, Table } from "react-native-table-component";

const ActivityInfoCard = ({ tableHeader, tableContent, activityStatus, activityUpdatedTime }) => {
  const translatedStatus = [
    { key: "CREATED", value: "CRIADO" },
    { key: "ASSIGNED", value: "ATRIBUÍDO" },
    { key: "VALIDATED", value: "VALIDADO" },
    { key: "REJECTED", value: "REJEITADO" }
  ];

  return (
    <View style={styles.activityContainerView(activityStatus)}>
      <View style={styles.tableContainerView(activityStatus)}>
        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
          <Row
            data={[...tableHeader]}
            style={styles.tableHead}
            textStyle={styles.tableText}
          />
          <Rows
            data={[[...tableContent]]}
            textStyle={styles.tableText}
          />
        </Table>
      </View>
      <Text style={styles.activityInfoText}>
        {translatedStatus.find(a => a.key === activityStatus).value} | {new Date(activityUpdatedTime).toLocaleDateString()}
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  activityContainerView: status => ({
    backgroundColor: (status === "VALIDATED") ? "#368C72" : (status === "REJECTED") ? "#8C3636" : "black",
    borderRadius: 10,
    marginBottom: 10,
  }),
  tableContainerView: status => ({
    width: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: (status === "VALIDATED") ? "#368C72" : (status === "REJECTED") ? "#8C3636" : "black",
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
  tableText: {
    margin: 6
  },
});

export default ActivityInfoCard;