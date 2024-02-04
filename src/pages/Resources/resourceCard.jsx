import React, { useEffect } from 'react';
import styles from './resource.module.scss';
import { getUserResources } from '../../reducer/resourceSlice';
import { getUserInfo } from '../../reducer/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const ResourceCard = ({ resourceName, count, onClick, loading, loadingEat, imagePath, onEat }) => {
  const dispatch = useDispatch();
  const userResources = useSelector((state) => state.resources.resources);
  const user = useSelector((state) => state.users.user);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserResources());
      await dispatch(getUserInfo());
    };

    fetchData();
  }, [dispatch]);

  // Найти ресурс в массиве userResources по имени
  const resource = userResources.find((r) => r.name === resourceName);

  return (
    <div className={styles.card}>
      <img src={imagePath} />
      <p>
        {resourceName}: {count}
      </p>
      <button onClick={onClick} disabled={loading}>
        {loading ? 'Сбор...' : 'Добыть'}
      </button>
      {onEat && (
        <button onClick={onEat} disabled={count === 0 || loadingEat}>
          {loadingEat ? 'Ест...' : 'Съесть'}
        </button>
      )}
      <div>
        {resource && resource.price > 0 ? (
          <span>Цена: {resource.price}$</span>
        ) : (
          <span>Улучшите ресурс для продажи</span>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;
