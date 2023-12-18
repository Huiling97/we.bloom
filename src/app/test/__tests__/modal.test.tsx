import { fireEvent, render, screen } from '@testing-library/react';
import { modalProps } from '../__mocks__/modal-mock';
import ShowModal from '../../components/modal';
import { ModalContext } from '../../store/modal-context';

describe('ShowModal', () => {
  const setShowModalMock = jest.fn();
  const setIsEditModalMock = jest.fn();
  const setIsFormCompletedMock = jest.fn();

  it('should render modal when `show` prop is true', () => {
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

    const modal = screen.getByRole('modal');

    expect(modal).toBeInTheDocument();
  });

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
