import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserResources, updateResourcePriceAndLevel } from "../../reducer/resourceSlice.jsx";
import UpgradeCard from "./upResourcesCard.jsx"
import styles from "./upgradesResource.module.scss"
import Header from "../../components/Header/header.jsx";
import { getUserInfo } from "../../reducer/userSlice.jsx";

const Upgrades = () => {
  const dispatch = useDispatch();
  const userResources = useSelector((state) => state.resources.resources);
  const user = useSelector((state) => state.users.user);

  const handleUpgradeBerries = async () => {
    try {
      const resource = userResources.find((r) => r.name === "Ягоды");

      // Проверим, достаточно ли у пользователя средств для улучшения
      if (!resource || (resource.level > 0 && resource.priceUpgrade > user.wallet)) {
        return console.error("Недостаточно средств для улучшения ресурса");
      }

      // Рассчитываем базовую цену улучшения (может быть константой или храниться в конфиге)
      let baseUpgradePrice = 120;

      // Установим цену улучшения в 0, если уровень ресурса 0
      let calculatedUpgradePrice = resource.level === 0 ? 0 : (resource.level + 1) * baseUpgradePrice;

      await dispatch(updateResourcePriceAndLevel({
        resourceName: "Ягоды",
        newPrice: 5,
        newLevel: 1,
        newPriceUpgrade: calculatedUpgradePrice
      }));
      // Обновляем информацию о пользователе
      await dispatch(getUserInfo());
      await dispatch(getUserResources());
    } catch (error) {
      console.error("Ошибка при улучшении ресурса Ягоды:", error);
    }
  };

  const handleUpgradeGrass = async () => {
    try {
      const resource = userResources.find((r) => r.name === "Трава");

      // Проверим, достаточно ли у пользователя средств для улучшения
      if (!resource || resource.priceUpgrade > user.wallet) {
        return console.error("Недостаточно средств для улучшения ресурса");
      }

      const baseUpgradePrice = 80;

      // Установим цену улучшения в 0, если уровень ресурса 0
      let calculatedUpgradePrice = resource.level === 0 ? 0 : (resource.level + 1) * baseUpgradePrice;

      // Обновляем ресурс только если у пользователя достаточно средств
      await dispatch(updateResourcePriceAndLevel({
        resourceName: "Трава",
        newPrice: 2,
        newLevel: 1,
        newPriceUpgrade: calculatedUpgradePrice
      }));

      // Обновляем информацию о пользователе
      await dispatch(getUserInfo());
      await dispatch(getUserResources());
    } catch (error) {
      console.error("Ошибка при улучшении ресурса Трава:", error);
    }
  };

  const handleUpgradeFlint = async () => {
    try {
      const resource = userResources.find((r) => r.name === "Кремень");

      // Проверим, достаточно ли у пользователя средств для улучшения
      if (!resource || resource.priceUpgrade > user.wallet) {
        return console.error("Недостаточно средств для улучшения ресурса");
      }

      // Рассчитываем базовую цену улучшения (может быть константой или храниться в конфиге)
      const baseUpgradePrice = 40;

      // Установим цену улучшения в 0, если уровень ресурса 0
      let calculatedUpgradePrice = resource.level === 0 ? 0 : (resource.level + 1) * baseUpgradePrice;

      // Обновляем ресурс только если у пользователя достаточно средств
      await dispatch(updateResourcePriceAndLevel({
        resourceName: "Кремень",
        newPrice: 1,
        newLevel: 1,
        newPriceUpgrade: calculatedUpgradePrice
      }));
      // Обновляем информацию о пользователе
      await dispatch(getUserInfo());
      await dispatch(getUserResources());
    } catch (error) {
      console.error("Ошибка при улучшении ресурса Кремень:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserResources());
      await dispatch(getUserInfo());
    };

    fetchData();
  }, [dispatch]);


  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      {user && (
        <div className={styles.wallet}>
          Кошелек: {user.wallet} $
        </div>
      )}
      <h2>Улучшение ресурсов:</h2>
      <div className={styles.cards}>
        {userResources &&
          userResources.map((resource) => (
            <div key={resource._id}>
              {resource.name === "Ягоды" && (
                <UpgradeCard
                  key={resource._id}
                  resourceName="Ягоды"
                  isOpen={() => handleUpgradeBerries(resource._id)}
                  level={resource.level}
                  price={resource.price}
                  priceUpgrade={resource.level === 1 ? 240 : resource.priceUpgrade + 120}
                  imagePath="/images/190034.png"
                />
              )}
              {resource.name === "Трава" && (
                <UpgradeCard
                  key={resource._id}
                  resourceName="Трава"
                  isOpen={() => handleUpgradeGrass(resource._id)}
                  level={resource.level}
                  price={resource.price}
                  priceUpgrade={resource.level === 1 ? 160 : resource.priceUpgrade + 80}
                  imagePath="/images/190034.png"
                />
              )}
              {resource.name === "Кремень" && (
                <UpgradeCard
                  key={resource._id}
                  resourceName="Кремень"
                  isOpen={() => handleUpgradeFlint(resource._id)}
                  level={resource.level}
                  price={resource.price}
                  priceUpgrade={resource.level === 1 ? 80 : resource.priceUpgrade + 40}
                  imagePath="/images/190034.png"
                />
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Upgrades;
