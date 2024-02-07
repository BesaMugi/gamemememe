import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./header.module.scss";

const Resource = () => {
  const location = useLocation();

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  return (
    <div className={styles.header_resource}>
      <Link to={"/profile"} className={isActive("/profile") ? styles.active : ""}>
        <p>Профиль</p>
      </Link>
      <Link to={"/resources"} className={isActive("/resources") ? styles.active : ""}>
        <p>Ресурсы</p>
      </Link>
      <Link to={"/materials"} className={isActive("/materials") ? styles.active : ""}>
        <p>Материалы</p>
      </Link>
      <Link to={"/games"} className={isActive("/games") ? styles.active : ""}>
        <p>Игры</p>
      </Link>
      <Link to={"/dungeons"} className={isActive("/dungeons") ? styles.active : ""}>
        <p>Данжи</p>
      </Link>
      <Link to={"/shop"} className={isActive("/shop") ? styles.active : ""}>
        <p>Рынок</p>
      </Link>
      <Link to={"/upgrades"} className={isActive("/upgrades") ? styles.active : ""}>
        <p>Улучшения</p>
      </Link>
    </div>
  );
}

export default Resource;