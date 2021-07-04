import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider, SkipButton } from './components';

import { useUserFolders } from '@/redux/folderSlice';

const GuidesScreen: React.FC = () => {
  // 온보딩 완료하기 전에 종료 시 중간에 생성한 폴더 리셋
  const { resetUserAllFolders } = useUserFolders();
  React.useEffect(() => {
    resetUserAllFolders();
  }, []);

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
