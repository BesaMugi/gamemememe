// ShopModal.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./shop.module.scss";

const ShopModal = ({ onClose }) => {
  return (
    <div className={styles.modal}>
      <p className={styles.modalItem} onClick={onClose}>
        <Link to="/shop">Рынок</Link>
      </p>
      <p className={styles.modalItem} onClick={onClose}>
        <Link to="/shop_resources">Ресурсы</Link>
      </p>
      <p className={styles.modalItem} onClick={onClose}>
        <Link to="/tools">Инструменты</Link>
      </p>
      <p className={styles.modalItem} onClick={onClose}>
        <Link to="/weapons">Оружие</Link>
      </p>
      <p className={styles.modalItem} onClick={onClose}>
        <Link to="/workers">Работяги</Link>
      </p>
    </div>
  );
};

export default ShopModal;
