import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
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

  const defaultValue = state.currentWeight
    ? state.currentWeight.targetWeight
    : state.currentBar[state.currentUnits];

  const [weight, setWeight] = React.useState(defaultValue);
  const handleWeightChange = e => {
    setWeight(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (error) return;
    dispatch({
      type: 'CALCULATE',
      payload: weight
    });
  };

  const error = weight < state.currentBar[state.currentUnits];
  const classes = useStyles();
  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.container} error={error}>
          <InputLabel htmlFor="weight-input">
            Target weight in {state.currentUnits}
          </InputLabel>
          <Input
            label={`Target weight in ${state.currentUnits}`}
            id="weight-input"
            className={classes.textField}
            // autoComplete={`Total weight in ${state.currentUnits}`}
            defaultValue={defaultValue}
            type="number"
            onChange={handleWeightChange}
          />
          <FormHelperText>
            Enter a weight greater than the barbell
          </FormHelperText>
          <Button
            variant="contained"
            size="large"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Calculate
          </Button>
        </FormControl>
      </form>
      <Button
        variant="contained"
        size="small"
        className={classes.button}
        onClick={() => dispatch({ type: 'RESET' })}
      >
        Reset
      </Button>
    </>
  );
};

export default WeightForm;
