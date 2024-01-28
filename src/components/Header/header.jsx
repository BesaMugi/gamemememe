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
      <Link to={"/"} className={isActive("/") ? styles.active : ""}>
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
      <Link to={"/shopApp"} className={isActive("/shopApp") ? styles.active : ""}>
        <p>Рынок</p>
      </Link>
      <Link to={"/upgrades"} className={isActive("/upgrades") ? styles.active : ""}>
        <p>Улучшения</p>
      </Link>
      {/* возможно просто перенести Инструменты Оружие Работяг в магазин и в инвентарь */}
      {/* <Link to={"/tools"} className={isActive("/tools") ? styles.active : ""}>
        <p>Инструменты *</p>
      </Link>
      <Link to={"/weapons"} className={isActive("/weapons") ? styles.active : ""}>
        <p>Оружия *</p>
      </Link>
      <Link to={"/workers"} className={isActive("/workers") ? styles.active : ""}>
        <p>Работяги *</p>
      </Link> */}
      {/* возможно просто перенести Инструменты Оружие Работяг в магазин и в инвентарь */}
    </div>
  );
}

export default Resource;