require("dotenv").config();

const express = require("express");
const usersRoutes = require("./routes/users");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();

// connect to MongoDB
connectDB();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Server is working 🚀");
});

// users routes
app.use("/users", usersRoutes);

// auth routes  👇 مهم
app.use("/auth", authRoutes);

// error handler MUST be last
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
});








