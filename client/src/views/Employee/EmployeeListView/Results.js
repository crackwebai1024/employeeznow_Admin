import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Avatar,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import getInitials from "@helpers/utils/getInitials";
import { actions } from "@redux/employees";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  link: {
    cursor: "pointer",
    textDecoration: "none",
    "&:hover": {
      color: "green",
      textDecoration: "underline",
    },
  },
}));

const Results = ({ className, customers, ...rest }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { page, count } = useSelector((state) => state.employees);

  const handleLimitChange = (event) => {
    dispatch(actions.setCount(event.target.value));
  };

  const handlePageChange = (event, newPage) => {
    dispatch(actions.setPage(newPage));
  };

  const getEmployeeProfile = (id) => {
    dispatch(actions.getEmployeeProfile(id));
    history.push(`/app/employees/${id}`);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.result.map((customer) => (
                <TableRow hover key={customer.id}>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar
                        className={classes.avatar}
                        src={customer.avatarUrl}
                      >
                        {getInitials(customer.lastName)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        className={classes.link}
                        onClick={(e) => getEmployeeProfile(customer.id)}
                        variant="body1"
                      >
                        {customer.firstName} {customer.lastName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>
                    {`${customer.address.street1}, ${customer.address.city}, ${customer.address.state}`}
                  </TableCell>
                  <TableCell>{customer.cell}</TableCell>
                  <TableCell>
                    {moment(customer.createdAt).format("DD/MM/YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.totalCount}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={count}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.object.isRequired,
};

export default Results;
