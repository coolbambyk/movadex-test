import React from 'react';
import Loading from './Loading';
import styles from './LoadingOverlay.module.scss';

const LoadingOverlay = () => (
  <div className={styles.fullscreen}>
    <Loading />
  </div>
);

export default LoadingOverlay;
