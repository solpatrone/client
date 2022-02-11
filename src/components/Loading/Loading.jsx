import React from 'react';
import { useSelector } from 'react-redux';
import loadingImg from '../../assets/loader.gif';

import style from './Loading.module.css';

export default function Loading() {
  const loading = useSelector((state) => state.loading);

  return (
    <div>
      {loading && (
        <div className={style.loadingContainer}>
          <img className={style.loadingImage} src={loadingImg} alt='img' />
        </div>
      )}
    </div>
  )
}