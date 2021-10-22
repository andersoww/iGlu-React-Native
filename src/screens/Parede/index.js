/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useReducer, useContext} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {Card, TextInput, IconButton, Switch, Appbar} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {Api_bloco, calcular_parede} from '../../services/API';
import {TesteContext} from '../../providers';

import {Card_Parede, Container, Title_Parede} from './styles';

export default function ({navigation}) {
  const {setParede, parede, infoInitial} = useContext(TesteContext);
  const reducer = (state, action) => {
    switch (action.type) {
      case 'AreaP':
        return {...state, AreaP: action.payload};
      case 'AreaVidro':
        return {...state, AreaVidro: action.payload};
      case 'Orientacao':
        return {...state, Orientacao: action.payload};
      case 'Latitude':
        return {...state, Latitude: action.payload};
      case 'Bloco_id':
        return {...state, Bloco_id: action.payload};
      case 'CondutividadeReboco':
        return {...state, CondutividadeReboco: action.payload};
      case 'CondutividadeAssentamento':
        return {...state, CondutividadeAssentamento: action.payload};
      case 'EspessuraRExterna':
        return {...state, EspessuraRExterna: action.payload};
      case 'EspessuraRInterna':
        return {...state, EspessuraRInterna: action.payload};
      case 'TemperaturaInterna':
        return {...state, TemperaturaInterna: action.payload};
      case 'TemperaturaExterna':
        return {...state, TemperaturaExterna: action.payload};
      case 'Limpar':
        return {
          ...(state = {
            AreaP: '',
            AreaVidro: '',
            Orientacao: '',
            Latitude: '',
            Bloco_id: '',
            CondutividadeReboco: '',
            CondutividadeAssentamento: '',
            EspessuraRExterna: '',
            EspessuraRInterna: '',
            TemperaturaInterna: '',
            TemperaturaExterna: '',
          }),
        };
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    AreaP: '',
    AreaVidro: 0,
    Orientacao: 'N',
    Latitude: infoInitial.Latitude,
    Bloco_id: '',
    CondutividadeReboco: '',
    CondutividadeAssentamento: '',
    EspessuraRExterna: '',
    EspessuraRInterna: '',
    TemperaturaInterna: infoInitial.TemperaturaI,
    TemperaturaExterna: infoInitial.TemperaturaE,
  });

  const [dados1, setDados1] = useState([]);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const Dados = {
    ...state,
  };

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  async function itemBloco() {
    try {
      const response = await Api_bloco.get();

      setDados1(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function Enviar() {
    const contador = parede.Contador;
    if (contador <= 4) {
      try {
        const resposta = await calcular_parede.post('', Dados);
        const rest = resposta.data;

        let total = rest.resultado + parede.valorT;
        console.log(rest);
        setParede({Contador: contador + 1, valorT: total});

        navigation.navigate('main');
        Alert.alert(`Parede ${contador + 1} calculada com sucesso`);
      } catch (error) {
        Alert.alert('Você precisa informar todos os campos');
        console.log(error);
      }
    } else {
      Alert.alert('Limite Estourou ');
    }
  }
  useEffect(() => {
    itemBloco();
  }, []);

  return (
    <>
      <Appbar.Header style={{backgroundColor: '#B0E0E6'}}>
        <Appbar.Content title="Paredes" />
        <Appbar.Content title={`Faltam ${4 - parede.Contador}`} />
      </Appbar.Header>
      <Container>
        <ScrollView>
          <Card_Parede>
            <TextInput
              style={{height: 50}}
              label="Área da Parede:"
              placeholder="M²"
              keyboardType="numeric"
              onChangeText={text => dispatch({type: 'AreaP', payload: text})}
            />
            <View>
              <Text>Material da Parede:</Text>

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
                  selectedValue={state.Bloco_id}
                  onValueChange={text =>
                    dispatch({type: 'Bloco_id', payload: text})
                  }>
                  <Picker.Item label="Escolha uma Material..." value="" />
                  {dados1.map(item => (
                    <Picker.Item
                      key={item}
                      label={`Bloco ${item.material.nome} - ${
                        item.altura * 100
                      }X${(item.largura * 100).toFixed(2)}X${(
                        item.comprimento * 100
                      ).toFixed(2)}`}
                      value={item.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </Card_Parede>

          <View
            style={{
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'center',
              marginBottom: 10,
            }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>Contém vidro?</Text>
              <Switch
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
                color="red"
                ios_backgroundColor="red"
              />
            </View>
          </View>

          {isSwitchOn && (
            <Card_Parede>
              <Text>Vidro:</Text>
              <TextInput
                label="Área Total de Vidro"
                placeholder="M²"
                keyboardType="numeric"
                onChangeText={text =>
                  dispatch({type: 'AreaVidro', payload: text})
                }
              />

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
                  selectedValue={state.Orientacao}
                  onValueChange={text =>
                    dispatch({type: 'Orientacao', payload: text})
                  }>
                  <Picker.Item
                    label="Escolha uma orientação do Vidro...."
                    value=""
                  />
                  <Picker.Item label="Sul" value="S" />
                  <Picker.Item label="Sudeste" value="SE" />
                  <Picker.Item label="Leste" value="E" />
                  <Picker.Item label="Nordeste" value="NE" />
                  <Picker.Item label="Norte" value="N" />
                  <Picker.Item label="Noroeste" value="NO" />
                  <Picker.Item label="Oeste" value="O" />
                  <Picker.Item label="Sudoeste" value="SO" />
                </Picker>
              </View>
            </Card_Parede>
          )}
          <Card_Parede>
            <View>
              <Text>Reboco:</Text>
              {/* <TextInput
                placeholder="Condutividade do Reboco "
                keyboardType="numeric"
                onChangeText={text =>
                  dispatch({type: 'CondutividadeReboco', payload: text})
                }
              /> */}
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
                  selectedValue={state.CondutividadeReboco}
                  onValueChange={text =>
                    dispatch({type: 'CondutividadeReboco', payload: text})
                  }>
                  <Picker.Item
                    label="Escolha um Material do Reboco..."
                    value=""
                  />
                  <Picker.Item label="Cimento" value={1.15} />
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
                  marginTop: 10,
                }}>
                <Picker
                  selectedValue={state.CondutividadeAssentamento}
                  onValueChange={text =>
                    dispatch({type: 'CondutividadeAssentamento', payload: text})
                  }>
                  <Picker.Item
                    label="Escolha um Material do Assentamento..."
                    value=""
                  />
                  <Picker.Item label="Cimento" value={1.15} />
                </Picker>
              </View>

              <TextInput
                placeholder="Espessura Reboco Interno "
                keyboardType="numeric"
                onChangeText={text =>
                  dispatch({type: 'EspessuraRInterna', payload: text})
                }
              />
              <TextInput
                placeholder="Espessura Reboco Externo"
                keyboardType="numeric"
                onChangeText={text =>
                  dispatch({type: 'EspessuraRExterna', payload: text})
                }
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
          </Card_Parede>
        </ScrollView>
      </Container>
    </>
  );
}
