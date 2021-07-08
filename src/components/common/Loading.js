import React from 'react';
import ReactLoading from 'react-loading';
import theme from '../../config/theme';

const Loading = ({ size, color }) => {
  const defaultColor = theme.primaryColor;
  return <ReactLoading type="spin" color={color || defaultColor} height={size} width={size} />;
};

export default Loading;
