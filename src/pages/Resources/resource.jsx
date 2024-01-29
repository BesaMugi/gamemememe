//   const formatNumber = (value) => {
//     const suffixes = ["", "k", "M", "B", "T", "Q", "Qu", "S", "Se", "O", "N", "D"];
//     let suffixIndex = 0;
//     while (value >= 1000 && suffixIndex < suffixes.length - 1) {
//       value /= 1000;
//       suffixIndex++;
//     }
//     return value.toFixed(1).replace(/\.0$/, "") + suffixes[suffixIndex];
//   };
//      <p>Дерево: {formatNumber(countTree)}</p>


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources, addResource, removeResource } from "../../reducer/resourceSlice.jsx";
import styles from "./resource.module.scss";
import Header from "../../components/Header/header.jsx";
import ResourceCard from "./resourceCard.jsx";

const Resources = () => {
  const dispatch = useDispatch();
  const { resources, loading, error } = useSelector((state) => state.resources);

  const [energy, setEnergy] = useState(100);

  const handleEnergyChange = (amount) => {
    setEnergy((prevEnergy) => Math.min(103, prevEnergy + amount));  // ограничение до 103
  };

  const [loadingBerries, setLoadingBerries] = useState(false);
  const [loadingBerriesEat, setLoadingBerriesEat] = useState(false);
  const [loadingGrass, setLoadingGrass] = useState(false);
  const [loadingFlint, setLoadingFlint] = useState(false);
  const [loadingTree, setLoadingTree] = useState(false);
  const [loadingStone, setLoadingStone] = useState(false);
  const [loadingBirch, setLoadingBirch] = useState(false);
  const [loadingIron, setLoadingIron] = useState(false);
  const [loadingSand, setLoadingSand] = useState(false);
  const [loadingGravel, setLoadingGravel] = useState(false);
  const [loadingCopper, setLoadingCopper] = useState(false);
  const [loadingSequoia, setLoadingSequoia] = useState(false);

  const grassCount =
    resources.find((resource) => resource.name === "Трава")?.count || 0;
  const flintCount =
    resources.find((resource) => resource.name === "Кремень")?.count || 0;

  const canHarvest = grassCount >= 25 && flintCount >= 25;

  const handleClickBerries = async () => {
    try {
      setLoadingBerries(true);
      await dispatch(addResource("Ягоды"));
      handleEnergyChange(-1);
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingBerries(false);
    }
  };
  const handleEatBerries = async () => {
    try {
      setLoadingBerriesEat(true);
      await dispatch(removeResource("Ягоды"));
      handleEnergyChange(3);  // добавляем +3 энергии
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при съедении ягод:", error);
    } finally {
      setLoadingBerriesEat(false);
    }
  };


  const handleClickGrass = async () => {
    try {
      setLoadingGrass(true);
      await dispatch(addResource("Трава"));
      handleEnergyChange(-1);
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
      handleEnergyChange(-1);
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
      await dispatch(addResource("Дуб"));
      handleEnergyChange(-2.5);
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
      handleEnergyChange(-2.8);
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingStone(false);
    }
  };

  const handleClickBirch = async () => {
    try {
      setLoadingBirch(true);
      await dispatch(addResource("Береза"));
      handleEnergyChange(-2);
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingBirch(false);
    }
  };

  const handleClickIron = async () => {
    try {
      setLoadingIron(true);
      await dispatch(addResource("Железо"));
      handleEnergyChange(-4);
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingIron(false);
    }
  };

  const handleClickSand = async () => {
    try {
      setLoadingSand(true);
      await dispatch(addResource("Песок"));
      handleEnergyChange(-1.5);
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingSand(false);
    }
  };

  const handleClickGravel = async () => {
    try {
      setLoadingGravel(true);
      await dispatch(addResource("Гравий"));
      handleEnergyChange(-1.5);
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingGravel(false);
    }
  };

  const handleClickSequoia = async () => {
    try {
      setLoadingSequoia(true);
      await dispatch(addResource("Секвойя"));
      handleEnergyChange(-10);
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingSequoia(false);
    }
  };

  const handleClickCopper = async () => {
    try {
      setLoadingCopper(true);
      await dispatch(addResource("Медь"));
      handleEnergyChange(-4);
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingCopper(false);
    }
  };

  useEffect(() => {
    dispatch(fetchResources());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      {error && <p>Error: {error}</p>}

      <div className={styles.energy}>
        Энергия: {energy}
      </div>
      <div className={styles.cards}>
        <div className={styles.first_resource}>
          <ResourceCard
            resourceName="Ягоды"
            count={resources.find((r) => r.name === "Ягоды")?.count || 0}
            onClick={handleClickBerries}
            onEat={handleEatBerries}
            loadingEat={loadingBerriesEat}
            loading={loadingBerries}
            imagePath="/images/190034.png"
          />
          <ResourceCard
            resourceName="Трава"
            count={grassCount}
            onClick={handleClickGrass}
            loading={loadingGrass}
            imagePath="/images/190034.png"
          />
          <ResourceCard
            resourceName="Кремень"
            count={flintCount}
            onClick={handleClickFlint}
            loading={loadingFlint}
            imagePath="/images/190034.png"
          />
        </div>
        {canHarvest && (
          <div className={styles.card_harvest}>
            <ResourceCard
              resourceName="Дуб"
              count={resources.find((r) => r.name === "Дуб")?.count || 0}
              onClick={handleClickTree}
              loading={loadingTree}
              imagePath="/images/190034.png"
            />
            <ResourceCard
              resourceName="Камень"
              count={resources.find((r) => r.name === "Камень")?.count || 0}
              onClick={handleClickStone}
              loading={loadingStone}
              imagePath="/images/190034.png"
            />
            <ResourceCard
              resourceName="Береза"
              count={resources.find((r) => r.name === "Береза")?.count || 0}
              onClick={handleClickBirch}
              loading={loadingBirch}
              imagePath="/images/190034.png"
            />
            <ResourceCard
              resourceName="Железо"
              count={resources.find((r) => r.name === "Железо")?.count || 0}
              onClick={handleClickIron}
              loading={loadingIron}
              imagePath="/images/190034.png"
            />
            <ResourceCard
              resourceName="Песок"
              count={resources.find((r) => r.name === "Песок")?.count || 0}
              onClick={handleClickSand}
              loading={loadingSand}
              imagePath="/images/190034.png"
            />
            <ResourceCard
              resourceName="Гравий"
              count={resources.find((r) => r.name === "Гравий")?.count || 0}
              onClick={handleClickGravel}
              loading={loadingGravel}
              imagePath="/images/190034.png"
            />
            <ResourceCard
              resourceName="Секвойя"
              count={resources.find((r) => r.name === "Секвойя")?.count || 0}
              onClick={handleClickSequoia}
              loading={loadingSequoia}
              imagePath="/images/190034.png"
            />
            <ResourceCard
              resourceName="Медь"
              count={resources.find((r) => r.name === "Медь")?.count || 0}
              onClick={handleClickCopper}
              loading={loadingCopper}
              imagePath="/images/190034.png"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
