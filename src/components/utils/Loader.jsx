import React from "react";
import styles from "../../assets/css/Loader.module.css";

const LoadingSpinner = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.dot}></div>
    <div className={styles.dot}></div>
    <div className={styles.dot}></div>
  </div>
);

export default LoadingSpinner;
