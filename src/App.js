import React from 'react';
import { ToastContainer } from 'react-toastify';
import RootRouter from './router/RootRouter';
import startup from './startup';
import 'normalize.css';
import './styles/index.scss';

startup();

const App = () => {
  return (
    <>
      <RootRouter />
      <ToastContainer />
    </>
  );
};

export default App;
