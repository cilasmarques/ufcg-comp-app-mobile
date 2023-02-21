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
          {/* wrap the filename text field to not overflow the screen */}
          <Text
          style={styles.documentPickerFileName}
          > {props.filename} </Text>
        </View>
      );
    default:
      return (
        <TouchableOpacity
          {...props}
          onPress={props.onPress}
          style={props.disabled ? styles.buttonDisabled : styles.button}
        >
          <Text style={styles.buttonText}>{props.title}</Text>
        </TouchableOpacity>
      );
  };
}

export default Button;
