/* eslint-disable prettier/prettier */
import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, TextInput, Button, Switch, Divider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { calcular_pessoas } from '../../services/API';
import { TesteContext } from '../../providers';

export default function ({ navigation }) {
  const { dados, setDados } = useContext(TesteContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'atividade':
        return { ...state, atividade: action.payload };
      case 'quantidade':
        return { ...state, quantidade: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    atividade: '',
    quantidade: '',
  });
  const [CalculoParede, setCalculoParede] = useState([]);
  const [dados1, setDados1] = useState([]);
  const [Blocos, setBlocos] = useState([]);

  const Dados = {
    ...state,
  };

  async function itemBloco() {
    try {
      const response = await calcular_pessoas.post();

      const Id = response.data.map(function (item) {
        return item.material;
      });

      setBlocos(Id);
      setDados1(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function Enviar() {
    console.log(Dados)
      try {
        const resposta = await calcular_pessoas.post('', Dados);
        const rest = resposta.data;
        console.log(rest);
      } catch (error) {
        console.log(error.message);
      }
  }

  return (
    <View>
      <Card style={{ padding: 10, height: '100%', borderRadius: 10 }}>
        <ScrollView>
            <View>
              <Text style={{fontSize: 24, marginBottom: 25}}>Pessoas</Text>

              <Text>Tipo de Atividede</Text>
              <Picker
                onValueChange={text =>
                dispatch({ type: 'atividade', payload: text })
                }>
                <Picker.Item label="Baixa" value="80" />
                <Picker.Item label="Média" value="150" />
                <Picker.Item label="Alta" value="500" />
              </Picker>

            <TextInput
              placeholder="Quantidade"
              keyboardType="numeric"
              onChangeText={text =>
                dispatch({ type: 'quantidade', payload: text })
              }
            />
          </View>

          <Button
            onPress={() => {
              Enviar();
              console.log(CalculoParede)
            }}>
            Clicar
          </Button>
          <Button
            onPress={() => {
              setDados(CalculoParede)
              navigation.navigate('main');
            }}>
            Voltar
          </Button>
        </ScrollView>
      </Card>
    </View>
  );
}
