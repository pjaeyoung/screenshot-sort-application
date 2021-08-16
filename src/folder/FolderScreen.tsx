import * as React from 'react';

import KeyboardAccessoryView from './components/KeyboardAccessoryView';
import renderScrollable from './components/renderScrollable';

const FolderScreen: React.FC = () => {
  return <KeyboardAccessoryView renderScrollable={renderScrollable} />;
};

export default FolderScreen;
