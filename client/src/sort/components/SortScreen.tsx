import * as React from 'react';
import { View, Text, BackHandler, ImageBackground } from 'react-native';

import Screenshot from '@/sort/components/Screenshot';

import * as Collision from '@/sort/utils/collision';
import Dropzone from '@/sort/components/Dropzone';

import Folder from '@/sort/components/Folder';
import { defaultFolderData } from '@/shared/constants';

import Icon from 'react-native-vector-icons/FontAwesome';

import { userFolderLayoutData } from '@/sort/constants/folderLayoutData';
import { FolderDisplayType } from '@/shared/types';
import iconFolderData from '../constants/iconFolderData';
import { useRoute, RouteProp, ParamListBase } from '@react-navigation/core';
import { useUserFolders } from '@/redux/store';

interface SortScreenRouteProps extends RouteProp<ParamListBase, string> {
  params?: { screenshotPath: string };
}

const Sort: React.FC<Object> = () => {
  const { userFolders } = useUserFolders();
  // 유저가 생성한 폴더 이미지들과 기본 폴더, 아이콘폴더(공유/휴지통) 합치는 과정
  // userFolders는 layoutData의 순서대로 위치가 배치된다
  const folders: FolderDisplayType[] = [
    ...userFolders.map((folder, index) => ({
      ...folder,
      ...userFolderLayoutData[index],
      component: 'text',
    })),
    defaultFolderData,
    ...iconFolderData,
  ];

  // 스크린샷 감지 서비스로부터 스크린샷 이미지 path 정보를 받아온다
  const route = useRoute<SortScreenRouteProps>();
  const screenshotPath = route.params?.screenshotPath || 'file://';

  // 폴더이미지들을 충돌(겹침) 체크 가능한 dropzones로 지정
  const [dropzones, setDropzones] = React.useState<Collision.Dropzone[]>([]);
  const addDropzones = (dropzone: Collision.Dropzone) => {
    setDropzones(prev => [...prev, dropzone]);
  };

  // 드래그 중 충돌(겹침) 이벤트 등록
  const onDrag = Collision.onIntersectDropzones({
    dropzones,
    cb: intersectOnDragging,
  });

  // 드롭 성공 시 실행할 이벤트
  const intersectOnDropped = (dropzone: Collision.Dropzone) => {
    changeScreenshotPath({
      originPath: screenshotPath,
      destinationFolderName: dropzone.path,
      cb: () => {
        BackHandler.exitApp();
      },
    });
  };

  // 드롭 시 충돌(겹침) 이벤트 등록
  const onDragRelease = Collision.onIntersectDropzones({
    dropzones,
    cb: intersectOnDropped,
  });

  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImageBackground
        style={{ flex: 1 }}
        imageStyle={{ opacity: 0.2 }}
        source={{ uri: screenshotPath }}>
        {folders.map(folder => {
          return (
            <Dropzone id={folder.id} path={folder.name} addDropzones={addDropzones} key={folder.id}>
              <Folder
                borderColor={folder.borderColor}
                borderDashed={folder.borderDashed}
                positions={folder.positions}
                height={folder.height}
                width={folder.width}>
                {folder.component === 'text' ? (
                  <Text>{folder.name}</Text>
                ) : (
                  <Icon name={folder.name} size={24} color="black" />
                )}
              </Folder>
            </Dropzone>
          );
        })}
        <Screenshot onDrag={onDrag} onDragRelease={onDragRelease} filePath={screenshotPath} />
      </ImageBackground>
    </View>
  );
};

export default Sort;

const changeScreenshotPath = async ({
  originPath,
  destinationFolderName,
  cb,
}: {
  originPath: string;
  destinationFolderName: string;
  cb: () => void;
}) => {
  try {
    // TODO: 스크린샷 파일을 해당 폴더에 사본 생성
    console.log(destinationFolderName);
    cb();
  } catch (error) {
    // TODO: 폴더 경로 변경 실패 alarm
    console.warn(error);
  }
};

const intersectOnDragging = (dropzone: Collision.Dropzone) => {
  // TODO: 폴더 이미지 크기 애니메이션 추가

  console.log('drag');
};
