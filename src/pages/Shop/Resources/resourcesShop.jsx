import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "../../../reducer/resourceSlice";
import ShopItemResources from "./shopItemResources";
import ShopApp from "../shopApp";

const ResourcesShop = () => {
    const dispatch = useDispatch();
    const resources = useSelector((state) => state.resources.resources);
    const user = useSelector((state) => state.users.user);

    useEffect(() => {
        dispatch(fetchResources());
    }, [dispatch]);

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
