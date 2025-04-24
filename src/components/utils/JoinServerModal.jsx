import React from "react";
import styles from "./JoinServerModal.module.css";

const JoinServerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Join Server</h2>
        <p>You need to join this server to access its content.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default JoinServerModal;
