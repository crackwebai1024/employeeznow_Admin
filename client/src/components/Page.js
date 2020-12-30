import React, { forwardRef } from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";
import { makeStyles, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
  },
  content: {
    width: "100%",
  },
  nav: {
    minWidth: "250px",
    transition: "0.3s",
    [theme.breakpoints.down("md")]: {
      minWidth: "0px",
    },
  },
}));

const Page = forwardRef(({ children, title = "", ...rest }, ref) => {
  const classes = useStyles();

  return (
    <div ref={ref} {...rest}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Box className={classes.wrapper}>
        <Box className={classes.nav}></Box>
        <Box className={classes.content}>{children}</Box>
      </Box>
    </div>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Page;
