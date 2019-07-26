import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import lightBlue from '@material-ui/core/colors/lightBlue';

import Page from './components/Page';
import { reducer, defaultState } from './Context';

export const Application = React.createContext({ state: null, dispatch: null });

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue,
    error: red
  }
});

export default function App() {
  const initialState = () => JSON.parse(window.localStorage.getItem('plate-picker')) || defaultState;
  
  const [state, dispatch] = React.useReducer(reducer, initialState());
  
  React.useEffect(() => {
    window.localStorage.setItem('plate-picker', JSON.stringify(state));
  }, [state]);

  return (
    <Application.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Page />
      </ThemeProvider>
    </Application.Provider>
  );
}
