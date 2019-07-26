import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Application } from '../App';

const Form = () => {
  const { state, dispatch } = React.useContext(Application);

  const recalculate = () => {
    dispatch({ type: 'CALCULATE', payload: state.currentWeight.targetWeight });
  };

  const handleCheckboxChange = weight => {
    dispatch({
      type: 'TOGGLE_PLATE_AVAILABILITY',
      payload: weight
    });

    if (state.currentWeight) recalculate();
  };

  function handleRadioChange(e) {
    dispatch({
      type: 'TOGGLE_UNITS',
      payload: e.target.value
    });

    if (state.currentWeight) recalculate();
  }

  function handleSelectChange(e) {
    dispatch({
      type: 'SELECT_BAR',
      payload: e.target.value
    });

    if (state.currentWeight) recalculate();
  }

  let units = state.currentUnits;
  let plates = state.plates[units];
  let currentBar = state.currentBar[units];
  let bars = state.bars[units];
  const error = plates.filter(({ available }) => available).length <= 0;

  return (
    <FormControl component="fieldset">
      <List>
        <ListItem role={undefined}>
          <FormLabel component="legend">Units of measurement</FormLabel>
        </ListItem>
        <RadioGroup
          aria-label="position"
          name="position"
          value={units}
          onChange={handleRadioChange}
          row
        >
          <ListItem role={undefined}>
            <FormControlLabel
              value="lbs"
              control={<Radio color="primary" />}
              label="lbs"
              labelPlacement="end"
            />
            <FormControlLabel
              value="kgs"
              control={<Radio color="primary" />}
              label="kgs"
              labelPlacement="end"
            />
          </ListItem>
        </RadioGroup>
        <Divider />

        <ListItem role={undefined}>
          <FormLabel component="legend">Barbell weight</FormLabel>
        </ListItem>
        <ListItem role={undefined}>
          <Select
            value={currentBar}
            // value="bar"
            onChange={handleSelectChange}
            displayEmpty
            name="bar"
            // className={classes.select}
          >
            {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
            {bars.map(bar => (
              <MenuItem key={bar + units} value={bar}>
                {bar} {units}
              </MenuItem>
            ))}
          </Select>
        </ListItem>

        <Divider />

        <ListItem role={undefined}>
          <FormLabel component="legend" required error={error}>
            Available plates
          </FormLabel>
        </ListItem>
        <FormGroup>
          {plates.map(({ weight, available }) => {
            const labelId = `checkbox-list-label-${weight}`;
            return (
              <ListItem
                key={weight}
                role={undefined}
                dense
                button
                onClick={() => handleCheckboxChange(weight)}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={available}
                    value={weight}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${weight} ${units}`} />
              </ListItem>
            );
          })}
          <ListItem role={undefined}>
            <FormHelperText>One or more plates must be checked</FormHelperText>
          </ListItem>
        </FormGroup>
      </List>
    </FormControl>
  );
};

export default Form;
