import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignUp } from "../../reducer/applicationSlice";
import { Link } from "react-router-dom";

const registration = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [txt, setTxt] = useState("");

  const dispatch = useDispatch();

  const handleSetName = (e) => {
    setLogin(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    dispatch(authSignUp({ login, password }));
    setTxt("Вы успешно зарегистрировались");
  };

  return (
    <form onSubmit={handleSignUp}>
      <h2>{txt}</h2>
      <input
        type="text"
        placeholder="login"
        value={login}
        onChange={handleSetName}
      />
      <br />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={handleSetPassword}
      />
      <br />
      <button type="submit">
        Зарегистрироваться
      </button>
      <button>
        <Link to={"/login"}>
          Войти
        </Link>
      </button>
    </form>
  );
};

export default registration;
