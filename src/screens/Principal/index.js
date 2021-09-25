import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import { TesteContext } from '../../providers';

export default function () {
  const {dados,setDados} = useContext(TesteContext)
  
  const navegar = useNavigation();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text></Text>
      <View style={styles.bottom}>
        <Appbar
          style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
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
              console.log(dados)
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
            icon="white-balance-sunny"
            size={30}
            onPress={() => {
              navegar.navigate('insolacao');
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
