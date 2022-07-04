import React, { useState, createContext } from "react";

export const TeamsContext = createContext();

export const TeamsContextProvider = (props) => {
  const [pslTeams, setTeams] = useState([]);

  const addTeam = (pslTeam) => {
    setTeams([...pslTeams, pslTeam]);
  };

  return (
    <TeamsContext.Provider value={{ pslTeams, setTeams, addTeam }}>
      {props.children}
    </TeamsContext.Provider>
  );
};
