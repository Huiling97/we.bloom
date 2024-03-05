import { createContext, useReducer, type ReactNode } from 'react';
import {
  type DetailsContextProps,
  type DetailsActionProps,
} from '../types/context/details.ts';
import { type CardDetailsProps } from '../types/components/card/card-service-details.ts';

const DetailsContext = createContext<DetailsContextProps>({
  details: [],
  setDetails: () => {},
  addDetails: () => {},
  deleteDetails: () => {},
});

const detailsReducer = (
  state: CardDetailsProps[],
  action: DetailsActionProps
): CardDetailsProps[] => {
  switch (action.type) {
    case 'SET':
      return action.payload as CardDetailsProps[];
    case 'ADD': {
      const { index, ...otherData } = action.payload as CardDetailsProps;

      const existingDetailIndex = state.findIndex(
        (detail) => detail.index === index
      );

      if (existingDetailIndex !== -1) {
        const updatedState = state.map((detail) =>
          detail.index === index ? { ...detail, ...otherData } : detail
        );
        return updatedState;
      } else {
        return [...state, action.payload] as CardDetailsProps[];
      }
    }
    case 'DELETE':
      return state.filter((detail) => detail.index !== action.payload);
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

  const deleteDetails = (index: number) => {
    dispatch({ type: 'DELETE', payload: index });
  };

  const value = {
    details: detailsState,
    setDetails: setDetails,
    addDetails: addDetails,
    deleteDetails: deleteDetails,
  };

  return (
    <DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>
  );
};

export { DetailsContext, DetailsContextProvider };
