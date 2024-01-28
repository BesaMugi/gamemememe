import React from 'react'
import styles from "./resource.module.scss";

const ResourceCard = ({ resourceName, count, onClick, loading, loadingEat, imagePath, onEat }) => {
    return (
      <div className={styles.card}>
        <img src={imagePath} alt={resourceName} />
        <p>
          {resourceName}: {count}
        </p>
        <button onClick={onClick} disabled={loading}>
          {loading ? "Сбор..." : "Добыть"}
        </button>
        {onEat && (
        <button onClick={onEat} disabled={count === 0 || loadingEat}>
         {loadingEat ? "Ест..." : "Съесть"}
        </button>
      )}
      </div>
    );
};

export default ResourceCard;