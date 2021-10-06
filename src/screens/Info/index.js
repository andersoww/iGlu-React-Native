import axios from 'axios';
import React, {useReducer, useState} from 'react';
import {View} from 'react-native';
import {Button, Card, TextInput} from 'react-native-paper';

export default function () {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'Nome_Projeto':
        return {...state, Nome: action.payload};
      case 'Cidade':
        return {...state, Cidade: action.payload};
      case 'Estado':
        return {...state, Estado: action.payload};
      case 'TemperaturaI':
        return {...state, TemperaturaI: action.payload};
      case 'TemperaturaE':
        return {...state, TemperaturaE: action.payload};
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    Projeto: '',
    Cidade: '',
    Estado: '',
    TemperaturaI: '',
    TemperaturaE: '',
  });
  async function Buscar() {
    try {
      const response = await axios.get(
        `https://api.hgbrasil.com/weather?key=cc354d45&city_name=${state.Cidade},${state.Estado}`,
      );
      const res = response.data;
      const x = res.results.forecast[0].max;
      console.log(x);
      dispatch({type: 'TemperaturaE', payload: x});
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={{padding: 10}}>
      <Card style={{padding: 10, height: '100%', borderRadius: 10}}>
        <TextInput
          label="Nome do Projeto"
          onChangeText={text => dispatch({type: 'Nome_Projeto', payload: text})}
        />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput
            label="Cidade"
            mode="flat"
            style={{width: 180}}
            onChangeText={text => dispatch({type: 'Cidade', payload: text})}
          />
          <TextInput
            label="Estado"
            style={{width: 172}}
            onChangeText={text => dispatch({type: 'Estado', payload: text})}
          />
        </View>
        <Button
          onPress={() => {
            Buscar();
          }}>
          Buscar
        </Button>
        <Button
          onPress={() => {
            console.log(state);
          }}>
          Buscar
        </Button>

        <TextInput
          keyboardType="numeric"
          label="Temperatura Interna"
          value={`${state.TemperaturaE}`}
        />
        <TextInput label="Temperatura Externa" />
      </Card>
    </View>
  );
}
