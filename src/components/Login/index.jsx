import React, {useState} from 'react';
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from "../LoginForm";

const Login = () => {
    const [isShowModal, setIsShowModal] = useState(false);

    const toggleModal = () => {
        setIsShowModal(!isShowModal)
    }

    return (
        <div>
            <button
                className="btn btn-success"
                type="button"
                onClick={toggleModal}
            >
                Login
            </button>
            <Modal isOpen={isShowModal} toggle={toggleModal}>
                <ModalBody>
                    <LoginForm />
                </ModalBody>
            </Modal>
        </div>
    );
};

export default Login;