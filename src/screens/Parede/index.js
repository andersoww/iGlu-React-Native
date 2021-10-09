/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useReducer, useContext} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {Card, TextInput, Button, Switch, Divider} from 'react-native-paper';
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
    AreaVidro: '',
    Orientacao: '',
    Latitude: infoInitial.Latitude,
    Bloco_id: '',
    CondutividadeReboco: '',
    CondutividadeAssentamento: '',
    EspessuraRExterna: '',
    EspessuraRInterna: '',
    TemperaturaInterna: '',
    TemperaturaExterna: infoInitial.TemperaturaE,
  });

  const [dados1, setDados1] = useState([]);
  const [isSwitchOn, setIsSwitchOn] = useState(true);

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

        let total = parseFloat(rest.resultado) + parede.valorT;
        console.log(rest);
        setParede({Contador: contador + 1, valorT: total.toFixed(2)});

        navigation.navigate('main');
        Alert.alert(`Parede ${parede.Contador} calculada com sucesso`);
      } catch (error) {
        Alert.alert('Você precisa informar todos os campos');
      }
    } else {
      Alert.alert('Limite Estourou ');
    }
  }
  useEffect(() => {
    itemBloco();
  }, []);

  return (
    <Container>
      <ScrollView>
        <Card_Parede>
          <Title_Parede>Parede</Title_Parede>

          <TextInput
          style={{height:50}}
            label="Área da Parede:"
            placeholder="M²"
            keyboardType="numeric"
            onChangeText={text => dispatch({type: 'AreaP', payload: text})}
          />
          <View>
            <Text>Material da Parede:</Text>

            <Picker
              selectedValue={state.Bloco_id}
              onValueChange={text =>
                dispatch({type: 'Bloco_id', payload: text})
              }>
              <Picker.Item label="Escolha uma Material..." value="" />
              {dados1.map(item => (
                <Picker.Item
                  key={item}
                  label={`Bloco ${item.material.nome} - ${item.altura * 100}X${(
                    item.largura * 100
                  ).toFixed(2)}X${(item.comprimento * 100).toFixed(2)}`}
                  value={item.id}
                />
              ))}
            </Picker>
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
          </Card_Parede>
        )}
        <Card_Parede>
          <View>
            <Text>Reboco:</Text>
            <TextInput
              placeholder="Condutividade do Reboco "
              keyboardType="numeric"
              onChangeText={text =>
                dispatch({type: 'CondutividadeReboco', payload: text})
              }
            />
            <TextInput
              placeholder="Condutividade do Material Assentamento do Bloco "
              keyboardType="numeric"
              onChangeText={text =>
                dispatch({type: 'CondutividadeAssentamento', payload: text})
              }
            />

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
          <View>
            <Text>Temperatura:</Text>

            <TextInput
              placeholder="Temperatura Interna "
              keyboardType="numeric"
              onChangeText={text =>
                dispatch({type: 'TemperaturaInterna', payload: text})
              }
            />
          </View>
          <Button
            onPress={() => {
              Enviar();
            }}>
            Clicar
          </Button>
          <Button
            onPress={() => {
              console.log(state.Latitude);
              console.log(state.TemperaturaExterna);
            }}>
            Teste
          </Button>
        </Card_Parede>
      </ScrollView>
    </Container>
  );
}
