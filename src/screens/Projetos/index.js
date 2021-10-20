import React, {useState, useEffect, useContext} from 'react';
import {Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import getRealm from '../../services/realm';

import {Container, Title, Form, Input, Submit, List} from './styles';
import Repository from '../../components/ProjetoSave';
import {IconButton} from 'react-native-paper';
import {TesteContext} from '../../providers';

export default function ({navigation}) {
  const [project, setProject] = useState([]);
  const {refresh} = useContext(TesteContext);
  async function Remove() {
    const realm = await getRealm();
    realm.write(() => {
      realm.deleteAll();
    });
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
            Remove();
          }}
        />
        <IconButton
          icon="history"
          color="white"
          style={{backgroundColor: '#B0E0E6'}}
          size={40}
          onPress={() => {
            console.log(project[0].nome);
          }}
        />
      </Form>
      <List
        keyboardShouldPersistTaps="handled"
        data={project}
        refresh={refresh}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Repository onPress={() => console.log(item.id)} data={item} />
        )}
      />
    </Container>
  );
}
