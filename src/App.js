import React, { useContext, useReducer } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/Header';
import Page from './components/Page';
import './styles.css';

import { Routes } from './Context';

export default function App() {
  // const [state, dispatch] = useReducer(reducer, initialState);

  const routes = useContext(Routes);

  return (
    <Router>
      <CssBaseline />
      <Header />
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition
              in={match != null}
              timeout={300}
              classNames="page"
              unmountOnExit
            >
              <Page>
                <Component />
              </Page>
            </CSSTransition>
          )}
        </Route>
      ))}
    </Router>
  );
}
