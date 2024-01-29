import React from "react";
import styles from "./shop.module.scss"
import ShopApp from "./shopApp";


const Shop = () => {
    return (
        <div>
            <ShopApp />
            <h1>Рынок</h1>
            <div className={styles.shest}>
                Сундук
                <button>открыть</button>
                <div className={styles.loot}>
                    Выпало:
                    5 монет;
                    редкий огненный меч;
                    железная лопата;
                </div>
            </div>
        </div>
    );
};

export default Shop;