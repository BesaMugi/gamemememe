import React from "react";
import ShopApp from "../shopApp";

const Workers = () => {
  return (
    <div>
      <ShopApp />
      <h1>Работяги</h1>

      <div>
        <p>
          Собиратель Ягод
          <button>Нанять</button>
        </p>
        <p>
          Травник
          <button>Нанять</button>
        </p>
        <p>
          Искатель кремня
          <button>Нанять</button>
        </p>
        <p>
          Дровосек #Дуб
          <button>Нанять</button>
        </p>
        <p>
          Каменьщик
          <button>Нанять</button>
        </p>
        <p>
          Дровосек #Береза
          <button>Нанять</button>
        </p>
      </div>
    </div>
  );
};

export default Workers;