import React, { useEffect } from "react";
import { actions } from "@redux/employees";
import { useDispatch, useSelector } from "react-redux";

function Statistic(props) {
  const dispatch = useDispatch();
  const { employeeStatis } = useSelector((state) => state.employees);

  useEffect(() => {
    dispatch(actions.getEmployeeSta());
  }, [dispatch]);

  console.log(employeeStatis);
  return <div>Staeasd</div>;
}

export default Statistic;
