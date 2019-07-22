import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { reducer, initialState } from '../Context';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const WeightForm = props => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const classes = useStyles();
  return (
    <>
      <TextField
        label={`Weight in ${state.currentUnits}`}
        id="margin-none"
        className={classes.textField}
        // helperText="Some important text"
        autoComplete={`Weight in ${state.currentUnits}`}
      />
      <Button
        variant="contained"
        size="small"
        color="primary"
        className={classes.button}
      >
        Calculate
      </Button>
    </>
  );
};

export default WeightForm;
