import React from "react";
import PropTypes from "prop-types";
import { Typography, makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
  },
}));

const Preference = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography>{data.employmentStatus}</Typography>
      </Grid>
      <Grid item xs={4} className={classes.flex}>
        <Typography>US$ {data.idealSalary.amount} / </Typography>
        <Typography>{data.idealSalary.unit}</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography>{data.milesToWork} miles</Typography>
      </Grid>
    </Grid>
  );
};

Preference.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Preference;
