import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Importação de Screens
import Principal from '../screens/Principal';
import Parede from '../screens/Parede';
import Teto from '../screens/Teto';
import Equipamento from '../screens/Equipamento';
import Iluminacao from '../screens/Iluminação';
import Insolacao from '../screens/Insolação';
import Pessoa from '../screens/Pessoa';

const Stack = createNativeStackNavigator();
export default () => {
  return (
    <Stack.Navigator initialRouteName="main" screenOptions={{headerShown:false}}>
      <Stack.Screen name="main" component={Principal}/>
      <Stack.Screen name="parede" component={Parede}/>
      <Stack.Screen name="teto" component={Teto}/>
      <Stack.Screen name="equipamento" component={Equipamento}/>
      <Stack.Screen name="iluminacao" component={Iluminacao}/>
      <Stack.Screen name="insolacao" component={Insolacao}/>
      <Stack.Screen name="pessoa" component={Pessoa}/>
    </Stack.Navigator>
  );
};
