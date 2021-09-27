/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Appbar, Button, Card, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {TesteContext} from '../../providers';

export default function () {
  const {teto, equipamento, iluminacao, pessoa, parede} =
    useContext(TesteContext);

  const Iluminacao = 0 | iluminacao;
  const Parede = 0 | parede.valorT;
  const Equipamento = 0 | equipamento;
  const Teto = 0 | teto;
  const Pessoas = 0 | pessoa;

  const navegar = useNavigation();

  return (
    <>
      <ScrollView style={{height: '90%'}}>
        <View>
          <Card style={{marginBottom: 5}}>
            <Card.Title
              title="Iluminação"
              subtitle="Carga resultante da iluminação do ambiente"
            />
            <Card.Content style={{alignItems: 'center'}}>
              <Title>{Iluminacao}</Title>
            </Card.Content>
            <Card.Actions>
              <Button>Limpar</Button>
            </Card.Actions>
          </Card>

          <Card style={{marginBottom: 5}}>
            <Card.Title
              title="Parede"
              subtitle="Carga resultante da condução das Paredes"
            />
            <Card.Content style={{alignItems: 'center'}}>
              <Title>{Parede}</Title>
            </Card.Content>
            <Card.Actions>
              <Button>Limpar</Button>
            </Card.Actions>
          </Card>

          <Card style={{marginBottom: 5}}>
            <Card.Title
              title="Teto"
              subtitle="Carga resultante da condução do Teto"
            />
            <Card.Content style={{alignItems: 'center'}}>
              <Title>{Teto}</Title>
            </Card.Content>
            <Card.Actions>
              <Button>Limpar</Button>
            </Card.Actions>
          </Card>

          <Card style={{marginBottom: 5}}>
            <Card.Title
              title="Equipamentos"
              subtitle="Carga resultante dos equipamentos"
            />
            <Card.Content style={{alignItems: 'center'}}>
              <Title>{Equipamento}</Title>
            </Card.Content>
            <Card.Actions>
              <Button>Limpar</Button>
            </Card.Actions>
          </Card>

          <Card style={{marginBottom: 5}}>
            <Card.Title
              title="Pessoas"
              subtitle="Carga resultante das pessoas"
            />
            <Card.Content style={{alignItems: 'center'}}>
              <Title>{Pessoas}</Title>
            </Card.Content>
            <Card.Actions>
              <Button>Limpar</Button>
            </Card.Actions>
          </Card>
        </View>
      </ScrollView>

      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.bottom}>
          <Appbar
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              backgroundColor: '#B0E0E6',
            }}>
            <Appbar.Action
              icon="domain"
              size={30}
              onPress={() => {
                navegar.navigate('parede');
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
                console.log(dados);
              }}
              color="red"
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
