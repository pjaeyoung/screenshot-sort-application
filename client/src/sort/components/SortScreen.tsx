import * as React from 'react';
import { ImageBackground } from 'react-native';
import styled from '@emotion/native';
import { useRoute, RouteProp, ParamListBase } from '@react-navigation/core';
import BasicFolderSvg from './BasicFolderSvg';
import TrashFolderSvg from './TrashFolderSvg';
import ShareFolderSvg from './ShareFolderSvg';
import Screenshot from './Screenshot';
import FolderSvgs from './FolderSvgs';
import { userFolderLayoutData } from '../constants/folderLayoutData';
import { DraxProvider } from 'react-native-drax';
import { useUserFolders } from '@/redux/store';
import Share from 'react-native-share';
interface SortScreenRouteProps extends RouteProp<ParamListBase, string> {
  params?: { screenshotPath: string; screenshotBase64: string };
}

const userFolders = [
  {
    id: 1,
    name: '좋은 글귀',
    borderColor: 'red',
  },
  {
    id: 2,
    name: '코디',
    borderColor: 'green',
  },
  {
    id: 3,
    name: '재미있는 거',
    borderColor: 'yellow',
  },
  {
    id: 4,
    name: '맛집',
    borderColor: 'blue',
  },
  {
    id: 5,
    name: '생활 팁',
    borderColor: 'pink',
  },
  {
    id: 6,
    name: '가볼 곳',
    borderColor: 'orange',
  },
  {
    id: 7,
    name: 'wish list',
    borderColor: 'brown',
  },
];

const Sort: React.FC<Object> = () => {
  // 스크린샷 감지 서비스로부터 스크린샷 이미지 path 정보를 받아온다
  const route = useRoute<SortScreenRouteProps>();
  const screenshotPath = route.params?.screenshotPath || '';
  const screenhsotBase64 = route.params?.screenshotBase64 || '';

  // const { userFolders } = useUserFolders();

  return (
    <ImageBackground
      style={{ flex: 1 }}
      imageStyle={{ opacity: 0.2 }}
      source={{ uri: `file://${screenshotPath}` }}>
      <Wrapper>
        {userFolders.map(({ id, name, borderColor }, index) => {
          const FolderSvg = FolderSvgs[index];
          return (
            <FolderSvg
              key={id}
              style={userFolderLayoutData[index]}
              borderColor={borderColor}
              onDrop={() => console.log(name)}>
              <FolderName>{name}</FolderName>
            </FolderSvg>
          );
        })}
        <BasicFolderSvg style={{ bottom: 50, left: -10 }} onDrop={() => console.log('기본')} />
        <TrashFolderSvg
          style={{ bottom: -20, right: -60 }}
          onDrop={() => console.log('원본 이미지 삭제')}
        />
        <ShareFolderSvg
          style={{ bottom: -60, left: '50%', transform: [{ translateX: -60 }] }}
          onDrop={() => {
            Share.open({ title: '', url: `data:image/png;base64,${screenhsotBase64}` })
              .then(res => {
                console.log(res);
              })
              .catch(err => {
                err && console.log(err);
              });
          }}
        />
        <Screenshot screenshotPath={screenshotPath} />
      </Wrapper>
    </ImageBackground>
  );
};

export default Sort;

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
