import React from 'react';
import { TouchableHighlight, StyleSheet } from 'react-native';

import theme from '@/shared/theme';

const RoundButton: React.FC = ({ children, onPress }) => {
    return (
        <TouchableHighlight style={styles.Button} onPress={onPress}>
            {children}
        </TouchableHighlight>
    )
}

export default RoundButton;

const styles = StyleSheet.create({
    Button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 64,
        height: 64,
        backgroundColor: theme.colors.BLUE_1,
        borderRadius: 50
    },
})