/* eslint-disable prettier/prettier */
import React, {
  useState,
  useReducer,
  useContext,
} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, TextInput, Button } from 'react-native-paper';
import { calculo_iluminacao } from '../../services/API';
import { TesteContext } from '../../providers';

export default function ({ navigation }) {
  const { dados, setDados } = useContext(TesteContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'area':
        return { ...state, area: action.payload };
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    area: '',
  });

  const [CalculoParede, setCalculoParede] = useState([]);
  const [dados1, setDados1] = useState([]);
  const [Blocos, setBlocos] = useState([]);

  const Dados = {
    ...state,
  };

  async function Enviar() {
    console.log(Dados)
    try {
      const resposta = await calculo_iluminacao.post('', Dados);
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
            <Text style={{ fontSize: 24, marginBottom: 25 }}>Iluminação</Text>

            <TextInput
              placeholder="Area do comodo (m²)"
              keyboardType="numeric"
              onChangeText={text =>
                dispatch({ type: 'area', payload: text })
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
