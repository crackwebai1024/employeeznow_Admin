import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const Skill = ({ data }) => {
  const classes = useStyles();
  console.log(data, "preference");

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography className={classes.asdf}>Shift</Typography>
        {data.shift.map((sh, key) => {
          return <Typography key={key}>{sh}</Typography>;
        })}
      </Grid>
      <Grid item xs={6}>
        <Typography className={classes.asdf}>Style</Typography>
        {data.style.map((st, key) => (
          <Typography>{st}</Typography>
        ))}
      </Grid>
    </Grid>
  );
};

Skill.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Skill;
