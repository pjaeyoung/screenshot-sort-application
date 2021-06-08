import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FolderSvg } from '@/shared/components';
import { IFolderSvgProps } from '@/shared/types';
import { defaultBorderColors } from '@/shared/constants';
import withScaleAnimatedDropzone from './withScaleAnimatedDropzone';

export const ShareFolderData: IFolderSvgProps = {
  width: 145,
  height: 154,
  bg_d:
    'M141 83.1203C141 117.131 116.175 150 82 150C47.8247 150 4 117.131 4 83.1203C4 49.1099 53.9526 4 88.1279 4C122.303 4 141 49.1099 141 83.1203Z',

  border_d:
    'M82 152C117.592 152 143 117.895 143 83.1203C143 65.8009 138.251 45.6702 129.113 29.8079C119.983 13.9607 106.221 2 88.1279 2C70.3054 2 48.8047 13.6661 31.8889 29.3392C23.3882 37.2154 15.9414 46.1952 10.6082 55.4076C5.28487 64.6029 2 74.1484 2 83.1203C2 100.967 13.4524 118.199 28.9172 130.861C44.4053 143.543 64.3385 152 82 152Z',
  borderColor: defaultBorderColors[6],
};

const ShareFolderSvg: React.FC = () => (
  <FolderSvg {...ShareFolderData}>
    <Icon
      name="share-alt"
      color="black"
      size={30}
      style={{
        position: 'absolute',
        left: ShareFolderData.width * 0.5,
        top: ShareFolderData.height * 0.3,
      }}
    />
  </FolderSvg>
);

export default withScaleAnimatedDropzone({ Component: ShareFolderSvg });
