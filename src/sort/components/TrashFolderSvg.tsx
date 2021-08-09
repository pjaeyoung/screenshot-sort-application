import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FolderSvg } from '@/shared/components';
import { IFolderSvgProps } from '@/shared/types';
import withScaleAnimatedDropzone from './withScaleAnimatedDropzone';

// 'default' 의미 각기 다르게 쓰여 혼동 여지가 있어 basic으로 변경
export const TrashFolderData: IFolderSvgProps = {
  width: 159,
  height: 146,
  bg_d:
    'M155 73.5C155 115.197 121.197 141.5 79.5 141.5C37.8025 141.5 4 115.197 4 73.5C4 31.8025 37.8025 4 79.5 4C121.197 4 155 31.8025 155 73.5Z',

  border_d:
    'M79.5 143.5C122.015 143.5 157 116.569 157 73.5C157 30.4856 122.077 2 79.5 2C36.923 2 2 30.4856 2 73.5C2 116.569 36.9852 143.5 79.5 143.5Z',
  borderColor: '#4B4D4E',
};

const TrashFolderSvg: React.FC = () => (
  <FolderSvg {...TrashFolderData}>
    <Icon
      name="trash"
      color="black"
      size={30}
      style={{
        position: 'absolute',
        left: TrashFolderData.width * 0.3,
        top: TrashFolderData.width * 0.3,
      }}
    />
  </FolderSvg>
);

export default withScaleAnimatedDropzone({ Component: TrashFolderSvg });
