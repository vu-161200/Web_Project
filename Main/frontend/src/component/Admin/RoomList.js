import "./RoomList.css";

import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";

import ExcelJs from "exceljs";
import * as XLSX from "xlsx";

import {
  clearErrors,
  getAllRooms,
  deleteRoom,
  updateStatus,
} from "../../actions/roomAction";
import {
  DELETE_ROOM_RESET,
  UPDATE_STATUS_RESET,
} from "../../constants/roomConstants";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";

// icon
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

const RoomList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type } = useParams();
  const alert = useAlert();

  const { error, rooms } = useSelector((state) => state.rooms);

  const {
    error: deleteError,
    isDeleted,
    isUpdated,
  } = useSelector((state) => state.room);

  const deleteRoomHandler = (id) => {
    dispatch(deleteRoom(id));
  };

  const acceptRoomHandler = (id) => {
    const myForm = new FormData();

    myForm.set("status", "Đã phê duyệt");

    dispatch(updateStatus(id, myForm));
  };

  const refuseRoomHandler = (id) => {
    const myForm = new FormData();

    myForm.set("status", "Bị từ chối");

    dispatch(updateStatus(id, myForm));
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
      alert.success("Room Deleted Successfully");
      dispatch({ type: DELETE_ROOM_RESET });
    }

    if (isUpdated) {
      alert.success("Changed Successfully");
      dispatch({ type: UPDATE_STATUS_RESET });
    }

    type === undefined
      ? dispatch(getAllRooms())
      : dispatch(getAllRooms("Chờ phê duyệt"));
  }, [
    dispatch,
    alert,
    error,
    navigate,
    deleteError,
    isDeleted,
    type,
    isUpdated,
  ]);

  const columns = [
    { field: "id", headerName: "Mã phòng", minWidth: 250 },

    {
      field: "user",
      headerName: "Người đăng",
      minWidth: 200,
    },

    {
      field: "image",
      headerName: "Ảnh",
      minWidth: 130,
      renderCell: (params) => (
        <img
          style={{
            width: "80px",
            height: "60px",
            objectFit: "fill",
          }}
          src={params.value}
          alt=""
        />
      ),
    },

    {
      field: "address",
      headerName: "Địa chỉ",
      minWidth: 600,
    },

    {
      field: "price",
      headerName: "Giá",
      minWidth: 150,
    },

    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 170,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã phê duyệt"
          ? "green_color"
          : params.getValue(params.id, "status") === "Chờ phê duyệt"
          ? "orange_color"
          : "red_color";
      },
    },

    {
      field: "actions",
      headerName: "Hành động",
      minWidth: 160,
      type: "number",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return type === undefined ? (
          <Fragment>
            <Link to={`/room/update/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteRoomHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              onClick={() =>
                acceptRoomHandler(params.getValue(params.id, "id"))
              }
            >
              <DoneOutlinedIcon />
            </Button>

            <Button
              onClick={() =>
                refuseRoomHandler(params.getValue(params.id, "id"))
              }
            >
              <ClearOutlinedIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  rooms &&
    rooms.forEach((item) => {
      rows.push({
        id: item._id,
        price: item.price.toLocaleString("en-us") + " VNĐ",
        user: item.user?.name ?? item.user?.email,
        image: item.images[0].url,
        address: item.address,
        status: item.status,
      });
    });

  const exportHandler = () => {
    const sheetName = "Danh_sach_phong.xlsx";
    const headerName = "Danh sách phòng";

    const workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet(sheetName, {
      views: [{ showGridLines: false }],
    });

    sheet.getRow(1).values = ["LOGO", "WEBSITE ĐĂNG TIN & ĐẶT PHÒNG"];
    sheet.getRow(2).values = ["", "Địa chỉ: xx xx xx xx xx"];
    sheet.getRow(3).values = ["", "Liên hệ: 0123456798"];

    // User = Avatar id email role createdAt name
    sheet.getRow(5).values = [
      "ID",
      "Tên phòng",
      "Mô tả",
      "Giá",
      "Địa chỉ",
      "lat",
      "lng",
      "Diện tích",
      "Loại phòng",
      "User",
      "",
      "",
      "",
      "",
      "",
      "Số phòng",
      "Đối tượng",
      "Trạng thái",
      "Ảnh",
      "Đánh giá",
      "Thời gian đăng",
    ];
    sheet.getRow(6).values = [
      "ID",
      "Tên phòng",
      "Mô tả",
      "Giá",
      "Địa chỉ",
      "lat",
      "lng",
      "Diện tích",
      "Loại phòng",
      "ID",
      "Avatar",
      "Email",
      "Họ tên",
      "SĐT",
      "TG tạo",
      "Số phòng",
      "Đối tượng",
      "Trạng thái",
      "Ảnh",
      "Đánh giá",
      "Thời gian đăng",
    ];

    sheet.columns = [
      { key: "roomID", width: 30 },
      { key: "roomName", width: 50 },
      { key: "description", width: 50 },
      { key: "price", width: 20 },
      { key: "address", width: 50 },
      { key: "lat", width: 10 },
      { key: "lng", width: 10 },
      { key: "area", width: 15 },
      { key: "category", width: 15 },
      { key: "userID", width: 30 },
      { key: "avatar", width: 30 },
      { key: "email", width: 30 },
      { key: "userName", width: 30 },
      { key: "phoneNumber", width: 15 },
      { key: "userCreatedAt", width: 15 },
      { key: "numOfRooms", width: 10 },
      { key: "tenant", width: 10 },
      { key: "status", width: 15 },
      { key: "images", width: 30 },
      { key: "raing", width: 10 },
      { key: "roomCreatedAt", width: 15 },
    ];

    let roomData = [];
    rooms.map((room) =>
      roomData.push({
        roomID: room._id,
        roomName: room.name,
        description: room.description,
        price: room.price.toLocaleString("en-us") + " VNĐ",
        address: room.address,
        lat: room.lat,
        lng: room.lng,
        area: room.area + " m2",
        category: room.category,
        userID: room.user._id,
        avatar: room.user.avatar.url,
        email: room.user.email,
        userName: room.user.name,
        phoneNumber: room.user.phoneNumber,
        userCreatedAt: new Date(room.user.createdAt)
          .toLocaleString("en-GB")
          .split(",")[0],
        numOfRooms: room.numOfRooms,
        tenant: room.tenant,
        status: room.status,
        images: room.images[0].url,
        raing: room.rating,
        roomCreatedAt: new Date(room.createdAt)
          .toLocaleString("en-GB")
          .split(",")[0],
      })
    );
    sheet.addRows(roomData);

    sheet.mergeCells(`A1:A3`);
    sheet.mergeCells(`J5:O5`);
    sheet.mergeCells("A5:A6");
    sheet.mergeCells("B5:B6");
    sheet.mergeCells("C5:C6");
    sheet.mergeCells("D5:D6");
    sheet.mergeCells("E5:E6");
    sheet.mergeCells("F5:F6");
    sheet.mergeCells("G5:G6");
    sheet.mergeCells("H5:H6");
    sheet.mergeCells("I5:I6");
    sheet.mergeCells("P5:P6");
    sheet.mergeCells("Q5:Q6");
    sheet.mergeCells("R5:R6");
    sheet.mergeCells("S5:S6");
    sheet.mergeCells("T5:T6");
    sheet.mergeCells("U5:U6");

    const row = sheet.getRow(1);
    row.eachCell((cell, rowNumber) => {
      sheet.getColumn(rowNumber).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      sheet.getColumn(rowNumber).font = { size: 11, family: 3 };
    });

    const writeFile = (fileName, content) => {
      const link = document.createElement("a");
      const blob = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;",
      });
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
    };

    workbook.xlsx.writeBuffer().then((buffer) => {
      writeFile(sheetName, buffer);
    });
  };

  return (
    <Fragment>
      <MetaData title={`ALL ROOMS`} />

      <div className="dashboard">
        <SideBar />
        <div className="roomListContainer">
          <h1 id="roomListHeading">
            {type === undefined
              ? "DANH SÁCH BÀI ĐĂNG"
              : "DANH SÁCH BÀI CHỜ PHÊ DUYỆT"}
          </h1>

          <div className="exportExcel" onClick={exportHandler}>
            Xuất Excel
          </div>

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

export default RoomList;
