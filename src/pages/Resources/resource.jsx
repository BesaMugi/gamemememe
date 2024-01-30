import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources, addResourceToInventory, removeResource } from "../../reducer/resourceSlice.jsx";
import styles from "./resource.module.scss";
import Header from "../../components/Header/header.jsx";
import ResourceCard from "./resourceCard.jsx";
import { getUserInfo, updateUserInventory } from "../../reducer/userSlice.jsx";

const Resources = () => {
  const dispatch = useDispatch();
  const { resources, loading, error } = useSelector((state) => state.resources);
  const { user } = useSelector((state) => state.users);
  
  const [loadingBerries, setLoadingBerries] = useState(false);
  const [loadingBerriesEat, setLoadingBerriesEat] = useState(false);

  const handleClickBerries = async () => {
    try {
      setLoadingBerries(true);
      
      // Твой код: добавление ягод в инвентарь
      const updatedInventory = { ...user.inventory, Ягоды: (user.inventory.Ягоды || 0) + 1 };
      dispatch(updateUserInventory({ userId: user._id, inventory: updatedInventory }));
    
      // Твой код: уменьшение энергии
      await dispatch(updateUserEnergy({ userId: user._id, energyChange: -3 }));
    } catch (error) {
      console.error("Ошибка при добавлении ресурса:", error);
    } finally {
      setLoadingBerries(false);
    }
  };
  const handleEatBerries = async () => {
    try {
      setLoadingBerriesEat(true);
  
      // Твой код: удаление ягод из инвентаря
      await dispatch(removeResource("Ягоды"));
  
      // Обновление энергии на сервере
      await dispatch(updateUserEnergy({ userId: user._id, energyChange: 3 }));
  
      // Твой код: обновление данных пользователя (если требуется)
      dispatch(getUserInfo());
      dispatch(fetchResources());
    } catch (error) {
      console.error("Ошибка при съедении ягод:", error);
    } finally {
      setLoadingBerriesEat(false);
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
        Энергия: {user?.energy || 0}
      </div>
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
          </div>
      </div>
    </div>
  );
};

export default Resources;
