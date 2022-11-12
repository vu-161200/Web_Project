import "./LoginRegister.css";

import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import Loading from "../layout/loading/loading";
import { clearErrors, login, register } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

const LoginRegister = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const alert = useAlert();

  const redirect = location.search
    ? "/" + location.search.split("=")[1]
    : "/profile";

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    loginEmail: "",
    loginPassword: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate(redirect, { state: location.state });
    }
  }, [
    alert,
    dispatch,
    error,
    navigate,
    isAuthenticated,
    redirect,
    location.state,
  ]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    if (errors.confirmPassword) return alert.error(errors.confirmPassword);
    else if (errors.password) return alert.error(errors.password);
    else {
      const myForm = new FormData();
      myForm.set("email", user.email);
      myForm.set("password", user.password);
      myForm.set("avatar", avatar);
      dispatch(register(myForm));
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
      validate(e);
    }
  };

  const validate = (e) => {
    let { name, value } = e.target;
    setErrors((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "loginEmail":
          if (!value) {
            stateObj[name] = "Please enter email.";
          } else if (!/\S+@\S+\.\S+/.test(value)) {
            stateObj[name] = "Email address is invalid";
          }
          break;

        case "loginPassword":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          }
          break;

        case "email":
          if (!value) {
            stateObj[name] = "Please enter email.";
          } else if (!/\S+@\S+\.\S+/.test(value)) {
            stateObj[name] = "Email address is invalid";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "Please enter Password.";
          } else if (value.length < 8) {
            stateObj[name] = "Password needs to be 8 characters or more";
          } else if (user.confirmPassword && value !== user.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = user.confirmPassword
              ? ""
              : errors.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (user.password && value !== user.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const toggleVisible_Login = () => {
    setShowLoginPassword(!showLoginPassword);
  };

  const toggleVisible_Register = () => {
    setShowRegisterPassword(!showRegisterPassword);
  };

  const FileChooser = () => {
    document.getElementById("get_file").onclick = function () {
      document.getElementById("input_file").click();
    };
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <MetaData title={"Đăng nhập"} />
          <div className="LoginRegisterContainer">
            <Link className="goBack" to="/">
              BACK HOME
            </Link>
            <div className="LoginRegisterBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>Đăng nhập</p>
                  <p onClick={(e) => switchTabs(e, "register")}>Đăng ký</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div id="registerImage">
                  <img src="/Profile.png" alt="Avatar Preview" />
                </div>

                <div className="loginEmail">
                  <MailOutlineIcon className="prefix" />
                  <input
                    type="email"
                    placeholder="Email"
                    name="loginEmail"
                    required
                    value={loginEmail}
                    onChange={(e) => {
                      setLoginEmail(e.target.value);
                      validate(e);
                    }}
                    onBlur={validate}
                  />
                  {errors.loginEmail && (
                    <span className="err">{errors.loginEmail}</span>
                  )}
                </div>
                <div className="loginPassword">
                  <LockOpenIcon className="prefix" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Password"
                    name="loginPassword"
                    required
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      validate(e);
                    }}
                    onBlur={validate}
                  />
                  <div
                    className="suffix"
                    onClick={toggleVisible_Login}
                    edge="end"
                  >
                    {showLoginPassword ? (
                      <VisibilityIcon className="suffix-icon" />
                    ) : (
                      <VisibilityOffIcon className="suffix-icon" />
                    )}
                  </div>
                  {errors.loginPassword && (
                    <span className="err">{errors.loginPassword}</span>
                  )}
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div id="registerImage">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    id="get_file"
                    onClick={() => FileChooser()}
                  />
                  <input
                    id="input_file"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                    style={{ display: "none" }}
                  />
                  <div
                    className="addImage"
                    onClick={() => {
                      document.getElementById("input_file").click();
                    }}
                  >
                    <AddPhotoAlternateIcon className="addImage-icon" />
                  </div>
                </div>

                <div className="signUpEmail">
                  <MailOutlineIcon className="prefix" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={user.email}
                    onChange={registerDataChange}
                    onBlur={validate}
                  />
                  {errors.email && <span className="err">{errors.email}</span>}
                </div>

                <div className="signUpPassword">
                  <LockOpenIcon className="prefix" />
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    name="password"
                    value={user.password}
                    onChange={registerDataChange}
                    onBlur={validate}
                  />
                  <div
                    className="suffix"
                    onClick={toggleVisible_Register}
                    edge="end"
                  >
                    {showRegisterPassword ? (
                      <VisibilityIcon className="suffix-icon" />
                    ) : (
                      <VisibilityOffIcon className="suffix-icon" />
                    )}
                  </div>
                  {errors.password && (
                    <span className="err">{errors.password}</span>
                  )}
                </div>

                <div className="signUpConfirmPassword">
                  <LockOpenIcon className="prefix" />
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    required
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={registerDataChange}
                    onBlur={validate}
                  />
                  <div
                    className="suffix"
                    onClick={toggleVisible_Register}
                    edge="end"
                  >
                    {showRegisterPassword ? (
                      <VisibilityIcon className="suffix-icon" />
                    ) : (
                      <VisibilityOffIcon className="suffix-icon" />
                    )}
                  </div>
                  {errors.confirmPassword && (
                    <span className="err">{errors.confirmPassword}</span>
                  )}
                </div>

                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default LoginRegister;
