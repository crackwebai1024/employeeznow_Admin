import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import BackupIcon from "@material-ui/icons/Backup";
// import setAlert from '../../store/actions/alert';

// set styles - material-ui
const useStyles = makeStyles((theme) => ({
  dropzoneStyle: {},
  dropzoneContainer: {
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    border: "none",
    backgroundColor: theme.palette.secondary.main,
    outline: "none",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    "&:active": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  avatarContainer: {
    width: 300,
    height: "fit-content",
    maxHeight: 300,
    zIndex: 1,
    margin: "auto",
    overflow: "hidden",
  },
  userdialog: {
    justifyContent: "space-between",
  },
  userdialogform: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  uploadIcon: {
    color: theme.palette.common.hover_white,
    width: "100%",
    height: "100%",
  },
  avatar: {
    width: "100%",
    maxHeight: "300px",
  },
  dropzoneText: {
    color: theme.palette.common.white,
    fontWeight: 700,
    textDecoration: "underline",
    marginBottom: "1rem",
    cursor: "pointer",
  },
  dropzoneTextSub: {
    fontSize: "0.5rem",
    color: theme.palette.error.main,
  },
  inputContainer: {
    margin: "0 auto 1rem auto",
  },
  video: {
    width: "100%",
    maxHeight: "300px",
  },
}));

// props are through parents
// fileNames is blob url
// connectFun varies by each function (connect to action)
// open and setOpen for dialog
const PhotoDropZone = ({
  fileNames,
  setFileNames,
  connectFunc,
  deleteFunc,
  image,
  open,
  headerTitle,
  setOpen,
  photoType, //Photo type (profile/background/photo)
  // setAlert,
}) => {
  // style material-ui
  const classes = useStyles(""); // title for Photo
  const [title, setTitle] = useState();
  const [titleError, setTitleError] = useState("");

  useEffect(() => {
    if (image) {
      return setTitle(image.description);
    }
    setTitle("");
  }, [image, open]);

  const handleClose = () => {
    setFileNames("");
    setOpen(false);
  };

  //const [dropzoneStyle, setDropzoneStyle] = useState();

  //sendPhoto is file data including buffer etc
  const [sendPhoto, setSendPhoto] = useState();
  const [type, setType] = useState();

  const onDrop = (acceptedFiles) => {
    console.log(acceptedFiles[0], "acceptedfile");
    let type = acceptedFiles[0].type.split("/")[0];
    setType(type);
    //setFileNames(acceptedFiles.map((file) => file.name));  -- when there is multiple pictures
    const imgName = acceptedFiles.map((file) => file.name);
    console.log(imgName);
    // setPhoto({ photo: imgName[0] });
    console.log("file upload object ==> ", acceptedFiles[0]);
    setFileNames({ file: URL.createObjectURL(acceptedFiles[0]) });
    // setFileNames(acceptedFiles[0].name);
    //setDropzoneStyle('dropped');
    setSendPhoto(acceptedFiles[0]);
    // uploadPhoto(acceptedFiles[0]);  //if you want to send photo onDrop
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (photoType === "portfolio" && !title) {
      return setTitleError("Please Input the Description");
    }
    connectFunc(photoType, sendPhoto, fileNames, title);
    handleClose();
  };

  const deletephoto = (e) => {
    deleteFunc(photoType, sendPhoto, fileNames, title);
    handleClose();
  };

  console.log(fileNames, "filenames");

  return (
    <Dialog
      open={open ? true : false}
      onClose={handleClose}
      aria-labelledby="dialog-title"
    >
      <DialogTitle id="dialog-title">
        <Typography>{headerTitle}</Typography>
        {fileNames &&
          photoType === "portfolio" &&
          "Almost there! Create image title and CONFIRM"}
        {fileNames &&
          photoType !== "portfolio" &&
          "Almost there! Please click CONFIRM"}
      </DialogTitle>
      <DialogContent>
        <Grid item className={classes.avatarContainer}>
          {fileNames || (image && image.url) ? (
            fileNames ? (
              type === "image" ? (
                <img
                  src={fileNames.file}
                  alt="profile"
                  className={classes.avatar}
                />
              ) : (
                <video controls className={classes.video}>
                  <source src={fileNames.file}></source>
                </video>
              )
            ) : image.style === "image" || image.style === undefined ? (
              <img
                src={`${image.url}?${Date.now()}`}
                alt="profile"
                className={classes.avatar}
              />
            ) : (
              <video controls className={classes.video}>
                <source src={`${image.url}?${Date.now()}`}></source>
              </video>
            )
          ) : (
            <div>
              <BackupIcon className={classes.uploadIcon} />
            </div>
          )}
        </Grid>
      </DialogContent>
      {photoType === "portfolio" && (
        <div className={classes.inputContainer}>
          <TextField
            error={titleError === "" ? false : true}
            helperText={"Please add title"}
            label="Description"
            required
            value={title}
            fullWidth
            color="primary"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      )}
      {/* accept file max size 1MB (1048576 Bytes) */}
      <Dropzone onDrop={onDrop} accept="image/*, video/*" minSize={0}>
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps({ className: `dropzoneStyle` })}
            onDragOver={(e) => onDragOver(e)}
            // onDragLeave={(e) => onDragLeave(e)}
            multiple={false}
          >
            <input {...getInputProps()} />
            {!fileNames ? (
              <div className={classes.dropzoneContainer}>
                <DialogContent>
                  <Typography
                    variant="caption"
                    className={classes.dropzoneText}
                  >
                    Drag and Drop or Select a file
                  </Typography>
                  <Typography className={classes.dropzoneTextSub}>
                    &#42;Max file size 1MB
                  </Typography>
                </DialogContent>
              </div>
            ) : (
              <div className={classes.dropzoneContainer}>
                <DialogContent>
                  <Typography
                    variant="caption"
                    className={classes.dropzoneText}
                  >
                    If you want to change the photo, drag and drop again
                  </Typography>
                </DialogContent>
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {image && !fileNames && (
        <DialogActions className={classes.userdialog}>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => deletephoto()}
          >
            Delete
          </Button>
        </DialogActions>
      )}
      {fileNames && (
        <DialogActions className={classes.userdialog}>
          <form
            onSubmit={(e) => onSubmit(e)}
            className={classes.userdialogform}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={(e) => handleClose()}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Confirm
            </Button>
          </form>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default connect(null, null)(PhotoDropZone);
