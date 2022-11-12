const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

// Config
dotenv.config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

// Route Imports
const room = require("./routes/room-route");
const user = require("./routes/user-route");
const booking = require("./routes/booking-route");
const payment = require("./routes/payment-route");

// Load middleware
app.use("/api", room);
app.use("/api", user);
app.use("/api", booking);
app.use("/api", payment);

// Middleware for errors
// Thứ tự load errorMiddleware rất quan trọng
// Phải gọi sau cùng, sau các app.use() và route khác
// Nếu load trước các app.use() và route khác ==> Khi có lỗi, Express sẽ tìm middleware tiếp theo với 4 đối số tương ứng, bởi vì load trước các app.use() và route khác nên sẽ không sd được
app.use(errorMiddleware);

module.exports = app;
