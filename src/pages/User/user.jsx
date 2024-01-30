import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/header.jsx";
import { getUserInfo } from "../../reducer/userSlice.jsx";

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <p>
          Имя: {user.login}
        </p>
        <p>
          ХП: {user.hp}
        </p>
        <p>
          Энергия: {user.energy}
        </p>
        <p>
          Кошелек: {user.wallet}
        </p>
        <p>
          Инвентарь: {JSON.stringify(user.inventory)}
        </p>
      </div>
      <div>
        <button onClick={handleLogout}>Выйти</button>
      </div>
    </div>
  );
};

export default User;
