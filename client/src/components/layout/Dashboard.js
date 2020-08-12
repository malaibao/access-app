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

const Dashboard = ({
  totalContribution,
  percentContribution,
  mostRatedType,
  totalRatings,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <>
        {totalContribution ? (
          <Paper className={classes.paper} elevation={3}>
            <div className={classes.number}>{totalContribution}</div>
            <div className={classes.title}>
              Total Contribution of Pins and Ratings
            </div>
          </Paper>
        ) : null}
        {percentContribution ? (
          <Paper className={classes.paper} elevation={3}>
            <div className={classes.number}>{percentContribution}</div>
            <div className={classes.title}>
              % of Contribution to Access For You
            </div>
          </Paper>
        ) : null}
        {mostRatedType ? (
          <Paper className={classes.paper} elevation={3}>
            <div className={classes.number}>{mostRatedType}</div>
            <div className={classes.title}>Most Rated Type</div>
          </Paper>
        ) : null}
        {totalRatings ? (
          <Paper className={classes.paper} elevation={3}>
            <div className={classes.number}>{totalRatings}</div>
            <div className={classes.title}>
              Ratings Added in the Last 30 Days
            </div>
          </Paper>
        ) : null}
      </>
    </div>
  );
};

export default Dashboard;
