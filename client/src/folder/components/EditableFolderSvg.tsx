import * as React from 'react';
import {
  TextInput,
  Keyboard,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  StyleProp,
  ViewStyle,
} from 'react-native';
import styled from '@emotion/native';
import { overTextLength12 } from '../utils';

interface IEditableFolderSvgFolderSvgProps {
  editableIndex: number;
  folderLayout: StyleProp<ViewStyle>;
  folderName: string;
  setFolderName: (text: string) => void;
  borderColor: string;
  onSubmitEditing: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  FolderSvg: React.FC<{ style: StyleProp<ViewStyle>; borderColor: string }>;
}

const EditableFolderSvg: React.FC<IEditableFolderSvgFolderSvgProps> = ({
  editableIndex,
  folderLayout,
  folderName,
  setFolderName,
  borderColor,
  onSubmitEditing,
  FolderSvg,
}) => {
  const { inputRef } = useKeyboard();

  return (
    <FolderSvg style={folderLayout} borderColor={borderColor}>
      <FolderNameInput
        fontSize={folderName.length === 0 ? 12 : 15}
        top={editableIndex === 1 ? '50%' : '35%'}
        autoFocus
        ref={inputRef}
        placeholder="폴더명을 입력해주세요"
        value={folderName}
        onChangeText={text => {
          if (overTextLength12(text)) return;
          setFolderName(text);
        }}
        returnKeyType="done"
        blurOnSubmit={true}
        onSubmitEditing={onSubmitEditing}
      />
    </FolderSvg>
  );
};

export default EditableFolderSvg;

const FolderNameInput = styled.TextInput((props: { fontSize: number; top: string }) => ({
  position: 'absolute',
  paddingLeft: 0,
  textAlign: 'center',
  fontSize: props.fontSize,
  top: props.top,
}));

const useKeyboard = () => {
  const inputRef = React.useRef() as React.RefObject<TextInput>;
  const openKeyboard = () => {
    inputRef.current?.blur(); // focus 상태를 한 번 풀어주고
    inputRef.current?.focus(); // 다시 focus를 해야 키보드가 올라온다
  };

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidHide', openKeyboard);
    return () => {
      Keyboard.removeListener('keyboardDidHide', openKeyboard);
    };
  }, []);

  return { inputRef };
};
