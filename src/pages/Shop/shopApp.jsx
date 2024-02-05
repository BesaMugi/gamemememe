import React, { useEffect } from "react";
import Header from "../../components/Header/header.jsx";
import styles from "./shop.module.scss"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "../../reducer/resourceSlice.jsx";
import { getUserInfo } from "../../reducer/userSlice.jsx";
import Tools from "./Tools/tools.jsx";
import Weapons from "./Weapons/weapons.jsx";
import Workers from "./Workers/workers.jsx";
import Shop from "./shop.jsx";

const ShopApp = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchResources());
      await dispatch(getUserInfo());
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      {user && (
        <div className={styles.wallet}>
          Кошелек: {user.wallet} $
        </div>
      )}
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