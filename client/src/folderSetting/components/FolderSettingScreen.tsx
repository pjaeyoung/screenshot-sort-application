import * as React from 'react';
import styled from '@emotion/native';

import CreateFolderButton from '@/folderSetting/components/CreateFolderButton';
import CompleteButton from '@/folderSetting/components/CompleteButton';

const FolderSettingScreen: React.FC<void> = () => {
  return (
    <Wrapper>
      <CreateFolderButton />
      <CompleteButton />
    </Wrapper>
  );
};

const Wrapper = styled.View({
  flex: 1,
});

export default FolderSettingScreen;
