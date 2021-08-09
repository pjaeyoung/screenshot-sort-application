import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Header: React.FC = ({ previous, scene, navigation, Right }) => {
  const { descriptor } = scene;
  const { title, headerShown, headerTintColor } = descriptor.options;

  return (
    <View
      style={{
        ...styles.container,
        display: headerShown ? 'flex' : 'none',
      }}>
      <View style={styles.left}>
        {previous && (
          <Button
            title="이전"
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
      </View>
      <View style={styles.titleWrapper}>
        <Text
          style={{
            ...styles.title,
            color: headerTintColor,
          }}>
          {title}
        </Text>
      </View>
      <View style={styles.right}>{Right}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
    height: 56,
    backgroundColor: 'white',
    zIndex: 100,
  },
  left: {
    width: '20%',
  },
  titleWrapper: {
    justifyContent: 'center',
    width: '60%',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: 17,
  },
  right: {
    width: '20%',
  },
});
