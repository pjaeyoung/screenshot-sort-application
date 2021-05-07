import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { navigate } from '@/RootNavigation';

import ActionButton from '@/shared/utils/react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';

const onPress = () => {
  navigate('FolderDesign', {});
};

const FolderSettingScreen: React.FC<void> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.plusButtonWrapper}>
        <TouchableOpacity style={styles.plusButton} onPress={onPress}>
          <Icon name="add" type="material" style={styles.actionButtonIcon} />
        </TouchableOpacity>
      </View>
      <ActionButton
        buttonColor="rgba(0,0,255,1)"
        renderIcon={() => <Icon name="checkmark" style={styles.actionButtonIcon} />}></ActionButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  newFolderShape: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  actionButtonIcon: {
    fontSize: 25,
    height: 22,
    color: 'white',
  },
  plusButtonWrapper: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
  },
});

export default FolderSettingScreen;
