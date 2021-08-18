import React from 'react';
import { Dimensions, View, Text } from 'react-native';

const Loading: React.FC = () => {
  return (
    <View
      style={{
        height: Dimensions.get('window').height,
        width: '100%',
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{ color: '#fff', fontSize: 50 }}>Loading....</Text>
    </View>
  );
};

export default Loading;
