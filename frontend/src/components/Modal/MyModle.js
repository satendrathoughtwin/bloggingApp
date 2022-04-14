import React from "react";
import Modal from "react-modal";
import "./MyModel.css";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const MyModle = ({ MainContent, ButtonIcon, ButtonContent, id, email }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <div className="myModalSpan" onClick={openModal}>
        {ButtonIcon || ButtonContent}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div>
          <MainContent id={id} email={email} />
        </div>
      </Modal>
    </div>
  );
};

export default MyModle;
