import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View, Text} from 'react-native';
import {Card, TextInput} from 'react-native-paper';

export default function ListVidro({selectedValue, onValueChange}) {
  return (
    <Card style={{padding: 10, borderRadius: 10, marginBottom: 10}}>
      <Text>Vidro:</Text>
      <TextInput
        label="Área Total de Vidro"
        placeholder="M²"
        keyboardType="numeric"
      />

      <View
        style={{
          justifyContent: 'center',
          borderRadius: 15,
          borderWidth: 1,
          overflow: 'hidden',
          height: 50,
          backgroundColor: '#FFF',
          marginBottom: 20,
          marginTop: 10,
        }}>
        <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
          <Picker.Item label="Escolha uma orientação do Vidro...." value="" />
          <Picker.Item label="Sul" value="S" />
          <Picker.Item label="Sudeste" value="SE" />
          <Picker.Item label="Leste" value="E" />
          <Picker.Item label="Nordeste" value="NE" />
          <Picker.Item label="Norte" value="N" />
          <Picker.Item label="Noroeste" value="NO" />
          <Picker.Item label="Oeste" value="O" />
          <Picker.Item label="Sudoeste" value="SO" />
        </Picker>
      </View>
    </Card>
  );
}
