/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {Appbar, Button, Card, Title} from 'react-native-paper';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {TesteContext} from '../../providers';
import getRealm from '../../services/realm';

export default function ({navigation}) {
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
  const Btu =
    (pessoa.valorT +
      equipamento.valorT +
      iluminacao.valorT +
      teto.valorT +
      parede.valorT) *
    3.86;
  const Tr = Btu / 12000;
  const navegar = useNavigation();
  async function saveRepository(repository) {
    const data = {
      id: repository.uuid,
      nome: repository.nome,
      btu: repository.btu,
      tr: repository.tr,
      cidade: repository.cidade,
      estado: repository.estado,
    };
    const realm = await getRealm();
    realm.write(() => {
      realm.create('Repository', data);
    });
  }
  async function HandleAddRepository() {
    if (Iluminacao != 0 && parede.Contador > 4 && Teto != 0 && Pessoas != 0) {
      try {
        const x = {
          uuid: infoInitial.uuid,
          nome: infoInitial.Projeto,
          btu: Btu,
          tr: Tr,
          cidade: infoInitial.Cidade,
          estado: infoInitial.Estado.nome,
        };

        await saveRepository(x);
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
        'Voc?? precisa realizar todos os Calculos para salvar o Projeto',
      );
    }
  }

  return (
    <>
      <Appbar.Header style={{backgroundColor: '#B0E0E6'}}>
        <Appbar.Content title="iGlu" />
        <Appbar.Action
          icon="content-save"
          onPress={() => {
            Alert.alert('Confirma????o', 'Salvar projeto ?', [
              {
                text: 'Cancelar',
                onPress: () => {
                  console.log(infoInitial.Estado.nome);
                },
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
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Title>Carga T??rmica Atual:</Title>
        </View>
        <Card
          style={{
            padding: 10,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Card.Content>
            <Title>{Btu.toFixed(2)} Btu/h</Title>
            <Title>{Tr.toFixed(2)} TR</Title>
          </Card.Content>
        </Card>

        <View>
          <Card style={{marginBottom: 5}}>
            <Card.Title
              title="Ilumina????o"
              subtitle="Carga resultante da ilumina????o do ambiente"
            />
            <Card.Content style={{alignItems: 'center'}}>
              <Title>{Iluminacao} kcal/h</Title>
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
              subtitle="Carga resultante da condu????o das Paredes"
            />
            <Card.Content style={{alignItems: 'center'}}>
              <Title>{Parede} kcal/h</Title>
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
              subtitle="Carga resultante da condu????o do Teto"
            />
            <Card.Content style={{alignItems: 'center'}}>
              <Title>{Teto} kcal/h</Title>
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
              <Title>{Equipamento} kcal/h</Title>
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
              <Title>{Pessoas} kcal/h</Title>
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
