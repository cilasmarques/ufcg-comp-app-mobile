import { View, Text, StyleSheet, Modal, Alert } from "react-native";

// COMPONENTS
import ActivityInfoCard from "../Card/InfoCard";

// CONTEXT
import { useAuth } from "../../../context/AuthContext";

// SERVICE
import { registerActivity } from "../../../services/activityService";
import { Button } from "native-base";

const ActivityRegisterModal = ({ openModal, setOpenModal, activityType, activityDescription, period, activityVoucher }) => {
  const { user } = useAuth();

  const handleSubmitActivity = async () => {
    const data = new FormData();

    data.append('period', period || "-");
    data.append('owner_email', user.email);
    data.append('type', activityType);
    data.append('description', activityDescription);
    data.append('preflight_doc', {
      type: activityVoucher.mimeType,
      name: activityVoucher.name,
      uri: activityVoucher.uri
    });

    const result = await registerActivity(data);
    if (result.status === 200) {
      Alert.alert("Atividade registrada com sucesso");
    } else {
      Alert.alert("Erro ao registrar atividade. Por favor, tente novamente");
    }

    setOpenModal(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={openModal}
      onRequestClose={() => {
        setOpenModal(!openModal);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Finalizando!</Text>
          <Text style={styles.modalText}>Por favor, verifique as informações antes de finalizar.</Text>
          <ActivityInfoCard
            tableHeader={['Tipo de atividade', 'Descrição Ativade', 'Período', 'Comprovação']}
            tableContent={[activityType, activityDescription, period, activityVoucher?.name]}
            activityStatus={'CREATED'}
            activityUpdatedTime={new Date()}
          />
          <Button
            style={styles.footerButton}
            onPress={handleSubmitActivity}
          >
            Finalizar
          </Button>
        </View>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center"
  },
  footerButton: {
    width: 387,
    backgroundColor: "#004A8F"
  },
});

export default ActivityRegisterModal;