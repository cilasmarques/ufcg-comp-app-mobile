import { useCallback, useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { NativeBaseProvider, Select, TextArea, Text } from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';

// COMPONENTS
import Button from "../../../components/General/Button/Button";
import ActivityPeriodPicker from "../../../components/Activity/Picker/PeriodPicker";
import ActivityRegisterModal from "../../../components/Activity/Modal/RegisterModal";

// SERVICES
import { fetchActivitiesMetrics } from "../../../services/ActivityService";

// STYLES
import styles from "./styles.register";

const ActivityRegisterScreen = () => {
  const [activityPeriod, setActivityPeriod] = useState(null);
  const [activityMetrics, setActivityMertics] = useState(null);
  const [activityVoucher, setPreflightDoc] = useState(null);
  const [activityDescription, setActivityDescription] = useState("");
  const [DBActMetricsInfo, setDBActMetricsInfo] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const clearData = () => {
    /* Clearing the screen */
    setPreflightDoc(null);
    setActivityPeriod(null);
    setActivityMertics(null);
    setActivityDescription("");
  }

  useFocusEffect(
    useCallback(() => {
      clearData();
    }, [])
  );

  useEffect(() => {
    const loadData = async () => {
      const response = await fetchActivitiesMetrics();
      setDBActMetricsInfo(response.data.metrics_info);
    }
    loadData();
  }, [])

  const handleSetDescription = (text) => {
    if (text.trim().length > 0) {
      setActivityDescription(text);
    } else if (text.length > 255) {
      Alert.alert("A descrição deve ter no máximo 255 caracteres");
    }
  };

  const handleSetActivityKind = (activityKind) => {
    const selectedActMetrics = DBActMetricsInfo.find(a => a.kind === activityKind);
    setActivityMertics(selectedActMetrics);
    setActivityPeriod(null);
  };

  const handlePickDocument = async () => {
    const document = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
    setPreflightDoc(document);
  };

  const handleFinishRegister = async () => {
    console.log(activityPeriod)
    console.log(activityMetrics)
    console.log(activityDescription)
    console.log(activityVoucher)
    if (activityPeriod.fullPeriod && activityMetrics && activityDescription && activityVoucher) {
      setOpenModal(true);
    }
    else if (!activityPeriod && !activityMetrics.workload_unity) {
      Alert.alert("Período inválido");
    } else if (!activityDescription) {
      Alert.alert("Descrição inválida");
    } else if (!activityVoucher) {
      Alert.alert("Documento inválido");
    } else {
      Alert.alert("Alguma coisa deu errada :(", "Por favor, verfique se os campos estão preenchidos corretamente.");
    }
  };

  return (
    <NativeBaseProvider>
      <View style={styles.mainContainer}>
        <Text style={styles.mainTitle}>
          Registrar Atividade
        </Text>

        <View style={styles.registerBoxView}>
          <View style={styles.invariantContentView}>
            <Select
              placeholder="Tipo de atividade"
              onValueChange={handleSetActivityKind}
              selectedValue={activityMetrics ? activityMetrics.kind : ""}
            >
              {DBActMetricsInfo.map((activity, index) =>
                <Select.Item key={index} label={activity.kind} value={activity.kind} />
              )}
            </Select>

            <TextArea
              keyboardType="default"
              placeholder="Descrição da atividade"
              value={activityDescription}
              onChangeText={handleSetDescription}
            />

            <Button
              onPress={handlePickDocument}
              title="Selecionar documento"
              filename={activityVoucher?.name}
              variant='documentPicker'
            />
          </View>

          <ActivityPeriodPicker
            period={activityPeriod}
            setPeriod={setActivityPeriod}
            activityUnity={activityMetrics?.workload_unity}
          />
        </View>

        <Button
          onPress={handleFinishRegister}
          title="Registrar Atividade"
        />
      </View>

      <ActivityRegisterModal
        clearData={clearData}
        openModal={openModal}
        setOpenModal={setOpenModal}
        activityPeriod={activityPeriod}
        activityVoucher={activityVoucher}
        activityKind={activityMetrics?.kind}
        activityDescription={activityDescription}
      />
    </NativeBaseProvider>
  )
};

export default ActivityRegisterScreen;