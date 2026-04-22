require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Basic Health Check
app.get("/", (req, res) => {
  res.send("Portify Backend API is running... 🚀");
  console.log("Running now");
});

const authRoutes = require("./src/routes/authRoutes");
app.use("/api/auth", authRoutes);

const exportRoutes = require("./src/routes/exportRoutes");
app.use("/api/export", exportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server locked and loaded on http://localhost:${PORT}`);
});
