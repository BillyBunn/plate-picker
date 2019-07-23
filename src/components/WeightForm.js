import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { Application} from '../App';

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

const WeightForm = () => {
  const {state, dispatch} = React.useContext(Application)

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

  React.useEffect(() => {
    console.log('weightform units:', state.currentUnits);
  }, []);

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label={`Weight in ${state.currentUnits}`}
        id="margin-none"
        className={classes.textField}
        // helperText="Some important text"
        autoComplete={`Weight in ${state.currentUnits}`}
        type="number"
        onChange={handleWeightChange}
      />
      <Button
        variant="contained"
        size="small"
        color="primary"
        className={classes.button}
        type="submit"
      >
        Calculate
      </Button>
    </form>
  );
};

export default WeightForm;
