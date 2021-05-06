import * as React from 'react';
import { View, Text, BackHandler, ImageBackground } from 'react-native';

import Screenshot from '@/sort/components/Screenshot';
import useScreenshotPath from '@/sort/hooks/useScreenshotPath';

import * as Collision from '@/sort/utils/collision';
import Dropzone from '@/sort/components/Dropzone';

import Folder from '@/sort/components/Folder';
import { defaultBorderColors } from '@/shared/constants';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt, faShareAlt } from '@fortawesome/free-solid-svg-icons';

const Sort: React.FC<Object> = () => {
  const [screenshotPath] = useScreenshotPath();

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
        <Dropzone id="ajeowarowenoaei180valkn" path="중요" addDropzones={addDropzones}>
          <Folder
            borderColor={defaultBorderColors[0]}
            positions={{ left: -40, top: -20 }}
            height={200}
            width={200}>
            <Text>중요</Text>
          </Folder>
        </Dropzone>
        <Folder
          borderColor={defaultBorderColors[1]}
          positions={{ right: -30, top: -20 }}
          height={150}
          width={150}>
          <Text>웃긴 거</Text>
        </Folder>
        <Folder
          borderColor={defaultBorderColors[2]}
          positions={{ left: -30, top: 230 }}
          height={150}
          width={150}>
          <Text>wish list</Text>
        </Folder>
        <Folder
          borderColor={defaultBorderColors[3]}
          positions={{ right: -30, top: 150 }}
          height={120}
          width={120}>
          <Text>💖</Text>
        </Folder>
        <Folder
          borderColor={defaultBorderColors[4]}
          positions={{ left: -30, top: 420 }}
          height={120}
          width={120}>
          <Text>✏️ 글</Text>
        </Folder>
        <Folder
          borderColor={defaultBorderColors[5]}
          positions={{ right: -30, top: 300 }}
          height={110}
          width={110}>
          <Text>잡학</Text>
        </Folder>
        <Folder
          borderColor={defaultBorderColors[6]}
          positions={{ right: 130, bottom: -40 }}
          height={150}
          width={150}>
          <FontAwesomeIcon icon={faShareAlt} />
        </Folder>
        <Folder
          borderColor={defaultBorderColors[7]}
          positions={{ right: -30, bottom: -20 }}
          height={150}
          width={150}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </Folder>
        <Folder
          borderColor={defaultBorderColors[8]}
          borderDashed
          positions={{ left: -30, bottom: 20 }}
          height={150}
          width={150}>
          <Text>기본</Text>
        </Folder>
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
    cb();
  } catch (error) {
    // TODO: 폴더 경로 변경 실패 alarm
    console.warn(error);
  }
};

const intersectOnDragging = dropzone => {
  // TODO: 폴더 이미지 크기 애니메이션 추가
  console.log('drag');
};
