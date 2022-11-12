import "./App.css";

import ProtectedRoute from "./component/Route/ProtectedRoute";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import WebFont from "webfontloader";
import axios from "axios";

// stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import store from "./store";

import Header from "./component/layout/header/Header.js";
import Footer from "./component/layout/footer/Footer";
import Contact from "./component/layout/contact/Contact";
import About from "./component/layout/about/About";
import NotFound from "./component/layout/notFound/NotFound";

import Home from "./component/Home/Home";

import RoomDetails from "./component/Room/RoomDetails.js";
import Rooms from "./component/Room/Rooms.js";
import NewRoom from "./component/Room/NewRoom.js";
import UpdateRoom from "./component/Room/UpdateRoom.js";

import LoginRegister from "./component/User/LoginRegister";
import Profile from "./component/User/Profile.js";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";

import Booking from "./component/Booking/Booking.js";
import ConfirmBooking from "./component/Booking/ConfirmBooking.js";
import Payment from "./component/Booking/Payment.js";
import BookingSuccess from "./component/Booking/BookingSuccess.js";
import MyBookings from "./component/Booking/MyBookings.js";
import BookingDetails from "./component/Booking/BookingDetails.js";

import DashBoard from "./component/Admin/DashBoard.js";
import RoomList from "./component/Admin/RoomList.js";
import UserList from "./component/Admin/UserList.js";
import UpdateRole from "./component/Admin/UpdateRole.js";
import ReviewList from "./component/Admin/ReviewList.js";
import BookingList from "./component/Admin/BookingList";

import { loadUser } from "./actions/userAction";

function App() {
  const { user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    //load font
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    //load user
    store.dispatch(loadUser());

    //load stripe key
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <Header user={user} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/room/:id" element={<RoomDetails />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:keyword" element={<Rooms />} />
        <Route
          path="/room/create"
          element={
            <ProtectedRoute>
              <NewRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path="/room/update/:id"
          element={
            <ProtectedRoute>
              <UpdateRoom />
            </ProtectedRoute>
          }
        />

        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/confirm" element={<ConfirmBooking />} />
        {stripeApiKey && (
          <Route
            path="/booking/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <Payment />
              </Elements>
            }
          />
        )}
        <Route path="/booking/success" element={<BookingSuccess />} />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking/:id"
          element={
            <ProtectedRoute>
              <BookingDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LoginRegister />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAdmin={true}>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rooms"
          element={
            <ProtectedRoute isAdmin={true}>
              <RoomList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rooms/:type"
          element={
            <ProtectedRoute isAdmin={true}>
              <RoomList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAdmin={true}>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/bookings"
          element={
            <ProtectedRoute isAdmin={true}>
              <BookingList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAdmin={true}>
              <UpdateRole />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reviews"
          element={
            <ProtectedRoute isAdmin={true}>
              <ReviewList />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
