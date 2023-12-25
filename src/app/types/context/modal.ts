import { Dispatch, type SetStateAction } from 'react';

export interface ModalContextProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isEditModal: boolean;
  setIsEditModal: Dispatch<SetStateAction<boolean>>;
  isFormCompleted: boolean;
  setIsFormCompleted: Dispatch<SetStateAction<boolean>>;
}
