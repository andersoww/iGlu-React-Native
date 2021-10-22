import React, {useState, useEffect, useContext} from 'react';
import {Alert, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getRealm from '../../services/realm';

import {Container, Title, Form, Input, Submit, List} from './styles';
import Repository from '../../components/ProjetoSave';
import {IconButton} from 'react-native-paper';
import {TesteContext} from '../../providers';

export default function ({navigation}) {
  const [project, setProject] = useState([]);
  const [selected, SetSelected] = useState({id: '', nome: ''});
  const {refresh, setRefresh} = useContext(TesteContext);
  async function criar() {
    const realm = await getRealm();
    realm.write(() => {
      realm.create('Repository', {
        id: '975f9101-fad2-4ce6-a353-sa03d6a432de',
        nome: 'Bruno',
        btu: 30000,
        tr: 2,
        cidade: 'Bebedouro',
        estado: 'São Paulo',
      });
    });
  }
  async function Remove() {
    const realm = await getRealm();
    realm.write(() => {
      const myTask = realm.objectForPrimaryKey('Repository', selected.id);

      realm.delete(myTask);
    });
    setRefresh(!refresh);
  }
  useEffect(() => {
    async function loadRepositories() {
      const realm = await getRealm();
      const data = realm.objects('Repository');

      setProject(data);
    }
    loadRepositories();
  }, []);
  return (
    <Container>
      <Form>
        <IconButton
          icon="plus"
          color="white"
          style={{backgroundColor: '#B0E0E6'}}
          size={40}
          onPress={() => {
            navigation.navigate('Info');
          }}
        />
        <IconButton
          icon="delete"
          color="white"
          style={{backgroundColor: '#B0E0E6'}}
          size={40}
          onPress={() => {
            Alert.alert('Confirmação', `Apagar o projeto ${selected.nome} ?`, [
              {
                text: 'Cancelar',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Sim',
                onPress: () => {
                  Remove();
                },
              },
            ]);
          }}
        />
        <IconButton
          icon="history"
          color="white"
          style={{backgroundColor: '#B0E0E6'}}
          size={40}
          onPress={() => {
            criar();
          }}
        />
      </Form>
      <List
        keyboardShouldPersistTaps="handled"
        data={project}
        refresh={refresh}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Repository
            style={selected.id == item.id ? '#FF4F4F' : '#fff'}
            onPress={() => SetSelected({id: item.id, nome: item.nome})}
            data={item}
          />
        )}
      />
    </Container>
  );
}
