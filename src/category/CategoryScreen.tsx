import React from 'react';
import styled from '@emotion/native';

import { PhotoList } from './components';

const CategoryScreen: React.FC = () => {
  return (
    <S.Container>
      <PhotoList />
    </S.Container>
  );
};

export default CategoryScreen;

const S = {
  Container: styled.View`
    height: 100%;
    background-color: white;
  `,
};
