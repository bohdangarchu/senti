import React from "react";
import { Paper, Typography, Link } from "@mui/material";

export default function Article({ date, sentiment, text, url }) {
  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3, width: "auto" }}>
      <Typography variant="subtitle1" align="left" gutterBottom>
        Date: {date}
      </Typography>
      <Typography variant="subtitle1" align="left" gutterBottom>
        Sentiment: {sentiment}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {text}
      </Typography>
      {/* <Typography variant="subtitle2" gutterBottom> */}
      <Link href={url}>Follow the link to the article</Link>
      {/* </Typography> */}
    </Paper>
  );
}
