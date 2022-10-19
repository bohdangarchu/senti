import * as React from "react";
import { useState } from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ToDatePicker(props) {
  const [value, setValue] = useState(null);

  const correctDate = (draftDate) => {
    let res = [];
    let dateArr = draftDate.split("");
    for (let i = 0; i < dateArr.length; i++) {
      if (i < 8 && i > 0) {
        res.push(dateArr[i]);
      }
    }
    res.unshift("t");
    res.push("-", "0", "1");
    return res;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3}>
        <DatePicker
          disableFuture
          label="To"
          openTo="year"
          views={["year", "month"]}
          value={value}
          onChange={(newValue) => {
            const draftDate = JSON.stringify(newValue);
            const date = correctDate(draftDate);
            setValue(newValue);
            props.onDateSelect(date);
          }}
          onSelect={() => console.log("selected")}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}

// нужно перенести в стейт последнее выбранное время
// при нажатии ок последний элемент из массива должен быть перенесен в новый стейтц
