// import React from "react";
// import { useState } from "react";
// import styles from "./resource.module.scss";

// const ResourceTree = () => {
//   const [countTree, setCountTree] = useState(0);
//   const [countStone, setCountStone] = useState(0);

//   const formatNumber = (value) => {
//     const suffixes = ["", "k", "M", "B", "T", "Q", "Qu", "S", "Se", "O", "N", "D"];
//     let suffixIndex = 0;

//     while (value >= 1000 && suffixIndex < suffixes.length - 1) {
//       value /= 1000;
//       suffixIndex++;
//     }

//     return value.toFixed(1).replace(/\.0$/, "") + suffixes[suffixIndex];
//   };

//   const handleClickTree = () => {
//     setCountTree(countTree + 1);
//   };
//   const handleClickStone = () => {
//     setCountStone(countStone + 1);
//   };

//   return (
//     <>
//       <div className={styles.cards}>
//         <div>
//           <div className={styles.card}>
//             <p>Дерево: {formatNumber(countTree)}</p>
//             <button onClick={handleClickTree}>добыть</button>
//           </div>
//         </div>
//         <div>
//           <div className={styles.card}>
//             <p>Камень: {formatNumber(countStone)}</p>
//             <button onClick={handleClickStone}>добыть</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ResourceTree;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources, addResource } from "../../reducer/resourceSlice.jsx";
import styles from "./resource.module.scss";
import Header from "../../components/Header/header.jsx";

const ResourceTree = () => {
  const dispatch = useDispatch();
  const { resources, loading, error } = useSelector((state) => state.resources);

  const [loadingGrass, setLoadingGrass] = useState(false);
  const [loadingFlint, setLoadingFlint] = useState(false);
  const [loadingTree, setLoadingTree] = useState(false);
  const [loadingStone, setLoadingStone] = useState(false);

  const grassCount =
    resources.find((resource) => resource.name === "Трава")?.count || 0;
  const flintCount =
    resources.find((resource) => resource.name === "Кремень")?.count || 0;

  const canHarvest = grassCount >= 25 && flintCount >= 25;
  // const canHarvestStone = flintCount >= 25;

  const handleClickGrass = async () => {
    try {
      setLoadingGrass(true);
      await dispatch(addResource("Трава"));
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingGrass(false);
    }
  };

  const handleClickFlint = async () => {
    try {
      setLoadingFlint(true);
      await dispatch(addResource("Кремень"));
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingFlint(false);
    }
  };

  const handleClickTree = async () => {
    try {
      setLoadingTree(true);
      await dispatch(addResource("Дерево"));
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingTree(false);
    }
  };

  const handleClickStone = async () => {
    try {
      setLoadingStone(true);
      await dispatch(addResource("Камень"));
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingStone(false);
    }
  };

  useEffect(() => {
    dispatch(fetchResources());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <p className={styles.header_resource}>
        <Header />
      </p>
        {error && <p>Error: {error}</p>}
      <div className={styles.cards}>
        <div className={styles.card}>
          <p>Трава: {grassCount}</p>
          <button onClick={handleClickGrass} disabled={loadingGrass}>
            {loadingGrass ? "Сбор..." : "Собрать"}
          </button>
        </div>
        <div className={styles.card}>
          <p>Кремень: {flintCount}</p>
          <button onClick={handleClickFlint} disabled={loadingFlint}>
            {loadingFlint ? "Сбор..." : "Собрать"}
          </button>
        </div>
        {canHarvest && (
          <div>
            <div className={styles.card}>
              <p>
                Дерево:{" "}
                {resources.find((resource) => resource.name === "Дерево")
                  ?.count || 0}
              </p>
              <button onClick={handleClickTree} disabled={loadingTree}>
                {loadingTree ? "Сбор..." : "Добыть"}
              </button>
            </div>
            <div className={styles.card}>
              <p>
                Камень:{" "}
                {resources.find((resource) => resource.name === "Камень")
                  ?.count || 0}
              </p>
              <button onClick={handleClickStone} disabled={loadingStone}>
                {loadingStone ? "Сбор..." : "Добыть"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceTree;
