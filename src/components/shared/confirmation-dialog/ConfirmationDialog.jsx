import React from "react";
import Modal from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background overlay
  },
  content: {
    width: "25%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #ccc",
    background: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
  },
  title: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#373231",
    borderBottom: "1px solid #ccc",
    paddingBottom: "10px",
  },
  confirmationMessage: {
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "right",
    marginTop: "10px",
  },
  button: {
    cursor: "pointer",
    width: "90px",
    padding: "10px 20px",
    margin: "0 4px",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#0A4CB9",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    color: "#373231",
  },
};

Modal.setAppElement("#root");

function ConfirmationDialog({ isOpen, onRequestClose, onConfirm }) {
  let subtitle;

  function handleConfirm() {
    if (onConfirm) {
      onConfirm();
    }
    closeModal();
  }

  function closeModal() {
    if (onRequestClose) {
      onRequestClose();
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Confirmation Modal"
    >
      <h2
        ref={(_subtitle) => (subtitle = _subtitle)}
        style={customStyles.title}
      >
        Confirm Logout
      </h2>
      <p style={customStyles.confirmationMessage}>
        Are you sure you want to logout?
      </p>
      <div style={customStyles.buttonContainer}>
        <button
          onClick={handleConfirm}
          style={{ ...customStyles.button, ...customStyles.confirmButton }}
        >
          Yes
        </button>
        <button
          onClick={closeModal}
          style={{ ...customStyles.button, ...customStyles.cancelButton }}
        >
          No
        </button>
      </div>
    </Modal>
  );
}

export default ConfirmationDialog;
