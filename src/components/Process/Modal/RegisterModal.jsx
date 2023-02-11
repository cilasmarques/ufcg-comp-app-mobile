import { useState } from "react";
import { View, Text, StyleSheet, Modal, Alert } from "react-native";
import { Input, Button, NativeBaseProvider } from "native-base";
import * as FileSystem from 'expo-file-system';
import { Buffer } from "buffer";

// CONTEXT
import { useAuth } from "../../../context/AuthContext";

// SERVICE
import { generateProcess } from "../../../services/activityService";

const ProcessRegisterModal = ({ openModal, setOpenModal }) => {
  const { user } = useAuth();

  const [ownerEnroll, setOwnerEnroll] = useState("");

  const grabPdf = async () => {
    const response = await generateProcess({
      owner_email: user.email,
      owner_name: user.name,
      owner_enroll: ownerEnroll
    });
    const buff = Buffer.from(response.data.file, 'base64');
    return buff.toString('base64');
  }

  const handleGenerateProcess = async () => {
    try {
      if (!ownerEnroll) {
        Alert.alert("Matrícula inválida", "Por favor, informe sua matrícula.");      
      } else {
        const file = await grabPdf()
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
  
        if (permissions.granted) {
          await FileSystem.StorageAccessFramework.createFileAsync(
            permissions.directoryUri,
            'process.pdf',
            'application/pdf'
          )
            .then(async (uri) => {
              await FileSystem.writeAsStringAsync(uri, file, { encoding: FileSystem.EncodingType.Base64 });
              Alert.alert('Sucesso', 'Processo salvo com sucesso');
              setOpenModal(false);
            })
            .catch((e) => {
              console.error(e);
            });
        }
      }
    } catch (err) {
      console.error(err);
    }
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
            <Text style={styles.modalTitle}>Finalizando!</Text>
            <Text style={styles.modalText}>Por favor, informe seu nome completo e matricula.</Text>

            <Input
              keyboardType="numeric"
              placeholder="Insira sua matricula"
              onChangeText={(value) => setOwnerEnroll(value)}
            />

            <Button
              style={styles.footerButton}
              onPress={handleGenerateProcess}
            >
              Finalizar
            </Button>
          </View>
        </View>
      </Modal>
    </NativeBaseProvider>
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
    display: "flex",
    justifyContent: "space-around",
    height: 300,
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
    backgroundColor: "#004A8F"
  },
});

export default ProcessRegisterModal;