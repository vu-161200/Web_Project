import "./RoomList.css";

import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { getAllUsers, clearErrors, deleteUser } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const UsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { error, users } = useSelector((state) => state.users);

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, alert, error, deleteError, isDeleted, message, navigate]);

  const columns = [
    { field: "id", headerName: "ID", minWidth: 260 },

    {
      field: "image",
      headerName: "Avatar",
      minWidth: 140,
      renderCell: (params) => (
        <img
          style={{
            width: "80px",
            height: "60px",
            objectFit: "contain",
          }}
          src={params.value}
          alt=""
        />
      ),
    },

    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
    },

    {
      field: "name",
      headerName: "Họ tên",
      minWidth: 200,
    },

    {
      field: "createdAt",
      headerName: "Ngày tạo",
      minWidth: 160,
    },

    {
      field: "role",
      headerName: "Quyền",
      minWidth: 140,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "red_color"
          : "green_color";
      },
    },

    {
      field: "actions",
      headerName: "Hành động",
      minWidth: 170,
      type: "number",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        image: item.avatar.url,
        role: item.role,
        createdAt: new Date(item.createdAt)
          .toLocaleString("en-gb")
          .split(",")[0],
        email: item.email,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL USERS`} />

      <div className="dashboard">
        <SideBar />
        <div className="roomListContainer">
          <h1 id="roomListHeading">DANH SÁCH NGƯỜI DÙNG</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            className="roomListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default UsersList;
