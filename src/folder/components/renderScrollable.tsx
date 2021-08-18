import * as React from 'react';
import { GestureResponderHandlers, Dimensions } from 'react-native';
import FolderScrollView from './FolderScrollView';
import CenterButton from './CenterButton';

import styled from '@emotion/native';

const renderScrollable = (panHandlers: GestureResponderHandlers): React.ReactNode => {
  return (
    <Wrapper>
      <CenterButton />
      <FolderScrollView panHandlers={panHandlers} />
    </Wrapper>
  );
};

export default renderScrollable;

const Wrapper = styled.View({
  height: Dimensions.get('window').height,
});
