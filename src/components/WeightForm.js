import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Application } from '../App';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: theme.spacing(3)
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

const WeightForm = () => {
  const { state, dispatch } = React.useContext(Application);

  const [weight, setWeight] = React.useState(0);
  const handleWeightChange = e => {
    setWeight(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({
      type: 'CALCULATE',
      payload: weight
    });
  };

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} className={classes.container}>
      <TextField
        label={`Target weight in ${state.currentUnits}`}
        id="margin-none"
        className={classes.textField}
        autoComplete={`Total weight in ${state.currentUnits}`}
        type="number"
        onChange={handleWeightChange}
      />
      <Button
        variant="contained"
        size="large"
        color="primary"
        className={classes.button}
        type="submit"
      >
        Calculate
      </Button>
      <Button
        variant="contained"
        size="small"
        className={classes.button}
        onClick={() => dispatch({ type: 'RESET' })}
      >
        Reset
      </Button>
    </form>
  );
};

export default WeightForm;
