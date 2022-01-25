import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AddTermRoute from './routes/AddTermRoute/AddTermRoute';
import HomeRoute from './routes/HomeRoute/HomeRoute';
import IndexRoute from './routes/IndexRoute/IndexRoute';
import AboutRoute from './routes/info/AboutRoute/AboutRoute';
import AuthorsRoute from './routes/info/AuthorsRoute/AuthorsRoute';
import ContactRoute from './routes/info/ContactRoute/ContactRoute';
import NotFoundRoute from './routes/NotFoundRoute/NotFoundRoute';
import SearchRoute from './routes/SearchRoute/SearchRoute';
import TermRoute from './routes/TermRoute/TermRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="index/:letter" element={<IndexRoute />} />
        <Route path="term/:termId" element={<TermRoute />} />
        <Route path="search" element={<SearchRoute />} />
        <Route path="terms/add" element={<AddTermRoute />} />
        <Route path="about" element={<AboutRoute />} />
        <Route path="authors" element={<AuthorsRoute />} />
        <Route path="contact" element={<ContactRoute />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
