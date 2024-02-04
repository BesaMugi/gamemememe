import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "../../reducer/resourceSlice.jsx";
import styles from "./resource.module.scss";
import Header from "../../components/Header/header.jsx";
import ResourceCard from "./resourceCard.jsx";
import { getUserInfo, updateUserInventory, updateUserEnergy } from "../../reducer/userSlice.jsx";

const Resources = () => {
  const dispatch = useDispatch();
  const { resources, loading, error } = useSelector((state) => state.resources);
  const user = useSelector((state) => state.users.user);

  // Проверка наличия user перед использованием его свойств
  const berriesCount = user && user.inventory ? user.inventory.Ягоды || 0 : 0;
  const grassCount = user && user.inventory ? user.inventory.Трава || 0 : 0;
  const flintCount = user && user.inventory ? user.inventory.Кремень || 0 : 0;

  const [loadingBerries, setLoadingBerries] = useState(false);
  const [loadingBerriesEat, setLoadingBerriesEat] = useState(false);
  const [loadingGrass, setLoadingGrass] = useState(false);
  const [loadingFlint, setLoadingFlint] = useState(false);
  const [isPricesInitialized, setIsPricesInitialized] = useState(false);

  const handleClickBerries = async () => {
    try {
      setLoadingBerries(true);

      const inventory = user.inventory || {};
      const updatedInventory = {
        ...inventory,
        Ягоды: (inventory.Ягоды || 0) + 1,
      };

      dispatch(updateUserInventory({
        userId: user._id,
        inventory: updatedInventory,
        resourceName: 'Ягоды'
      }));
      await dispatch(updateUserEnergy({ userId: user._id, energyChange: -1 }));
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingBerries(false);
    }
  };


  const handleClickGrass = async () => {
    try {
      setLoadingGrass(true);
      const inventory = user.inventory || {};
      const updatedInventory = {
        ...inventory,
        Трава: (inventory.Трава || 0) + 1,
      };

      dispatch(updateUserInventory({
        userId: user._id,
        inventory: updatedInventory,
        resourceName: "Трава"
      }));
      await dispatch(updateUserEnergy({ userId: user._id, energyChange: -1 }));
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingGrass(false);
    }
  };

  const handleClickFlint = async () => {
    try {
      setLoadingFlint(true);
      const inventory = user.inventory || {};
      const updatedInventory = {
        ...inventory,
        Кремень: (inventory.Кремень || 0) + 1,
      };

      dispatch(updateUserInventory({
        userId: user._id,
        inventory: updatedInventory,
        resourceName: "Кремень"
      }));
      await dispatch(updateUserEnergy({ userId: user._id, energyChange: -1 }));
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingFlint(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchResources());
      await dispatch(getUserInfo());
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      {error && <p>Error: {error}</p>}

      {user && (
        <div className={styles.energy}>
          Энергия: {user.energy}
        </div>
      )}
      <div className={styles.cards}>
        <div className={styles.first_resource}>
          <ResourceCard
            resourceName="Ягоды"
            count={berriesCount}
            onClick={handleClickBerries}
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
      </div>
    </div>
  );
};

export default Resources;
