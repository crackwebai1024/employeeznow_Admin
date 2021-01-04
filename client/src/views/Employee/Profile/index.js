import React from "react";
import Page from "@components/Page";
import { Box, Container, makeStyles } from "@material-ui/core";
import Main from "./Main";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const EmployeeProfile = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Box mt={3}>
          <Main />
        </Box>
      </Container>
    </Page>
  );
};

export default EmployeeProfile;
