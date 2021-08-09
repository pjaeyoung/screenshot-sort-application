import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Slider, SkipButton } from './components';

import { useUserFolders } from '@/redux/folderSlice';
import { useCheckCompletedOnBoarding } from '@/shared/hooks';

const GuidesScreen: React.FC = () => {
  const completedOnboarding = useCheckCompletedOnBoarding();
  // 온보딩 완료하기 전에 종료 시 중간에 생성한 폴더 리셋
  const { resetUserAllFolders } = useUserFolders();
  React.useEffect(() => {
    // SETTING 화면에서 넘어왔을 경우엔 리셋 중지
    if (completedOnboarding !== null && !completedOnboarding) {
      resetUserAllFolders();
    }
  }, [completedOnboarding]);

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
    flex: 1,
  },
});
