/* eslint-disable prettier/prettier */
import React, {useReducer, useContext} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
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

    <Container>
      <Card_Iluminacao>
        <ScrollView>
          <View>
            <Title_Iluminacao>Iluminação</Title_Iluminacao>

            <TextInput
              placeholder="Area do comodo (m²)"
              keyboardType="numeric"
              onChangeText={text => dispatch({type: 'area', payload: text})}
            />
          </View>

          <Button
            onPress={() => {
              Enviar();
            }}>
            Calcular
          </Button>
        </ScrollView>
      </Card_Iluminacao>
    </Container>
  );
}
