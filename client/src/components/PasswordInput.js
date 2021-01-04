import { InputAdornment } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  eye: {
    cursor: "pointer",
  },
}));

function PasswordInput(props) {
  const classes = useStyles();

  const [passwordIsMasked, setPasswordIsMasked] = useState(true);

  const togglePasswordMask = () => {
    setPasswordIsMasked(!passwordIsMasked);
  };

  return (
    <TextField
      type={passwordIsMasked ? "password" : "text"}
      required
      fullWidth
      margin="normal"
      variant="outlined"
      autoComplete="password"
      {...props}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {passwordIsMasked ? (
              <VisibilityIcon
                className={classes.eye}
                onClick={togglePasswordMask}
              />
            ) : (
              <VisibilityOffIcon
                className={classes.eye}
                onClick={togglePasswordMask}
              />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordInput;
