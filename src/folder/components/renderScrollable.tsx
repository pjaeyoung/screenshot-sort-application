import * as React from 'react';
import { GestureResponderHandlers, Dimensions, View } from 'react-native';
import FolderScrollView from './FolderScrollView';

const renderScrollable = (panHandlers: GestureResponderHandlers): React.ReactNode => {
  return (
    <View style={{ height: Dimensions.get('screen').height }}>
      <FolderScrollView panHandlers={panHandlers} />
    </View>
  );
};

export default renderScrollable;
