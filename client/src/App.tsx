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

import Sort from '@/sort/components/index';

const Stack = createStackNavigator();

const App: React.FC<void> = () => {
  useEffect(() => {
    requestPermissions();
  }, []);

  // TODO: 스샷 감지하여 앱이 실행된 경우 Sort 화면이 실행되도록 하기

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Sort} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
