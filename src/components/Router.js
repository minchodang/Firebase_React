import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';

export default function Router({ isLoggedIn, userObj }) {
  return (
    <>
      <BrowserRouter>
        {isLoggedIn && <Navigation />}
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home userObj={userObj} />} />
              <Route path="/profile" element={<Profile userObj={userObj} />} />
            </>
          ) : (
            <Route path="/" element={<Auth />} />
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}
