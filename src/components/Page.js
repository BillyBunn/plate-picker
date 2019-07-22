import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

function Page({ children }) {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={`page ${classes.content}`}>
      <div className={classes.toolbar} />
      {children}
    </Container>
  );
}

export default Page;
