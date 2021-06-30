import * as React from 'react';
import { ImageBackground, ToastAndroid, BackHandler } from 'react-native';
import styled from '@emotion/native';
import { useRoute, RouteProp, ParamListBase } from '@react-navigation/core';

import { DraxProvider } from 'react-native-drax';
import BasicFolderSvg from './BasicFolderSvg';
import TrashFolderSvg from './TrashFolderSvg';
import ShareFolderSvg from './ShareFolderSvg';
import Screenshot from './Screenshot';

import FolderSvgs from './FolderSvgs';
import { userFolderLayoutData } from '../constants';
import { useUserFolders } from '@/redux/store';

import Share from 'react-native-share';
import { useNavigation } from '@react-navigation/native';

import * as FS from '@/shared/utils/fsFunctions';
import { useAppDispatch } from '@/redux/hooks';
import { storePhotoInStorage } from '@/redux/photosSlice';
interface SortScreenRouteProps extends RouteProp<ParamListBase, string> {
  params?: { screenshotPath: string; screenshotBase64: string };
}

const Sort: React.FC<Object> = () => {
  // 스크린샷 감지 서비스로부터 스크린샷 이미지 path 정보를 받아온다
  const navigation = useNavigation();
  const route = useRoute<SortScreenRouteProps>();
  const screenshotPath = route.params?.screenshotPath || ''; // fs 사용시 filePath 형식 요구
  const screenhsotBase64 = route.params?.screenshotBase64 || ''; // Share 사용 시 base64 형식 요구

  const dispatch = useAppDispatch();
  // redux store에서 유저폴더 정보를 가져와 렌더링한다.
  const { userFolders } = useUserFolders();
  const UserFolders = userFolders.map(({ id, folderName, borderColor }, index) => {
    const FolderSvg = FolderSvgs[index];
    return (
      <FolderSvg
        key={id}
        style={userFolderLayoutData[index]}
        borderColor={borderColor}
        onDrop={() =>
          FS.copyFileAsync({
            originPath: screenshotPath,
            destFolderName: folderName,
            onSuccess: () => {
              dispatch(
                storePhotoInStorage({
                  photoData: {
                    id: Date.now(),
                    photoName: FS.extractFileNameFrom(screenshotPath),
                    folderId: id,
                  },
                  folderName,
                }),
              ).then(() => exitApp());
            },
            onFailure: showSortErrorToast,
          })
        }>
        <FolderName>{folderName}</FolderName>
      </FolderSvg>
    );
  });

  return (
    <ImageBackground
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.2 }}
      source={{ uri: `file://${screenshotPath}` }}>
      <Wrapper>
        {UserFolders}
        <BasicFolder onDrop={exitApp} />
        <TrashFolder
          onDrop={() =>
            FS.deleteFileAsync({
              fullFilePath: true,
              filePath: screenshotPath,
              onSuccess: exitApp,
              onFailure: showSortErrorToast,
            })
          }
        />
        <ShareFolder
          onDrop={() => {
            Share.open({ title: '', url: `data:image/png;base64,${screenhsotBase64}` })
              .then(() => {
                FS.deleteFileAsync({
                  filePath: screenshotPath,
                  onSuccess: () => {
                    navigation.navigate('Main');
                    exitApp();
                  },
                  onFailure: showSortErrorToast,
                });
              })
              .catch(error => {
                if (error.message === SortError.cancelShare) return;
                error && console.error(error);
              });
          }}
        />
        <Screenshot screenshotPath={screenshotPath} />
      </Wrapper>
    </ImageBackground>
  );
};

export default Sort;

const SortError = {
  cancelShare: 'User did not share',
};

// 앱 종료
const exitApp = () => {
  BackHandler.exitApp();
};

// 분류 실패 알람
const showSortErrorToast = () => {
  ToastAndroid.show('분류 실패', ToastAndroid.LONG);
};

const Wrapper = styled(DraxProvider)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const FolderName = styled.Text({
  flex: 1,
  fontSize: 15,
  position: 'absolute',
});

const ShareFolder = styled(ShareFolderSvg)({
  bottom: -60,
  left: '50%',
  transform: [{ translateX: -60 }],
});

const TrashFolder = styled(TrashFolderSvg)({
  bottom: -20,
  right: -60,
});

const BasicFolder = styled(BasicFolderSvg)({
  bottom: 50,
  left: -10,
});
