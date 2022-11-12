import "./Contact.css";

import React from "react";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:group01@gmail.com">
        <Button>Liên hệ: group01@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
