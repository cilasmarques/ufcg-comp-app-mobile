import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTS
import ActivityInfoCard from "../../../components/Activity/Card/InfoCard";

// CONTEXT
import { useAuth } from "../../../context/AuthContext";

//SERVICES
import { fetchActivities } from '../../../services/ActivityService'

// STYLES
import styles from "./styles.list";

const ActivitiesListScreen = () => {
  const initialPageConfiguration = { page: 0, size: 1000, sortField: 'id', sortOrder: 'asc' };

  const { user } = useAuth();
  const [activities, setActivities] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const loadData = async () => {
    const result = await fetchActivities(
      { "owner_email": user.email },
      initialPageConfiguration.page,
      initialPageConfiguration.size,
      initialPageConfiguration.sortField,
      initialPageConfiguration.sortOrder
    );

    if (result)
      setActivities(result.data.activities);
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainTitle}>
        Atividades Registradas
      </Text>

      <Text style={{ marginTop: 10 }}>
        {activities?.length > 0 ? `Você possui ${activities?.length} atividades registradas` : 'Nenhuma atividade registrada'}
      </Text>

      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          style={styles.scrollAreaView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          {activities?.map((act, i) => (
            <ActivityInfoCard
              key={i}
              tableHeader={['Tipo de atividade', 'Descrição Ativade', 'Período', 'Créditos', 'Comprovação']}
              tableContent={[
                act.kind,
                act.description,
                `${act.workload} ${act.workload_unity}`, //TODO adicionar fullPeriod no BD?
                act.computed_credits,
                act.voucher_path.split("/")[2]
              ]}
              activityStatus={act.state}
              activityJustify={act.justify}
              activityUpdatedTime={act.updated_time}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View >
  )
};

export default ActivitiesListScreen;