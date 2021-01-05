import React from "react";
import { Box, Typography, LinearProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  bar: {
    height: "13px",
    backgroundColor: "#00800080",
  },
  container: {
    marginTop: "0.5rem",
  },
}));

function LinebarwithLabel(props) {
  const classes = useStyles();
  const value = (props.value / props.maxValue) * 100;
  return (
    <Box alignItems="center" className={classes.container}>
      <Box>
        <Typography variant="h5" color="textSecondary">
          {`${Math.round(props.value)}`} | {props.label}
        </Typography>
      </Box>
      <Box width="100%" mr={1}>
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={value}
          className={classes.bar}
        />
      </Box>
    </Box>
  );
}

export default LinebarwithLabel;
