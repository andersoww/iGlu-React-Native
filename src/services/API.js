import axios from 'axios';

export const Api_bloco = axios.create({
  baseURL: 'https://iglu-back.herokuapp.com/bloco',
});

export const listar_telha = axios.create({
  baseURL: 'https://iglu-back.herokuapp.com/telha',
});

export const listar_equipamentos = axios.create({
  baseURL: 'https://iglu-back.herokuapp.com/equipamentos',
});

export const listar_forro = axios.create({
  baseURL: 'https://iglu-back.herokuapp.com/forro',
});

export const calcular_pessoas = axios.create({
  baseURL: 'https://iglu-back.herokuapp.com/calculo/pessoas',
});

export const calcular_equipamentos = axios.create({
  baseURL: 'https://iglu-back.herokuapp.com/calculo/equipamentos',
});
export const calculo_iluminacao = axios.create({
  baseURL: 'https://iglu-back.herokuapp.com/calculo/iluminacao',
});

export const calcular_teto = axios.create({
  baseURL: 'https://iglu-back.herokuapp.com/calculo/teto',
});

export const calcular_parede = axios.create({
  baseURL: 'https://iglu-back.herokuapp.com/calculo/parede',
});
