import axios from 'axios';

export const Api_bloco = axios.create({
  baseURL: 'https://teste-testa.herokuapp.com/bloco',
});
export const calcular_parede = axios.create({
  baseURL: 'https://teste-testa.herokuapp.com/calculo/parede',
});
