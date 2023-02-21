import { View, Text } from "react-native";
import { Row, Rows, Table } from "react-native-table-component";

// STYLES
import styles from "./styles.infoCard";

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
          <Row data={tableHeader}/>
          <Rows data={[tableContent]}/>
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

export default ActivityInfoCard;