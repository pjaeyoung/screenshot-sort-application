import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ErrorView: React.FC<{ message: string }> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default ErrorView;

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    padding: 79,
  },
  message: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 12,
  },
});
