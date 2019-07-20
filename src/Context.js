import React from 'react';

import Home from './pages/home';
import About from './pages/about';
import Settings from './pages/settings';

export const Context = React.createContext({
  routes: [
    { path: '/', name: 'Home', Component: Home },
    { path: '/about', name: 'About', Component: About },
    { path: '/settings', name: 'Settings', Component: Settings }
  ],
  defaultUnits: 'metric',
  plates: {
    imperial: [
      { weight: 0.25, available: false },
      { weight: 0.5, available: false },
      { weight: 1, available: false },
      { weight: 2.5, available: false },
      { weight: 5, available: false },
      { weight: 10, available: false },
      { weight: 25, available: false },
      { weight: 35, available: false },
      { weight: 45, available: false },
      { weight: 55, available: false }
    ],
    metric: [
      { weight: 0.25, available: false },
      { weight: 0.5, available: false },
      { weight: 1.25, available: false },
      { weight: 2.5, available: false },
      { weight: 5, available: false },
      { weight: 10, available: false },
      { weight: 15, available: false },
      { weight: 20, available: false },
      { weight: 25, available: false }
    ]
  }
});
