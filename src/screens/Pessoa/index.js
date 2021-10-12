/* eslint-disable prettier/prettier */
import React, {useReducer, useContext} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import { TextInput, IconButton, Appbar} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {calcular_pessoas} from '../../services/API';
import {TesteContext} from '../../providers';

import { Container, Card_Pessoas, Title_Pessoas} from './styles';

export default function ({navigation}) {
  const {setPessoa} = useContext(TesteContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'atividade':
        return {...state, atividade: action.payload};
      case 'quantidade':
        return {...state, quantidade: action.payload};
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    atividade: '',
    quantidade: '',
  });

  const Dados = {
    ...state,
  };

  async function Enviar() {
    if (state.atividade && state.quantidade !== '') {
      try {
        const resposta = await calcular_pessoas.post('', Dados);
        const rest = resposta.data;
        setPessoa({valorT: rest});
        Alert.alert('Calculo de Pessoa Realizado');
        navigation.navigate('main');
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Alert.alert('Você precisa preencher todos os campos');
    }
  }

  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#B0E0E6' }}>
        <Appbar.Content title="Pessoas" />
      </Appbar.Header>
      <Container>
      <Card_Pessoas>
        <ScrollView>
          <View>
            <Text>Tipo de Atividede</Text>
            <View style={{
              justifyContent: 'center',
              borderRadius: 15,
              borderWidth: 1,
              overflow: 'hidden',
              height: 50,
              backgroundColor: '#FFF',
              marginBottom: 20,
              marginTop: 10
            }}
            >
            <Picker
              selectedValue={state.atividade}
              onValueChange={text =>
                dispatch({type: 'atividade', payload: text})
              }>
              <Picker.Item label="Escolha uma atividade ..." value="" />
              <Picker.Item label="Baixa" value="80" />
              <Picker.Item label="Média" value="150" />
              <Picker.Item label="Alta" value="500" />
            </Picker>
            </View>


            <TextInput
              placeholder="Quantidade"
              keyboardType="numeric"
              onChangeText={text =>
                dispatch({type: 'quantidade', payload: text})
              }
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
      </Card_Pessoas>
      </Container>
    </>
  );
}
