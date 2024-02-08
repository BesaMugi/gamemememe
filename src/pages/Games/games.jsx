import React from "react";
import Header from "../../components/Header/header.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Games = () => {
  const user = useSelector((state) => state.users.user);

  return (
    <div>
      <div>
        <Header />
      </div>
      <h1>Игры</h1>
      <div>
        <div>
          <Link to={"/gameSSP"}> <h3>Камень / Ножницы / Бумага:</h3> </Link>
          <p>классическая игра, объяснений не надо</p>
          <p>выигрышей: 0; проигрышей: 0; ничья: 0; выиграно денег: 0; если возможно и это все реализовать</p>
          <Link to={"/gameSSP"}> <button>играть</button> </Link>
        </div>
        <div>
          <h3>Покемоны:</h3>
          <p>Лови покемонов и продавай на рынке!</p>
          <p>(у тебя есть возможность поймать легендарного покемона и стать богатым)</p>
        </div>
        <div>
          <h3>Двери:</h3>
          <p>Есть три двери, открой свою дверь которая принесет тебе денег!</p>
          <p>(если откроешь не ту, не расстраивайся у тебя есть возможность открыть еще, но заплати сначала, ок?)</p>
        </div>
      </div>
    </div>
  );
};

export default Games;