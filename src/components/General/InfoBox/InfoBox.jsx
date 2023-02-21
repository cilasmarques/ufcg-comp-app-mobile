import React from 'react';
import { View, Text } from 'react-native';

// STYLES
import styles from "./styles.infoBox";

const InfoBox = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{props.headerText}</Text>
      <Text>{props.contentText}</Text>
    </View>
  );
};

export default InfoBox;