import React from 'react';
import {
  PermissionsAndroid,
  Permission,
  Platform,
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Permissions: React.FC = ({
  permissions,
  modalVisible,
  modalMessage,
  onRejectCallback,
  onAcceptCallback,
}: {
  permissions: Permission[];
  modalVisible: boolean;
  modalMessage: string;
  onRejectCallback: Function;
  onAcceptCallback: Function;
}) => {
  const naviagtion = useNavigation();

  const onPressAcceptButton = async () => {
    if (Platform.OS !== 'android') return;
    if (permissions) {
      if (Array.isArray(permissions)) {
        const results = await PermissionsAndroid.requestMultiple(permissions);
        const accepted = permissions.filter(permission => results[permission]);
        if (accepted.length === permissions.length) onAcceptCallback();
      }
    }
  };

  const onPressRejectButton = () => {
    onRejectCallback();
  };

  return (
    <Modal visible={modalVisible} transparent={true} presentationStyle={'overFullScreen'}>
      <View style={styles.dimmed}></View>

      <View style={styles.modalContentsContainer}>
        <View style={styles.modalContents}>
          <View style={styles.modalBody}>
            <Text style={styles.modalMessage}>{modalMessage}</Text>
          </View>
          <View style={styles.modalBottom}>
            <TouchableHighlight style={styles.commonButtonStyle} onPress={onPressRejectButton}>
              <Text
                style={{
                  ...styles.commonButtonTextStyle,
                  color: 'red',
                }}>
                거절
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.commonButtonStyle} onPress={onPressAcceptButton}>
              <Text
                style={{
                  ...styles.commonButtonTextStyle,
                  color: 'green',
                }}>
                허용
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Permissions;

const styles = StyleSheet.create({
  container: {},
  dimmed: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 10,
  },
  modalContentsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    zIndex: 20,
  },
  modalContents: {
    width: '70%',
    padding: 25,
    backgroundColor: 'white',
  },
  modalBody: {},
  modalMessage: {},
  modalBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  commonButtonStyle: {
    paddingHorizontal: 10,
  },
  commonButtonTextStyle: {},
});
