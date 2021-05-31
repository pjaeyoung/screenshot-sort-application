import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { FloatingAction } from 'react-native-floating-action';
import { navigate } from '@/shared/utils/RootNavigation';

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

// FIXME: 라이브러리에서 key props 에러 발생 및 오버레이 위치 조정 어려움 => 대체 라이브러리 사용 혹은 직접 만들기

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

// FOLDER 화면으로 이동
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
