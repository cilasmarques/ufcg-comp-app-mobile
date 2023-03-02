import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

// STYLES
import styles from "./styles.button";

const Button = (props) => {
  switch (props.variant) {
    case 'documentPicker':
      return (
        <View style={styles.documentPickerView}>
          <TouchableOpacity style={styles.documentPickerButton} onPress={props.onPress}>
            <Text style={styles.documentPickerButtonText}>{props.title || 'Selecione um documento'}</Text>
          </TouchableOpacity>
          <Text style={styles.documentPickerFileName}>{props.filename}</Text>
        </View>
      );
    case 'licenseButton':
      return (
        <TouchableOpacity
          style={props.disabled ? styles.buttonDisabled : styles.buttonEnabled}
          onPress={props.onPress}
          {...props}
        >
          <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
      );
    default:
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={props.onPress}
          {...props}
        >
          <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
      );
  };
}

export default Button;
