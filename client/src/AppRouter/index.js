import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import LoginView from "../views/Auth/LoginView";
import Employee from "../views/Employee/EmployeeListView";
import EmployeeProfile from "../views/Employee/Profile";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import { getToken } from "@helpers/auth-helpers";

export default function AppRouter() {
  const token = getToken();

  return (
    <Fragment>
      {!token ? (
        <Fragment>
          <Route path="/" component={MainLayout}></Route>
          <Route path="/login" component={LoginView}></Route>
          <Route path="*">
            <Redirect to="/login" />
          </Route>
        </Fragment>
      ) : (
        <Fragment>
          <Route path="/app" component={DashboardLayout}></Route>
          <Route exact path="/app/employees" component={Employee}></Route>
          <Route
            exact
            path={`/app/employees/:id`}
            component={EmployeeProfile}
          ></Route>
          <Route path="*">
            <Redirect to="/app/employees"></Redirect>
          </Route>
        </Fragment>
      )}
    </Fragment>
  );
}
