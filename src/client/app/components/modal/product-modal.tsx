import { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import { ModalContext } from '../../store/modal-context';
import CardProductForm from '../card/card-product/form';

const ProductModal = () => {
  const { showModal, setShowModal } = useContext(ModalContext);

  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={closeModalHandler}
        contentClassName='modal-content-container'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardProductForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductModal;
