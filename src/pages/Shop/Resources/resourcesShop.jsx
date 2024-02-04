import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "../../../reducer/resourceSlice";
import ShopItemResources from "./shopItemResources";
import ShopApp from "../shopApp";

const ResourcesShop = () => {
    const dispatch = useDispatch();
    const resources = useSelector((state) => state.resources.resources);

    useEffect(() => {
        dispatch(fetchResources());
    }, [dispatch]);

    const addPriceToResources = () => {
        // Ваша логика для добавления цен к ресурсам
        // Здесь вы можете использовать данные из бекенда, чтобы присвоить цены
        // resources - массив ресурсов из Redux store
        // Диспатч экшена для обновления цен в store, если необходимо
      };

    return (
        <>
              <ShopApp />
            <h1>Магазин ресурсов</h1>
            {resources.map((resource) => (
                <ShopItemResources key={resource._id} resource={resource} />
            ))}
        </>
    );
};

export default ResourcesShop;
