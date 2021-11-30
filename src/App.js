import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeRoute from './routes/HomeRoute/HomeRoute';
import TermRoute from './routes/TermRoute/TermRoute';
import DashboardRoute from './routes/DashboardRoute/DashboardRoute';
import AddTermRoute from './routes/dashboard/AddTermRoute/AddTermRoute';
import EditTermRoute from './routes/dashboard/EditTermRoute/EditTermRoute';
import DashboardHomeRoute from './routes/dashboard/DashboardHomeRoute/DashboardHomeRoute';
import NotFoundRoute from './routes/NotFoundRoute/NotFoundRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="term/:termCode" element={<TermRoute />} />
          <Route path="dashboard" element={<DashboardRoute />}>
            <Route index element={<DashboardHomeRoute />} />
            <Route path="terms/add" element={<AddTermRoute />} />
            <Route path="terms/:termCode" element={<EditTermRoute />} />
          </Route>
          <Route path="*" element={<NotFoundRoute />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
