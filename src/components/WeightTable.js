import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Application } from '../App';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    maxWidth: 650
  }
}));

function createData(weight, qty, sub) {
  return { weight, qty, sub };
}

// const rows = [
//   createData('45 lb bar', 1),
//   createData('45', 2),
//   createData('25', 2),
//   createData('10', 2),
//   createData('5', 2)
// ];

const WeightTable = props => {
  const classes = useStyles();
  const { state } = React.useContext(Application);
  //   currentBar: { weight: 45, units: 'lbs' },

  const bar = createData(
    `${state.currentBar.weight} ${state.currentBar.units} bar`,
    ''
  );
  const rows = state.currentWeights.plates.map(({ weight, qty }) =>
    createData(weight, qty, weight * qty)
  );
  const totalPerSide = state.currentWeights.plates.reduce((total, plate) => {
    return (total += plate.weight * plate.qty);
  }, 0);
  // const rows = [bar, ...plates];

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Plate</TableCell>
          <TableCell># Per Side</TableCell>
          <TableCell>Weight ({state.currentUnits})</TableCell>
          {/* <TableCell rowSpan={rows.length} align="bottom">
            Total
          </TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.weight}>
            <TableCell component="th" scope="row">
              {row.weight}
            </TableCell>
            <TableCell>{row.qty}</TableCell>
            <TableCell>{row.sub}</TableCell>
          </TableRow>
        ))}

        <TableRow>
          <TableCell colSpan={2} align="right">
            Subtotal
          </TableCell>
          <TableCell>
            {totalPerSide} (&times; 2 sides)
          </TableCell>
          <TableCell>{totalPerSide * 2}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} align="right">
            Bar weight
          </TableCell>
          {/* <TableCell colSpan={1} /> */}
          <TableCell>{state.currentBar.weight}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} align="right">
            Total
          </TableCell>
          <TableCell>{state.currentWeights.totalWeight} {state.currentUnits}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} align="right">
            Remainder
          </TableCell>
          <TableCell>{state.currentWeights.remainder}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default WeightTable;
