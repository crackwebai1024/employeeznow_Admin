import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flex: {
    display: "flex",
  },
  container: {
    background: "white",
    position: "relative",
    padding: "1rem",
  },
}));

const Skill = ({ data }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={6} className={classes.flex}>
        <Typography>Shift: </Typography>
        {data.shift.map((sh, key) => {
          return <Typography key={key}>{sh}</Typography>;
        })}
      </Grid>
      <Grid item xs={6}>
        <Typography>Style</Typography>
        {data.style.map((st, key) => (
          <Typography key={key}>
            {st.type} of {st.years} years
          </Typography>
        ))}
      </Grid>
      <Grid item xs={6}>
        <Grid item xs={6}>
          {data.systems.map((sys, key) => (
            <Typography key={key}>{sys}</Typography>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid item xs={6}>
          {data.cuisine.map((cui, key) => (
            <Typography key={key}>
              {cui.type} of {cui.years} years
            </Typography>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

Skill.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Skill;
