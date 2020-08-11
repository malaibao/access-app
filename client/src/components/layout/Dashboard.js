import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    height: '100%',
  },
  paper: {
    margin: theme.spacing(1),
    width: 'auto',
    height: 'auto',
    textAlign: 'center',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  number: {
    marginBottom: '2rem',
    fontSize: '2rem',
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.number}>68</div>
        <div className={classes.title}>Total Contribution</div>
      </Paper>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.number}>68</div>
        <div className={classes.title}>% of contribution to Access For You</div>
      </Paper>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.number}>68</div>
        <div className={classes.title}>Pins added in the last 30 days</div>
      </Paper>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.number}>68</div>
        <div className={classes.title}>Total Contribution</div>
      </Paper>
    </div>
  );
};

export default Dashboard;
