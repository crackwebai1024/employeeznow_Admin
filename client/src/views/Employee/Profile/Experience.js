import React, { Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Typography, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  jobtitle: {
    fontSize: 20,
    fontWeight: 600,
    color: "RGB(23,41, 64)",
  },
  company: {
    fontWeight: 450,
  },
  jobPeriod: {
    color: "gray",
    fontWeight: 300,
    marginBottom: 10,
  },
}));

const Experience = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid item container xs={12}>
      <Grid item xs={12} sm={6} md={4}>
        <Typography className={classes.jobtitle}>
          {data.primaryJob.title}
        </Typography>
        {data.primaryJob && (
          <Fragment>
            <Typography className={classes.company}>
              {data.primaryJob.company}
            </Typography>
            <Typography className={classes.jobPeriod}>
              {data.primaryJob.startDate && (
                <span>
                  {moment(new Date(data.primaryJob.startDate)).format(
                    "MM/YYYY"
                  )}
                </span>
              )}
              {data.primaryJob.current
                ? "Present"
                : data.primaryJob.endDate && (
                    <span>
                      &nbsp;~&nbsp;
                      {moment(new Date(data.primaryJob.endDate)).format(
                        "MM/YYYY"
                      )}
                    </span>
                  )}
            </Typography>
          </Fragment>
        )}
      </Grid>
      {data.secondaryJob.title && (
        <Grid item xs={12} sm={6} md={4}>
          <Typography className={classes.jobtitle}>
            {data.secondaryJob.title}
          </Typography>
          {data.secondaryJob && (
            <Fragment>
              <Typography className={classes.company}>
                {data.secondaryJob.company}
              </Typography>
              <Typography className={classes.jobPeriod}>
                {data.secondaryJob.startDate && (
                  <span>
                    {moment(new Date(data.secondaryJob.startDate)).format(
                      "MM/YYYY"
                    )}
                  </span>
                )}
                {data.secondaryJob.endDate && (
                  <span>
                    &nbsp;~&nbsp;
                    {moment(new Date(data.secondaryJob.endDate)).format(
                      "MM/YYYY"
                    )}
                  </span>
                )}
              </Typography>
            </Fragment>
          )}
        </Grid>
      )}
      {data.otherJob.map(
        (job, i) =>
          job.title && (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Typography className={classes.jobtitle}>{job.title}</Typography>
              <Fragment>
                <Typography className={classes.company}>
                  {job.company}
                </Typography>
                <Typography className={classes.jobPeriod}>
                  {job.startDate &&
                    moment(new Date(job.startDate)).format("MM/YYYY")}
                  {job.endDate && (
                    <span>
                      &nbsp;~ &nbsp;
                      {moment(new Date(job.endDate)).format("MM/YYYY")}
                    </span>
                  )}
                </Typography>
              </Fragment>
            </Grid>
          )
      )}
    </Grid>
  );
};

Experience.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Experience;
