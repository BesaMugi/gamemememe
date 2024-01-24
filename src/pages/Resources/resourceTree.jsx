import React from "react";
import { useState } from "react";
import styles from "./resource.module.scss";

const ResourceTree = () => {
  const [countTree, setCountTree] = useState(0);
  const [countStone, setCountStone] = useState(0);

  const formatNumber = (value) => {
    const suffixes = ["", "k", "M", "B", "T", "Q", "Qu", "S", "Se", "O", "N", "D"];
    let suffixIndex = 0;

    while (value >= 1000 && suffixIndex < suffixes.length - 1) {
      value /= 1000;
      suffixIndex++;
    }

    return value.toFixed(1).replace(/\.0$/, "") + suffixes[suffixIndex];
  };

  const handleClickTree = () => {
    setCountTree(countTree + 1);
  };
  const handleClickStone = () => {
    setCountStone(countStone + 1);
  };

  return (
    <>
      <div className={styles.cards}>
        <div>
          <div className={styles.card}>
            <p>Дерево: {formatNumber(countTree)}</p>
            <button onClick={handleClickTree}>добыть</button>
          </div>
        </div>
        <div>
          <div className={styles.card}>
            <p>Камень: {formatNumber(countStone)}</p>
            <button onClick={handleClickStone}>добыть</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResourceTree;
