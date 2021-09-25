import React, { createContext, useState } from "react";

export const TesteContext = createContext({});
export const Provider =  ({children}) => {
  const [dados,setDados] = useState({})
return (
  <TesteContext.Provider value={{dados,setDados}} >
    {children}
  </TesteContext.Provider>
)
}