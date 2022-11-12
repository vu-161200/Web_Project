import "./NewRoom.css";

import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import Map from "../Map/Map";

import MetaData from "../layout/MetaData";
import { NEW_ROOM_RESET } from "../../constants/roomConstants";
import { clearErrors, newRoom } from "../../actions/roomAction";

const NewRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newRoom);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [numOfRooms, setNumOfRooms] = useState(1);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [area, setArea] = useState(0);
  const [tenant, setTenant] = useState("Tất cả");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Phòng trọ", "Nhà nghỉ", "Nhà nguyên căn"];
  const tenants = ["Tất cả", "Sinh viên", "Nam", "Nữ"];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Room Created Successfully");
      navigate("/");
      dispatch({ type: NEW_ROOM_RESET });
    }
  }, [dispatch, alert, error, success, navigate]);

  const newRoomSubmitHandler = (e) => {
    e.preventDefault();

    if (numOfRooms <= 0) alert.error("Số lượng phòng không hợp lệ");
    else if (lat === 0 && lng === 0)
      alert.error("Tọa độ không xác định, chọn lại địa chỉ !!");
    else {
      const myForm = new FormData();

      myForm.set("name", name);
      myForm.set("price", price);
      myForm.set("description", description);
      myForm.set("category", category);
      var roomAddress =
        addressDetails === "" ? address : addressDetails + ", " + address;
      myForm.set("address", roomAddress);
      myForm.set("lat", lat);
      myForm.set("lng", lng);
      myForm.set("numOfRooms", numOfRooms);
      myForm.set("area", area);
      myForm.set("tenant", tenant);

      images.forEach((image) => {
        myForm.append("images", image);
      });

      dispatch(newRoom(myForm));
    }
  };

  const newRoomImagesChange = (e) => {
    const files = Array.from(e.target.files);

    // setImages([]);
    // setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Đăng tin" />
      <div className="newRoomContainer">
        <form
          className="newRoomForm"
          encType="multipart/form-data"
          onSubmit={newRoomSubmitHandler}
        >
          <h1 className="heading">ĐĂNG TIN</h1>

          <div className="roomAddress">
            <h2 className="subHeading">Địa chỉ cho thuê</h2>
            <div className="roomAddressMap">
              <Map
                view={false}
                collapsed={false}
                setAddress={setAddress}
                setLat={setLat}
                setLng={setLng}
              />
            </div>
            <div className="roomAddressExactly">
              <label>
                Đường phố/Số nhà
                <input
                  type="text"
                  readOnly={address === "" ? true : false}
                  value={addressDetails}
                  onChange={(e) => {
                    setAddressDetails(e.target.value);
                  }}
                />
              </label>
              <label>
                Địa chỉ chính xác
                <input
                  type="text"
                  required
                  readOnly
                  value={
                    addressDetails === ""
                      ? address
                      : addressDetails + ", " + address
                  }
                />
              </label>
            </div>
          </div>

          <div className="roomDescription">
            <h2 className="subHeading">Thông tin mô tả</h2>

            <label>
              Loại phòng
              <select required onChange={(e) => setCategory(e.target.value)}>
                <option value="">-- Chọn loại phòng --</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Tiêu đề
              <input
                type="text"
                placeholder="Tiêu đề"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              Thông tin mô tả
              <textarea
                placeholder="Mô tả phòng"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
            </label>

            <div className="form-group">
              <label className="form-group-price">
                Giá phòng / tháng
                <input
                  type="number"
                  placeholder="Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
              <label>
                Số lượng phòng
                <input
                  type="number"
                  value={numOfRooms}
                  required
                  onChange={(e) => setNumOfRooms(e.target.value)}
                />
              </label>

              <label className="form-group-area">
                Diện tích
                <input
                  type="number"
                  placeholder="Diện tích phòng ( &#13217; )"
                  required
                  onChange={(e) => setArea(e.target.value)}
                />
              </label>
            </div>

            <label>
              Đối tượng cho thuê
              <select required onChange={(e) => setTenant(e.target.value)}>
                <option value="">-- Chọn đối tượng cho thuê --</option>
                {tenants.map((tenant) => (
                  <option key={tenant} value={tenant}>
                    {tenant}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="roomImages">
            <h2 className="subHeading">Hình ảnh về phòng</h2>
            <div id="newRoomFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={newRoomImagesChange}
                multiple
              />
            </div>

            <div id="newRoomFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Room Preview" />
              ))}
            </div>
          </div>

          <Button
            id="newRoomBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Đăng tin
          </Button>
        </form>
      </div>
    </Fragment>
  );
};

export default NewRoom;
