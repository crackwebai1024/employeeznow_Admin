import React, { useEffect } from "react";
import { actions } from "@redux/employees";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    background: "white",
    padding: "1rem",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
  },
}));

function Statistic(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { employeeStatis } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(actions.getEmployeeSta());
  }, [dispatch]);

  console.log(employeeStatis, "employeeStatis");
  return (
    employeeStatis && (
      <Grid container item xs={12} className={classes.container}>
        <Grid item xs={4}>
          {employeeStatis.addressData.map((address, key) => (
            <Typography key={key}>
              {address.count} employees in {address._id}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={4}>
          {employeeStatis.employeementStatus.map((status, key) => (
            <Typography key={key}>
              {status.count} employees on {status._id}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={4}>
          {employeeStatis.experienceByGrouping.map((exp, key) => (
            <Typography key={key}>
              {exp.count} employees with {exp._id}
            </Typography>
          ))}
        </Grid>
      </Grid>
    )
  );
}

export default Statistic;
