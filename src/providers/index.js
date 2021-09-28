/* eslint-disable prettier/prettier */
import React, {createContext, useState} from 'react';

export const TesteContext = createContext({});

export const Provider = ({children}) => {
  const [parede, setParede] = useState({Contador:1,valorT:0});
  const [teto, setTeto] = useState({valorT:0});
  const [equipamento, setEquipamento] = useState({valorT:0});
  const [iluminacao, setIluminacao] = useState({valorT:0});
  const [pessoa, setPessoa] = useState({valorT:0});

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
      }}>
      {children}
    </TesteContext.Provider>
  );
};
