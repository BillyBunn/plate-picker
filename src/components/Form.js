import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


import { reducer, initialState } from '../Context';

const Form = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const handleCheckboxChange = e => {
    console.log(e.target.value);
    dispatch({
      type: 'TOGGLE_PLATE_AVAILABILITY',
      payload: e.target.value
    });
  };

  function handleRadioChange(e) {
    dispatch({
      type: 'TOGGLE_UNITS',
      payload: e.target.value
    });
  }

  let units = state.currentUnits;
  let plates = state.plates[units];
  const error = plates.filter(({ available }) => available).length <= 0;

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
      <Divider />

      <FormLabel component="legend">Check all available plates</FormLabel>
      <FormGroup>
        {plates.map(({ weight, available }) => {
          return (
            <FormControlLabel
              control={
                <Checkbox
                  checked={available}
                  onChange={handleCheckboxChange}
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

/*
{[0, 1, 2, 3].map(value => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="Comments">
                <CommentIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
      */

export default Form;
