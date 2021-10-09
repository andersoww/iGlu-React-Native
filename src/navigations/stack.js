import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Importação de Screens
import Principal from '../screens/Principal';
import Parede from '../screens/Parede';
import Teto from '../screens/Teto';
import Equipamento from '../screens/Equipamento';
import Iluminacao from '../screens/Iluminação';
import Pessoa from '../screens/Pessoa';
import Info from '../screens/Info'

const Stack = createNativeStackNavigator();
export default () => {
  return (
    <Stack.Navigator initialRouteName="equipamento" screenOptions={{headerShown:false}}>
      <Stack.Screen name="Info" component={Info}/>
      <Stack.Screen name="main" component={Principal}/>
      <Stack.Screen name="parede" component={Parede}/>
      <Stack.Screen name="teto" component={Teto}/>
      <Stack.Screen name="equipamento" component={Equipamento}/>
      <Stack.Screen name="iluminacao" component={Iluminacao}/>
      <Stack.Screen name="pessoa" component={Pessoa}/>
    </Stack.Navigator>
  );
};
