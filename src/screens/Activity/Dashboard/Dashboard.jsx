import { useCallback, useState } from "react";
import { View, Text, Linking, Alert } from "react-native"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

// COMPONENTS
import Button from "../../../components/General/Button/Button";
import InfoBox from "../../../components/General/InfoBox/InfoBox";
import ProcessRegisterModal from "../../../components/Process/Modal/RegisterModal";

// CONSTANTS
import { API_BASE_URL, API_ENDPOINT_GUIDE_ACTIVITIES } from "../../../utils/constants";

// CONTEXT
import { useAuth } from "../../../context/AuthContext";

// SERVICES
import { fetchActivitiesComputedCredits } from "../../../services/ActivityService";

// STYLES
import styles from "./styles.dashboard";

const DashboardScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [missingCredits, setMissingCredits] = useState(22);
  const [computedCredits, setComputedCredits] = useState(0);
  const [disableGeneration, setDisableGeneration] = useState(true);
  const [openProcessModal, setOpenProcessModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    if (user) {
      const response = await fetchActivitiesComputedCredits(user.email);
      try {
        const credits = response.data.credits_info;
        const missing = credits.missing_credits;
        const computed = credits.computed_credits;

        setMissingCredits(missing);
        setComputedCredits(computed);

        if (missing > 0) {
          setDisableGeneration(true);
        } else {
          setDisableGeneration(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
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

  const handleRedirectToUserGuide = async () => {
    const userGuideUrl = `${API_BASE_URL}/${API_ENDPOINT_GUIDE_ACTIVITIES}`;
    const supported = await Linking.canOpenURL(userGuideUrl);
    if (supported) {
      await Linking.openURL(userGuideUrl);
    } else {
      Alert.alert(`Don't know how to open this URL: ${userGuideUrl}`);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <View style={styles.headerContainer}>
        <View style={{ padding: 5 }}>
          <Text style={styles.headerGreetings}>Olá, {user?.name}</Text>
          <Text style={styles.headerPageTitle}>Atividades Complementares</Text>
        </View>

        <View style={styles.headerInfoContainer}>
          <InfoBox headerText="Contabilizados" contentText={`${computedCredits} Créditos`} />
          <InfoBox headerText="Faltando" contentText={`${missingCredits} Créditos`} />
        </View>
      </View>

      <View style={styles.mainContainer}>
        <Button title="Guia do usuário" onPress={handleRedirectToUserGuide} />
        <Button title="Registrar atividade" onPress={() => navigation.navigate('Activity Register')} />
        <Button title="Atividades Registradas" onPress={() => navigation.navigate('Activities List')} />
        <Button
          title="Gerar Processo"
          variant="licenseButton"
          disabled={disableGeneration}
          onPress={disableGeneration ? null : () => setOpenProcessModal(true)}
        />
      </View>

      <ProcessRegisterModal
        openModal={openProcessModal}
        setOpenModal={setOpenProcessModal}
      />
    </ScrollView>
  )
};

export default DashboardScreen;