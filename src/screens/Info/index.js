import axios from 'axios';
import React, {useReducer, useState, useEffect, useContext} from 'react';
import {Alert, Platform, View, PermissionsAndroid} from 'react-native';
import {
  Button,
  Card,
  TextInput,
  IconButton,
  Appbar,
  Title,
} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import Geolocation from '@react-native-community/geolocation';
import {TesteContext} from '../../providers';
import UUIDGenerator from 'react-native-uuid-generator';

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
      case 'uuid':
        return {...state, uuid: action.payload};
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
    uuid: '',
  });
  function Generate() {
    UUIDGenerator.getRandomUUID(uuid => {
      dispatch({type: 'uuid', payload: uuid});
    });
  }
  function Call(p) {
    if (p == 1) {
      Alert.alert('Você precisa permitir que o aplicativo acesse o gps');
    } else if (p == 2) {
      Alert.alert('Você precisa Ativar o GPS');
    } else {
      Alert.alert('Não foi possivel acessar sua localização. Tente denovo ');
    }
  }
  const getLocation = () => {
    Geolocation.getCurrentPosition(
      p => {
        dispatch({type: 'Latitude', payload: p.coords.latitude});
        Alert.alert('Latitude carregada com Sucesso!');
      },
      error => console.log(Call(error.code)),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );
  };
  async function Buscar() {
    if (state.Cidade && state.Estado != '') {
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
    } else {
      Alert.alert('Você precisa preencher os Campos Cidade/Estado');
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
  useEffect(() => {
    Generate();
  }, []);

  return (
    <View>
      <Appbar.Header style={{backgroundColor: '#B0E0E6'}}>
        <Appbar.Content title="iGlu" />
      </Appbar.Header>
      <Card style={{padding: 20}}>
        <Title>Nome do Projeto</Title>
        <TextInput
          label="Nome do Projeto"
          onChangeText={text => dispatch({type: 'Nome_Projeto', payload: text})}
        />
        <Title>Localização Do Projeto</Title>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Picker
            selectedValue={state.Estado}
            onValueChange={text => dispatch({type: 'Estado', payload: text})}
            style={{width: 180}}>
            <Picker.Item label="Estado" value="" />
            {State.map(item => (
              <Picker.Item key={item} label={item.nome} value={item} />
            ))}
          </Picker>
          <Picker
            selectedValue={state.Cidade}
            style={{width: 172}}
            onValueChange={text => dispatch({type: 'Cidade', payload: text})}>
            <Picker.Item label="Cidade" value="" />
            {City.map(item => (
              <Picker.Item key={item} label={item} value={item} />
            ))}
          </Picker>
        </View>
        <Title>Temperatura do Dia</Title>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TextInput
            style={{width: 190}}
            keyboardType="numeric"
            label="Temperatura Local do Dia"
            value={`${state.TemperaturaE}`}
            onChangeText={text =>
              dispatch({type: 'TemperaturaE', payload: text})
            }
          />
          <IconButton
            style={{marginRight: 30, backgroundColor: '#0ff'}}
            icon="plus"
            onPress={() => {
              Buscar();
            }}
          />
        </View>
        <Title>Latitude</Title>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            onChangeText={text => dispatch({type: 'Latitude', payload: text})}
            label="Latitude"
            keyboardType="numeric"
            value={`${state.Latitude}`}
            style={{width: 190}}
          />
          <IconButton
            style={{backgroundColor: '#0ff'}}
            icon="crosshairs-gps"
            onPress={getLocation}>
            Localização
          </IconButton>
        </View>

        <Button
          onPress={() => {
            Send();
          }}>
          Próximo
        </Button>
      </Card>
    </View>
  );
}
