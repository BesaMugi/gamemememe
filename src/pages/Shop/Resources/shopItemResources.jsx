import React from 'react';
import styles from "../shop.module.scss"

const ShopItemResources = ({ resource, onSell }) => {
  const { name, count, price } = resource;

  const isDisabled = count === 0 || price === 0;

  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>Количество: {count}</p>
      <p>Цена: {price}</p>
      <button onClick={() => onSell(name)} disabled={isDisabled}>Продать</button>
    </div>
  );
};

export default ShopItemResources;
