import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Context } from '../Context';

const Header = () => {
  let { routes } = useContext(Context);
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }
  return (
      <AppBar position="static">
        <Tabs variant="fullWidth" value={value} onChange={handleChange}>
          {routes.map(route => (
            <Tab
              key={route.path}
              label={route.name}
              component={React.forwardRef((props, ref) => (
                <NavLink {...props} />
              ))}
              to={route.path}
            />
          ))}
        </Tabs>
      </AppBar>
  );
};

export default Header;
