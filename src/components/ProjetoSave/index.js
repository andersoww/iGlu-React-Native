import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Container, Name, Description, Stats, Stat, StatCount} from './styles';

export default function Repository({data,onPress}) {
  return (
    <Container onPress={onPress}>
      <Name>Nome do Projeto: {data.nome}</Name>
      <Name>Carga Térmica Total: {data.cargaTotal}</Name>
      
    </Container>
  );
}
