import * as React from 'react';
import { FloatingButton } from '@/shared/components';

import { css } from '@emotion/native';
import { useEditModeDispatch, useEditModeState } from '../context';

const CenterButton: React.FC = () => {
  const canEdit = useEditModeState();
  const setCanEdit = useEditModeDispatch();

  const toggleCanEdit = () => setCanEdit((prev) => !prev);
  const iconName = canEdit ? 'check' : 'add';

  return (
    <FloatingButton
      loading={false}
      iconName={iconName}
      positionStyle={positionStyle}
      onPress={toggleCanEdit}
    />
  );
};

export default CenterButton;

const positionStyle = css`
  top: 45%;
  left: 45%;
`;
