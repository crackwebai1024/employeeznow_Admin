import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import moment from "moment";

const Basic = ({ data }) => {
  return (
    <div>
      <Typography>{data.email}</Typography>
      <Typography>
        {data.firstName} {data.lastName}
      </Typography>
      <Typography>{data.cell}</Typography>
      <Typography>{moment(data.createdAt).format("DD/MM/YYYY")}</Typography>
      <Typography>
        {data.address.city} {data.address.state} {data.address.street1}
        {data.address.street2} {data.address.zipcode}
      </Typography>
    </div>
  );
};

Basic.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Basic;
