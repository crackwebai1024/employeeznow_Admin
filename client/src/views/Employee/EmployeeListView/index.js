import React, { useEffect } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "@components/Page";
import { actions } from "@redux/employees";
import Results from "./Results";
import Toolbar from "./Toolbar";
import { useDispatch, useSelector } from "react-redux";
import Statistic from "./Statistic";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const CustomerListView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { employees, page, count } = useSelector((state) => state.employees);

  useEffect(() => {
    const filterData = {
      page: page,
      count: count,
    };
    dispatch(actions.getEmployees(filterData));
  }, [page, count, dispatch]);

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Statistic />
        <Toolbar />
        <Box mt={3}>
          <Results customers={employees} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
