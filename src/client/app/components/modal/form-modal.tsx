import { useContext, type FunctionComponent } from 'react';
import { type CardServiceFormInputProps } from '../../types/form.ts';
import { type CardCategoryProps } from '../../types/card/card-category.ts';
import { type ShowModalProps } from '../../types/modal.ts';
import Modal from 'react-bootstrap/Modal';
import { ModalContext } from '../../store/modal-context.tsx';
import { DetailsContext } from '../../store/details-context.tsx';

const ShowModal: FunctionComponent<ShowModalProps> = ({
  heading,
  form: FormComponent,
  formId,
  show,
  catgeoryData,
  categories,
  service,
}: ShowModalProps) => {
  const { setShowModal, setIsEditModal, setIsAuthModal } =
    useContext(ModalContext);
  const { setDetails } = useContext(DetailsContext);

  const handleClose = () => {
    setIsEditModal(false);
    setShowModal(false);
    setIsAuthModal(false);
    setDetails([]);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        role='modal'
        contentClassName='modal-content-container'
      >
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormComponent
            formId={formId as string}
            categories={categories as string[]}
            service={service as CardServiceFormInputProps}
            catgeoryData={catgeoryData as CardCategoryProps}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShowModal;
