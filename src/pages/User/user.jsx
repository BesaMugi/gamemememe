import React, { useEffect } from "react";
import Header from "../../components/Header/header.jsx";
// import { userGet } from "../../reducer/applicationSlice.jsx";
// import { useDispatch, useSelector } from "react-redux";

const User = () => {
  // const dispatch = useDispatch();
  // const { token, user, loading, error } = useSelector((state) => state.application);

  // useEffect(() => {
  //   if (token) {
  //     dispatch(userGet());
  //   }
  // }, [dispatch, token]);

  // if (!token) {
  //   return <p>No token available</p>;
  // }

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error}</p>;
  // }

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        Игрок
        {/* Имя: {user ? user.login : "Нет данных"}
        ХП: {user ? user.hp : "Нет данных"}
        Энергия: {user ? user.energy : "Нет данных"}
        Кошелек: {user ? user.wallet : "Нет данных"}
        Инвентарь: {user ? user.inventory : "Нет данных"} */}
      </div>
      <div>
        <p>Выйти</p>
      </div>
    </div>
  );
};

export default User;
