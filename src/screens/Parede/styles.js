/* eslint-disable prettier/prettier */
import { Card, Title } from 'react-native-paper';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 10px;
  flex: 1;
`;

export const Card_Parede = styled(Card)`
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px
`;

export const Title_Parede = styled(Title)`
  font-size: 24px;
  margin-bottom: 25px;
`;
