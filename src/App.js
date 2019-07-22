import React, { useContext, useReducer } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './components/Header';
import Page from './components/Page';
import './styles.css';

import { Routes } from './Context';

import Drawer from './components/Drawer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}));

export default function App() {
  const routes = useContext(Routes);
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
          {/* if (path === '/') return <Drawer /> */}
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={300}
                classNames="page"
                unmountOnExit
              >
                <Page>
                  <Drawer />
                  <Component />
                </Page>
              </CSSTransition>
            )}
          </Route>
        ))}
      </div>
    </Router>
  );
}
