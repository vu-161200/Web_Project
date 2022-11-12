import "./BookingSteps.css";

import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";

const BookingSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Đặt phòng</Typography>,
      icon: <LibraryAddIcon />,
    },
    {
      label: <Typography>Xác nhận đặt phòng</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Thanh toán</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Fragment>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        style={stepStyles}
        className="BookingSteps"
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default BookingSteps;
