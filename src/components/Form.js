import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import { Context } from '../Context';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex'
//   },
//   formControl: {
//     margin: theme.spacing(3)
//   }
// }));

const Form = () => {
  let { plates } = useContext(Context);
  // console.log(plates);
  // const classes = useStyles();
  // const [state, setState] = React.useState({
  //   gilad: true,
  //   jason: false,
  //   antoine: false
  // });

  // const handleChange = name => event => {
  //   setState({ ...state, [name]: event.target.checked });
  // };
  const [value, setValue] = React.useState('');
  const handleCheckboxChange = () => console.log('checked');
  
  const [units, setUnits] = React.useState('metric');
  function handleRadioChange(event) {
    console.log(event.target.value)
    setUnits(event.target.value);
  }

  const error =
    plates[units].filter(({ available }) => available).length <= 0;

  return (
    <FormControl component="fieldset" required error={error}>
      <RadioGroup
        aria-label="position"
        name="position"
        value={units}
        onChange={handleRadioChange}
        row
      >
        <FormControlLabel
          value="imperial"
          control={<Radio color="primary" />}
          label="Imperial (lbs)"
          labelPlacement="end"
        />
        <FormControlLabel
          value="metric"
          control={<Radio color="primary" />}
          label="Metric (kgs)"
          labelPlacement="end"
        />
      </RadioGroup>
      <FormLabel component="legend">Check all available plates</FormLabel>
      <FormGroup>
        {plates[units].map(({ weight, available }) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={available}
                  onChange={() => handleCheckboxChange()}
                  value={weight}
                />
              }
              label={weight}
              key={weight}
            />
          );
        })}
      </FormGroup>
      <FormHelperText>One or more plates must be checked</FormHelperText>
    </FormControl>
  );
};

export default Form;
