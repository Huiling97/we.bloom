import { fireEvent, render, screen } from '@testing-library/react';
import { formModalProps } from '../../../__mocks__/modal-mock';
import ShowModal from '../../../../components/modal/form-modal';
import { ModalContext } from '../../../../store/modal-context';

describe('ShowModal', () => {
  const setShowModalMock = jest.fn();
  const setIsEditModalMock = jest.fn();
  const setIsAuthModalMock = jest.fn();
  const setIsFormCompletedMock = jest.fn();

  describe('Hide modal', () => {
    it('should not render modal when `show` prop is false', () => {
      render(
        <ModalContext.Provider
          value={{
            showModal: false,
            setShowModal: setShowModalMock,
            isEditModal: false,
            setIsEditModal: setIsEditModalMock,
            isAuthModal: false,
            setIsAuthModal: setIsAuthModalMock,
            isFormCompleted: true,
            setIsFormCompleted: setIsFormCompletedMock,
          }}
        >
          <ShowModal {...formModalProps} show={false} />
        </ModalContext.Provider>
      );

      const modal = screen.queryByRole('modal');

      expect(modal).not.toBeInTheDocument();
    });

    it('should close the modal when close button is clicked', () => {
      render(
        <ModalContext.Provider
          value={{
            showModal: true,
            setShowModal: setShowModalMock,
            isEditModal: false,
            setIsEditModal: setIsEditModalMock,
            isAuthModal: false,
            setIsAuthModal: setIsAuthModalMock,
            isFormCompleted: true,
            setIsFormCompleted: setIsFormCompletedMock,
          }}
        >
          <ShowModal {...formModalProps} show={true} />
        </ModalContext.Provider>
      );

      const closeButton = screen.getByRole('button', { name: 'Close' });

      fireEvent.click(closeButton);

      expect(setShowModalMock).toHaveBeenCalledWith(false);
      expect(setIsEditModalMock).toHaveBeenCalledWith(false);
    });
  });

  describe('Show modal', () => {
    it('should render new modal when `show` prop is true and `isEditModal` is false', () => {
      render(
        <ModalContext.Provider
          value={{
            showModal: false,
            setShowModal: setShowModalMock,
            isEditModal: false,
            setIsEditModal: setIsEditModalMock,
            isAuthModal: false,
            setIsAuthModal: setIsAuthModalMock,
            isFormCompleted: true,
            setIsFormCompleted: setIsFormCompletedMock,
          }}
        >
          <ShowModal {...formModalProps} show={true} />
        </ModalContext.Provider>
      );

      const modal = screen.getByRole('modal');
      const newModalTitle = screen.getByText('Mock New Form Component');

      expect(modal).toBeInTheDocument();
      expect(newModalTitle).toBeInTheDocument();
    });

    it('should render edit modal when `show` prop is true and `isEditModal` is true', () => {
      render(
        <ModalContext.Provider
          value={{
            showModal: false,
            setShowModal: setShowModalMock,
            isEditModal: true,
            setIsEditModal: setIsEditModalMock,
            isAuthModal: false,
            setIsAuthModal: setIsAuthModalMock,
            isFormCompleted: true,
            setIsFormCompleted: setIsFormCompletedMock,
          }}
        >
          <ShowModal {...formModalProps} show={true} />
        </ModalContext.Provider>
      );

      const modal = screen.getByRole('modal');
      const editModalTitle = screen.getByText('Mock Edit Form Component');

      expect(modal).toBeInTheDocument();
      expect(editModalTitle).toBeInTheDocument();
    });
  });
});
