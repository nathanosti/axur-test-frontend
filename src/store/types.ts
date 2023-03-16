import { ReactNode } from 'react';

export interface IInspection {
  id: string | undefined;
  keyword: string;
  status?: 'active' | 'done' | undefined;
  urls?: string[];
}
export interface IStore {
  inspections: any;
  registerInspection: (keyword: string) => any;
  setInspections: (inspections?: any) => any;
}

export interface IStoreProvider {
  children?: ReactNode;
}

export interface IAction {
  type: 'REGISTER_INSPECTION' | 'SET_INSPECTIONS';
  payload?: any;
}
