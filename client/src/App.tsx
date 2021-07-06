import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '@/shared/utils/RootNavigation';

import { MainScreen } from '@/main/components';
import { SortScreen } from '@/sort/components';
import CategoryScreen from '@/category';
import {
  GuidesScreen,
  PermissionScreen,
  SmartCaptureGuideScreen,
  OverlayPermissionGuideScreen,
} from '@/onBoarding';
import PhotoScreen from '@/photo';
import TutorialScreen from '@/tutorial';
import SettingScreen from '@/setting';
import { FolderScreen } from '@/folder/components';
import store from '@/redux/store';
import { defaultOptionsWithHeader } from '@/shared/constants';
import { groupScreens } from '@/shared/utils/navigationUtils';
import { IScreenGroup } from '@/shared/types';
import { useCheckCompletedOnBoarding } from './shared/hooks';

const onBoardingScreens: IScreenGroup = {
  Guides: GuidesScreen,
  Permissions: PermissionScreen,
  SmartCaptureGuide: SmartCaptureGuideScreen,
  OverlayPermissionGuide: OverlayPermissionGuideScreen,
};

const Stack = createStackNavigator();

const App: React.FC<void> = () => {
  const completedOnboarding = useCheckCompletedOnBoarding();
  // asyncStorage에서 값을 가져오는 시간 동안 null 처리
  // TODO: 추후 업데이트에서 로딩화면 대체하기
  if (completedOnboarding === null) return null;

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          headerMode="screen"
          initialRouteName={completedOnboarding ? 'Main' : 'Guides'}>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Tutorial" component={TutorialScreen} />
          <Stack.Screen name="Folder" component={FolderScreen} />
          <Stack.Screen name="Sort" component={SortScreen} />
          <Stack.Screen
            name="Category"
            component={CategoryScreen}
            options={{
              headerShown: true,
              ...defaultOptionsWithHeader,
            }}
          />
          <Stack.Screen
            name="Photo"
            component={PhotoScreen}
            options={{
              ...defaultOptionsWithHeader,
            }}
          />
          <Stack.Screen
            name="Setting"
            component={SettingScreen}
            options={{
              headerShown: true,
              headerTitle: '',
              headerStyle: { backgroundColor: '#F7F7F7' },
            }}
          />
          {groupScreens({ group: onBoardingScreens, Screen: Stack.Screen })}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
