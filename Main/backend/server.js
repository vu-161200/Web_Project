const app = require("./app");

const connectDB = require("./config/database");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

// Config
dotenv.config({ path: "backend/config/config.env" });

// Connecting to database
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
