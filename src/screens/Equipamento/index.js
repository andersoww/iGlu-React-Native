/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useReducer, useContext} from 'react';
import {View, Text, Alert, FlatList, TouchableOpacity} from 'react-native';
import {
  Title_Equipament,
  Card_Equipament,
  Container_Home,
  Container_Input,
  Button_Send,
  Button_Remove,
  Container_List_Equipament,
  Container_List_Equipament_Title,
  Card_List_Equipament,
} from './style';
import {TextInput, IconButton, Avatar} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import {calcular_equipamentos, listar_equipamentos} from '../../services/API';
import {TesteContext} from '../../providers';

export default function ({navigation}) {
  //Estado Global para compartilhar o resultado do Calculo para Dashbord
  const {equipamento, setEquipamento} = useContext(TesteContext);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'equipamento':
        return {...state, equipamento: action.payload};
      case 'quantidade':
        return {...state, quantidade: action.payload};
    }
  };
  //Hook para armazenas os valores dos Equipamentos
  const [state, dispatch] = useReducer(reducer, {
    id: '',
    nome: '',
    equipamento: '',
    quantidade: '',
  });
  //Hook para armazenas os itens que foram selecionados para fazer o calculo de Equipamentos
  const [selectedList, setSelectedList] = useState([]);
  //Hook para armazenar a posição no array "equipament" para fazer alguma coisa (Função Remover)
  const [index, setIndex] = useState();
  //Hook para armazenar a lista de equipamentos carregados da API
  const [equipament, setEquipament] = useState([]);
  //Hook para armazear o id do item selecionado
  const [selected, setSelected] = useState();
  //Hook para armazenas uma boolean, para auxixiar no FlatList (renderização tempo real)
  const [refresh, setRefresh] = useState(false);

  //Função Para listar os equipamentos da API
  async function listarEquipamentos() {
    try {
      const response = await listar_equipamentos.get();
      setEquipament(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  //Função para fazer uma requisição e retornar o resultado do calculo da API
  async function Send() {
    if (selectedList.length !== 0) {
      try {
        const resposta = await calcular_equipamentos.post('', {
          equipamentos: selectedList,
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
  //Função para adicionar um equipamento em um array de Equipamentos
  function Add() {
    const Dados = {
      id: state.equipamento.id,
      nome: state.equipamento.nome,
      potencia: state.equipamento.potencia,
      quantidade: state.quantidade,
    };
    if (SearchRepetition(state.equipamento.id)) {
      Alert.alert('Este Equipamento já foi adicionado');
    } else if (state.equipamento.potencia && state.quantidade != '') {
      setRefresh(!refresh);
      selectedList.push(Dados);
      Alert.alert(`Você cadastrou ${state.equipamento.nome}`);
    } else {
      Alert.alert('Você precisa escolher um equipamento');
    }
  }
  //Função para selecionar um equipamento, para armazenar seu id
  function SelectedProduct(item) {
    setSelected(item.id);
    const filtered = selectedList.findIndex(function (el) {
      return el.id == item.id;
    });

    setIndex(filtered);

    return;
  }
  //Função para remover um equipamento em um array de Equipamentos
  function Remove() {
    //Zerar esse hook para resetar o ultimo item removido
    setIndex(null);
    if (index != null) {
      selectedList.splice(index, 1);
      setRefresh(!refresh);
      setSelected(null);
    } else {
      Alert.alert('Você precisa selecionar algum item para Remover');
    }
  }
  // Arrow Function para renderizar elemento na FlatList
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
      <Avatar.Icon
        size={64}
        icon="monitor"
        color="black"
        style={{backgroundColor: '#fff'}}
      />

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

  function SearchRepetition(valor) {
    var value;
    if ((value = selectedList.find(item => item.id == valor))) return value;
  }

  useEffect(() => {
    listarEquipamentos();
  }, []);

  return (
    <Container_Home>
      <Card_Equipament>
        <Title_Equipament>Equipamentos</Title_Equipament>

        <Text>Tipo do teto:</Text>
        <Picker
          selectedValue={state.equipamento}
          onValueChange={text =>
            dispatch({type: 'equipamento', payload: text})
          }>
          <Picker.Item label="Escolha um Equipamento..." value="" />
          {equipament.map(item => (
            <Picker.Item key={item} label={item.nome} value={item} />
          ))}
        </Picker>

        <Container_Input>
          <TextInput
            style={{marginRight: 10}}
            placeholder="Quantidade"
            keyboardType="numeric"
            onChangeText={text => dispatch({type: 'quantidade', payload: text})}
          />
          <IconButton
            icon="plus"
            color="red"
            style={{backgroundColor: '#012'}}
            onPress={() => {
              Add();
            }}
          />
        </Container_Input>
        <Button_Send
          onPress={() => {
            Send();
          }}>
          Calcular
        </Button_Send>
        <Button_Remove
          onPress={() => {
            Remove();
          }}>
          Remover
        </Button_Remove>
      </Card_Equipament>

      <Container_List_Equipament>
        <Card_List_Equipament>
          <Container_List_Equipament_Title
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 5,
            }}>
            <Text style={{fontSize: 28}}>Lista de Equipamentos:</Text>
          </Container_List_Equipament_Title>
          <FlatList
            data={selectedList}
            renderItem={render}
            keyExtractor={(item, index) => index}
            refreshing={refresh}
          />
        </Card_List_Equipament>
      </Container_List_Equipament>
    </Container_Home>
  );
}
