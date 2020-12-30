import React from "react";
import Page from "../../components/Page";
import { makeStyles, Box, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { actions as authActions } from "@redux/auth";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PasswordInput from "../../components/PasswordInput";
import MainButton from "../../components/MainButton";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  form: {
    maxWidth: "700px",
    width: "100%",
    margin: "auto",
  },
}));

function LoginView(props) {
  const classes = useStyles();
  const { actions } = props;
  const { auth } = useSelector((state) => state);
  const { register, handleSubmit, errors } = useForm({});

  const onSubmit = (formData) => {
    actions.loginRequest(formData);
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/app"></Redirect>;
  }

  return (
    <Page title="login" className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <form onSubmit={(e) => e.preventDefault()} className={classes.form}>
          <TextField
            error={errors.email ? true : false}
            helperText={errors.email ? "Invalid Email" : ""}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            size="small"
            id="email"
            autoComplete="email"
            autoFocus
            inputRef={register({
              required: true,
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <PasswordInput
            error={errors.password ? true : false}
            label="password"
            size="small"
            helperText={
              errors.password ? "Passwords must be minimum 8 characters" : ""
            }
            name="password"
            inputRef={register({
              required: true,
              minLength: 8,
            })}
          />
          <Box className={classes.button}>
            <MainButton
              width="100%"
              label="LOG IN"
              background="green"
              border="green"
              hoverColor="white"
              hoverBack="#007000"
              color="white"
              fontSize={16}
              onClick={handleSubmit(onSubmit)}
            ></MainButton>
          </Box>
        </form>
      </Box>
    </Page>
  );
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {
      ...authActions,
    },
    dispatch
  ),
});

export default connect(null, mapDispatchToProps)(LoginView);
