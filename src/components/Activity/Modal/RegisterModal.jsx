import { useState } from "react";
import { Button } from "native-base";
import { View, Text, Modal, Alert, ActivityIndicator } from "react-native";

// COMPONENTS
import ActivityInfoCard from "../Card/InfoCard";

// CONSTANTS
import { ACTIVITY_STATE_CREATED } from "../../../utils/constants";

// CONTEXT
import { useAuth } from "../../../context/AuthContext";

// SERVICE
import { registerActivity } from "../../../services/ActivityService";

// STYLES
import styles from "./styles.registerModal";

const ActivityRegisterModal = ({ clearData, openModal, setOpenModal, activityKind, activityDescription, activityPeriod, activityVoucher }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmitActivity = async () => {
    const data = new FormData();
    data.append('owner_email', user.email);
    data.append('kind', activityKind);
    data.append('description', activityDescription.trim());
    data.append('voucher', {
      type: activityVoucher.mimeType,
      name: activityVoucher.name,
      uri: activityVoucher.uri
    });

    activityPeriod?.workload && data.append('workload', activityPeriod.workload);
    activityPeriod?.startDate && data.append('start_date', new Date(activityPeriod.startDate).toISOString());
    activityPeriod?.endDate && data.append('end_date', new Date(activityPeriod.endDate).toISOString());

    setIsLoading(true);
    const response = await registerActivity(data);
    if (response?.status === 200) {
      clearData();
      Alert.alert("Atividade registrada com sucesso");
    } else {
      Alert.alert("Erro ao registrar a atividade", "Por favor, verifique os campos e tente novamente");
    }

    setIsLoading(false);
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
            tableContent={[
              activityKind, 
              activityDescription, 
              activityPeriod ? activityPeriod.fullPeriod : '-' , 
              activityVoucher?.name
            ]}
            activityStatus={ACTIVITY_STATE_CREATED}
            activityJustify={null}
            activityUpdatedTime={new Date()}
            tableModalContainer={true}
          />
          {isLoading ?
            <ActivityIndicator size="large" color="#004A8F" /> :
            <Button
              style={styles.footerButton}
              onPress={handleSubmitActivity}
            >
              Finalizar
            </Button>}
        </View>
      </View>
    </Modal>
  )
};

export default ActivityRegisterModal;