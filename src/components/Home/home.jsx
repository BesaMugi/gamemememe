import React from "react";
import { Link } from "react-router-dom";


const Home = () => {

    return (
        <div>
          
            <Link to={"/login"}>
                Войти
            </Link>
            <br />
            <br />
            <Link to={"/auth"}>
                Зарегистрироваться
            </Link>
        </div>
    );
};

export default Home