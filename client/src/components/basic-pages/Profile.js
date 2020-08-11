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

import './Profile.scss';
import Dashboard from '../layout/Dashboard';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Profile() {
  const classes = useStyles();
  const { authState, dispatch } = useContext(AuthContext);
  const [userRatings, setUserRatings] = useState([]);

  const handleDeleteInChild = (ratingId) => {
    const url = `/user/${ratingId}`;
    axios
      .post(url)
      .then((res) => {
        setUserRatings((prev) => ({ ...res.data }));
      })
      .catch((err) => console.log('Error in deleting rating', err));
  };

  useEffect(() => {
    setAuthToken(localStorage.token);
    axios.get('/user').then((res) => {
      console.log(res.data);
      setUserRatings(res.data);
    });
  }, [setAuthToken]);

  const mapRef = useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  return (
    <>
      <div className='chart-map-container'>
        <div className='chart-map-container__left'>
          <div className='chart-map-container__left-chart'>
            {userRatings ? <Bar_Chart data={userRatings.typeTotal} /> : null}
          </div>
          <div className='chart-map-container__left-dashboard'>
            {/* <Dashboard /> */}
            {/* {userRatings ? <Dashboard data={ {userRatings.totalContribution} /> : null} */}
          </div>
        </div>
        <></>
        <Profile_Map
          pins={userRatings.ratings}
          onMapLoad={onMapLoad}
          chosenPin={null}
          panTo={panTo}
          handleDeleteInChild={handleDeleteInChild}
        />
      </div>
    </>
  );
}
