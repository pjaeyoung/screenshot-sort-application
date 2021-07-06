import * as React from 'react';
import { StyleSheet } from 'react-native';
import styled from '@emotion/native';
import { Overlay } from 'react-native-elements';
import { IAlertButton } from '../types';

interface IAlertProps {
  title: string;
  body?: string;
  isVisible: boolean;
  buttons?: IAlertButton[];
}

const Alert: React.FC<IAlertProps> = ({ title, body, isVisible, buttons = [] }) => {
  return (
    <Overlay overlayStyle={styles.overlay} isVisible={isVisible}>
      <Title>{title}</Title>
      <Body>{body}</Body>
      <Buttons count={buttons.length}>
        {buttons.map(({ name, onPress }, index) => (
          <React.Fragment key={index}>
            <Division isVisible={index % 2 !== 0}>|</Division>
            <AlertButton onPress={onPress}>
              <ButtonText>{name}</ButtonText>
            </AlertButton>
          </React.Fragment>
        ))}
      </Buttons>
    </Overlay>
  );
};

export default Alert;

const styles = StyleSheet.create({
  overlay: {
    width: 350,
    height: 180,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 30,
    paddingTop: 40,
  },
});

const Title = styled.Text({
  fontSize: 18,
});

const Body = styled.Text({
  fontSize: 15,
  marginTop: 10,
});

const Buttons = styled.View((props: { count: number }) => ({
  width: '100%',
  padding: 20,
  marginTop: 10,
  flexDirection: props.count === 1 ? 'column' : 'row',
  justifyContent: props.count === 1 ? 'center' : 'flex-end',
  alignItems: props.count === 1 ? 'center' : 'flex-end',
}));

const AlertButton = styled.TouchableOpacity``;

const ButtonText = styled.Text({
  color: '#2699FB',
  fontSize: 18,
  marginLeft: 10,
});

const Division = styled.Text((props: { isVisible: boolean }) => ({
  display: props.isVisible ? 'flex' : 'none',
  fontSize: 18,
  marginLeft: 10,
  color: '#B1B1B1',
}));
