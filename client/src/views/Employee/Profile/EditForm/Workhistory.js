import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  useTheme,
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import MainButton from "@components/MainButton";
import { jobTypes } from "@data/professionTypes";
import AddBoxIcon from "@material-ui/icons/AddBox";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import { actions } from "@redux/employees";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useDispatch } from "react-redux";

// set style
const useStyles = makeStyles((theme) => ({
  green: {
    color: theme.palette.common.green,
  },
  heading1: {
    marginTop: "5rem",
    marginBottom: "1.5rem",
    fontSize: "2rem",
    color: theme.palette.primary.main,
  },
  center: {
    textAlign: "center",
  },
  excludeIcon: {
    display: "flex",
    width: "100px",
    paddingTop: "0.5rem",
    fontWeight: 600,
  },
  formContainer: {
    // marginTop: "1rem",
  },
  textContainer: {
    marginTop: "2rem",
  },
  addOtherJob: {
    fontSize: "40px",
    margin: "1rem 0 1rem 0",
    cursor: "pointer",
  },
  dialog: {
    padding: "2rem",
    textAlign: "center",
  },
  error: {
    color: "red",
  },
  description: {
    marginTop: "1rem",
  },
  checkboxText: {
    marginTop: "1.5rem",
  },
  item: {
    "& .MuiInput-input": {
      color: theme.palette.grey[700],
    },
    "& .MuiFormControlLabel-label": {
      fontSize: "0.85rem",
      color: theme.palette.grey[700],
    },
  },
  button: {
    marginTop: "2rem",
    float: "right",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  invalidMessage: {
    textAlign: "center",
    color: theme.palette.error.main,
    marginBottom: "2rem",
  },
  contactEmail: {
    paddingTop: "3rem",
  },
  close: {
    cursor: "pointer",
  },
  goback_button: {
    marginTop: "2rem",
    float: "left",
    [theme.breakpoints.down("xs")]: {
      float: "none",
    },
  },
  menuItem: {
    maxHeight: "500px",
  },
  container: {
    paddingBottom: "2rem",
  },
}));

const Workhistory = ({ experience, onClose }) => {
  const [formData, setFormData] = useState({
    summary: "",
    primaryJob: {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      years: 0,
      current: false,
    },
    secondaryJob: {
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      years: 0,
    },
    employmentStatus: "",
    exclude: [],
  });
  const [error, setError] = useState({
    primaryJob: "",
  });

  // material-ui
  const classes = useStyles();
  const theme = useTheme();
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  // disablt 'end date' for primaryJob if current was checked
  const [toDisabled, setToDisabled] = useState(formData.primaryJob.current);
  const [toggleBox, setToggleBox] = useState(false);

  const [otherJobs, setOtherJobs] = useState([]);
  const [reload, setReload] = useState(false);
  const [limit, setLimit] = useState(false);
  const dispatch = useDispatch();
  // load profession details and set default

  useEffect(() => {
    if (experience) {
      if (experience.primaryJob.current) {
        setToDisabled(true);
      }
      setFormData(experience);
      setOtherJobs(experience.otherJob);
    }
  }, [experience]);

  // destructure
  const { primaryJob, secondaryJob, summary } = formData;
  const history = useHistory();
  const { handleSubmit } = useForm({});

  const onChange = ({ target: { id, name, value, checked } }) => {
    console.log("id:", id, "name:", name, "value:", value, "checked", checked);
    switch (name) {
      case "employmentStatus": {
        return setFormData({ ...formData, [name]: value });
      }
      case "primaryJob": {
        return setFormData({
          ...formData,
          [name]: value,
        });
      }
      case "endDate":
        if (new Date(formData[id].startDate) > value) {
          setError({
            ...error,
            [id]: "Your end date can’t be earlier than your start date.",
          });
        } else {
          setError({
            ...error,
            [id]: "",
          });
        }
        let years = 0;
        if (formData[id].startDate && formData[id].endDate) {
          let start = new Date(formData[id].startDate);
          let end = new Date(formData[id].endDate);
          years = (end - start) / 86400000 / 365;
        }
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: value, years: years },
        }));
        break;
      case "startDate": {
        if (formData[id].endDate && formData[id].endDate < value) {
          setError({
            ...error,
            [id]: "Your end date can’t be earlier than your start date.",
          });
        } else {
          setError({
            ...error,
            [id]: "",
          });
        }
        let years = 0;
        if (formData[id].startDate && formData[id].endDate) {
          let start = new Date(formData[id].startDate);
          let end = new Date(formData[id].endDate);
          years = (end - start) / 86400000 / 365;
        }
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: value, years: years },
        }));
        break;
      }
      case "current": {
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: checked },
        }));
        if (checked) {
          setError({ ...error, [id]: "" });
        } else {
          if (formData[id].startDate > formData[id].endDate) {
            setError({
              ...error,
              [id]: "Your end date can’t be earlier than your start date.",
            });
          }
        }
        setToDisabled(!toDisabled);
        break;
      }
      case "status": {
        setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: checked },
        }));
        setToggleBox(!toggleBox);
        break;
      }
      case "summary":
        setFormData((prevState) => ({
          ...prevState,
          summary: value,
        }));
        break;
      case "company":
      case "description":
      case "jobTitle":
      default:
        return setFormData((prevState) => ({
          ...prevState,
          [id]: { ...prevState[id], [name]: value },
        }));
    }
  };

  const onSubmit = async (e) => {
    if (error.primaryJob) {
      return;
    }
    let data = {
      ...formData,
    };

    let path = history.location.pathname;
    let submitData = {
      summary: data.summary,
      primaryJob: data.primaryJob,
      secondaryJob: data.secondaryJob,
      otherJob: otherJobs,
      id: path.split("/")[3],
    };
    window.scrollTo(0, 0);
    await dispatch(actions.updateJobExperience(submitData));
    onClose();
  };

  const handleInput = (name, value, key) => {
    let data = otherJobs;
    data[key][name] = value;
    if (data[key].startDate && data[key].endDate) {
      let start = new Date(data[key].startDate);
      let end = new Date(data[key].endDate);
      let years = Number((end - start) / 86400000 / 365);
      data[key].years = years;
    }

    setOtherJobs(data);
    setReload(!reload);
  };

  const addOtherJobs = () => {
    if (otherJobs.length >= 5) {
      setLimit(true);
      return;
    }
    let otherJob = otherJobs;
    otherJob.push({});
    setOtherJobs(otherJob);
    setReload(!reload);
  };

  const onJobTitleChange = (e, id) => {
    setFormData((prevState) => ({
      ...prevState,
      [id]: { ...prevState[id], title: e.target.value },
    }));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container maxWidth="md" className={classes.container}>
        <Grid
          container
          direction="column"
          alignItems={matchesXS ? "center" : "flex-start"}
        >
          <Grid item>
            <Typography variant="h1" className={classes.heading1}>
              WORK EXPERIENCE
            </Typography>
          </Grid>
        </Grid>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={classes.formContainer}
        >
          <Grid
            container
            direction="column"
            alignItems={matchesXS ? "center" : "flex-start"}
          >
            {/* {corver letter} */}
            <Grid item>
              <Typography gutterBottom variant="h6">
                Summary/Cover Letter
              </Typography>
            </Grid>

            <Grid
              container
              justify="flex-start"
              direction={matchesXS ? "column" : "row"}
              alignItems="center"
            >
              <Grid item xs={12} sm={12}>
                <TextField
                  id="summary"
                  name="summary"
                  label=""
                  multiline
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={summary}
                  onChange={(e) => onChange(e)}
                  rows={4}
                  className={classes.description}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            {/* primary job */}
            <Grid item>
              <Typography gutterBottom variant="h6">
                Current/Last Job
              </Typography>
            </Grid>

            <Grid
              container
              justify="flex-start"
              direction={matchesXS ? "column" : "row"}
              alignItems="center"
            >
              <Grid container item spacing={1}>
                <Grid item sm={3} xs={12}>
                  {primaryJob && (
                    <TextField
                      required
                      select
                      label="Primary Job"
                      id="primaryJob"
                      fullWidth
                      name="title"
                      value={primaryJob.title}
                      // error={error.primaryJob}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => onJobTitleChange(e, "primaryJob")}
                      paperprops={{
                        style: {
                          maxHeight: 500,
                          width: "20ch",
                        },
                      }}
                    >
                      {jobTypes.map((job) => {
                        return (
                          <MenuItem key={job} value={job} id="primaryJob">
                            {job}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  )}
                </Grid>
                <Grid item sm={3} xs={12}>
                  <TextField
                    type="text"
                    name="company"
                    id="primaryJob"
                    required
                    fullWidth
                    label="Company Name"
                    InputLabelProps={{ shrink: true }}
                    value={primaryJob.company}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item sm={3} xs={6}>
                  <KeyboardDatePicker
                    autoOk
                    format="MM/yyyy"
                    views={["year", "month"]}
                    onChange={(e) =>
                      onChange({
                        target: {
                          id: "primaryJob",
                          name: "startDate",
                          value: e,
                          checked: false,
                        },
                      })
                    }
                    value={primaryJob.startDate ? primaryJob.startDate : null}
                    variant="inline"
                    name="startDate"
                    InputLabelProps={{ shrink: true }}
                    label="Start Date"
                  />
                </Grid>

                <Grid item sm={3} xs={6}>
                  {!toDisabled && (
                    <KeyboardDatePicker
                      autoOk
                      label="End Date"
                      variant="inline"
                      format="MM/yyyy"
                      views={["year", "month"]}
                      onChange={(e) =>
                        onChange({
                          target: {
                            id: "primaryJob",
                            name: "endDate",
                            value: e,
                            checked: false,
                          },
                        })
                      }
                      InputLabelProps={{ shrink: true }}
                      value={primaryJob.endDate ? primaryJob.endDate : null}
                      className={classes.item}
                    />
                  )}
                </Grid>
              </Grid>
              <Grid container>
                <Typography>{primaryJob.error}</Typography>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="primaryJob"
                    name="description"
                    label="Description"
                    multiline
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={primaryJob.description}
                    onChange={(e) => onChange(e)}
                    rows={4}
                    className={classes.description}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.error}>
              {error.primaryJob && error.primaryJob}
            </Grid>

            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    name="current"
                    id="primaryJob"
                    checked={primaryJob.current}
                    value={primaryJob.current}
                    onChange={(e) => onChange(e)}
                  />
                }
                label="Current"
              />
            </Grid>

            <Grid item>
              <Typography gutterBottom variant="h6">
                Previous Job
              </Typography>
            </Grid>

            <Grid
              container
              justify="flex-start"
              direction={matchesXS ? "column" : "row"}
              alignItems="center"
            >
              <Grid container item spacing={1}>
                <Grid item sm={3} xs={12}>
                  <TextField
                    select
                    label="Previous Job"
                    id="secondaryJob"
                    name="title"
                    value={secondaryJob.title}
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => onJobTitleChange(e, "secondaryJob")}
                  >
                    {jobTypes.map((job) => {
                      return (
                        <MenuItem
                          key={`secondary_${job}`}
                          value={job}
                          id="secondaryJob"
                        >
                          {job}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Grid>
                <Grid item sm={3} xs={12}>
                  <TextField
                    type="text"
                    name="company"
                    id="secondaryJob"
                    fullWidth
                    label="Company Name"
                    InputLabelProps={{ shrink: true }}
                    value={secondaryJob.company}
                    onChange={(e) => onChange(e)}
                  />
                </Grid>

                <Grid item sm={3} xs={6}>
                  <KeyboardDatePicker
                    autoOk
                    views={["year", "month"]}
                    onChange={(e) =>
                      onChange({
                        target: {
                          id: "secondaryJob",
                          name: "startDate",
                          value: e,
                          checked: false,
                        },
                      })
                    }
                    value={
                      secondaryJob.startDate ? secondaryJob.startDate : null
                    }
                    variant="inline"
                    name="startDate"
                    format="MM/yyyy"
                    InputLabelProps={{ shrink: true }}
                    label="Start Date"
                  />
                </Grid>

                <Grid item sm={3} xs={6}>
                  <KeyboardDatePicker
                    autoOk
                    format="MM/yyyy"
                    onChange={(e) =>
                      onChange({
                        target: {
                          id: "secondaryJob",
                          name: "endDate",
                          value: e,
                          checked: false,
                        },
                      })
                    }
                    value={secondaryJob.endDate ? secondaryJob.endDate : null}
                    variant="inline"
                    name="endDate"
                    views={["year", "month"]}
                    InputLabelProps={{ shrink: true }}
                    label="End Date"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="secondaryJob"
                    name="description"
                    label="Description"
                    multiline
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    value={secondaryJob.description}
                    onChange={(e) => onChange(e)}
                    rows={4}
                    className={classes.description}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.error}>
              {error.secondaryJob && error.secondaryJob}
            </Grid>

            {/* other job */}
            {otherJobs.map((otherjob, key) => {
              return (
                <Fragment key={key}>
                  <Grid item className={classes.textContainer}>
                    <Typography gutterBottom variant="h6">
                      Previous Job
                    </Typography>
                  </Grid>
                  <Grid container justify="flex-start" alignItems="center">
                    <Grid container item spacing={1}>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          select
                          label="Job Title"
                          id="secondaryJob"
                          name="title"
                          fullWidth
                          value={otherJobs[key].title}
                          InputLabelProps={{ shrink: true }}
                          onChange={(e) =>
                            handleInput("title", e.target.value, key)
                          }
                        >
                          {jobTypes.map((job) => {
                            return (
                              <MenuItem key={job} value={job}>
                                {job}
                              </MenuItem>
                            );
                          })}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={3}>
                        <TextField
                          type="text"
                          name="company"
                          label="Company Name"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          value={otherJobs[key].company}
                          onChange={(e) =>
                            handleInput("company", e.target.value, key)
                          }
                        />
                      </Grid>

                      <Grid item xs={6} sm={3}>
                        <KeyboardDatePicker
                          autoOk
                          format="MM/yyyy"
                          onChange={(e) => handleInput("startDate", e, key)}
                          value={
                            otherJobs[key].startDate
                              ? otherJobs[key].startDate
                              : null
                          }
                          variant="inline"
                          name="startDate"
                          views={["year", "month"]}
                          InputLabelProps={{ shrink: true }}
                          label="Start Date"
                        />
                      </Grid>

                      <Grid item xs={6} sm={3}>
                        <KeyboardDatePicker
                          autoOk
                          format="MM/yyyy"
                          views={["year", "month"]}
                          onChange={(e) => handleInput("endDate", e, key)}
                          value={
                            otherJobs[key].endDate
                              ? otherJobs[key].endDate
                              : null
                          }
                          variant="inline"
                          InputLabelProps={{ shrink: true }}
                          label="End Date"
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          name="description"
                          label="Description"
                          multiline
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          value={otherJobs[key].description}
                          className={classes.description}
                          variant="outlined"
                          onChange={(e) =>
                            handleInput("description", e.target.value, key)
                          }
                          rows={4}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Fragment>
              );
            })}
            {!limit && (
              <Grid className={classes.addOtherJob}>
                <Button onClick={addOtherJobs}>
                  <AddBoxIcon />
                  &nbsp;&nbsp;&nbsp;Add Other Jobs
                </Button>
              </Grid>
            )}

            <Grid item container xs={12}>
              <Grid item xs={12} sm={6}>
                <Box className={classes.goback_button}>
                  <MainButton
                    width="100%"
                    label="Save"
                    background="green"
                    border="green"
                    pd={60}
                    hoverColor="white"
                    hoverBack="#007000"
                    color="white"
                    fontSize={16}
                    onClick={handleSubmit(onSubmit)}
                  ></MainButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </MuiPickersUtilsProvider>
  );
};

export default Workhistory;
