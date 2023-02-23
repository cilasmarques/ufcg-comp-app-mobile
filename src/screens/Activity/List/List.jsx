import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

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

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = () => {
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

      {activities ?
        <FlatList
          style={styles.safeAreaView}
          data={activities}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ActivityInfoCard
              tableHeader={['Tipo de atividade', 'Descrição Ativade', 'Período', 'Créditos', 'Comprovação']}
              tableContent={[
                item.kind,
                item.description,
                item.workload ? `${item.workload} ${item.workload_unity}` : '-',
                item.computed_credits ? item.computed_credits : '-',
                item.voucher_path.split("/")[2]
              ]}
              activityStatus={item.state}
              activityJustify={item.justify}
              activityUpdatedTime={item.updated_time}
              tableModalContainer={false}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        /> :
        <ActivityIndicator size="large" color="#004A8F" />
      }
    </View >
  )
};

export default ActivitiesListScreen;