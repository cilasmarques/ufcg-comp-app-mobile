import { useCallback, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

// COMPONENTS
import ActivityInfoCard from "../../components/Activity/Card/InfoCard";

// CONTEXT
import { useAuth } from "../../context/AuthContext";

//SERVICES
import { fetchActivities } from '../../services/activityService'

const ActivitiesListScreen = () => {
  const initialPageConfiguration = { page: 0, size: 1000, sortField: 'id', sortOrder: 'asc' };

  const { user } = useAuth();
  const [activities, setActivities] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const result = await fetchActivities(
      { "owner_email": user.email },
      initialPageConfiguration.page,
      initialPageConfiguration.size,
      initialPageConfiguration.sortField,
      initialPageConfiguration.sortOrder
    );

    setActivities(result.data.activities);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainTitle}>
        Atividades Registradas
      </Text>

      {activities?.length === 0 && <Text style={{ marginTop: 10 }}>Nenhuma atividade registrada</Text>}
      {activities?.length > 0 && <Text style={{ marginTop: 10 }}>Você possui {activities?.length} atividades registradas</Text>}

      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
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
                `${act.workload} ${act.workload_unity}`, 
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

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
  },
  mainTitle: {
    padding: 5,
    fontSize: 26,
    fontWeight: "bold",
    color: "#004A8F",
  },
  safeAreaView: {
    width: 385,
    height: 400,
    marginTop: 10
  },
});

export default ActivitiesListScreen;