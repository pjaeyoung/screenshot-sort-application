import * as React from 'react';
import styled from '@emotion/native';
import { GestureResponderEvent, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

interface ICompleteOnboardingAlertProps {
  isVisible: boolean;
  onCompleteOnboarding: (event: GestureResponderEvent) => void;
}

const CompleteOnboardingAlert: React.FC<ICompleteOnboardingAlertProps> = ({
  isVisible,
  onCompleteOnboarding,
}) => {
  return (
    <Overlay overlayStyle={styles.overlay} isVisible={isVisible}>
      <TextList>
        <IconText>π</IconText>
        <GreyText>μ΄μ  μΊ‘μ³κ° μλ‘μμ§ κ±°μμ!</GreyText>
        <BoldText>νλ©΄μ μΊ‘μ³ν΄λ³΄μΈμ!</BoldText>
      </TextList>
      <ConfirmButton hitSlop={confirmButtonHitSlop} onPress={onCompleteOnboarding}>
        <ConfirmText>νμΈ</ConfirmText>
      </ConfirmButton>
    </Overlay>
  );
};

export default CompleteOnboardingAlert;

const confirmButtonHitSlop = { top: 20, left: 20, right: 20, bottom: 20 };

const styles = StyleSheet.create({
  overlay: {
    minWidth: 280,
    width: '60%',
    height: 230,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

const ConfirmButton = styled.TouchableOpacity``;
const ConfirmText = styled.Text({
  color: '#2699FB',
  fontSize: 18,
});

const TextList = styled.View({
  alignItems: 'center',
});

const IconText = styled.Text({
  fontSize: 30,
});

const GreyText = styled.Text({
  color: 'grey',
  fontSize: 15,
  marginTop: 10,
  marginBottom: 5,
});

const BoldText = styled.Text({
  fontWeight: 'bold',
  fontSize: 20,
});
