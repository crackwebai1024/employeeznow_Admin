import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import {
  Typography,
  Grid,
  makeStyles,
  IconButton,
  Box,
  Dialog,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Workhistory from "./EditForm/Workhistory";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: "0px",
    padding: "1rem 0px",
    position: "relative",
    minHeight: "80px",
    background: "white",
  },
  editIcon: {
    position: "absolute",
    right: 10,
    borderRadius: "50%",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
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
  description: {
    wordBreak: "break-all",
  },
}));

const Experience = ({ data }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Grid item container xs={12} spacing={3} className={classes.container}>
      <Dialog
        open={openDialog}
        maxWidth="lg"
        onClose={(e) => setOpenDialog(false)}
      >
        <Workhistory experience={data} onClose={(e) => setOpenDialog(false)} />
      </Dialog>
      <Box className={classes.editIcon} onClick={(e) => setOpenDialog(true)}>
        <IconButton color="primary" aria-label="edit work history">
          <EditIcon />
        </IconButton>
      </Box>
      {data && (
        <Fragment>
          <Grid item xs={12} sm={6} md={4}>
            <Typography className={classes.jobtitle}>
              {data.primaryJob.title}
            </Typography>
            {data.primaryJob && (
              <Fragment>
                <Typography className={classes.company}>
                  Company: {data.primaryJob.company}
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
                <Typography className={classes.description}>
                  {data.primaryJob.description}
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
                    Company: {data.secondaryJob.company}
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
                  <Typography className={classes.description}>
                    {data.secondaryJob.description}
                  </Typography>
                </Fragment>
              )}
            </Grid>
          )}
          {data.otherJob.map(
            (job, i) =>
              job.title && (
                <Grid item xs={12} sm={6} md={4} key={i}>
                  <Typography className={classes.jobtitle}>
                    {job.title}
                  </Typography>
                  <Fragment>
                    <Typography className={classes.company}>
                      Company: {job.company}
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
                    <Typography className={classes.description}>
                      {job.description}
                    </Typography>
                  </Fragment>
                </Grid>
              )
          )}
        </Fragment>
      )}
    </Grid>
  );
};

Experience.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Experience;
