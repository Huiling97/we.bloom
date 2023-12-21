import { createContext, useReducer, type ReactNode } from 'react';
import {
  type DetailsContextProps,
  type DetailsActionProps,
  type DetailsAddPayload,
} from '../types/context/details.ts';
import { type CardDetailsProps, type DetailsProps } from '../types/card';

const DetailsContext = createContext<DetailsContextProps>({
  details: {},
  addDetails: () => {},
});

const detailsReducer = (state: DetailsProps, action: DetailsActionProps) => {
  switch (action.type) {
    case 'ADD':
      const { id, detailsData } = action.payload as DetailsAddPayload;
      console.log('state[id]', state[id]);
      if (state[id]) {
        return { ...state, [id]: [...state[id], detailsData] };
      }
      return { ...state, [id]: [detailsData] };
    default:
      return state;
  }
};

const DetailsContextProvider = ({ children }: { children: ReactNode }) => {
  const [detailsState, dispatch] = useReducer(detailsReducer, {});

  const addDetails = (id: string, detailsData: CardDetailsProps) => {
    dispatch({ type: 'ADD', payload: { id, detailsData } });
  };

  const value = {
    details: detailsState,
    addDetails: addDetails,
  };

  return (
    <DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>
  );
};

export { DetailsContext, DetailsContextProvider };
