import { IStore, IAction, IInspection } from './types';

const cachedInspections: any = localStorage.getItem('inspections') || '[]';

const parsedCachedInspections: Array<IInspection> = JSON.parse(cachedInspections);

export const initialState: IStore = {
  inspections: parsedCachedInspections ? parsedCachedInspections : [],
  registerInspection(keyword?: string) {
    console.log(keyword);
  },
  setInspections(inspections?: any) {
    console.log(inspections);
  }
};

export function reducer(store: IStore, action: IAction) {
  const { type, payload } = action;
  const { inspections } = store;

  switch (type) {
    case 'REGISTER_INSPECTION':
      const updatedValue = [...inspections, payload]

      localStorage.setItem('inspections', JSON.stringify(updatedValue))

      return {
        ...store,
        inspections: updatedValue
      }

    case 'SET_INSPECTIONS':
      return {
        ...store, 
        inspections: payload
      }

    default:
      throw new Error(`No case for type: ${type}`);
  }
}
