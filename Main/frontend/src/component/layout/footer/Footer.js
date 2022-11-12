import React from "react";
import "./Footer.css";
import imgPlayStore from "../../../assets/images/playstore.png";
import imgAppStore from "../../../assets/images/Appstore.png";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>PHIÊN BẢN MOBILE</h4>
        <p>Tải ứng dụng cho Android hoặc IOS.</p>
        <img src={imgAppStore} alt="AppStore" />
        <img src={imgPlayStore} alt="PlayStore" />
      </div>

      <div className="midFooter">
        <h1>WEBSITE ĐĂNG TIN ĐẶT PHÒNG</h1>
        <p>_______</p>
        <p>Copyrights 2022 &copy; Group 01</p>
      </div>

      <div className="rightFooter">
        <h4>Nhóm 01</h4>
        <p>Nguyễn Đức Tuệ</p>
        <p>Đỗ Văn Vũ</p>
        <p>Nguyễn Huy Bách</p>
        <p>Trần Hữu Quang</p>
      </div>
    </footer>
  );
};

export default Footer;
