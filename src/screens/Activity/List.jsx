import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

// COMPONENTS
import ActivityInfoCard from "../../components/Activity/Card/InfoCard";

// CONTEXT
import { useAuth } from "../../context/AuthContext";

//SERVICES
import { fetchActivities } from '../../services/activityService'

const ActivitiesListScreen = () => {
  const initialPageConfiguration = { page: 0, size: 1000, sortField: 'updatedTime', sortOrder: 'asc' };

  const { user } = useAuth();
  const [activities, setActivities] = useState(null);

  useEffect(() => {
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

    loadData();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.mainTitle}>
        Atividades Registradas
      </Text>

      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView>
          {activities?.map(act => (
            <ActivityInfoCard
              tableHeader={['Tipo de atividade', 'Descrição Ativade', 'Período', 'Créditos', 'Comprovação']}
              tableContent={[act.type, act.description, act.period, act.credits, act.proof_doc]}
              activityStatus={act.status}
              activityUpdatedTime={act.updatedTime}
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