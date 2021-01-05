import React, { useState } from "react";
import { Grid, TextField, Select, FormControl } from "@material-ui/core";
import { Container, InputLabel, makeStyles } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { usaStates } from "@data/professionTypes";
import MainButton from "@components/MainButton";

const invalidError = "This field is invalid!";

const useStyles = makeStyles((theme) => ({
  stateLabel: {
    background: "white",
  },
  formControl: {
    marginTop: "1rem",
  },
  container: {
    padding: "2rem",
  },
}));

const BasicForm = ({ data, id, onSubmit }) => {
  const classes = useStyles();
  const [state, setState] = useState(data.address.state);
  const { register, handleSubmit, errors } = useForm({
    defaultValues: data,
  });

  const onUpdate = (formData) => {
    formData.address.state = state;
    onSubmit({ ...formData, id });
  };

  const handleChange = (e) => {
    setState(e.target.value);
  };

  return (
    <Container component="main" maxWidth="sm" className={classes.container}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={classes.wrapper}
      >
        <form onSubmit={(e) => e.preventDefault()}>
          <Grid item container direction="row" spacing={1}>
            <Grid item xs={12}>
              <TextField
                error={errors.firstName ? true : false}
                helperText={errors.firstName ? invalidError : ""}
                required
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                name="firstName"
                label="First Name"
                type="text"
                autoComplete="firstName"
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.middleName ? true : false}
                helperText={errors.middleName ? invalidError : ""}
                variant="outlined"
                size="small"
                margin="normal"
                fullWidth
                name="middleName"
                label="Middle Name"
                type="text"
                autoComplete="middleName"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.lastName ? true : false}
                helperText={errors.lastName ? invalidError : ""}
                required
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                name="lastName"
                label="Last Name"
                type="text"
                autoComplete="lastName"
                inputRef={register({ required: true })}
              />
            </Grid>
            <Grid item sm={8} xs={12}>
              <TextField
                error={errors.address && errors.address.street1 ? true : false}
                helpertext={
                  errors.address && errors.address.street1 ? invalidError : ""
                }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                size="small"
                name="address.street1"
                label="Street"
                type="text"
                autoComplete="street1"
                inputRef={register({ required: true, minLength: 2 })}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                size="small"
                name="address.street2"
                label="Apt / Suite"
                type="text"
                autoComplete="street2"
                inputRef={register}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                error={errors.address && errors.address.city ? true : false}
                helpertext={
                  errors.address && errors.address.city ? invalidError : ""
                }
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="address.city"
                label="City"
                type="text"
                size="small"
                autoComplete="city"
                inputRef={register({ required: true, minLength: 2 })}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <FormControl
                required
                size="small"
                variant="outlined"
                fullWidth
                name="address.state"
                className={classes.formControl}
              >
                <InputLabel
                  htmlFor="address.state"
                  className={classes.stateLabel}
                >
                  State
                </InputLabel>

                <Select
                  native
                  name="address.state"
                  value={state}
                  onChange={(e) => handleChange(e)}
                >
                  {usaStates.map((option, item) => {
                    return (
                      <option key={item} value={option.value}>
                        {option.label}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={4} xs={12}>
              <TextField
                error={errors.address && errors.address.zipcode ? true : false}
                helperText={
                  errors.address && errors.address.zipcode ? invalidError : ""
                }
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="address.zipcode"
                label="Zip Code"
                type="text"
                size="small"
                id="zipcode"
                autoComplete="zipcode"
                inputRef={register({
                  required: true,
                  minLength: 5,
                  maxLength: 5,
                  pattern: /^[0-9]*$/,
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={errors.email ? true : false}
                helperText={errors.email ? invalidError : ""}
                required
                variant="outlined"
                margin="normal"
                fullWidth
                name="email"
                size="small"
                label="Email Address"
                type="email"
                id="email"
                autoComplete="email"
                inputRef={register({
                  required: true,
                  pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                error={errors.cell ? true : false}
                helperText={errors.cell ? "Phone number is Invalid" : ""}
                required
                variant="outlined"
                margin="normal"
                size="small"
                fullWidth
                name="cell"
                label="Phone Number"
                type="tel"
                id="cell"
                autoComplete="cell"
                inputRef={register({
                  required: true,
                  minLength: 11,
                  maxLength: 11,
                  pattern: /^[0-9]*$/,
                })}
              />
            </Grid>
            <Grid item xs={12}>
              <MainButton
                width="100%"
                label="Update"
                background="green"
                border="green"
                hoverColor="white"
                hoverBack="#007000"
                color="white"
                fontSize={16}
                onClick={handleSubmit(onUpdate)}
              ></MainButton>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
};

export default BasicForm;
