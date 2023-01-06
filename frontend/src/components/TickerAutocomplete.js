import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function TickerAutocomplete({ tickersList, onTickerSelect }) {
  return (
    <Autocomplete
      freeSolo
      fullWidth
      id="free-solo-2-demo"
      disableClearable
      options={tickersList.map((option) => option.company_name)}
      onChange={(event, value) => onTickerSelect(value)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Find Company"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
