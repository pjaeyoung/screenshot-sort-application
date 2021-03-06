import * as React from 'react';
import {
  GestureResponderHandlers,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  ToastAndroid,
} from 'react-native';
import styled from '@emotion/native';

import { LOADING, useUserFolders } from '@/redux/store';
import { userFolderLayoutData } from '../constants';
import { FolderSvgs } from '@/shared/components';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { defaultBorderColors } from '@/shared/constants';

import { Alert } from '@/shared/components';
import { IAlertButton } from '@/shared/types';

import FloatingButton from './FloatingButton';
import ReduxError, { ReduxFuncReturnType } from '../utils/ReduxError';

interface renderScrollableProps {
  editMode: boolean;
  checkGrantedPermissions: () => boolean;
  renderEditableFolderSvg: (args: {
    editableIndex: number;
    folderLayout: StyleProp<ViewStyle>;
    onSubmitEditing: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  }) => JSX.Element;
  renderCreateFolderMessage: () => JSX.Element;
  renderBasicFolderSvg: () => JSX.Element;
  renderNavgateMainButton: () => JSX.Element;
  setBorderColor: React.Dispatch<React.SetStateAction<string>>;
  setFolderName: React.Dispatch<React.SetStateAction<string>>;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitEditing: Function;
}

const renderScrollable =
  ({
    editMode,
    setEditMode,
    setBorderColor,
    setFolderName,
    checkGrantedPermissions,
    onSubmitEditing,
    renderEditableFolderSvg,
    renderCreateFolderMessage,
    renderBasicFolderSvg,
    renderNavgateMainButton,
  }: renderScrollableProps) =>
  (panHandlers: GestureResponderHandlers) => {
    const [alertMessages, setAlertMessages] = React.useState<{
      title: string;
      body?: string;
      buttons?: IAlertButton[];
    }>({
      title: '',
    });
    const onDismissAlert = () => setAlertMessages({ title: '' });

    const { loading, userFolders, removeUserFolder, addUserFolder, editUserFolder } =
      useUserFolders();
    const [editableIndex, setEditableIndex] = React.useState<number>(-1);

    const onCreateMode = () => {
      if (!checkGrantedPermissions()) return;

      if (userFolders.length === 7) {
        setAlertMessages({
          title: '?????? ????????? 7????????? ?????? ???????????????.',
          buttons: [{ name: '??????', onPress: onDismissAlert }],
        });
        return;
      }
      setBorderColor(defaultBorderColors[userFolders.length]);
      setEditableIndex(userFolders.length);
      setEditMode(true);
    };

    const onEditMode = (index: number) => () => {
      setBorderColor(userFolders[index].borderColor);
      setFolderName(userFolders[index].folderName);
      setEditableIndex(index);
      setEditMode(true);
    };

    const onCompleteEdit = () => {
      const createMode = !userFolders[editableIndex];

      const id = createMode ? `${Date.now()}` : userFolders[editableIndex].id;
      const reduxFunc = createMode ? addUserFolder : editUserFolder;
      onSubmitEditing({ id, reduxFunc });
    };

    const onClickDeleteButton = (id: string) => () => {
      setAlertMessages({
        title: '????????? ??????????????????????',
        body: '(????????? ???????????? ????????????.)',
        buttons: [
          {
            name: '??????',
            onPress: onDismissAlert,
          },
          {
            name: '??????',
            onPress: async () => {
              try {
                const {
                  type,
                  payload: { loading },
                } = await (removeUserFolder(id) as Promise<ReduxFuncReturnType>);
                if (loading === LOADING.FAILED) throw new ReduxError(type);
                onDismissAlert();
              } catch (error) {
                if (error instanceof ReduxError) {
                  ToastAndroid.show(error.message, ToastAndroid.SHORT);
                }
              }
            },
          },
        ],
      });
    };

    const { scrollRef } = useScrollTop(editMode);

    const UserFolders = React.useCallback(
      () => (
        <>
          {userFolders.map(({ id, folderName, borderColor }, index) => {
            const FolderSvg = FolderSvgs[index];
            return (
              <React.Fragment key={id}>
                <TouchableOpacity
                  activeOpacity={editMode ? 1 : 0.2}
                  style={[userFolderLayoutData[index].folderLayout]}
                  onPress={editMode ? undefined : onEditMode(index)}>
                  <FolderSvg borderColor={borderColor}>
                    <FolderName top={index === 1 ? '60%' : '45%'}>{folderName}</FolderName>
                  </FolderSvg>
                </TouchableOpacity>
                {!editMode && (
                  <DeleteButton
                    style={userFolderLayoutData[index].deleteButtonLayout}
                    onPressIn={onClickDeleteButton(id)}>
                    <Icon name="remove" color="#fff" />
                  </DeleteButton>
                )}
              </React.Fragment>
            );
          })}
        </>
      ),
      [userFolders, editMode, editableIndex],
    );

    return (
      <Wrapper>
        {renderCreateFolderMessage()}
        <FloatingButton
          loading={editMode && loading === LOADING.PENDING}
          positionStyle={editMode ? styles.completeButton : styles.createButton}
          iconName={editMode ? 'check' : 'add'}
          onPress={editMode ? onCompleteEdit : onCreateMode}
        />
        {renderNavgateMainButton()}
        {renderBasicFolderSvg()}
        <FolderSvgsScrollView
          ref={scrollRef}
          scrollEnabled={editMode}
          {...panHandlers}
          keyboardShouldPersistTaps="always">
          <UserFolders />
          <Scrollable />
          {editMode &&
            renderEditableFolderSvg({
              editableIndex,
              folderLayout: userFolderLayoutData[editableIndex].folderLayout,
              onSubmitEditing: onCompleteEdit,
            })}
        </FolderSvgsScrollView>
        <Alert
          isVisible={alertMessages.title.length !== 0}
          title={alertMessages.title}
          body={alertMessages.body}
          buttons={alertMessages.buttons}
        />
      </Wrapper>
    );
  };

export default renderScrollable;

// ????????? ?????? ???????????? editMode ?????? ??? ???????????? top?????? ??????????????? ??????
const useScrollTop = (trigger: boolean) => {
  const scrollRef = React.useRef() as React.RefObject<ScrollView>;

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [trigger]);

  return { scrollRef };
};

const ScreenWidth = Dimensions.get('screen').width;
const ScreenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  createButton: {
    left: ScreenWidth * 0.5 - 57 * 0.5,
    bottom: ScreenHeight * 0.5,
  },
  completeButton: {
    left: ScreenWidth * 0.5 - 57 * 0.5,
    top: 250,
  },
});

const Wrapper = styled.View({
  width: '100%',
  height: ScreenHeight,
});

const FolderSvgsScrollView = styled.ScrollView({
  height: ScreenHeight,
  width: '100%',
});

const FolderName = styled.Text(({ top }: { top: number | string }) => ({
  flex: 1,
  fontSize: 15,
  position: 'absolute',
  top,
}));

const DeleteButton = styled.TouchableOpacity({
  position: 'absolute',
  width: 30,
  height: 30,
  borderRadius: 15,
  backgroundColor: '#2699FB',
  zIndex: 1,
  justifyContent: 'center',
});

// ??????/???????????? ???????????? ????????? ??????????????? ????????? ??????
const Scrollable = styled.View({ height: Dimensions.get('screen').height * 1.5 });
