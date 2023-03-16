import React, { createContext, useReducer } from 'react';
import { reducer, initialState } from './reducer';

import { IInspection, IStoreProvider } from './types';

import { api } from '../services/api';

export const StoreContext = createContext(initialState);

export function StoreProvider(props: IStoreProvider) {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, initialState);

  async function registerInspection(keyword: string) {
    try {
      const { data } = await api.post('/crawl', { keyword });
      dispatch({
        type: 'REGISTER_INSPECTION',
        payload: { id: data.id, status: undefined, keyword }
      });
      console.log({ data });
    } catch (err) {
      console.log(JSON.stringify(err));
      throw new Error(err);
    }
  }

  function setInspections(inspections: IInspection[]) {
    try {
      dispatch({ type: 'SET_INSPECTIONS', payload: inspections });
    } catch (err) {
      console.log(JSON.stringify(err));
      throw new Error(err);
    }
  }

  const contextValues = { ...state, registerInspection, setInspections };

  return <StoreContext.Provider value={contextValues}>{children}</StoreContext.Provider>;
}
