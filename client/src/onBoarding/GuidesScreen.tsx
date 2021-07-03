import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Slider, SkipButton } from './components';

const GuidesScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <SkipButton />
      <Slider />
    </View>
  );
};

export default GuidesScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#00388A',
  },
});
