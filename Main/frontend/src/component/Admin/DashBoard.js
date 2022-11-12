import "./DashBoard.css";

import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";

import MetaData from "../layout/MetaData";
import { getAllRooms } from "../../actions/roomAction";
import { getAllUsers } from "../../actions/userAction";
import { getAllBookings } from "../../actions/bookingAction";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const Dashboard = () => {
  const dispatch = useDispatch();

  const { rooms } = useSelector((state) => state.rooms);
  const { users } = useSelector((state) => state.users);
  const { bookings } = useSelector((state) => state.bookings);

  useEffect(() => {
    dispatch(getAllRooms());
    dispatch(getAllUsers());
    dispatch(getAllBookings());
  }, [dispatch]);

  let availableRoom = 0;
  rooms &&
    rooms.forEach((room) => {
      if (room.numOfRooms !== 0) {
        availableRoom += 1;
      }
    });

  let totalPrice = 0;
  bookings &&
    bookings.forEach((item) => {
      totalPrice += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalPrice],
      },
    ],
  };

  const doughnutState = {
    labels: ["Còn phòng", "Hết phòng"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [availableRoom, rooms.length - availableRoom],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Tổng giá trị <br />
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/rooms">
              <p>Phòng</p>
              <p>{rooms && rooms.length}</p>
            </Link>
            <Link to="/admin/bookings">
              <p>Đặt phòng</p>
              <p>{bookings && bookings.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Người dùng</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
