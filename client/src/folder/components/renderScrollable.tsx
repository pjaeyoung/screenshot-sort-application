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

import FloatingButton from './FloatingButton';
import Alert, { IAlertButton } from './Alert';
import ReduxError, { ReduxFuncReturnType } from '../utils/ReduxError';
import { usePermissions } from '@/shared/hooks';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ParamListType } from '@/shared/types';

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
          title: '분류 폴더는 7개까지 생성 가능합니다.',
          buttons: [{ name: '확인', onPress: onDismissAlert }],
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
        title: '폴더를 삭제하겠습니까?',
        body: '(원본은 삭제되지 않습니다.)',
        buttons: [
          {
            name: '취소',
            onPress: onDismissAlert,
          },
          {
            name: '삭제',
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
                  style={[userFolderLayoutData[index].folderLayout]}
                  onPress={onEditMode(index)}>
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

// 스크롤 내린 시점에서 editMode 종료 시 스크롤을 top으로 이동시키는 기능
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

// 생성/수정모드 상태에서 스크롤 가능하도록 해주는 용도
const Scrollable = styled.View({ height: Dimensions.get('screen').height * 1.5 });
