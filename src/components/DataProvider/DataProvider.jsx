/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useReducer } from "react";
import { initialState } from "../../utility/reducer";
import {reducer} from "../../utility/reducer";
export let DataContext = createContext();
export let DataProvider = ({ children, reducer, initialState }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};

