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
  isFormCompleted: boolean;
  setIsFormCompleted: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<ModalContextProps>({
  showModal: false,
  setShowModal: () => {},
  isEditModal: false,
  setIsEditModal: () => {},
  isFormCompleted: false,
  setIsFormCompleted: () => {},
});

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        isEditModal,
        setIsEditModal,
        isFormCompleted,
        setIsFormCompleted,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
