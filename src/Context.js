import React from 'react';


// export const Routes = React.createContext([
//   { path: '/', name: 'Home', Component: Home },
//   { path: '/about', name: 'About', Component: About },
//   { path: '/settings', name: 'Settings', Component: Settings }
// ]);

export const initialState = {
  currentUnits: 'lbs',
  plates: {
    lbs: [
      { weight: 0.25, available: false },
      { weight: 0.5, available: false },
      { weight: 1, available: false },
      { weight: 2.5, available: true },
      { weight: 5, available: true },
      { weight: 10, available: true },
      { weight: 25, available: true },
      { weight: 35, available: false },
      { weight: 45, available: true },
      { weight: 55, available: false }
    ],
    kgs: [
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
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'TOGGLE_UNITS':
      let currentUnits = payload;
      return { ...state, currentUnits };

    case 'TOGGLE_PLATE_AVAILABILITY':
      let weight = parseFloat(payload);
      let units = state.currentUnits;
      let updatedPlates = state.plates[units].map(plate => {
        if (plate.weight === weight) plate.available = !plate.available;
        return plate;
      });
      return {
        ...state,
        plates: { ...state.plates, [units]: updatedPlates }
      };

    default:
      return state;
  }
};
