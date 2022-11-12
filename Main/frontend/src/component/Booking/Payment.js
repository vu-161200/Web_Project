import "./Payment.css";

import axios from "axios";
import React, { Fragment, useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { createBooking, clearErrors } from "../../actions/bookingAction";
import MetaData from "../layout/MetaData";
import BookingSteps from "./BookingSteps";

import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

const Payment = () => {
  const alert = useAlert();
  const elements = useElements();
  const payBtn = useRef(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const stripe = useStripe();
  const dispatch = useDispatch();

  const payments = ["Thanh toán sau", "Thanh toán online"];
  const [paymentType, setPaymentType] = useState("Thanh toán sau");

  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newBooking);

  const paymentData = {
    amount: state.room.price * state.numOfRooms,
  };

  const booking = {
    room: state.room._id,
    roomPrice: state.room.price,
    numOfRooms: state.numOfRooms,
    checkInDate: state.startDate,
    totalPrice: state.room.price * state.numOfRooms,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    if (paymentType === "Thanh toán sau") {
      booking.status = "Thanh toán sau";

      dispatch(createBooking(booking));
      alert.success("Đặt phòng thành công");
      navigate("/booking/success");
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.post(
          "/api/payment/process",
          paymentData,
          config
        );

        const client_secret = data.client_secret;

        if (!stripe || !elements) return;

        const result = await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
              phone: user.phoneNumber,
            },
          },
        });

        if (result.error) {
          payBtn.current.disabled = false;

          alert.error(result.error.message);
        } else {
          if (result.paymentIntent.status === "succeeded") {
            booking.status = "Thanh toán online";

            booking.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };

            dispatch(createBooking(booking));
            alert.success("Đặt phòng thành công");
            navigate("/booking/success");
          } else {
            alert.error("Có lỗi xảy ra, vui lòng thử lại");
          }
        }
      } catch (error) {
        payBtn.current.disabled = false;
        alert.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Thanh toán" />
      <BookingSteps activeStep={2} />

      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <label>
            Hình thức thanh toán
            <select required onChange={(e) => setPaymentType(e.target.value)}>
              <option value="">-- Chọn hình thức --</option>
              {payments.map((payment) => (
                <option key={payment} value={payment}>
                  {payment}
                </option>
              ))}
            </select>
          </label>

          {paymentType === "Thanh toán online" ? (
            <Fragment>
              <Typography>Thông tin thẻ</Typography>
              <div>
                <CreditCardIcon />
                <CardNumberElement className="paymentInput" />
              </div>
              <div>
                <EventIcon />
                <CardExpiryElement className="paymentInput" />
              </div>
              <div>
                <VpnKeyIcon />
                <CardCvcElement className="paymentInput" />
              </div>
            </Fragment>
          ) : null}

          <input
            type="submit"
            value={`Thanh toán  -  ${(
              state.room.price * state.numOfRooms
            ).toLocaleString("en-US")} VNĐ`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;
