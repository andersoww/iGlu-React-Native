import React from 'react';
import {View} from 'react-native';
import {
  Appbar,
  Caption,
  IconButton,
  Subheading,
  Title,
} from 'react-native-paper';
import {App} from 'realm';

import {Container, Name, Description, Stats, Stat, StatCount} from './styles';

export default function Repository({data, onPress,style}) {
  return (
    <Container onPress={onPress} style={{backgroundColor:style}}>
      <Appbar.Header style={{backgroundColor: style, elevation: 0,borderRadius:100}}>
        <Appbar.Content title={data.nome} subtitle={`${data.cidade}, ${data.estado}`} />
      </Appbar.Header>
      <View style={{flexDirection: 'row'}}>
        <IconButton
          icon="snowflake"
          style={{backgroundColor: '#68E068', marginLeft: 10}}
        />
        <View>
          <Title style={{fontSize: 15}}>Carga Térmica</Title>
          <Caption style={{marginTop: -10}}>BTU</Caption>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -11,
            marginLeft: 140,
          }}>
          <Title style={{fontSize: 15}}>{data.btu}</Title>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <IconButton
          icon="snowflake"
          style={{backgroundColor: '#68E068', marginLeft: 10}}
        />
        <View>
          <Title style={{fontSize: 15}}>Carga Térmica</Title>
          <Caption style={{marginTop: -10}}>TR</Caption>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -11,
            marginLeft: 150,
          }}>
          <Title style={{fontSize: 15}}>{data.tr}</Title>
        </View>
      </View>
      {/* 
      <Name>Nome do Projeto: {data.nome}</Name>
      <Name>Carga Térmica Total: {data.btu} BTU/h</Name>
      <Name>Carga Térmica Total: {data.tr} TR</Name> */}
    </Container>
  );
}
