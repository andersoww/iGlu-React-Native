/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useReducer, useContext} from 'react';
import {
  View,
  Text,
  ScrollView,
  Alert,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Card, TextInput, Button, IconButton} from 'react-native-paper';
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
    nome: '',
    equipamento: '',
    quantidade: '',
  });

  const [CalculoParede, setCalculoParede] = useState([]);
  const [CalculoEquipamento, setCalculoEquipamento] = useState();
  const [equipamentos, setEquipamentos] = useState([]);
  const [selected, setSelected] = useState();

  const [teste, setTeste] = useState(false);

  const Dados = {
    id: state.equipamento.id,
    nome: state.equipamento.nome,
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
    if (buscarRepeticao(state.equipamento.id)) {
      Alert.alert('Este Equipamento já foi adicionado');
      return;
    } else if (state.equipamento.potencia && state.quantidade != '') {
      setTeste(!teste);
      CalculoParede.push(Dados);
      Alert.alert(`Você cadastrou ${state.equipamento.nome}`);
    } else {
      Alert.alert('Você precisa escolher um equipamento');
    }
  }
  function SelectedProduct(item) {
    setSelected(item.id);
    const filtered = CalculoParede.findIndex(function (el) {
      return el.id == item.id;
    });

    setCalculoEquipamento(filtered);

    return;
  }
  const render = ({item}) => (
    <TouchableOpacity
      style={{
        height: 100,
        backgroundColor: selected == item.id ? '#f0f' : '#fff',
        elevation: 5,
        borderRadius: 10,
        marginVertica: 10,
        marginHorizontal: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        SelectedProduct(item);
      }}>
      <Image style={{height: 80, width: 80, backgroundColor: '#012'}} />

      <View
        style={{
          height: 100,
          marginLeft: 10,
          paddingVertical: 20,
          flex: 1,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.nome}</Text>
        <Text style={{fontSize: 15}}>Potência:{item.potencia}</Text>
      </View>
      <View
        style={{
          marginRight: 20,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 20,
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 21}}>
          {item.quantidade}
        </Text>
      </View>
    </TouchableOpacity>
  );
  function Remover() {
    setCalculoEquipamento(null);
    if (CalculoEquipamento != null) {
      CalculoParede.splice(CalculoEquipamento, 1);
      setTeste(!teste);
      setSelected(null);
    }else {
      Alert.alert('Você precisa selecionar algum item para Remover')
    }
  }
  function buscarRepeticao(valor) {
    var value;
    if ((value = CalculoParede.find(item => item.id == valor))) return value;
  }

  useEffect(() => {
    listarEquipamentos();
  }, []);

  return (
    <SafeAreaView style={{padding: 10, flex: 1}}>
      <Card style={{padding: 10, borderRadius: 10}}>
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
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={{marginRight: 10}}
              placeholder="Quantidade"
              keyboardType="numeric"
              onChangeText={text =>
                dispatch({type: 'quantidade', payload: text})
              }
            />
            <IconButton
              icon="plus"
              color="red"
              style={{backgroundColor: '#012'}}
              onPress={() => {
                Adicionar();
              }}
            />
          </View>
        </View>
        <Button
          onPress={() => {
            Enviar();
          }}>
          Calcular
        </Button>
        <Button
          onPress={() => {
            Remover();
          }}>
          Remover
        </Button>
        <Button
          onPress={() => {
            console.log(selected);
          }}>
          Teste
        </Button>
      </Card>
      <View style={{marginTop: 20, marginBottom: 40, flex: 1}}>
        <Card>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 5,
            }}>
            <Text style={{fontSize: 28}}>Lista de Equipamentos:</Text>
          </View>
          <FlatList
            data={CalculoParede}
            renderItem={render}
            keyExtractor={(item, index) => index}
            refreshing={teste}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
}
