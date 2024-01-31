import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources, addResourceToInventory, removeResource } from "../../reducer/resourceSlice.jsx";
import styles from "./resource.module.scss";
import Header from "../../components/Header/header.jsx";
import ResourceCard from "./resourceCard.jsx";
import { getUserInfo, updateUserInventory, updateUserEnergy } from "../../reducer/userSlice.jsx";

const Resources = () => {
  const dispatch = useDispatch();
  const { resources, loading, error } = useSelector((state) => state.resources);
  const user = useSelector((state) => state.users.user);

  const [loadingBerries, setLoadingBerries] = useState(false);
  const [loadingBerriesEat, setLoadingBerriesEat] = useState(false);
  const [loadingGrass, setLoadingGrass] = useState(false);
  const [loadingFlint, setLoadingFlint] = useState(false);

  const handleClickBerries = async () => {
    try {
      setLoadingBerries(true);
      const updatedInventory = {
        ...user.inventory,
        Ягоды: (user.inventory.Ягоды || 0) + 1,
      };
      dispatch(updateUserInventory({ userId: user._id, inventory: updatedInventory }));
      await dispatch(updateUserEnergy({ userId: user._id, energyChange: -1 }));
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingBerries(false);
    }
  };

const handleEatBerries = async () => {
  try {
    setLoadingBerriesEat(true);

    // Проверяем наличие ресурса "Ягоды" в инвентаре
    if (user && user.inventory && user.inventory.Ягоды > 0) {
      // Выполняем запрос на удаление ресурса
      const removedResource = await dispatch(removeResource("Ягоды"));

      if (removedResource === "Ягоды") {
        // Ресурс успешно удален, выполните дополнительные действия
        await dispatch(updateUserEnergy({ userId: user._id, energyChange: 3 }));
        dispatch(getUserInfo());
        dispatch(fetchResources());
      } else {
        // Ресурс не найден, выполните соответствующие действия
        console.error("Ягоды not found");
      }
    } else {
      // Если ресурс "Ягоды" отсутствует в инвентаре
      console.error("Ресурс Ягоды отсутствует в инвентаре");
    }
  } catch (error) {
    console.error("Ошибка при съедении ягод:", error);
  } finally {
    setLoadingBerriesEat(false);
  }
};

  const handleClickGrass = async () => {
    try {
      setLoadingGrass(true);
      const updatedInventory = {
        ...user.inventory,
        Трава: (user.inventory.Трава || 0) + 1,
      };
      dispatch(updateUserInventory({ userId: user._id, inventory: updatedInventory }));
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
      const updatedInventory = {
        ...user.inventory,
        Кремень: (user.inventory.Кремень || 0) + 1,
      };
      dispatch(updateUserInventory({ userId: user._id, inventory: updatedInventory }));
      await dispatch(updateUserEnergy({ userId: user._id, energyChange: -1 }));
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingFlint(false);
    }
  };

  useEffect(() => {
    dispatch(fetchResources());
    dispatch(getUserInfo())
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
            onClick={handleClickBerries}
            onEat={handleEatBerries}
            loadingEat={loadingBerriesEat}
            loading={loadingBerries}
            imagePath="/images/190034.png"
          />
          <ResourceCard
            resourceName="Трава"
            onClick={handleClickGrass}
            loading={loadingGrass}
            imagePath="/images/190034.png"
          />
          <ResourceCard
            resourceName="Кремень"
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
