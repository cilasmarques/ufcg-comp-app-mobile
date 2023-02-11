import { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { NativeBaseProvider, Select, TextArea, Button, Text } from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';

// COMPONENTS
import ActivityPeriodPicker from "../../components/Activity/Picker/PeriodPicker";
import ActivityRegisterModal from "../../components/Activity/Modal/RegisterModal";
import { fetchActivitiesMetrics } from "../../services/activityService";

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
              selectedValue={activityMetrics ? activityMetrics.kind : ""}
              onValueChange={handleSetActivityKind}
            >
              {DBActMetricsInfo.map((activity, index) =>
                <Select.Item
                  key={index}
                  label={activity.kind}
                  value={activity.kind}
                />
              )}
            </Select>

            <TextArea
              keyboardType="default"
              placeholder="Descrição da atividade"
              value={activityDescription}
              onChangeText={handleSetDescription}
            />

            <View style={styles.documentPickerView}>
              <TouchableOpacity style={styles.documentPickerButton} onPress={handlePickDocument}>
                <Text style={styles.documentPickerButtonText}> Selecionar documento</Text>
              </TouchableOpacity>
              <Text width="50%" padding="2px"> {activityVoucher?.name} </Text>
            </View>
          </View>

          <ActivityPeriodPicker
            period={activityPeriod}
            setPeriod={setActivityPeriod}
            activityUnity={activityMetrics?.workload_unity}
          />
        </View>

        <Button
          style={styles.footerButton}
          onPress={handleFinishRegister}
        >
          Registrar Atividade
        </Button>
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
  registerBoxView: {
    width: 385,
    height: 360,
    display: 'flex',
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10
  },
  invariantContentView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    height: 210,
    width: 385,
    padding: 15,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  documentPickerView: {
    display: 'flex',
    textAlign: "center",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  documentPickerButton: {
    width: "45%",
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#004A8F",
  },
  documentPickerButtonText: {
    color: "#004A8F",
    fontWeight: "bold",
    alignSelf: "center",
  },
  datePickerButton: {
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#004A8F",
  },
  footerButton: {
    width: 387,
    backgroundColor: "#004A8F"
  },
});

export default ActivityRegisterScreen;