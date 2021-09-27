/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {Appbar, Button, Card, Paragraph, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import { TesteContext } from '../../providers';

export default function () {
  const { dados, setDados } = useContext(TesteContext);

  const iluminacao = 3225;
  const parede = 3225;
  const equipamentos = 3225;
  const teto = 3225;
  const pessoas = 3225;
  
  const navegar = useNavigation();

  return (
    <>
      <ScrollView>
        <View>

      <Card style={{marginBottom: 5}}>
        <Card.Title title="Iluminação" subtitle="Carga resultante da iluminação do ambiente"/>
        <Card.Content style={{alignItems: 'center'}}>
          <Title>{ iluminacao }</Title>
        </Card.Content>
        <Card.Actions>
          <Button>Limpar</Button>
        </Card.Actions>
      </Card>

      <Card style={{ marginBottom: 5 }}>
        <Card.Title title="Parede" subtitle="Carga resultante da condução das Paredes" />
        <Card.Content style={{ alignItems: 'center' }}>
          <Title>{parede}</Title>
        </Card.Content>
        <Card.Actions>
          <Button>Limpar</Button>
        </Card.Actions>
      </Card>

      <Card style={{ marginBottom: 5 }}>
        <Card.Title title="Teto" subtitle="Carga resultante da condução do Teto" />
        <Card.Content style={{ alignItems: 'center' }}>
          <Title>{teto}</Title>
        </Card.Content>
        <Card.Actions>
          <Button>Limpar</Button>
        </Card.Actions>
      </Card>

      <Card style={{ marginBottom: 5 }}>
        <Card.Title title="Equipamentos" subtitle="Carga resultante dos equipamentos" />
        <Card.Content style={{ alignItems: 'center' }}>
          <Title>{equipamentos}</Title>
        </Card.Content>
        <Card.Actions>
          <Button>Limpar</Button>
        </Card.Actions>
      </Card>

      <Card style={{ marginBottom: 5 }}>
        <Card.Title title="Pessoas" subtitle="Carga resultante das pessoas" />
        <Card.Content style={{ alignItems: 'center' }}>
          <Title>{pessoas}</Title>
        </Card.Content>
        <Card.Actions>
          <Button>Limpar</Button>
        </Card.Actions>
      </Card>
          </View>

      </ScrollView>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>


      <View style={styles.bottom}>
        <Appbar
          style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: '#B0E0E6'}}>
          <Appbar.Action
            icon="domain"
            size={30}
            onPress={() => {
              navegar.navigate('parede');
             
              // setDados('Anderson')
              // console.log(dados)
            }}
          />

          <Appbar.Action
            icon="home"
            size={30}
            onPress={() => {
              navegar.navigate('teto');
            }}
          />

          <Appbar.Action
            icon="camera"
            size={30}
            onPress={() => {
              console.log(dados)
            }}
            color= 'red'
          />

          <Appbar.Action
            icon="monitor"
            size={30}
            onPress={() => {
              navegar.navigate('equipamento');
            }}
          />

          <Appbar.Action
            icon="account"
            size={30}
            onPress={() => {
              navegar.navigate('pessoa');
            }}
          />
          
          <Appbar.Action
            icon="google-keep"
            size={30}
            onPress={() => {
              navegar.navigate('iluminacao');
            }}
          />
        </Appbar>
      </View>
      </View>
      </>
  );
}
const styles = StyleSheet.create({
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
