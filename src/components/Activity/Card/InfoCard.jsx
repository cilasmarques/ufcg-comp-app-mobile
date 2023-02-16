import { View, Text, StyleSheet } from "react-native";
import { Row, Rows, Table } from "react-native-table-component";

const ActivityInfoCard = ({ tableHeader, tableContent, activityStatus, activityJustify, activityUpdatedTime }) => {
  const translatedStatus = [
    { key: "CREATED", value: "CRIADO" },
    { key: "ASSIGNED", value: "ATRIBUÍDO" },
    { key: "APPROVED", value: "APROVADO" },
    { key: "REJECTED", value: "REJEITADO" }
  ];

  function formatDate(date){
    const dateAux = new Date(date);
    let day  = dateAux.getDate().toString().padStart(2, '0');
    let mounth  = (dateAux.getMonth()+1).toString().padStart(2, '0');
    let year  = dateAux.getFullYear();

    return day+"/"+mounth+"/"+year;
  }

  return (
    <View style={styles.activityContainerView(activityStatus)}>
      <View style={styles.tableContainerView(activityStatus)}>
        <Table borderStyle={styles.tableBorder}>
          <Row
            data={tableHeader}
            style={styles.tableHead}
          />
          <Rows
            data={[tableContent]}
          />
        </Table>
      </View>
      <Text style={styles.activityInfoText}>
        {translatedStatus.find(a => a.key === activityStatus).value} | {formatDate(activityUpdatedTime)}
      </Text>
      {activityJustify &&
        <Text style={styles.activityInfoText}>
          Justificativa: {activityJustify}
        </Text>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  activityContainerView: status => ({
    backgroundColor: (status === "APPROVED") ? "#368C72" : (status === "REJECTED") ? "#8C3636" : "black",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
  }),
  tableContainerView: status => ({
    minWidth: "100%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: (status === "APPROVED") ? "#368C72" : (status === "REJECTED") ? "#8C3636" : "black",
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

export default ActivityInfoCard;