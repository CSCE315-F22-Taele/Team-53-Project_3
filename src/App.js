import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import CashierPage from './pages/CashierPage'



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/cashier" element={<CashierPage/>} />
      </Routes>
    </Router>
  );
}

export default App