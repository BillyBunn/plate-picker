import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function createData(weight, qty) {
  return { weight, qty };
}

const rows = [
  createData('45 lb bar', 1),
  createData('45', 2),
  createData('25', 2),
  createData('10', 2),
  createData('5', 2)
];

const WeightTable = props => {
  const classes = useStyles();

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Weight</TableCell>
          <TableCell >Per Side</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(row => (
          <TableRow key={row.weight}>
            <TableCell component="th" scope="row">
              {row.weight}
            </TableCell>
            <TableCell >{row.qty}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WeightTable;
