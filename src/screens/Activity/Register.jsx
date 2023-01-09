import { useCallback, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { NativeBaseProvider, Select, TextArea, Button, Text } from "native-base";
import { useFocusEffect } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';

// COMPONENTS
import ActivityPeriodPicker from "../../components/Activity/Picker/PeriodPicker";
import ActivityRegisterModal from "../../components/Activity/Modal/RegisterModal";

// TODO Refact: move this logic to the backend
const ACTIVITY_TYPES = [
  { _id: 1, unity: "ano(s)", label: "Participação em Pesquisa de Iniciação Científica ou Extensão Reconhecida Institucionalmente pela UFCG." },
  { _id: 2, unity: "meses", label: "Participação em Projeto de Pesquisa e Desenvolvimento Reconhecido Institucionalmente pela UFCG, incluindo atividades de PD&I junto à CodeX." },
  { _id: 3, unity: "semestre(s)", label: "Participação em Monitoria Reconhecida Institucionalmente pela UFCG." },
  { _id: 4, unity: "horas", label: "Realização de Estágio Não Obrigatório." },
  { _id: 5, unity: "horas", label: "Atividades profissionais na área de Ciência da Computação (válido apenas para alunos que integralizaram pelo menos 80 créditos obrigatórios)" },
  { _id: 6, unity: "ano(s)", label: "Representação Estudantil. Participação na direção do Centro Acadêmico do curso de Ciência da Computação da UFCG, participação no colegiado do Curso de Ciência da Computação ou participação na Direção do Diretório Central de Estudantes da UFCG." },
  { _id: 7, unity: "-", label: "Participação na autoria de trabalho em Evento" },
  { _id: 8, unity: "-", label: "Participação em Evento (apresentador)" },
  { _id: 9, unity: "-", label: "Participação em Evento (ouvinte)." },
  { _id: 10, unity: "-", label: "Participação em Evento apoiado (organizador)." },
  { _id: 11, unity: "-", label: "Ministrante em atividade de extensão (oficinas, minicursos, cursos de extensão)." },
  { _id: 12, unity: "-", label: "Colaborador / organizador em atividade de extensão (oficinas, minicursos, cursos de extensão)." },
  { _id: 13, unity: "-", label: "Outras Atividades." },
];

const ActivityRegisterScreen = () => {
  const [period, setPeriod] = useState(null);
  const [activityType, setActivityType] = useState(null);
  const [activityVoucher, setPreflightDoc] = useState(null);
  const [activityDescription, setActivityDescription] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      /* Clearing the screen */
      setPeriod(null);
      setActivityType(null);
      setPreflightDoc(null);
      setActivityDescription("");
    }, [])
  );

  const handleSetDescription = (text) => {
    setActivityDescription(text);
  };

  const handleSetActivityType = (activityId) => {
    const selectedActivity = ACTIVITY_TYPES.find(a => a._id === activityId);
    setActivityType(selectedActivity);
    setPeriod(null);
  };

  const handlePickDocument = async () => {
    const document = await DocumentPicker.getDocumentAsync({ type: "application/pdf" });
    setPreflightDoc(document);
  };

  // TODO Feature: Add a confirmation step before finalizing the registration 
  const handleFinishRegister = async () => {
    if (period && activityType && activityDescription && activityVoucher) {
      setOpenModal(true);
    }
    else if (!period && activityType?.unity !== "-") {
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
              selectedValue={activityType ? activityType._id : -1}
              onValueChange={handleSetActivityType}
            >
              {ACTIVITY_TYPES.map(activity =>
                <Select.Item
                  key={activity._id}
                  label={activity.label}
                  value={activity._id}
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
            period={period}
            setPeriod={setPeriod}
            activityUnity={activityType?.unity}
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
        openModal={openModal}
        setOpenModal={setOpenModal}
        period={period}
        activityVoucher={activityVoucher}
        activityType={activityType?.label}
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