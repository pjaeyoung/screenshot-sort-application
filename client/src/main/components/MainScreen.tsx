import React from 'react';
import styled from '@emotion/native';
import { TouchableOpacity, StyleSheet } from 'react-native';

import { userFolderLayoutData } from '../constants';
import { useUserFolders } from '@/redux/store';
import { FolderSvgs } from '@/shared/components';
import storage from '@/shared/utils/handleAsyncStorage';

import { BasicFolderSvg } from '@/shared/components';
import CreateFolderMessage from './CreateFolderMessage';
import MainHeader from './MainHeader';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { usePermissions } from '@/shared/hooks';
import CompleteOnboardingAlert from './CompleteOnboardingAlert';
import { ParamListType } from '@/shared/types';

const MainScreen: React.FC<Object> = () => {
  const { userFolders, setUserAllFolders } = useUserFolders();
  // 유저가 생성한 폴더 개수에 맞는 레이아웃 결정
  const layout = userFolderLayoutData[userFolders.length - 1];

  // asyncStorage에 저장된 userFolders를 redux와 동기화 처리
  React.useEffect(() => {
    async function synchronizeStorageAndRedux() {
      setUserAllFolders(await storage.getUserFolders());
    }
    synchronizeStorageAndRedux();
  }, []);

  // 권한허용여부에 따라 폴더화면전환버튼 터치 이벤트와 기본폴더 터치 이벤트 결정
  const { grantedPermissions, requestPermssionsAgain } = usePermissions();
  const navigation = useNavigation();
  const navigateToCategory = (folderId: string) => () => {
    navigation.navigate('Category', { folderId });
  };
  const navigateToFolderScreen = () =>
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Folder',
          params: { isOnboarding: false },
        },
      ],
    });
  const onPressBtnGoFolder = grantedPermissions ? navigateToFolderScreen : requestPermssionsAgain;

  // 온보딩완료여부에 따라 온보딩완료알림창 렌더링 결정
  const { params } = useRoute<RouteProp<ParamListType, 'Main'>>();
  const [completedOnboarding, setCompletedOnboarding] = React.useState<boolean>(
    !params?.isOnboarding ?? true,
  );
  const onCompleteOnboarding = async () => {
    await storage.setCompletedOnBoarding(true);
    setCompletedOnboarding(true);
  };

  return (
    <Wrapper>
      <MainHeader onPressBtnGoFolder={onPressBtnGoFolder} />
      {userFolders.length === 0 && <CreateFolderMessage />}
      <FolderList>
        {userFolders.map(({ id, folderName, borderColor }, index) => {
          const FolderSvg = FolderSvgs[index];
          return (
            <TouchableOpacity
              key={id}
              style={[{ position: 'absolute' }, layout[index]]}
              onPress={navigateToCategory(id)}>
              <FolderSvg key={id} borderColor={borderColor}>
                <FolderName top={index === 1 ? '58%' : '45%'}>{folderName}</FolderName>
              </FolderSvg>
            </TouchableOpacity>
          );
        })}
      </FolderList>
      <TouchableOpacity
        style={styles.basicFolderContainer}
        onPress={navigateToCategory('basicFolder')}>
        <BasicFolderSvg />
      </TouchableOpacity>
      <CompleteOnboardingAlert
        isVisible={!completedOnboarding}
        onCompleteOnboarding={onCompleteOnboarding}
      />
    </Wrapper>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  basicFolderContainer: {
    position: 'absolute',
    bottom: 100,
    left: 50,
  },
});

const Wrapper = styled.View({
  flex: 1,
  backgroundColor: '#F7F7F7',
});

const FolderList = styled.View({
  flex: 1,
});

const FolderName = styled.Text(({ top }: { top: number | string }) => ({
  flex: 1,
  fontSize: 15,
  position: 'absolute',
  top,
}));
