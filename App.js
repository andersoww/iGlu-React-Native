import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Stack from './src/navigations/stack';
import {Provider} from './src/providers';
export default function App() {
  return (
    <NavigationContainer>
      <Provider>
        <Stack />
      </Provider>
    </NavigationContainer>
  );
}
