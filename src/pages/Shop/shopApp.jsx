import React from "react";
import Header from "../../components/Header/header.jsx";
import Tools from "./Tools/tools.jsx";
import Weapons from "./Weapons/weapons.jsx";
import Workers from "./Workers/workers.jsx";
import Shop from "./shop.jsx";
import styles from "./shop.module.scss"
import { Link } from "react-router-dom";

const ShopApp = () => {
  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      <div className={styles.sidebar}>
      <Link to="/shop_resources" className={styles.menuItem}>
          Ресурсы
        </Link>
        <Link to="/shop" className={styles.menuItem}>
          Рынок
        </Link>
        <Link to="/tools" className={styles.menuItem}>
          Инструменты
        </Link>
        <Link to="/weapons" className={styles.menuItem}>
          Оружие
        </Link>
        <Link to="/workers" className={styles.menuItem}>
          Работяги
        </Link>
      </div>
    </div>
  );
};

export default ShopApp;