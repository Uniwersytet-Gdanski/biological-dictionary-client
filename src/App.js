import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeRoute from './routes/HomeRoute';
import TermRoute from './routes/TermRoute';
import DashboardRoute from './routes/DashboardRoute';
import AddTermRoute from './routes/dashboard/AddTermRoute';
import EditTermRoute from './routes/dashboard/EditTermRoute';
import DashboardHomeRoute from './routes/dashboard/DashboardHomeRoute';
import NotFoundRoute from './routes/NotFoundRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="term/:term" element={<TermRoute />} />
          <Route path="dashboard" element={<DashboardRoute />}>
            <Route index element={<DashboardHomeRoute />} />
            <Route path="terms/add" element={<AddTermRoute />} />
            <Route path="terms/:termId" element={<EditTermRoute />} />
          </Route>
          <Route path="*" element={<NotFoundRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
