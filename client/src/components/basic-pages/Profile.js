import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import setAuthToken from '../../utils/setAuthToken';
import { AuthContext } from '../../context';
import Bar_Chart from '../chart/Bar_Chart';
import Profile_Map from '../map/Profile_Map';
import { LOGIN } from '../../reducers/action-types';

import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Profile() {
  const classes = useStyles();
  const { authState, dispatch } = useContext(AuthContext);
  const [userRatings, setUserRatings] = useState([]);

  // useEffect(() => {
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //     dispatch({ type: LOGIN, payload: localStorage.token });
  //   }
  // }, []);

  useEffect(() => {
    setAuthToken(localStorage.token);
    axios.get('/user').then((res) => {
      console.log(res.data);
      setUserRatings(res.data);
    });
  }, [setAuthToken, setUserRatings]);

  const handleDelete = (id) => {
    const url = `/user/${id}`;
    axios
      .post(url)
      .then((res) => {
        setUserRatings(res.data);
      })
      .catch((err) => console.log('Error in deleting rating', err));
  };

  const mapRef = useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  return (
    <div>
      <div>
        {userRatings ? <Bar_Chart data={userRatings.typeTotal} /> : null}
      </div>
      <div>
        <Profile_Map
          pins={userRatings.ratings}
          onMapLoad={onMapLoad}
          chosenPin={null}
          panTo={panTo}
        />
      </div>
    </div>
    //   <div>hello</di
    //   <div>{userRatings && <Chart data={userRatings.typeTotal} />}</div>

    /* {!userRatings && <p>Loading</p>}
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size='small'
          aria-label='a dense table'
        >
          <TableHead>
            <TableRow id='table-head'>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Accessibility Options</TableCell>
              <TableCell align='right'></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRatings.length > 0 &&
              userRatings.map((rating) => (
                <TableRow key={rating.id}>
                  <TableCell component='th' scope='row'>
                    {rating.name}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {rating.address}
                  </TableCell>
                  <TableCell component='th' scope='row'>
                    {showOptions(rating)}
                  </TableCell>
                  <TableCell align='right'>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => handleDelete(rating.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> */
  );
}
