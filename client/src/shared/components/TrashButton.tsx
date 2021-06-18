import React from 'react';
import { Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';

import RoundButton from './RoundButton'
//import TrashIcon from '@/assets/icons/trash.svg';

const TrashButton: React.FC = ({ onPress }) => {
    return (
        <RoundButton>
            <Icon name="trash-alt" size={30} color="white" />
        </RoundButton>
    )
}

export default TrashButton;
