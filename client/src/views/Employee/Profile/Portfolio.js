import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Dialog,
  makeStyles,
  Card,
  CardContent,
  Box,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles((theme) => ({
  note: {
    fontSize: 20,
    color: "RGB(23,41, 64)",
    padding: 10,
    fontWeight: 500,
  },
  videoBox: {
    cursor: "pointer",
    boxShadow: "inset 0 0 15px",
    width: "100%",
    height: 230,
  },
  imageBox: {
    position: "absolute",
    top: "0px",
    cursor: "pointer",
    boxShadow: "inset 0 0 15px",
    width: "100%",
    height: 230,
  },
  portfolio: {
    color: "RGB(23,41, 64)",
    marginBottom: 20,
    margin: 10,
    border: "solid 1px gray",
    paddingBottom: 0,
    borderRadius: "0px",
  },
  image: {
    width: "100%",
  },
  video: {
    width: "100%",
    maxHeight: "230px",
    position: "absolute",
    top: "0px",
    cursor: "pointer",
  },
  imagewrapper: {
    height: 230,
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    position: "relative",
    alignItems: "center",
  },
  icon: {
    color: "white",
    "&:hover": {
      color: "#333333",
    },
  },
  section: {
    borderRadius: "0px",
    position: "relative",
    padding: "0.25rem",
    border: "none",
    boxShadow: "none",
  },
  modalImage: {
    width: "100%",
  },
  closeIcon: {
    width: "40px",
    height: "40px",
    position: "absolute",
    right: "10px",
    top: "10px",
    background: "white",
  },
}));

const Portfolio = ({ data }) => {
  const classes = useStyles();
  const { portfolios } = data;
  const [modalImageUrl, setModalImage] = useState();
  const [imageModal, openImageModal] = useState(false);

  const onImageClick = (image) => {
    setModalImage(image);
    openImageModal(true);
  };

  return (
    <Fragment>
      <Dialog fullWidth={true} maxWidth="md" open={imageModal}>
        <img
          className={classes.modalImage}
          src={`${modalImageUrl}?${Date.now()}`}
          alt="img"
        />
        <IconButton
          className={classes.closeIcon}
          onClick={(e) => openImageModal(false)}
        >
          <HighlightOffIcon />
        </IconButton>
      </Dialog>
      <Card className={classes.section}>
        <CardContent className={classes.section}>
          {portfolios && (
            <Grid item container xs={12}>
              {portfolios.map((p, i) => {
                return (
                  <Grid item xs={12} md={6} key={i}>
                    <Card className={classes.portfolio}>
                      {p && (
                        <Fragment>
                          <Box className={classes.imagewrapper}>
                            {p.style === "video" ? (
                              <Fragment>
                                <Box className={classes.videoBox}></Box>
                                <video controls className={classes.video}>
                                  <source
                                    src={p.url && `${p.url}?${Date.now()}`}
                                    type="video/mp4"
                                  ></source>
                                </video>
                              </Fragment>
                            ) : (
                              <Fragment>
                                <Box
                                  className={classes.imageBox}
                                  onClick={(e) => onImageClick(p.url)}
                                ></Box>
                                <img
                                  src={p.url && `${p.url}?${Date.now()}`}
                                  className={classes.image}
                                  alt="img"
                                />
                              </Fragment>
                            )}
                          </Box>
                          <Typography className={classes.note}>
                            {p.note}
                          </Typography>
                        </Fragment>
                      )}
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Fragment>
  );
};

Portfolio.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Portfolio;
