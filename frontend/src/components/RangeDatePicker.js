import * as React from "react";
import { Box, TextField, Grid, Button } from "@mui/material/";
import { useState } from "react";
import FromDatePicker from "./FromDatePicker";
import ToDatePicker from "./ToDatePicker";

export default function RangeDatePicker(props) {
  const [fromDate, setFromDate] = useState([]);
  const [toDate, setToDate] = useState();
  const [sentiWord, setSentiWord] = useState("");

  function handleDateSelect(newDate) {
    if (newDate[0] === "f") {
      newDate.shift();
      const joinedDate = newDate.join("");
      setFromDate(joinedDate);
    } else {
      newDate.shift();
      const joinedDate = newDate.join("");
      setToDate(joinedDate);
    }
  }

  return (
    <Grid
      my={10}
      container
      spacing={0.5}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={6} lg={4}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Outlined"
          variant="outlined"
          value={sentiWord}
          onChange={(e) => {
            setSentiWord(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={3} lg={3}>
        <FromDatePicker onDateSelect={handleDateSelect} />
      </Grid>
      <Grid item xs={3} lg={3}>
        <ToDatePicker onDateSelect={handleDateSelect} />
      </Grid>
      <Grid item xs={6} lg={2}>
        <Button
          variant="contained"
          onClick={() => props.onRangeSelect(fromDate, toDate, sentiWord)}
        >
          Generate
        </Button>
      </Grid>
    </Grid>
  );
}
