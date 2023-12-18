import { fireEvent, render, screen } from '@testing-library/react';
import { modalProps } from '../__mocks__/modal-mock';
import ShowModal from '../../components/modal';
import { ModalContext } from '../../store/modal-context';

describe('ShowModal', () => {
  const setShowModalMock = jest.fn();
  const setIsEditModalMock = jest.fn();
  const setIsFormCompletedMock = jest.fn();

  describe('Categories', () => {
    describe('Hide modal', () => {
      it('should not render modal when `show` prop is false', () => {
        render(
          <ModalContext.Provider
            value={{
              showModal: false,
              setShowModal: setShowModalMock,
              isEditModal: false,
              setIsEditModal: setIsEditModalMock,
              isFormCompleted: true,
              setIsFormCompleted: setIsFormCompletedMock,
            }}
          >
            <ShowModal {...modalProps} show={false} />
          </ModalContext.Provider>
        );

        const modal = screen.queryByRole('modal');

        expect(modal).not.toBeInTheDocument();
      });

      it('should close the modal when close button is clicked', () => {
        render(
          <ModalContext.Provider
            value={{
              showModal: false,
              setShowModal: setShowModalMock,
              isEditModal: false,
              setIsEditModal: setIsEditModalMock,
              isFormCompleted: true,
              setIsFormCompleted: setIsFormCompletedMock,
            }}
          >
            <ShowModal {...modalProps} show={true} />
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
              isFormCompleted: true,
              setIsFormCompleted: setIsFormCompletedMock,
            }}
          >
            <ShowModal {...modalProps} show={true} isEditing={false} />
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
              isEditModal: false,
              setIsEditModal: setIsEditModalMock,
              isFormCompleted: true,
              setIsFormCompleted: setIsFormCompletedMock,
            }}
          >
            <ShowModal {...modalProps} show={true} isEditing={true} />
          </ModalContext.Provider>
        );

        const modal = screen.getByRole('modal');
        const editModalTitle = screen.getByText('Mock Edit Form Component');

        expect(modal).toBeInTheDocument();
        expect(editModalTitle).toBeInTheDocument();
      });
    });
  });
});
