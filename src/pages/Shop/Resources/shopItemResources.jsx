import React from 'react';

const ShopItemResources = ({ resource, onSell }) => {
  const { name, count, price } = resource;

  return (
    <>
      <h3>{name}</h3>
      <p>Количество: {count}</p>
      <p>Цена: {price}</p>
      <button onClick={() => onSell(name)}>Продать</button>
    </>
  );
};

export default ShopItemResources;
