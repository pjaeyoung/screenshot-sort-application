/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import requestPermissions from '@/shared/utils/requestPermissions';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '@/shared/utils/RootNavigation';

import { MainScreen } from '@/main/components';
import { SortScreen } from '@/sort/components';
import CategoryScreen from '@/category';
import PhotoScreen from '@/photo';
import TutorialScreen from '@/tutorial';
import { FolderScreen } from '@/folder/components';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import { defaultOptionsWithHeader } from '@/shared/constants';

const Stack = createStackNavigator();

const App: React.FC<void> = () => {
  useEffect(() => {
    // TODO: 온보딩에서 이뤄질 것. 온보딩에서 허용을 안 했을 경우 허용할 때까지 요청 알람 띄울 것
    requestPermissions();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
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
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
