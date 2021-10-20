import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: 30px;
`;
export const Title = styled.Text`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  padding: 0 20px;
`;
export const Form = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding: 0 20px;
  align-items: center;
  justify-content: center;
`;
export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  padding: 12px 15px;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
  background-color: #fff;

`;
export const Submit = styled.TouchableOpacity`
  background-color: #6bd4c1;
  margin-left: 10px;
  justify-content: center;
  border-radius: 4px;
  padding: 0 14px;
  
`;
export const List = styled.FlatList.attrs({
  contentContainerStyle: {paddingHorizontal: 20},
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;
