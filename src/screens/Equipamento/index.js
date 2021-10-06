/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useReducer, useContext} from 'react';
import {View, Text, ScrollView, Alert, FlatList} from 'react-native';
import {Card, TextInput, Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {calcular_equipamentos, listar_equipamentos} from '../../services/API';
import {TesteContext} from '../../providers';

export default function ({navigation}) {
  const {equipamento, setEquipamento} = useContext(TesteContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'equipamento':
        return {...state, equipamento: action.payload};
      case 'quantidade':
        return {...state, quantidade: action.payload};
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    id: '',
    equipamento: '',
    quantidade: '',
  });

  const [CalculoParede, setCalculoParede] = useState([]);
  const [CalculoEquipamento, setCalculoEquipamento] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);

  const Dados = {
    id: state.equipamento.id,
    potencia: state.equipamento.potencia,
    quantidade: state.quantidade,
  };
  async function listarEquipamentos() {
    try {
      const response = await listar_equipamentos.get();
      setEquipamentos(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function Enviar() {
    if (CalculoParede.length !== 0) {
      try {
        const resposta = await calcular_equipamentos.post('', {
          equipamentos: CalculoParede,
        });
        const rest = resposta.data;
        setEquipamento({valorT: rest});
        navigation.navigate('main');
      } catch (error) {
        console.log(error.message);
      }
    } else {
      Alert.alert('Você precisa adicionar algum equipemento para Calcular');
    }
  }
  function Adicionar() {
    if (state.equipamento.potencia && state.quantidade != '') {
      CalculoParede.push(Dados);
      Alert.alert(`Você cadastrou ${state.equipamento.nome}`);
    } else {
      Alert.alert('Você precisa escolher um equipamento');
    }
  }
  const render = () => (
    <View style={{width: 100, height: 100, backgroundColor: '#012'}}></View>
  );

  useEffect(() => {
    listarEquipamentos();
  }, []);

  return (
    <View>
      <Card style={{padding: 10, height: '100%', borderRadius: 10}}>
        <Text style={{fontSize: 24, marginBottom: 25}}>Equipamentos</Text>

        <View>
          <Text>Tipo do teto:</Text>

          <Picker
            selectedValue={state.equipamento}
            onValueChange={text =>
              dispatch({type: 'equipamento', payload: text})
            }>
            <Picker.Item label="Escolha um Equipamento..." value="" />
            {equipamentos.map(item => (
              <Picker.Item key={item} label={item.nome} value={item} />
            ))}
          </Picker>

          <TextInput
            placeholder="Quantidade"
            keyboardType="numeric"
            onChangeText={text => dispatch({type: 'quantidade', payload: text})}
          />
        </View>
        <Button
          onPress={() => {
            Enviar();
          }}>
          Calcular
        </Button>
        <Button
          onPress={() => {
            Adicionar();
          }}>
          Adicionar
        </Button>
        <Button
          onPress={() => {
            console.log(CalculoParede);
          }}>
          Teste
        </Button>
        <FlatList
          data={CalculoParede}
          renderItem={render}
          keyExtractor={(item, index) => item + index}
          refreshing={CalculoParede}

        />
      </Card>
    </View>
  );
}
