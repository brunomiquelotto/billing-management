import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './views/bills.home';
import Create from './views/bills.create';
 
 const App = () => (
  <HashRouter>
    <Routes>
      <Route
        exact
        path='/'
        element={<Home />}
      />
      <Route
        exact
        path='/Create'
        element={<Create />}
      />
    </Routes>
  </HashRouter>
)

export default App