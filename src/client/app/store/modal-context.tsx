import { createContext, useState, type ReactNode } from 'react';
import { ModalContextProps } from '../types/context/modal';

const ModalContext = createContext<ModalContextProps>({
  showModal: false,
  setShowModal: () => {},
  isEditModal: false,
  setIsEditModal: () => {},
  isAuthModal: false,
  setIsAuthModal: () => {},
  isFormCompleted: false,
  setIsFormCompleted: () => {},
});

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isAuthModal, setIsAuthModal] = useState(false);
  const [isFormCompleted, setIsFormCompleted] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        isEditModal,
        setIsEditModal,
        isAuthModal,
        setIsAuthModal,
        isFormCompleted,
        setIsFormCompleted,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
