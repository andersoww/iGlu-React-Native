/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useReducer, useContext} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {Card, TextInput, Button, Divider} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {listar_forro, calcular_teto, listar_telha} from '../../services/API';
import {TesteContext} from '../../providers';

export default function ({navigation}) {
  const {teto, setTeto} = useContext(TesteContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'AreaPiso':
        return {...state, AreaPiso: action.payload};
      case 'Telha_id':
        return {...state, Telha_id: action.payload};
      case 'ForroLaje_id':
        return {...state, ForroLaje_id: action.payload};
      case 'TemperaturaInterna':
        return {...state, TemperaturaInterna: action.payload};
      case 'TemperaturaExterna':
        return {...state, TemperaturaExterna: action.payload};
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    AreaPiso: '',
    Telha_id: '',
    ForroLaje_id: '',
    TemperaturaInterna: '',
    TemperaturaExterna: '',
  });

  const [telhas, setTelhas] = useState([]);
  const [forro, setForro] = useState([]);

  const Dados = {
    ...state,
  };

  async function listarTelhas() {
    try {
      const response = await listar_telha.get();

      setTelhas(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function ListarForro() {
    try {
      const response = await listar_forro.get();

      setForro(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function Enviar() {
    try {
      const resposta = await calcular_teto.post('', Dados);
      const rest = resposta.data;
      setTeto({valorT: rest});
      Alert.alert('Calculo de Teto Realizado');
      navigation.navigate('main');
    } catch (error) {
      Alert.alert(`Preencha todos os Campos`);
    }
  }

  useEffect(() => {
    listarTelhas();
    ListarForro();
  }, []);

  return (
    <View>
      <Card style={{padding: 10, height: '100%', borderRadius: 10}}>
        <ScrollView>
          <Text style={{fontSize: 24, marginBottom: 25}}>Teto</Text>

          <TextInput
            label="Área do comodo (m²):"
            placeholder="M²"
            keyboardType="numeric"
            onChangeText={text => dispatch({type: 'AreaPiso', payload: text})}
          />
          <Divider style={{height: 3, backgroundColor: 'red', marginTop: 5}} />
          <View>
            <Text>Tipo do teto:</Text>

            <Picker
              selectedValue={state.Telha_id}
              onValueChange={text =>
                dispatch({type: 'Telha_id', payload: text})
              }>
              <Picker.Item label="Escolha uma Telha..." value="" />
              {telhas.map(item => (
                <Picker.Item
                  key={item}
                  label={`Telha ${item.material.nome} - ${item.espessura}`}
                  value={item.id}
                />
              ))}
            </Picker>

            <Picker
              selectedValue={state.ForroLaje_id}
              onValueChange={text =>
                dispatch({type: 'ForroLaje_id', payload: text})
              }>
              <Picker.Item label="Escolha um Forro ou Laje..." value="" />
              {forro.map(item => (
                <Picker.Item
                  key={item}
                  label={`${item.material.nome} - ${item.espessura}`}
                  value={item.id}
                />
              ))}
            </Picker>
          </View>

          <Divider style={{height: 3, backgroundColor: 'red', marginTop: 5}} />

          <View>
            <Text>Temperatura:</Text>

            <TextInput
              placeholder="Temperatura Interna"
              keyboardType="numeric"
              onChangeText={text =>
                dispatch({type: 'TemperaturaInterna', payload: text})
              }
            />
            <TextInput
              placeholder="Temperatura Externa"
              keyboardType="numeric"
              onChangeText={text =>
                dispatch({type: 'TemperaturaExterna', payload: text})
              }
            />
          </View>
          <Button
            onPress={() => {
              Enviar();
            }}>
            Clicar
          </Button>
        </ScrollView>
      </Card>
    </View>
  );
}
