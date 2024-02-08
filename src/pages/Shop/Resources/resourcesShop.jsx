import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserResources, sellResource } from "../../../reducer/resourceSlice";
import ShopItemResources from "./shopItemResources";
import ShopApp from "../shopApp";
import { getUserInfo } from "../../../reducer/userSlice";
import styles from "../shop.module.scss"

const ResourcesShop = () => {
    const dispatch = useDispatch();
    const resources = useSelector((state) => state.resources.resources);
    const user = useSelector((state) => state.users.user);

    const handleSellResource = async (resourceName) => {
        const selectedResource = resources.find(resource => resource.name === resourceName);

        if (selectedResource && selectedResource.count > 0) {
            await dispatch(sellResource({ userId: user._id, resourceName }));
            await dispatch(getUserInfo());
        }
    };

    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            // Установка состояния, что запрос на получение данных выполняется
            setLoadingData(true);

            // Запрос на получение ресурсов пользователя
            await dispatch(getUserInfo());
            await dispatch(getUserResources());

            // После успешного выполнения запросов сброс состояния
            setLoadingData(false);
        };

        fetchData();
    }, [dispatch]);

    // Проверка на наличие данных перед рендерингом компонента
    if (loadingData || !resources || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <ShopApp />
            <h3>Магазин ресурсов</h3>
            <div className={styles.cards}>
                {resources.map((resource) => (
                    <div key={resource._id}>
                        <ShopItemResources key={resource._id} resource={resource} onSell={handleSellResource} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResourcesShop;
