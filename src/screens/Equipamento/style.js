import React from 'react';
import {Button, Card, IconButton, Title} from 'react-native-paper';
import styled from 'styled-components/native';

export const Container_Home = styled.SafeAreaView`
  flex: 1;
 background-color: #FDFFFF;
`;
export const Card_Equipament = styled(Card)`
  margin-top: 10px;
  padding: 10px;
`;
export const Title_Equipament = styled(Title)`
  font-size: 24px;
  margin-bottom: 25px;
`;
export const Container_Input = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const Button_Send = styled(Button)``;
export const Button_Remove = styled(Button)``;
export const Container_List_Equipament = styled.View`
  margin-bottom: 40px;
  flex: 1;
`;
export const Container_List_Equipament_Title = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;
export const Card_List_Equipament = styled(Card)``;
