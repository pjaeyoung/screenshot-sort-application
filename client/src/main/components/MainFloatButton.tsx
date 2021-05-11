import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { navigate } from '@/RootNavigation';

const actions = [
  {
    name: 'FolderSetting',
    render: () => <Text style={styles.action}>폴더설정</Text>,
    buttonSize: 0,
    position: 1,
  },
  {
    name: '',
    render: () => <Text style={styles.action}>정리하기</Text>,
    buttonSize: 0,
    position: 2,
  },
];

const MainFloatButton: React.FC = () => {
  return (
    <FloatingAction
      color="#2699fb"
      overlayColor="rgba(68, 68, 68, 0.3)"
      actions={actions}
      onPressItem={onPressItem}
    />
  );
};

const onPressItem = (name: string | undefined) => {
  name && navigate(name, {});
};

export default MainFloatButton;

const styles = StyleSheet.create({
  action: {
    backgroundColor: '#2699fb',
    width: 120,
    height: 40,
    borderRadius: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
  },
});
