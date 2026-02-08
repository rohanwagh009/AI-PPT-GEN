const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const presentationRoutes = require("./routes/presentationRoutes");

const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());

app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/presentation", presentationRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
