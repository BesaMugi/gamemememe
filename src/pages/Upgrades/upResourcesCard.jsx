import React from 'react';
import styles from "./upgradesResource.module.scss"

const UpgradeCard = ({ resourceName, level, price, imagePath, isOpen, priceUpgrade }) => {

    return (
        <div className={styles.card}>
            <h2>{resourceName}</h2>
            <img src={imagePath} />
            <p>
                Уровень: {level} <br /> Цена ресурса: {price}
            </p>
            <button onClick={isOpen}>
                {level === 0 ? 'Открыть' : 'Улучшить'}
            </button>
            {/* Отображаем цену улучшения только если уровень не равен 0 */}
            {level !== 0 && <p>Цена улучшения: {priceUpgrade} $</p>}
        </div>
    );
};

export default UpgradeCard;