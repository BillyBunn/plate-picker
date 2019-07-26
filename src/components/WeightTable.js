import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTheme } from '@material-ui/styles';
import { Application } from '../App';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    maxWidth: 650
  },
  totalRow: {
    background: theme.palette.secondary.main,
    color: theme.palette.primary.main
    // color: '#ffffff'
  }
}));

function createData(weight, qty, sub) {
  return { weight, qty, sub };
}

const WeightTable = props => {
  const theme = useTheme();
  const classes = useStyles(theme);
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
          <TableCell align="right">Plate</TableCell>
          <TableCell align="right"># Per Side</TableCell>
          <TableCell align="right">Weight ({state.currentUnits})</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.weight}>
            <TableCell component="th" scope="row" align="right">
              {row.weight}
            </TableCell>
            <TableCell align="right">{row.qty}</TableCell>
            <TableCell align="right">{row.sub}</TableCell>
          </TableRow>
        ))}

        <TableRow>
          <TableCell colSpan={2} align="right">
            {state.currentUnits} on each side
          </TableCell>
          <TableCell align="right">{totalPerSide}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={2} align="right">
            &times; 2 sides
          </TableCell>
          <TableCell align="right">{totalPerSide * 2}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell colSpan={2} align="right">
            Bar weight
          </TableCell>
          <TableCell align="right">
            {state.currentBar[state.currentUnits]}
          </TableCell>
        </TableRow>

        <TableRow className={classes.totalRow}>
          <TableCell colSpan={2} align="right">
            Total
          </TableCell>
          <TableCell align="right">
            {state.currentWeight.totalWeight} {state.currentUnits}
          </TableCell>
        </TableRow>
        {state.currentWeight.remainder > 0 && (
          <TableRow>
            <TableCell colSpan={2} align="right">
              Remainder
            </TableCell>
            <TableCell align="right">{state.currentWeight.remainder}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default WeightTable;
