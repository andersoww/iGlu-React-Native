/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useReducer, useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Card, TextInput, Button, Divider} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {
  calcular_equipamentos,
  calcular_parede,
  listar_equipamentos,
} from '../../services/API';
import {TesteContext} from '../../providers';

export default function ({}) {
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
    equipamento: '',
    quantidade: '',
  });

  const [CalculoParede, setCalculoParede] = useState([]);
  const [CalculoEquipamento, setCalculoEquipamento] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);

  const Dados = {
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
    try {
      const resposta = await calcular_equipamentos.post('', {
        equipamentos: CalculoParede,
      });
      const rest = resposta.data;
      setEquipamento(rest);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    listarEquipamentos();
  }, []);

  return (
    <View>
      <Card style={{padding: 10, height: '100%', borderRadius: 10}}>
        <ScrollView>
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
              onChangeText={text =>
                dispatch({type: 'quantidade', payload: text})
              }
            />
          </View>
          <Button
            onPress={() => {
              Enviar();
            }}>
            Enviar
          </Button>
          <Button
            onPress={() => {
              CalculoParede.push(Dados);
            }}>
            Adicionar
          </Button>
        </ScrollView>
      </Card>
    </View>
  );
}
