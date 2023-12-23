import { createContext, useReducer, type ReactNode } from 'react';
import {
  type DetailsContextProps,
  type DetailsActionProps,
} from '../types/context/details.ts';
import { type CardDetailsProps } from '../types/card';

const DetailsContext = createContext<DetailsContextProps>({
  details: [],
  setDetails: () => {},
  addDetails: () => {},
});

const detailsReducer = (
  state: CardDetailsProps[],
  action: DetailsActionProps
): CardDetailsProps[] => {
  switch (action.type) {
    case 'SET':
      return action.payload as CardDetailsProps[];
    case 'ADD':
      return [...state, action.payload] as CardDetailsProps[];
    default:
      return state;
  }
};

const DetailsContextProvider = ({ children }: { children: ReactNode }) => {
  const [detailsState, dispatch] = useReducer(detailsReducer, []);

  const setDetails = (allDetailsData: CardDetailsProps[]) => {
    dispatch({ type: 'SET', payload: allDetailsData });
  };

  const addDetails = (detailsData: CardDetailsProps) => {
    dispatch({ type: 'ADD', payload: detailsData });
  };

  const value = {
    details: detailsState,
    setDetails: setDetails,
    addDetails: addDetails,
  };

  return (
    <DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>
  );
};

export { DetailsContext, DetailsContextProvider };
