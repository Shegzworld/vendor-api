import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Account from './components/Account';
import Earnings from './components/Earnings';
import Withdraw from './components/Withdraw';
import Benfeks from './components/Benfeks';
import Purchases from './components/Purchases';
import AddBenfek from './components/AddBenfek';
import Supplements from './components/Supplements';
import Articles from './components/Articles';
import Podcasts from './components/Podcasts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/benfeks" element={<Benfeks />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/add-benfek" element={<AddBenfek />} />
        <Route path="/supplements" element={<Supplements />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/podcasts" element={<Podcasts />} />
      </Routes>
    </Router>
  );
}

export default App;