import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';

const RootRouter = () => {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
};

export default RootRouter;
