import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function DenseTable() {
  const classes = useStyles();
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    axios.get("/user").then((res) => {
      setUserRatings(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    const url = `/user/${id}`;
    axios
      .post(url)
      .then((res) => {
        setUserRatings(res.data);
      })
      .catch((err) => console.log("Error in deleting rating", err));
  };

  const showOptions = (rating) => {
    const options = [];
    if (rating.accessible_parking) {
      options.push("accessible parking");
    }
    if (rating.accessible_washroom) {
      options.push("accessible washroom");
    }
    if (rating.alternative_entrance) {
      options.push("alternative entrance");
    }
    if (rating.automatic_door) {
      options.push("automatic door");
    }
    if (rating.elevator) {
      options.push("elevator");
    }
    if (rating.braille) {
      options.push("braille");
    }
    if (rating.gender_neutral_washroom) {
      options.push("gender neutral washroom");
    }
    if (rating.large_print) {
      options.push("large print");
    }
    if (rating.outdoor_access_only) {
      options.push("outdoor access only");
    }
    if (rating.quiet) {
      options.push("quiet");
    }
    if (rating.ramp) {
      options.push("ramp");
    }
    if (rating.scent_free) {
      options.push("scent free");
    }
    if (rating.service_animal_friendly) {
      options.push("service animal friendly");
    }
    if (rating.sign_language) {
      options.push("sign language");
    }
    if (rating.spacious) {
      options.push("spacious");
    }
    if (rating.stopgap_ramp) {
      options.push("stopgap ramp");
    }
    return <>{options.join(", ")}</>;
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow id="table-head">
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Accessibility Options</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userRatings.length > 0 &&
            userRatings.map((rating) => (
              <TableRow key={rating.id}>
                <TableCell component="th" scope="row">
                  {rating.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {rating.address}
                </TableCell>
                <TableCell component="th" scope="row">
                  {showOptions(rating)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(rating.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
