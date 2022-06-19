import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './views/bills.home';
import Create from './views/bills.create';
import { ThemeProvider } from '@mui/material';
import appTheme from './themes/theme';

const App = () => (
  <HashRouter>
    <ThemeProvider theme={appTheme}>
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
    </ThemeProvider>
  </HashRouter>
)

export default App