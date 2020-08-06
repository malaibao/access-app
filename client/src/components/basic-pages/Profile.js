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
      console.log("res.data", res.data);
      setUserRatings(res.data);
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Accessibility Options</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* pin info
            rating info */}
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
                  {}
                </TableCell>
                <TableCell align="right">
                  <button>Delete</button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
