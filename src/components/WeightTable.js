import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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

  const rows = state.currentWeight.plates.map(({ weight, qty }) =>
    createData(weight, qty, weight * qty)
  );
  const totalPerSide = state.currentWeight.plates.reduce((total, plate) => {
    return (total += plate.weight * plate.qty);
  }, 0);

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Plate</TableCell>
          <TableCell># Per Side</TableCell>
          <TableCell>Weight ({state.currentUnits})</TableCell>
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
          <TableCell>{state.currentBar[state.currentUnits]}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} align="right">
            Total
          </TableCell>
          <TableCell>{state.currentWeight.totalWeight} {state.currentUnits}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={3} align="right">
            Remainder
          </TableCell>
          <TableCell>{state.currentWeight.remainder}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default WeightTable;
