import React, { useEffect, useState } from "react";
import { actions } from "@redux/employees";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import LinebarwithLabel from "@components/LinebarwithLabel";

const useStyles = makeStyles((theme) => ({
  container: {
    background: "white",
    padding: "1rem",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
  },
  content: {
    marginLeft: "0px",
    overflowY: "hidden",
  },
  showButton: {
    cursor: "pointer",
  },
  showMore: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderTop: "1px solid gray",
    paddingTop: "0.5rem",
    marginTop: "1rem",
  },
}));

function Statistic(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { employeeStatis } = useSelector((state) => state.employees);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    dispatch(actions.getEmployeeSta());
  }, [dispatch]);

  console.log(employeeStatis, "employeeStatis");
  return (
    employeeStatis && (
      <Grid container item xs={12} className={classes.container}>
        <Grid
          container
          item
          xs={12}
          className={classes.content}
          spacing={3}
          style={{ height: showMore ? "100%" : "250px" }}
        >
          <Grid item xs={4}>
            {employeeStatis.addressData.map((address, key) => (
              <LinebarwithLabel
                key={key}
                value={address.count}
                maxValue={employeeStatis.addressData[0].count}
                label={address._id}
              />
            ))}
          </Grid>
          <Grid item xs={4}>
            {employeeStatis.employeementStatus.map((status, key) => (
              <LinebarwithLabel
                key={key}
                value={status.count}
                maxValue={employeeStatis.employeementStatus[0].count}
                label={status._id}
              />
            ))}
          </Grid>
          <Grid item xs={4}>
            {employeeStatis.experienceByGrouping.map((exp, key) => (
              <LinebarwithLabel
                value={exp.count}
                maxValue={employeeStatis.experienceByGrouping[0].count}
                label={exp._id}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.showMore}>
          <Typography
            variant="h5"
            onClick={(e) => setShowMore(!showMore)}
            className={classes.showButton}
          >
            {showMore ? "Show Less" : "Show More"}
          </Typography>
        </Grid>
      </Grid>
    )
  );
}

export default Statistic;
