import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useContext,
} from "react";
import setAuthToken from "../../utils/setAuthToken";
import { AuthContext } from "../../context";
import Bar_Chart from "../chart/Bar_Chart";
import Profile_Map from "../map/Profile_Map";
import { LOGIN } from "../../reducers/action-types";

import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import "./Profile.scss";

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
        console.log(res.data);
        setUserRatings((prev) => ({ ...res.data }));
      })
      .catch((err) => console.log("Error in deleting rating", err));
  };

  useEffect(() => {
    setAuthToken(localStorage.token);
    axios.get("/user").then((res) => {
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
      <div className="chart-map-container">
        <div className="chart">
          {userRatings ? <Bar_Chart data={userRatings.typeTotal} /> : null}
          <div></div>
        </div>
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
