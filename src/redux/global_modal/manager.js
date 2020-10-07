import React from 'react';
import { useSelector } from 'react-redux';
import WelcomeModal from '../../views/Pages/PrivatePages/modals/Welcome';
import MyAvailabilityModal from '../../views/Pages/PrivatePages/modals/MyAvailabilityModal';
import Modal from 'react-bootstrap/Modal';
import AvatarModal from '../../views/Pages/PrivatePages/modals/AvatarModal';

const ModalManager = props => {
    /**
     * * @{ get current modal }
     */
    const currentModal = useSelector(state => state.modals);

    let renderedModal;
    if (currentModal) {
        const ModalComponent = modalLookup[currentModal.modalType];
        renderedModal = <ModalComponent {...currentModal.modalProps} />;

        if (currentModal.modalProps !== undefined) {
            return (
                <Modal show={currentModal.modalProps.open} dialogClassName='modal-dialog-centered'>
                    {renderedModal}
                </Modal>
            );
        } else {
            return (
                <Modal show={false} dialogClassName='modal-dialog-centered'>
                    {renderedModal}
                </Modal>
            );
        }
    } else {
        return (
            <Modal show={false} dialogClassName='modal-dialog-centered'>
                {renderedModal}
            </Modal>
        );
    }
};

const modalLookup = {
    WelcomeModal,
    MyAvailabilityModal,
    AvatarModal
};

export default ModalManager;
