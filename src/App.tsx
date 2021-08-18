import 'react-native-gesture-handler';
import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from '@/shared/utils/RootNavigation';

import MainScreen from '@/main';
import SortScreen from '@/sort';
import CategoryScreen from '@/category';
import PhotoScreen from '@/photo';
import TutorialScreen from '@/tutorial';
import SettingScreen from '@/setting';
import FolderScreen from '@/folder';

import { defaultOptionsWithHeader } from '@/shared/constants';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/shared/store';
import { Loading } from './shared/components';

const Stack = createStackNavigator();

const App: React.FC<void> = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            headerMode="screen">
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
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
