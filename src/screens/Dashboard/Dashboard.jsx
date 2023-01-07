import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react";
import { fetchActivities } from "../../services/activityService";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = () => {
  const { user } = useAuth();

  const [creditsMissing, setCreditsMissing] = useState();
  const [creditsApproved, setCreditsApproved] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        const query = { owner_email: user.email };
        const response = await fetchActivities(query, 0, 10, 'createdTime', 'asc');

        let approvedAmount = 0;
        response.data.activities.forEach(a => { 
          if (a.status === 'VALIDATED')
          approvedAmount += Number(a.credits) 
        });

        setCreditsMissing(22 - approvedAmount);
        setCreditsApproved(approvedAmount);
      }
    };
    loadData();
  }, []);

  return (
    <View>
      {/* TODO make this header be a new component */}
      <View style={styles.headerContainer}>
        <View style={{ padding: 5 }}>
          <Text style={styles.headerGreetings}> Olá, {user?.name} </Text>
          <Text style={styles.headerPageTitle}> Horas Complementares </Text>
        </View>

        <View style={styles.headerInfoContainer}>
          <View style={styles.infoBoxContainer}>
            <Text style={styles.infoBoxText}>Contabilizados</Text>
            <Text style={styles.infoBoxText}>{creditsApproved} Créditos</Text>
          </View>

          <View style={styles.infoBoxContainer}>
            <Text style={styles.infoBoxText}>Faltando</Text>
            <Text style={styles.infoBoxText}>{creditsMissing} Créditos</Text>
          </View>
        </View>
      </View>

      <View style={styles.mainContainer}>
        <TouchableOpacity style={styles.mainButton}>
          <Text style={styles.mainButtonText}>Guia do usuário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate('Activity Register')}>
          <Text style={styles.mainButtonText}>Registrar atividade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainButton}>
          <Text style={styles.mainButtonText}>Atividades Registradas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.mainButton}>
          <Text style={styles.mainButtonText}>Gerar Processo</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#004A8F",
    padding: 10
  },
  headerGreetings: {
    color: "#FFFFFF",
    fontSize: 15
  },
  headerPageTitle: {
    color: "#FFFFFF",
    fontSize: 25
  },
  headerInfoContainer: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-around'
  },
  infoBoxContainer: {
    backgroundColor: "#FFFFFF",
    margin: 5,
    padding: 7,
    borderRadius: 5,
    width: 150
  },
  infoBoxText: {
    color: "#004A8F",
    textAlign: "center"
  },
  mainContainer: {
    height: "50%",
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'space-around',
    alignItems: "center",
    marginTop: 15
  },
  mainButton: {
    width: 300,
    height: 35,
    justifyContent: "center",
    backgroundColor: "#004A8F",
    borderRadius: 3
  },
  mainButtonText: {
    color: "#FFFFFF",
    textAlign: "center"
  }
});

export default DashboardScreen;