import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "../LoginForm";
import { useIsShowModal } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { setModalClose, setModalShow } from "../../redux/actionCreators";

const Login = () => {
  const isShowModal = useIsShowModal();
  const dispatch = useDispatch();

  const toggleModal = () => {
    isShowModal ? dispatch(setModalClose()) : dispatch(setModalShow());
  };

  return (
    <div>
      <button className="btn btn-success" type="button" onClick={toggleModal}>
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
