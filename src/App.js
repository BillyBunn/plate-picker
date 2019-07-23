import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Page from './components/Page';
import { reducer, initialState } from './Context';

export const Application = React.createContext({ state: null, dispatch: null });

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <Application.Provider value={{ state, dispatch }}>
      <CssBaseline />
      <Page />
    </Application.Provider>
  );
}
