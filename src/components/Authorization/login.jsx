import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authSignIn } from "../../reducer/applicationSlice";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const error = useSelector((state) => state.application.error);
  const token = useSelector((state) => state.application.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSignIn = (e) => {
    e.preventDefault();
    dispatch(authSignIn({ login, password }));
  };

  const hadleSetLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <div>
        <h1>Авторизация</h1>
        {error && <div>{error}</div>}
        <form onSubmit={handleSignIn}>
          <div>
            <input
              type="text"
              onChange={hadleSetLogin}
              value={login}
              placeholder="Введите логин"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={handleSetPassword}
              value={password}
              placeholder="Введите пароль"
            />
          </div>
          <div>
            <button type="submit">Войти</button>
          </div>
        </form>
        <div>
          <Link to="/">Вернуться на главную</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
