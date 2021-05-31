import * as React from 'react';
import { TextInput, GestureResponderHandlers } from 'react-native';
import styled from '@emotion/native';
import { navigate } from '@/shared/utils/RootNavigation';
import { useUserFolders } from '@/redux/store';

interface FolderInputProps {
  panHandlers: GestureResponderHandlers;
  folderName: string;
  borderColor: string;
  setFolderName: (newValue: string) => void;
}

const FolderInput: React.FC<FolderInputProps> = ({
  panHandlers,
  borderColor,
  folderName,
  setFolderName,
}) => {
  const inputRef = React.useRef() as React.RefObject<TextInput>;
  const openKeyboard = () => {
    inputRef.current?.blur();
    inputRef.current?.focus();
  };
  const { addUserFolder } = useUserFolders();

  return (
    <Wrapper borderColor={borderColor} {...panHandlers} onTouchStart={openKeyboard}>
      <TextInput
        ref={inputRef}
        style={{ fontSize: 20, textAlign: 'center' }}
        autoFocus
        placeholder="폴더명을 입력해주세요"
        value={folderName}
        onChangeText={setFolderName}
        onSubmitEditing={() => {
          if (folderName) {
            addUserFolder({
              id: `folder-${Date.now()}`,
              name: folderName,
              borderColor,
              borderDashed: false,
            });
          }

          navigate('FolderSetting', {});
        }}
      />
    </Wrapper>
  );
};

export default FolderInput;

const Wrapper = styled.View<{ borderColor: string }>(props => ({
  width: 280,
  height: 280,
  marginLeft: -50,
  paddingLeft: 20,
  marginTop: -50,
  backgroundColor: '#fff',
  borderRadius: 150,
  borderWidth: 3,
  borderColor: props.borderColor,
  borderStyle: 'dashed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
