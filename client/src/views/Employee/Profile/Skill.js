import React from "react";
import PropTypes from "prop-types";
import { makeStyles, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

const Skill = ({ data }) => {
  const classes = useStyles();
  console.log(data, "preference");

  return (
    <Grid container>
      <Grid xs={6}>
        <Typography className={classes.asdf}>Shift</Typography>
        {data.shift.map((sh) => {
          return <Typography>{sh}</Typography>;
        })}
      </Grid>
    </Grid>
  );
};

Skill.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Skill;
