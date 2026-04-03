const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
console.log("--- ENV DEBUG ---");
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
console.log("PORT exists:", !!process.env.PORT);
console.log("OTHER_KEY exists:", !!process.env.YOUR_OTHER_KEY_NAME);
console.log("------------------");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const presentationRoutes = require("./routes/presentationRoutes");

const PORT = process.env.PORT || 5000;

const app = express();
connectDB();

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://ai-ppt-gen-zeta.vercel.app"],
    credentials:true
  }),
);
app.use("/api/users", userRoutes);
app.use("/api/presentation", presentationRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
