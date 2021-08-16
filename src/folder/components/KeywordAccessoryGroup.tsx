import * as React from 'react';
import KeywordAccessoryItem from './KeywordAccessoryItem';
import { keywords } from '../constants';

import styled from '@emotion/native';
import { useEditModeState, useFolderNameDispatch } from '../context';

const KeywordAccessoryGroup: React.FC = () => {
  const setFolderName = useFolderNameDispatch();
  const onPressKeywordAccessoryItem = (keyword: string) => () => {
    setFolderName(keyword);
  };

  const canEdit = useEditModeState();
  if (!canEdit) {
    return null;
  }

  return (
    <KeyboardAccessoryItem keyboardShouldPersistTaps="handled" horizontal>
      {keywords.map((keyword, index) => (
        <KeywordAccessoryItem
          key={index}
          name={keyword}
          isLast={index === lastIndex}
          onPress={onPressKeywordAccessoryItem(keyword)}
        />
      ))}
    </KeyboardAccessoryItem>
  );
};

export default KeywordAccessoryGroup;

const lastIndex = keywords.length - 1;

const KeyboardAccessoryItem = styled.ScrollView({
  backgroundColor: '#e4e7e8',
  height: 45,
});
