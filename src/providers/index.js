/* eslint-disable prettier/prettier */
import React, {createContext, useState} from 'react';

export const TesteContext = createContext({});
/*Variaveis Globais 
  -Temperatura Interno e Externo
  -Latitude 
  -Refatorar o código pqp
  */
export const Provider = ({children}) => {
  const [parede, setParede] = useState({Contador: 0, valorT: 0});
  const [teto, setTeto] = useState({valorT: 0});
  const [equipamento, setEquipamento] = useState({valorT: 0});
  const [iluminacao, setIluminacao] = useState({valorT: 0});
  const [pessoa, setPessoa] = useState({valorT: 0});
  const [infoInitial, setInfoInitial] = useState({});
  const [refresh, setRefresh] = useState(false);

  return (
    <TesteContext.Provider
      value={{
        parede,
        setParede,
        teto,
        setTeto,
        equipamento,
        setEquipamento,
        iluminacao,
        setIluminacao,
        pessoa,
        setPessoa,
        infoInitial,
        setInfoInitial,
        refresh,
        setRefresh,
      }}>
      {children}
    </TesteContext.Provider>
  );
};
