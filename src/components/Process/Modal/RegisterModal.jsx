import { useState } from "react";
import { View, Text, Modal, Alert, ActivityIndicator } from "react-native";
import { Button, NativeBaseProvider } from "native-base";
import * as FileSystem from 'expo-file-system';
import { Buffer } from "buffer";

// CONTEXT
import { useAuth } from "../../../context/AuthContext";

// SERVICE
import { generateProcess } from "../../../services/ProcessService";

// STYLES
import styles from "./styles.component";

const ProcessRegisterModal = ({ openModal, setOpenModal }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateProcess = async () => {
    setIsLoading(true);
    try {
    const response = await generateProcess({ owner_email: user.email });
      const buff = Buffer.from(response.data.file, 'base64');
      const file = buff.toString('base64');

      const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        await FileSystem.StorageAccessFramework.createFileAsync(
          permissions.directoryUri,
          'process.pdf',
          'application/pdf'
        ).then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, file, { encoding: FileSystem.EncodingType.Base64 });
          Alert.alert('Sucesso', 'Processo salvo com sucesso');
          setOpenModal(false);
        }).catch((e) => {
          Alert.alert('Erro', 'Não foi possível gerar o processo');
        });
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <NativeBaseProvider>
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
            <Text style={styles.modalTitle}>Atenção!</Text>
            <Text style={styles.modalText}>Apenas o processo mais recente é considerado válido, enquanto os processos anteriores são desconsiderados.</Text>
            {isLoading ?
              <ActivityIndicator size="large" color="#004A8F" /> :
              <Button style={styles.footerButton} onPress={handleGenerateProcess}>
                Gerar processo
              </Button>
            }
          </View>
        </View>
      </Modal>
    </NativeBaseProvider>
  )
};

export default ProcessRegisterModal;