import * as React from 'react';
import { TextInput, GestureResponderHandlers, Alert } from 'react-native';
import styled from '@emotion/native';
import { navigate } from '@/RootNavigation';
import useUserFolders from '@/shared/hooks/useUserFolders';

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
  const [focused, setFocused] = React.useState<boolean>(true);
  const { addUserFolder } = useUserFolders();

  return (
    <Wrapper borderColor={borderColor} dashed={focused} {...panHandlers}>
      <TextInput
        placeholder="폴더명을 입력해주세요"
        value={folderName}
        onChangeText={setFolderName}
        autoFocus
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onSubmitEditing={() => {
          addUserFolder({
            id: `folder-${Date.now()}`,
            name: folderName,
            borderColor,
            borderDashed: false,
          });
          navigate('FolderSetting', {});
        }}
      />
    </Wrapper>
  );
};

export default FolderInput;

const Wrapper = styled.View<{ borderColor: string; dashed: boolean }>(props => ({
  width: 280,
  height: 280,
  marginLeft: -50,
  marginTop: -50,
  backgroundColor: '#fff',
  borderRadius: 150,
  borderWidth: 3,
  borderColor: props.borderColor,
  borderStyle: props.dashed ? 'dashed' : 'solid',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
