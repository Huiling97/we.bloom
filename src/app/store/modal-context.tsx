import {
  createContext,
  useState,
  Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';

type ModalContextProps = {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isEditModal: boolean;
  setIsEditModal: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextProps>({
  showModal: false,
  setShowModal: () => {},
  isEditModal: false,
  setIsEditModal: () => {},
});

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{ showModal, setShowModal, isEditModal, setIsEditModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
