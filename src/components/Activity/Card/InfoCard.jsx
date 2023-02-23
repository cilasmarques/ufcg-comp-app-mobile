import { View, Text } from "react-native";
import { Row, Rows, Table } from "react-native-table-component";

// CONSTANTS
import { ACTIVITY_STATE_TRANSLATION_MAP } from "../../../utils/constants";

// STYLES
import styles from "./styles.infoCard";

const ActivityInfoCard = ({ tableModalContainer, tableHeader, tableContent, activityStatus, activityJustify, activityUpdatedTime }) => {
  function formatDate(date) {
    const dateAux = new Date(date);
    let day = dateAux.getDate().toString().padStart(2, '0');
    let mounth = (dateAux.getMonth() + 1).toString().padStart(2, '0');
    let year = dateAux.getFullYear();

    return day + "/" + mounth + "/" + year;
  }

  return (
    <View style={styles.activityContainerView(activityStatus)}>
      <View style={styles.tableContainerView(activityStatus)}>
        <Table borderStyle={styles.tableBorder} style={styles.tableContainer(tableModalContainer)}>
          <Row data={tableHeader} textStyle={styles.tableText}/>
          <Rows data={[tableContent]} textStyle={styles}/>
        </Table>
      </View>
      <Text style={styles.activityInfoText}>
        {ACTIVITY_STATE_TRANSLATION_MAP.find(a => a.key === activityStatus).value} | {formatDate(activityUpdatedTime)}
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