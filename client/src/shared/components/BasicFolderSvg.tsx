import React from 'react';
import { Text } from 'react-native';
import FolderSvg from './FolderSvg';
import { IFolderSvgProps } from '@/shared/types';
import { defaultBorderColors } from '@/shared/constants';

// 'default' 의미 각기 다르게 쓰여 혼동 여지가 있어 basic으로 변경
export const basicFolderData: IFolderSvgProps = {
  width: 108,
  height: 118,
  bg_d:
    'M104 46.3735C104 74.5035 87.0027 114 53.4342 114C19.8657 114 4 74.5035 4 46.3735C4 18.2435 19.8657 4 53.4342 4C87.0027 4 104 18.2435 104 46.3735Z',

  border_d:
    'M53.4342 116C71.1219 116 84.3181 105.563 92.9969 91.8024C101.661 78.0661 106 60.7835 106 46.3735C106 31.8912 101.607 20.6615 92.5899 13.1051C83.6388 5.60419 70.4546 2 53.4342 2C36.4159 2 23.4961 5.60338 14.8187 13.1269C6.08471 20.6996 2 31.9322 2 46.3735C2 60.7578 6.04402 78.034 14.4212 91.7765C22.8164 105.549 35.734 116 53.4342 116Z',
  borderColor: defaultBorderColors[8],
};

const BasicFolderSvg: React.FC<void> = () => (
  <FolderSvg {...basicFolderData} borderDashed>
    <Text
      style={{
        flex: 1,
        fontSize: 15,
        position: 'absolute',
      }}>
      기본
    </Text>
  </FolderSvg>
);

export default BasicFolderSvg;
