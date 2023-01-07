import { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { NativeBaseProvider, Select, TextArea, Button, Text } from "native-base";
import * as DocumentPicker from 'expo-document-picker';

// CONTEXT
import { useAuth } from "../../context/AuthContext";

// SERVICE
import { registerActivity } from "../../services/activityService";
import ActivityPeriodPicker from "../../components/ActivityPicker/ParticipationPeriod";

// TODO Refact: move this logic to the backend
const ACTIVITY_TYPES = [
  { _id: 1, unity: "ano(s)", label: "Participação em Pesquisa de Iniciação Científica ou Extensão Reconhecida Institucionalmente pela UFCG." },
  { _id: 2, unity: "meses", label: "Participação em Projeto de Pesquisa e Desenvolvimento Reconhecido Institucionalmente pela UFCG, incluindo atividades de PD&I junto à CodeX." },
  { _id: 3, unity: "semestre", label: "Participação em Monitoria Reconhecida Institucionalmente pela UFCG." },
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
  const { user } = useAuth();
  const [period, setPeriod] = useState(null);
  const [preflightDoc, setPreflightDoc] = useState(null);
  const [activityType, setActivityType] = useState(null);
  const [activityDescription, setActivityDescription] = useState(null);

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
  const handleSubmitActivity = async () => {
    if (!period && activityType.unity !== "-") {
      Alert.alert("Período inválido");
    } else if (!activityDescription) {
      Alert.alert("Descrição inválida");
    } else if (!preflightDoc) {
      Alert.alert("Documento inválido");
    } else {
      const data = new FormData();

      data.append('period', period);
      data.append('owner_email', user.email);
      data.append('type', activityType.label);
      data.append('description', activityDescription);
      data.append('preflight_doc', {
        type: preflightDoc.mimeType,
        name: preflightDoc.name,
        uri: preflightDoc.uri
      });

      const result = await registerActivity(data);
      if (result.status === 200) {
        Alert.alert("Atividade registrada com sucesso");
      } else {
        Alert.alert("Erro ao registrar atividade. Por favor, tente novamente");
      }
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
              selectedValue={activityType?._id}
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
              onChangeText={handleSetDescription}
            />

            <View style={styles.documentPickerView}>
              <TouchableOpacity style={styles.documentPickerButton} onPress={handlePickDocument}>
                <Text style={styles.documentPickerButtonText}> Selecionar documento</Text>
              </TouchableOpacity>
              <Text width="50%" padding="2px"> {preflightDoc?.name} </Text>
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
          onPress={handleSubmitActivity}
        >
          Registrar Atividade
        </Button>

      </View>
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