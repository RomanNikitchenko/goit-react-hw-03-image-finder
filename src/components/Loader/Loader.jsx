import React from 'react';
import { ImSpinner } from 'react-icons/im';
import s from './loader.module.css';

const styles = {
  div: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  spinner: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 24,
  },
};

function ImagePendingView() {
  return (
    <div role="alert" style={styles.div}>
      <div style={styles.spinner}>
        <ImSpinner size="32" className={s.iconSpin} />
        Загружаем...
      </div>
    </div>
  );
}

export default ImagePendingView;
