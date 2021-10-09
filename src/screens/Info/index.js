import axios from 'axios';
import React, {useReducer, useState, useEffect, useContext} from 'react';
import {Alert, Platform, View, PermissionsAndroid} from 'react-native';
import {Button, Card, TextInput, IconButton} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import Geolocation from '@react-native-community/geolocation';
import {TesteContext} from '../../providers';
import {Icon} from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

export default function ({navigation}) {
  const {setInfoInitial} = useContext(TesteContext);
  const reducer = (state, action) => {
    switch (action.type) {
      case 'Nome_Projeto':
        return {...state, Projeto: action.payload};
      case 'Cidade':
        return {...state, Cidade: action.payload};
      case 'Estado':
        return {...state, Estado: action.payload};
      case 'TemperaturaI':
        return {...state, TemperaturaI: action.payload};
      case 'TemperaturaE':
        return {...state, TemperaturaE: action.payload};
      case 'Latitude':
        return {...state, Latitude: action.payload};
    }
  };
  const [City, setCity] = useState([]);
  const [State, setState] = useState([]);

  const [state, dispatch] = useReducer(reducer, {
    Projeto: '',
    Cidade: '',
    Estado: '',
    TemperaturaE: '',
    Latitude: '',
  });

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      p => {
        dispatch({type: 'Latitude', payload: p.coords.latitude});
      },
      error => Alert.alert(error.message),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  };
  async function Buscar() {
    try {
      const response = await axios.get(
        `https://api.hgbrasil.com/weather?key=cc5354f2&city_name=${state.Cidade},${state.Estado.sigla}`,
      );
      const res = response.data;
      const x = res.results.forecast[0].max;

      dispatch({type: 'TemperaturaE', payload: x});
    } catch (error) {
      console.log(error);
    }
  }
  async function ListState() {
    try {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      );
      const res = response.data.map(function (e) {
        return e;
      });
      setState(res);
    } catch (error) {}
  }
  async function ListCity() {
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.Estado.id}/municipios`,
      );
      const res = response.data.map(function (e) {
        return e.nome;
      });

      setCity(res);
    } catch (error) {
      Alert.alert('Failed 404');
    }
  }
  function Send() {
    if (
      state.Projeto != '' &&
      state.Cidade != '' &&
      state.Estado != '' &&
      state.Latitude != '' &&
      state.TemperaturaE != ''
    ) {
      setInfoInitial(state);
      navigation.navigate('main');
      Alert.alert('Informações Carregadas');
    } else {
      Alert.alert('Informe todos os campos');
    }
  }
  useEffect(() => {
    ListState();
  }, []);
  useEffect(() => {
    ListCity();
  }, [state.Estado.id]);

  return (
    <View style={{padding: 10, justifyContent: 'center', alignItems: 'center'}}>
      <Card style={{padding: 10, height: '70%', borderRadius: 10}}>
        <TextInput
          label="Nome do Projeto"
          onChangeText={text => dispatch({type: 'Nome_Projeto', payload: text})}
        />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Picker
            selectedValue={state.Estado}
            onValueChange={text => dispatch({type: 'Estado', payload: text})}
            style={{width: 180}}>
            <Picker.Item label="Escolha uma Material..." value="" />
            {State.map(item => (
              <Picker.Item key={item} label={item.nome} value={item} />
            ))}
          </Picker>
          <Picker
            selectedValue={state.Cidade}
            style={{width: 172}}
            onValueChange={text => dispatch({type: 'Cidade', payload: text})}>
            <Picker.Item label="Escolha uma Material..." value="" />
            {City.map(item => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>

        <TextInput
          keyboardType="numeric"
          label="Temperatura Local do Dia"
          value={`${state.TemperaturaE}`}
          onChangeText={text => dispatch({type: 'TemperaturaE', payload: text})}
        />
        <Button
          onPress={() => {
            Buscar();
          }}>
          Buscar
        </Button>

        <IconButton icon="crosshairs-gps" onPress={getLocation}>
          Localização
        </IconButton>
        <Button
          onPress={() => {
            Send();
          }}>
          Processar
        </Button>
      </Card>
    </View>
  );
}
