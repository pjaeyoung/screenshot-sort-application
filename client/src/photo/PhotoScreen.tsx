import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Photo } from './components';

const PhotoScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Photo />
    </View>
  );
};

export default PhotoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
