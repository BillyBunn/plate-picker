import React from 'react';

import Home from './pages/home';
import About from './pages/about';
import Settings from './pages/settings';

export const Context = React.createContext({
  routes: [
    { path: '/', name: 'Home', Component: Home },
    { path: '/about', name: 'About', Component: About },
    { path: '/settings', name: 'Settings', Component: Settings }
  ]
});
