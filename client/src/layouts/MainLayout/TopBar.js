import React from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
import Logo from "@components/Logo";

const useStyles = makeStyles({
  root: {},
  toolbar: {
    height: 64,
  },
  image: {
    paddingTop: "10px",
    maxWidth: "280px",
    width: "100%",
  },
});

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/login">
          <Logo className={classes.image} />
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
};

export default TopBar;
