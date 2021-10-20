/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useReducer, useContext} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {TextInput, IconButton, Appbar} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {listar_forro, calcular_teto, listar_telha} from '../../services/API';
import {TesteContext} from '../../providers';

import {Card_Teto, Container, Title_Teto} from './styles';

export default function ({navigation}) {
  const {teto, setTeto, infoInitial} = useContext(TesteContext);

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
    TemperaturaExterna: infoInitial.TemperaturaE,
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
      Alert.alert('Preencha todos os Campos');
    }
  }

  useEffect(() => {
    listarTelhas();
    ListarForro();
  }, []);

  return (
    <>
      <Appbar.Header style={{backgroundColor: '#B0E0E6'}}>
        <Appbar.Content title="Teto" />
      </Appbar.Header>
      <Container>
        <Card_Teto>
          <ScrollView>
            <TextInput
              label="Área do comodo (m²):"
              placeholder="M²"
              keyboardType="numeric"
              onChangeText={text => dispatch({type: 'AreaPiso', payload: text})}
            />
            <View>
              <Text>Tipo do teto:</Text>

              <View
                style={{
                  justifyContent: 'center',
                  borderRadius: 15,
                  borderWidth: 1,
                  overflow: 'hidden',
                  height: 50,
                  backgroundColor: '#FFF',
                  marginBottom: 20,
                  marginTop: 10,
                }}>
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
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  borderRadius: 15,
                  borderWidth: 1,
                  overflow: 'hidden',
                  height: 50,
                  backgroundColor: '#FFF',
                  marginBottom: 20,
                }}>
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
            </View>

            <View>
              <Text>Temperatura:</Text>

              <TextInput
                placeholder="Temperatura Interna"
                keyboardType="numeric"
                onChangeText={text =>
                  dispatch({type: 'TemperaturaInterna', payload: text})
                }
                style={{marginBottom: 10}}
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <IconButton
                style={{backgroundColor: '#68E068'}}
                color="white"
                size={30}
                icon="calculator"
                onPress={() => {
                  Enviar();
                }}></IconButton>
            </View>
          </ScrollView>
        </Card_Teto>
      </Container>
    </>
  );
}
