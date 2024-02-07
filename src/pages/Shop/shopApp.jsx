// ShopApp.jsx
import React, { useState } from "react";
import Header from "../../components/Header/header.jsx";
import styles from "./shop.module.scss";
import ShopModal from "./shopModal.jsx";
import { useSelector } from "react-redux";
import Shop from "./shop.jsx";

const ShopApp = () => {
  const user = useSelector((state) => state.users.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      <div className={styles.sidebar}>
        {user && (
          <h1 className={styles.wallet}>
            Кошелек: {user.wallet} $
          </h1>
        )}
        <button className={styles.menuItem} onClick={handleModalToggle}>
          <p className={styles.sidebar_button}>Выберите категорию</p>
        </button>
        <div>
          {isModalOpen && <ShopModal onClose={handleModalToggle} />}
        </div>
      </div>
    </div>
  );
};

export default ShopApp;
