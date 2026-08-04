require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const storeRoutes = require("./routes/store");
const ratingRoutes = require("./routes/rating");
const dashboardRoutes = require("./routes/dashboard");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Backend Server is Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});