import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SkipButton: React.FC = () => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Permissions');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.Button}>SKIP</Text>
    </TouchableOpacity>
  );
};

export default SkipButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginTop: 26,
    marginRight: 24,
  },
  Button: {
    color: 'white',
    fontSize: 17,
  },
  text: {},
});
