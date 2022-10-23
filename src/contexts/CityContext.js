import React, { createContext, useReducer, useEffect } from "react";
import { cityReducer } from "../reducers/cityReducer";
import { CITIES } from "../static/Cities";

export const CityContext = createContext();

const CityContextProvider = (props) => {
  const [cities, dispatch] = useReducer(cityReducer, [], () => {
    const localData = localStorage.getItem("cities");
    return localData ? JSON.parse(localData) : CITIES;
  });

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);
  return (
    <CityContext.Provider value={{ cities, dispatch }}>
      {props.children}
    </CityContext.Provider>
  );
};

export default CityContextProvider;
