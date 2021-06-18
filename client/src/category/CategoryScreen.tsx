import React from 'react';
import { Text } from 'react-native';
import styled from '@emotion/native';

import { PhotoList } from './components';
import data from './fakeData.json';

const CategoryScreen: React.FC = () => {
    return (
        <S.Container>
            <PhotoList />
        </S.Container>
    )
}

export default CategoryScreen;

const S = {
    Container: styled.View`
        height: 100%;
        background-color: white;
    `
}