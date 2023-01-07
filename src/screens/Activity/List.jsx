import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as DocumentPicker from 'expo-document-picker';

const ActivityRegisterScreen = () => {
  
    
  return (
    <View style={styles.centeredView}>
      <Text style={styles.title}>Registrar Atividade</Text>
      <View style={styles.registerBox}>
        <View
          style={{
            minHeight: 50,
            minWidth: 200,
            marginTop: 15,
            marginLeft: 20,
            marginRight: 20,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <Picker
            mode="dropdown"
            placeholder="Tipo de atividade"
            selectedValue={activityType}
            onValueChange={type => setActivityType(type)}
          >
            <Picker.Item label="Select Type" value={null} style={{ textAlign: 'center' }} />
            <Picker.Item label="Tipo 1" value="Tipo 1" />
            <Picker.Item label="Tipo 2" value="Tipo 2" />
          </Picker>
        </View>

        <TextInput style={styles.input} placeholder="Descrição da atividade" keyboardType="numeric" />

        <TouchableOpacity style={styles.datePicker} onPress={() => setOpenInitialDatePicker(true)}>
          <Text style={{ textAlign: 'center' }}> {initialDate ? initialDate.toLocaleDateString() : "Data de início"} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.datePicker} onPress={() => setOpenFinalDatePicker(true)}>
          <Text style={{ textAlign: 'center' }}> {finalDate ? finalDate.toLocaleDateString() : "Data de término"} </Text>
        </TouchableOpacity>

        <Button title="Select Document" onPress={handlePickDocument} />

        <View style={{ marginTop: 10, marginBottom: 10 }} />

        <Button title={"Continuar"} onPress={() => console.log('oi')} />
      </View>

      {openInitialDatePicker &&
        <RNDateTimePicker
          is24Hour={true}
          display='default'
          value={initialDate || new Date()}
          onChange={handleSetInitialDate}
        />
      }

      {openFinalDatePicker &&
        <RNDateTimePicker
          is24Hour={true}
          display='default'
          value={finalDate || new Date()}
          onChange={handleSetFinalDate}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  datePicker: {
    minHeight: 50,
    minWidth: 200,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  registerBox: {
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
  container: {
    height: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: "#004A8F",
  },
  input: {
    minHeight: 50,
    minWidth: 200,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ActivityRegisterScreen;