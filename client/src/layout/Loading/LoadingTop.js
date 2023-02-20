import React from 'react';
import { useSelector } from 'react-redux';
import './styles.scoped.scss';

const LoadingTop = () => {
  const showLoading = useSelector(
    (state) => state.uiLoadingReducers.showLoading
  );
  if (showLoading) {
    return <div className='loading-bar loading-bar--active'></div>;
  }
  return null;
};

export default LoadingTop;
