import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Routes } from '../Context';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

const Header = () => {
  const classes = useStyles();

  let routes = useContext(Routes);
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Tabs variant="fullWidth" value={value} onChange={handleChange}>
        {routes.map(route => (
          <Tab
            key={route.path}
            label={route.name}
            component={React.forwardRef((props, ref) => (
              <NavLink {...props} />
            ))}
            // component={<NavLink to={route.path}  />}
            to={route.path}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default Header;
