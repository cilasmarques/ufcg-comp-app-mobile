import { useState } from "react";
import { format } from 'date-fns'
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Select, Text, Input } from "native-base";
import RNDateTimePicker from "@react-native-community/datetimepicker";

const ACTIVITY_UNITY_EVENT = ["-"];
const ACTIVITY_UNITY_SEMESTER = ["semestre(s)"];
const ACTIVITY_UNITY_RUNNING_TIME = ["hora(s)"];
const ACTIVITY_UNITY_CALENDAR = ["meses", "ano(s)"];

const ActivityPeriodPicker = ({ period, setPeriod, activityUnity }) => {
  const [openInitialDatePicker, setOpenInitialDatePicker] = useState(false);
  const [openFinalDatePicker, setOpenFinalDatePicker] = useState(false);

  function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  };

  const computeDateWorkload = (endDate, startDate) => {
    if (activityUnity === "meses") {
      if (endDate && startDate) {
        const nextDay = new Date(endDate.getTime() + (24 * 60 * 60 * 1000));
        let months = (nextDay.getFullYear() - startDate.getFullYear()) * 12;
        months -= startDate.getMonth();
        months += nextDay.getMonth();

        if (months < 3) {
          Alert.alert(" Periodo inválido", "O período de participação mínimo para o aproveitamento de atividades dessa natureza é de 3 meses");
          return;
        } else {
          return months;
        }
      }
    }
    else if (activityUnity === "ano(s)") {
      if (endDate && startDate) {
        const nextDay = new Date(endDate.getTime() + (24 * 60 * 60 * 1000));
        let years = (nextDay.getFullYear() - startDate.getFullYear());

        if (workload < 1) {
          Alert.alert(" Periodo inválido", "O período de participação mínimo para o aproveitamento de atividades dessa natureza é de 1 ano");
          return;
        } else {
          return years;
        }
      }
    }
  };

  const handleSetPeriodByDate = (initialDate, finalDate) => {
    setOpenFinalDatePicker(false);
    setOpenInitialDatePicker(false);

    const startDate = initialDate !== null ? new Date(initialDate) : period?.startDate;
    const endDate = finalDate !== null ? new Date(finalDate) : period?.endDate;
    setPeriod({...period, startDate: startDate, endDate: endDate});

    if (endDate && startDate) {
      if (endDate < startDate) {
        Alert.alert("A data de início precisa ser menor que a data de término");
        return;
      } 

      const workload = computeDateWorkload(endDate, startDate);
      if (workload) {
        const periodString = `De ${format(startDate, 'dd/MM/yyyy')} a ${format(endDate, 'dd/MM/yyyy')} (${workload} ${activityUnity})`;
  
        setPeriod({
          workload: workload,
          startDate: startDate,
          endDate: endDate,
          fullPeriod: periodString,
        });
      }
    }
  };

  const handleSetPeriodBySemesters = (value) => {
    setPeriod({
      workload: value,
      startDate: null,
      endDate: null,
      fullPeriod: `${value} semestre(s)`,
    });
  };

  const handleSetPeriodByHours = (value) => {
    setPeriod({
      workload: value,
      startDate: null,
      endDate: null,
      fullPeriod: `${value} hora(s)`,
    });
  };

  return (
    <View style={styles.variantContentView}>
      {!activityUnity && <Text> Por favor, selecione o tipo de atividade </Text>}

      {(ACTIVITY_UNITY_CALENDAR.includes(activityUnity)) && (
        <>
          <Text> Por favor, defina o periodo de participação </Text>
          <TouchableOpacity style={styles.datePickerButton} onPress={() => setOpenInitialDatePicker(true)}>
            <Text style={styles.datePickerButtonText}> Selecionar data de início: {period?.startDate && format(period.startDate, 'dd/MM/yyyy')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datePickerButton} onPress={() => setOpenFinalDatePicker(true)}>
            <Text style={styles.datePickerButtonText}> Selecionar data de término: {period?.endDate && format(period.endDate, 'dd/MM/yyyy')}</Text>
          </TouchableOpacity>
        </>
      )}

      {(ACTIVITY_UNITY_SEMESTER.includes(activityUnity)) && (
        <>
          <Text>Por favor, selecione a quantidade de semestres correspondentes ao periodo de participação.</Text>
          <Select
            placeholder="Quantidade de semestres"
            selectedValue={period?.workload}
            onValueChange={handleSetPeriodBySemesters}
          >
            {range(1, 4).map(i =>
              <Select.Item key={i} label={`${i} semestre(s)`} value={i} />
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
            onChangeText={handleSetPeriodByHours}
          />
        </>
      )}

      {(ACTIVITY_UNITY_EVENT.includes(activityUnity)) && (
        <Text>O número de créditos a serem aproveitados para atividades dessa natureza será estabelecido pelo Colegiado.</Text>
      )}

      {openInitialDatePicker &&
        <RNDateTimePicker
          display='default'
          value={new Date()}
          maximumDate={new Date()}
          onChange={(e) => handleSetPeriodByDate(e.nativeEvent.timestamp, null)}
        />
      }

      {openFinalDatePicker &&
        <RNDateTimePicker
          display='default'
          value={new Date()}
          maximumDate={new Date()}
          onChange={(e) => handleSetPeriodByDate(null, e.nativeEvent.timestamp)}
        />
      }
    </View>
  )
};

const styles = StyleSheet.create({
  variantContentView: {
    display: "flex",
    justifyContent: "space-around",
    padding: 15,
    marginTop: 10,
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