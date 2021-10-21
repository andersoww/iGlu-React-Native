import React from 'react';

import {Container, Name, Description, Stats, Stat, StatCount} from './styles';

export default function Repository({data, onPress}) {
  return (
    <Container onPress={onPress}>
      <Name>Nome do Projeto: {data.nome}</Name>
      <Name>Carga Térmica Total: {data.btu} BTU/h</Name>
      <Name>Carga Térmica Total: {data.tr} TR</Name>
    </Container>
  );
}
