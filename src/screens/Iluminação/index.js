/* eslint-disable prettier/prettier */
import React, {useReducer, useContext} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import { TextInput, IconButton, Appbar } from 'react-native-paper';
import {calculo_iluminacao} from '../../services/API';
import { TesteContext } from '../../providers';

import { Container, Card_Iluminacao, Title_Iluminacao } from './styles.js';

export default function ({navigation}) {
  const {setIluminacao} = useContext(TesteContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'area':
        return {...state, area: action.payload};
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    area: '',
  });

  const Dados = {
    ...state,
  };

  async function Enviar() {
    if (state.area !== '') {
      try {
        const resposta = await calculo_iluminacao.post('', Dados);
        const rest = resposta.data;
        setIluminacao({valorT: rest});
        Alert.alert('Calculo de Iluminação Realizado');
        navigation.navigate('main');
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Alert.alert('Preencha Todos os Campos ');
    }
  }

  return (

    <>
      <Appbar.Header style={{ backgroundColor: '#B0E0E6' }}>
        <Appbar.Content title="Iluminação" />
      </Appbar.Header>
      <Container>
      <Card_Iluminacao>
        <ScrollView keyboardShouldPersistTaps="never">
          <View>

            <TextInput
              placeholder="Area do comodo (m²)"
              keyboardType="numeric"
              onChangeText={text => dispatch({ type: 'area', payload: text })}
            />
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <IconButton
              style={{ backgroundColor: '#68E068' }}
              color="white"
              size={30}
              icon="calculator"
              onPress={() => {
                Enviar();
              }}
            ></IconButton>
          </View>
        </ScrollView>
        </Card_Iluminacao>
      </Container>
    </>
  );
}
