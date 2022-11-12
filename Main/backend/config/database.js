const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected with server ${data.connection.host}`);
    })
    .catch((error) => console.log(error));
};

module.exports = connectDB;
