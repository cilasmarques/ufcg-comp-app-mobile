import { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Select, Text, Input } from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const ACTIVITY_UNITY_EVENT = ["-"];
const ACTIVITY_UNITY_SEMESTER = ["semestre"];
const ACTIVITY_UNITY_RUNNING_TIME = ["horas"];
const ACTIVITY_UNITY_CALENDAR = ["meses", "ano(s)"];

const ActivityPeriodPicker = ({ period, setPeriod, activityUnity }) => {
  const [openInitialDatePicker, setOpenInitialDatePicker] = useState(false);
  const [openFinalDatePicker, setOpenFinalDatePicker] = useState(false);
  const [initialDate, setInitialDate] = useState(null);
  const [finalDate, setFinalDate] = useState(null);

  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  };

  useEffect(() => {
    if (finalDate && initialDate) {
      let months = (finalDate.getFullYear() - initialDate.getFullYear()) * 12;
      months -= initialDate.getMonth();
      months += finalDate.getMonth();

      let periodString = `De ${initialDate.toLocaleDateString()}`;
      periodString += ` a ${finalDate.toLocaleDateString()}`;
      periodString += ` (${months <= 0 ? 0 : months} meses)`;

      setPeriod(periodString);
    }
  }, [initialDate, finalDate]);

  const handleSetInitialDate = (date) => {
    setOpenInitialDatePicker(false);

    const iDate = new Date(date.nativeEvent.timestamp)
    if (finalDate && finalDate < iDate) {
      Alert.alert("A data de início precisa ser menor que a data de término");
    } else {
      setInitialDate(iDate);
    }
  };

  const handleSetFinalDate = (date) => {
    setOpenFinalDatePicker(false);

    const fDate = new Date(date.nativeEvent.timestamp)
    if (initialDate && initialDate > fDate) {
      Alert.alert("A data de início precisa ser maior que a data de término");
    } else {
      setFinalDate(fDate);
    }
  };

  return (
    <View style={styles.variantContentView}>
      {!activityUnity && <Text> Por favor, selecione o tipo de atividade </Text>}

      {(ACTIVITY_UNITY_CALENDAR.includes(activityUnity)) && (
        <>
          <Text> Por favor, defina o periodo de participação </Text>
          <TouchableOpacity style={styles.datePickerButton} onPress={() => setOpenInitialDatePicker(true)}>
            <Text style={styles.datePickerButtonText}> Selecionar data de início: {initialDate?.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datePickerButton} onPress={() => setOpenFinalDatePicker(true)}>
            <Text style={styles.datePickerButtonText}> Selecionar data de término: {finalDate?.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </>
      )}

      {(ACTIVITY_UNITY_SEMESTER.includes(activityUnity)) && (
        <>
          <Text>Por favor, selecione a quantidade de semestres correspondentes ao periodo de participação.</Text>
          <Select
            placeholder="Quantidade de semestres"
            selectedValue={period}
            onValueChange={value => setPeriod(value)}
          >
            {range(1, 4).map(i =>
              <Select.Item key={i} label={`${i} semestre(s)`} value={`${i} semestre(s)`} />
            )}
          </Select>
        </>
      )}

      {(ACTIVITY_UNITY_RUNNING_TIME.includes(activityUnity)) && (
        <>
          <Text>Por favor, informe a quantidade de horas correspondentes ao periodo de participação.</Text>
          <Input
            placeholder="Insira a quantidade de horas"
            keyboardType="numeric"
            onChangeText={(value) => setPeriod(`${value} horas`)}
          />
        </>
      )}

      {(ACTIVITY_UNITY_EVENT.includes(activityUnity)) && (
        <Text>O número de créditos a serem aproveitados para atividades dessa natureza será estabelecido pelo Colegiado.</Text>
      )}

      {openInitialDatePicker &&
        <RNDateTimePicker
          is24Hour={true}
          display='default'
          value={new Date()}
          maximumDate={new Date()}
          onChange={handleSetInitialDate}
        />
      }

      {openFinalDatePicker &&
        <RNDateTimePicker
          is24Hour={true}
          display='default'
          value={new Date()}
          maximumDate={new Date()}
          onChange={handleSetFinalDate}
        />
      }
    </View>
  )
};

const styles = StyleSheet.create({
  variantContentView: {
    display: "flex",
    justifyContent: "space-around",
    height: 125,
    width: 385,
    padding: 15,
    marginBottom: 10,
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
  datePickerButton: {
    width: "100%",
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#004A8F",
  },
  datePickerButtonText: {
    color: "#004A8F",
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    minHeight: 50,
    minWidth: 200,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center"
  },
});

export default ActivityPeriodPicker;