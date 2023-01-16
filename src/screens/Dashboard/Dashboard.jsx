import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Share, Alert } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// COMPONENTS
import ProcessRegisterModal from "../../components/Process/Modal/RegisterModal";

// CONTEXT
import { useAuth } from "../../context/AuthContext";

// SERVICES
import { fetchActivitiesComputedCredits } from "../../services/activityService";

const DashboardScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [missingCredits, setMissingCredits] = useState(22);
  const [computedCredits, setComputedCredits] = useState(0);
  const [disableGeneration, setDisableGeneration] = useState(true);
  const [openProcessModal, setOpenProcessModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        if (user) {
          const response = await fetchActivitiesComputedCredits(user.email);
          const credits = response.data.credits_info;
          const missing = credits.missing_credits;
          const computed = credits.computed_credits;

          setMissingCredits(missing);
          setComputedCredits(computed);

          if (missing === 22) {
            setDisableGeneration(true);
          } else {
            setDisableGeneration(false);
          }
        }
      };

      loadData();
    }, [])
  );

  return (
    <View>
      {/* TODO Refact: make this header be a new component */}
      <View style={styles.headerContainer}>
        <View style={{ padding: 5 }}>
          <Text style={styles.headerGreetings}> Olá, {user?.name} </Text>
          <Text style={styles.headerPageTitle}> Horas Complementares </Text>
        </View>

        <View style={styles.headerInfoContainer}>
          <View style={styles.infoBoxContainer}>
            <Text style={styles.infoBoxText}>Contabilizados</Text>
            <Text style={styles.infoBoxText}>{computedCredits} Créditos</Text>
          </View>

          <View style={styles.infoBoxContainer}>
            <Text style={styles.infoBoxText}>Faltando</Text>
            <Text style={styles.infoBoxText}>{missingCredits} Créditos</Text>
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
        <TouchableOpacity style={styles.mainButton} onPress={() => navigation.navigate('Activities List')}>
          <Text style={styles.mainButtonText}>Atividades Registradas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={disableGeneration}
          onPress={disableGeneration ? null : () => setOpenProcessModal(true)}
          style={disableGeneration ? styles.generationButtonDisabled : styles.generationButtonEnabled}
        >
          <Text style={styles.mainButtonText}>Gerar Processo</Text>
        </TouchableOpacity>
      </View>

      <ProcessRegisterModal
        openModal={openProcessModal}
        setOpenModal={setOpenProcessModal}
      />

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
  },
  generationButtonEnabled: {
    width: 300,
    height: 35,
    justifyContent: "center",
    backgroundColor: "#368C72",
    borderRadius: 3
  },
  generationButtonDisabled: {
    width: 300,
    height: 35,
    justifyContent: "center",
    backgroundColor: "#80B6CE",
    borderRadius: 3
  },
});

export default DashboardScreen;