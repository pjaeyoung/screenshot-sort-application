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
import { navigationRef } from './RootNavigation';

import { MainScreen } from '@/main/components';
import { SortScreen } from '@/sort/components';
import { FolderDesignScreen } from '@/main/components';
import MakeFolderScreen from './main/components/MakeFolderScreen';
const Stack = createStackNavigator();

const App: React.FC<void> = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Sort" component={SortScreen} />
        <Stack.Screen name="FolderDesign" component={FolderDesignScreen} /> 
        <Stack.Screen name="AddingFolder" component={MakeFolderScreen}/> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
