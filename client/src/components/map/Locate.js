import React from "react";
import ExploreIcon from '@material-ui/icons/Explore';

import './Locate.scss';
  
  const Locate = ({panTo}) => {
    return (
      <button className="location" onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
          panTo({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        }, () => null)
      }}>
      {/* <img src="compass.png" alt="compass locate me" /> */}
      <ExploreIcon fontSize="large" />
      </button>
    )
  }

  export default Locate;