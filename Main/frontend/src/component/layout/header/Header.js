import React from "react";
import "./Header.css";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";

import { logout } from "../../../actions/userAction";

//icon
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AddIcon from "@material-ui/icons/Add";

function Header({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [open, setOpen] = useState(false);

  const options = [
    { icon: <AddIcon />, name: "Đăng tin", func: post },
    { icon: <PersonIcon />, name: "Tài khoản", func: account },
    { icon: <ExitToAppIcon />, name: "Đăng xuất", func: logoutUser },
  ];

  if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function post() {
    if (user.name === "undefined" && user.phoneNumber === "undefined") {
      alert.error("Cần cập nhật họ tên và SĐT trước khi đăng tin !");
      return;
    }
    navigate("/room/create");
  }

  function account() {
    navigate("/profile");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">RR</Link>
        </h1>
      </div>

      <ul className="ul" style={{ marginRight: user ? "17vw" : "1vw" }}>
        <li>
          <Link to="/rooms">Danh sách phòng</Link>
        </li>
        <li>
          <Link to="/contact">Liên hệ</Link>
        </li>
        <li>
          <Link to="/about">Thông tin</Link>
        </li>
      </ul>

      {user ? (
        <div>
          {/* style={{ zIndex: "10" }} */}
          <Backdrop open={open} />
          <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            // style={{ zIndex: "11" }}
            open={open}
            direction="down"
            className="speedDial"
            icon={
              <img
                className="speedDialIcon"
                src={user.avatar?.url ? user.avatar?.url : "/Profile.png"}
                alt="Profile"
              />
            }
          >
            {options.map((item) => (
              <SpeedDialAction
                key={item.name}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
                tooltipOpen={window.innerWidth <= 600 ? false : true}
              />
            ))}
          </SpeedDial>
        </div>
      ) : (
        <Link to="/login" className="btnDN">
          Đăng nhập
        </Link>
      )}
    </header>
  );
}

export default Header;
