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
  const folders: FolderDisplayType[] = [
    ...userFolders.map((folder, index) => ({
      ...folder,
      ...userFolderLayoutData[index],
      component: 'text',
    })),
    defaultFolderData,
    ...iconFolderData,
  ];

  const route = useRoute<SortScreenRouteProps>();
  const screenshotPath = route.params?.screenshotPath || 'file://';

  const [dropzones, setDropzones] = React.useState<Collision.Dropzone[]>([]);
  const addDropzones = (dropzone: Collision.Dropzone) => {
    setDropzones(prev => [...prev, dropzone]);
  };

  const onDrag = Collision.onIntersectDropzones({
    dropzones,
    cb: intersectOnDragging,
  });

  const intersectOnDropped = (dropzone: Collision.Dropzone) => {
    changeScreenshotPath({
      originPath: screenshotPath,
      destinationFolderName: dropzone.path,
      cb: () => {
        BackHandler.exitApp();
      },
    });
  };

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
    // 스크린샷 폴더 경로 수정
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
