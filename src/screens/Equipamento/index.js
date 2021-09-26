/* eslint-disable prettier/prettier */
import React, {
  useEffect,
  useState,
  useReducer,
  useContext,
} from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Card, TextInput, Button, Divider } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { calcular_equipamentos, listar_equipamentos } from '../../services/API';
import { TesteContext } from '../../providers';

export default function ({ navigation }) {
  const { dados, setDados } = useContext(TesteContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'quantidade':
        return { ...state, quantidade: action.payload };
      case 'potencia':
        return { ...state, potencia: action.payload };
      case 'ForroLaje_id':
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    quantidade: '',
    potencia: '',
  });

  const [CalculoParede, setCalculoParede] = useState([]);
  const [equipamentos, setEquipamentos] = useState([]);

  const Dados = [{
    ...state,
  }];

  async function listarEquipamentos() {
    try {
      const response = await listar_equipamentos.get();
      console.log(response.data)

      setEquipamentos(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function Enviar() {
    console.log(Dados)

    try {
      const resposta = await calcular_equipamentos.post('', {equipamentos: Dados});
      const rest = resposta.data;
      console.log(rest);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    listarEquipamentos();
  }, []);

  return (
    <View>
      <Card style={{ padding: 10, height: '100%', borderRadius: 10 }}>
        <ScrollView>
          <Text style={{ fontSize: 24, marginBottom: 25 }}>Equipamentos</Text>

          <View>
            <Text>Tipo do teto:</Text>

            <Picker
              onValueChange={text =>
                dispatch({ type: 'potencia', payload: text })
              }>
              <Picker.Item label="Escolha um Equipamento..." value="" />
              {equipamentos.map(item => (
                <Picker.Item
                  key={item}
                  label={item.nome}
                  value={item.potencia}
                />
              ))}
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
