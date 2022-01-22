import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddTermRoute from './routes/dashboard/AddTermRoute/AddTermRoute';
import DashboardHomeRoute from './routes/dashboard/DashboardHomeRoute/DashboardHomeRoute';
import EditTermRoute from './routes/dashboard/EditTermRoute/EditTermRoute';
import DashboardRoute from './routes/DashboardRoute/DashboardRoute';
import HomeRoute from './routes/HomeRoute/HomeRoute';
import IndexRoute from './routes/IndexRoute/IndexRoute';
import NotFoundRoute from './routes/NotFoundRoute/NotFoundRoute';
import SearchRoute from './routes/SearchRoute/SearchRoute';
import TermRoute from './routes/TermRoute/TermRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="index/:letter" element={<IndexRoute />} />
          <Route path="term/:termId" element={<TermRoute />} />
          <Route path="search" element={<SearchRoute />} />
          <Route path="dashboard" element={<DashboardRoute />}>
            <Route index element={<DashboardHomeRoute />} />
            <Route path="terms/add" element={<AddTermRoute />} />
            <Route path="terms/:termId" element={<EditTermRoute />} />
          </Route>
          <Route path="*" element={<NotFoundRoute />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
