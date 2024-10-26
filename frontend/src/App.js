import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../src/Components/Dashboard';
import Banner from '../src/Components/Banner'
const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/banner" element={<Banner />} />
      </Routes>
  );
};

export default App;
