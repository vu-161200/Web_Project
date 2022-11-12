const express = require("express");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controllers/payment-controller");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/authenticate");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
