import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Grid,
  makeStyles,
  Dialog,
  Box,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import BasicForm from "./EditForm/BasicForm";
import { actions } from "@redux/employees";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "1rem 1rem",
    background: "white",
    position: "relative",
    display: "flex",
    alignItems: "center",
    minHeight: "60px",
  },
  editIcon: {
    float: "right",
    borderRadius: "50%",
    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
  },
}));

const Basic = ({ data }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const history = useHistory();
  const id = history.location.pathname.split("/")[3];

  const onUpdate = async (data) => {
    await dispatch(actions.updateBasic(data));
    setOpenDialog(false);
  };
  return (
    <Grid container item xs={12} className={classes.container}>
      <Dialog
        open={openDialog}
        maxWidth="lg"
        onClose={(e) => setOpenDialog(false)}
      >
        <BasicForm data={data} id={id} onSubmit={onUpdate} />
      </Dialog>
      <Grid item xs={12} sm={6} md={3}>
        <Typography>Email: {data.email}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography>
          Name: {data.firstName} {data.lastName}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography>Phone: {data.cell}</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography>
          Address: {data.address.city} {data.address.state}{" "}
          {data.address.street1}
          {data.address.street2} {data.address.zipcode}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box className={classes.editIcon} onClick={(e) => setOpenDialog(true)}>
          <IconButton color="primary" aria-label="edit work history">
            <EditIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  );
};

Basic.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Basic;
