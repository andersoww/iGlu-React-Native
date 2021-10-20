/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Appbar, Button, Card, Title} from 'react-native-paper';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {TesteContext} from '../../providers';
import getRealm from '../../services/realm';

export default function ({navigation}) {
  async function saveRepository(repository) {
    const data = {
      id: repository.uuid,
      nome: repository.nome,
      cargaTotal: repository.cargaTotal,
    };
    const realm = await getRealm();
    realm.write(() => {
      realm.create('Repository', data);
    });
  }
  async function HandleAddRepository() {
    if (
      Iluminacao != 0 &&
      Parede != 0 &&
      Equipamento != 0 &&
      Teto != 0 &&
      Pessoas != 0
    ) {
      try {
        const x = {
          uuid: infoInitial.uuid,
          nome: infoInitial.Projeto,
          cargaTotal: resultado,
        };
        const response = x;
        await saveRepository(response);
        setRefresh(!refresh);
        setTeto({valorT: 0});
        setEquipamento({valorT: 0});
        setIluminacao({valorT: 0});
        setPessoa({valorT: 0});
        setParede({Contador: 1, valorT: 0});
        navegar.navigate('projetos');
      } catch (error) {
        console.log(error);
      }

      return;
    } else {
      Alert.alert(
        'Você precisa realizar todos os Calculos para salvar o Projeto',
      );
    }
  }
  const {
    teto,
    equipamento,
    iluminacao,
    pessoa,
    parede,
    setTeto,
    setEquipamento,
    setIluminacao,
    setPessoa,
    setParede,
    infoInitial,
    setRefresh,
    refresh,
  } = useContext(TesteContext);

  const Iluminacao = iluminacao.valorT.toFixed(2);
  const Parede = parede.valorT.toFixed(2);
  const Equipamento = equipamento.valorT.toFixed(2);
  const Teto = teto.valorT.toFixed(2);
  const Pessoas = pessoa.valorT.toFixed(2);
  const resultado =
    (pessoa.valorT +
      equipamento.valorT +
      iluminacao.valorT +
      teto.valorT +
      parede.valorT) *
    3.86;

  const navegar = useNavigation();

  return (
    <>
      <Appbar.Header style={{backgroundColor: '#B0E0E6'}}>
        <Appbar.Content title="iGlu" />
        <Appbar.Action
          icon="content-save"
          onPress={() => {
            Alert.alert('Confirmação', 'Salvar projeto ?', [
              {
                text: 'Cancelar',
                onPress: () => {},
                style: 'cancel',
              },
              {
                text: 'Salvar',
                onPress: () => {
                  HandleAddRepository();
                },
              },
            ]);
          }}
        />
      </Appbar.Header>
      <ScrollView style={{height: '80%'}}>
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
              <Button
                onPress={() => {
                  setIluminacao({Contador: 1, valorT: 0});
                }}>
                Limpar
              </Button>
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
              <Button
                onPress={() => {
                  setParede({Contador: 1, valorT: 0});
                }}>
                Limpar
              </Button>
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
              <Button
                onPress={() => {
                  setTeto({Contador: 1, valorT: 0});
                }}>
                Limpar
              </Button>
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
              <Button
                onPress={() => {
                  setEquipamento({Contador: 1, valorT: 0});
                }}>
                Limpar
              </Button>
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
              <Button
                onPress={() => {
                  setPessoa({Contador: 1, valorT: 0});
                }}>
                Limpar
              </Button>
            </Card.Actions>
          </Card>
        </View>
        <Button
          onPress={() => {
            Alert.alert(`Resultado é ${resultado.toFixed(2)}`);
          }}>
          Converter BTU
        </Button>
        <Button
          onPress={() => {
            console.log(typeof Iluminacao);
          }}>
          Teste
        </Button>
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
