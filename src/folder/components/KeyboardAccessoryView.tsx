import * as React from 'react';
import { GestureResponderHandlers } from 'react-native';

// 키보드 상단에 색상지정 및 폴더명 추천 기능 추가를 위한 라이브러리
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';
import KeywordAccessoryGroup from './KeywordAccessoryGroup';
import ColorAccessoryGroup from './ColorAccessoryGroup';

import { FolderNameProvider, ColorProvider, EditModeProvider } from '../context';

interface IKeyboardAccessoryViewWrapperProps {
  renderScrollable: (panHandlers: GestureResponderHandlers) => React.ReactNode;
}

const KeyboardAccessoryViewWrapper: React.FC<IKeyboardAccessoryViewWrapperProps> = ({
  renderScrollable,
}) => {
  return (
    <FolderNameProvider>
      <ColorProvider>
        <EditModeProvider>
          <KeyboardAccessoryView renderScrollable={renderScrollable}>
            <KeywordAccessoryGroup />
            <ColorAccessoryGroup />
          </KeyboardAccessoryView>
        </EditModeProvider>
      </ColorProvider>
    </FolderNameProvider>
  );
};

export default KeyboardAccessoryViewWrapper;
