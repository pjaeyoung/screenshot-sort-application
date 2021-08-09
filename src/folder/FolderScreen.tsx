import * as React from 'react';
import styled from '@emotion/native';
import { StyleSheet, ToastAndroid, TouchableOpacity } from 'react-native';

// 키보드 상단에 색상지정 및 폴더명 추천 기능 추가를 위한 라이브러리
import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view';
import { recommendedFolderNames, pallet } from './constants';

import { IStoredFolder, LOADING, useUserFolders } from '@/redux/store';
import ReduxError, { ReduxFuncReturnType } from './utils/ReduxError';
import { FILEPATH } from '@/shared/utils/fsFunctions';

import renderScrollable from './components/renderScrollable';
import EditableFolderSvg from './components/EditableFolderSvg';
import { FolderSvgs } from '@/shared/components';

import { RouteProp, useRoute } from '@react-navigation/native';
import CreateFolderMessage from './components/CreateFolderMessage';
import { BasicFolderSvg } from '@/shared/components';

import FloatingButton from './components/FloatingButton';
import { useNavigation } from '@react-navigation/native';
import { ParamListType } from '@/shared/types';
import { usePermissions } from '@/shared/hooks';

const FolderScreen: React.FC = () => {
  const {
    params: { isOnboarding },
  } = useRoute<RouteProp<ParamListType, 'Folder'>>();
  const [firstCreateFolderOnboarding, setFirstCreateFolderOnboarding] = React.useState<boolean>(
    () => !isOnboarding,
  );

  const navigation = useNavigation();
  const navigateToMainScreen = () => {
    navigation.navigate('Main', { isOnboarding });
  };
  const { grantedPermissions, requestPermssionsAgain } = usePermissions({
    onRejected: navigateToMainScreen,
  });

  const checkGrantedPermissions = () => {
    if (!grantedPermissions) {
      requestPermssionsAgain();
      return false;
    } else {
      return true;
    }
  };

  const [folderName, setFolderName] = React.useState<string>('');
  const { userFolders } = useUserFolders();
  const duplicatedFolderName = ({ folderName, id }: { folderName: string; id: string }) =>
    userFolders.find(userFolder => userFolder.id !== id && userFolder.folderName === folderName);

  const [editMode, setEditMode] = React.useState<boolean>(false);
  const exitEditMode = () => {
    setFolderName('');
    setEditMode(prev => !prev);
  };

  const [borderColor, setBorderColor] = React.useState<string>('');

  const onSubmitEditing = async ({
    id,
    reduxFunc,
  }: {
    id: string;
    reduxFunc: (props: IStoredFolder) => Promise<ReduxFuncReturnType>;
  }) => {
    if (folderName.length !== 0) {
      if (duplicatedFolderName({ folderName, id })) {
        ToastAndroid.show('중복된 폴더명 입력', ToastAndroid.SHORT);
        return;
      }
      try {
        const {
          type,
          payload: { loading },
        } = await reduxFunc({ id, folderName, borderColor, filePath: `${FILEPATH}/${folderName}` });

        if (loading === LOADING.FAILED) throw new ReduxError(type);
        if (isOnboarding && !firstCreateFolderOnboarding) {
          setFirstCreateFolderOnboarding(true);
        }
        exitEditMode();
      } catch (error) {
        if (error instanceof ReduxError) {
          ToastAndroid.show(error.message, ToastAndroid.SHORT);
        }
      }
      return;
    }
    exitEditMode();
  };

  return (
    <KeyboardAccessoryView
      renderScrollable={renderScrollable({
        editMode,
        setBorderColor,
        setEditMode,
        setFolderName,
        onSubmitEditing,
        checkGrantedPermissions,
        renderEditableFolderSvg: ({ editableIndex, folderLayout, onSubmitEditing }) => (
          <EditableFolderSvg
            editableIndex={editableIndex}
            folderName={folderName}
            borderColor={borderColor}
            setFolderName={setFolderName}
            onSubmitEditing={onSubmitEditing}
            folderLayout={folderLayout}
            FolderSvg={FolderSvgs[editableIndex]}
          />
        ),
        renderCreateFolderMessage: () => (
          <>
            {!editMode && userFolders.length === 0 && (
              <CreateFolderMessage isOnboardng={isOnboarding} />
            )}
          </>
        ),
        renderBasicFolderSvg: () => (
          <>{firstCreateFolderOnboarding && <BasicFolderSvg style={styles.basicFolderSvg} />}</>
        ),
        renderNavgateMainButton: () => (
          <>
            {!editMode && firstCreateFolderOnboarding && (
              <FloatingButton
                onPress={navigateToMainScreen}
                positionStyle={styles.GoToMainButton}
                iconName="check"
              />
            )}
          </>
        ),
      })}>
      {editMode && (
        <>
          <KeyboardAccessoryItem keyboardShouldPersistTaps="handled" horizontal>
            {recommendedFolderNames.map((name, index) => (
              <KeywordList key={index}>
                <TouchableOpacity onPress={() => setFolderName(name)}>
                  <KeyWord>{name}</KeyWord>
                </TouchableOpacity>
                <Division isVisible={recommendedFolderNames.length - 1 !== index}>|</Division>
              </KeywordList>
            ))}
          </KeyboardAccessoryItem>
          <KeyboardAccessoryItem keyboardShouldPersistTaps="handled" horizontal>
            {pallet.map((color, index) => (
              <TouchableOpacity key={index} onPress={() => setBorderColor(color)}>
                <ColorBorder isClicked={color === borderColor}>
                  <Color isClicked={color === borderColor} color={color} />
                </ColorBorder>
              </TouchableOpacity>
            ))}
          </KeyboardAccessoryItem>
        </>
      )}
    </KeyboardAccessoryView>
  );
};

export default FolderScreen;

const KeyboardAccessoryItem = styled.ScrollView({
  backgroundColor: '#e4e7e8',
  height: 45,
});

const KeywordList = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
});

const KeyWord = styled.Text({
  height: '100%',
  marginLeft: 15,
  marginRight: 15,
  fontSize: 18,
  textAlignVertical: 'center',
  textAlign: 'center',
});

const ColorBorder = styled.View((props: { isClicked: boolean }) => ({
  width: 35,
  height: 35,
  marginLeft: 15,
  marginRight: 10,
  borderWidth: 2,
  borderRadius: 35,
  borderColor: props.isClicked ? 'black' : 'transparent',
}));

const Color = styled.View((props: { color: string; isClicked: boolean }) => ({
  backgroundColor: props.color,
  width: '100%',
  height: '100%',
  borderRadius: 32,
  borderWidth: 2,
  borderColor: props.isClicked ? '#fff' : props.color,
}));

const Division = styled.Text((props: { isVisible: boolean }) => ({
  display: props.isVisible ? 'flex' : 'none',
  fontSize: 18,
  color: '#B1B1B1',
}));

const styles = StyleSheet.create({
  basicFolderSvg: {
    position: 'absolute',
    bottom: 150,
    left: 0,
  },
  GoToMainButton: {
    right: 40,
    bottom: 150,
  },
});
