/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useReducer, useContext} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {Card, TextInput, Button, Switch, Divider} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {calcular_pessoas} from '../../services/API';
import {TesteContext} from '../../providers';

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
    if (state.atividade && state.quantidade != '') {
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
    <View>
      <Card style={{padding: 10, height: '100%', borderRadius: 10}}>
        <ScrollView>
          <View>
            <Text style={{fontSize: 24, marginBottom: 25}}>Pessoas</Text>

            <Text>Tipo de Atividede</Text>
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

            <TextInput
              placeholder="Quantidade"
              keyboardType="numeric"
              onChangeText={text =>
                dispatch({type: 'quantidade', payload: text})
              }
            />
          </View>

          <Button
            onPress={() => {
              Enviar();
            }}>
            Calcular
          </Button>
        </ScrollView>
      </Card>
    </View>
  );
}
