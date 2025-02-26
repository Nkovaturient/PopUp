const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/db");
const challengeRoute = require("./routes/challengeRoute");
const userRoute = require("./routes/userRoute");
const analyticsRoute = require("./routes/analyticsRoute");

connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/challenges", challengeRoute);
app.use("/api/users", userRoute);
app.use("/api/analytics", analyticsRoute);

const PORT = process.env.PORT;

app.get("/home", (req, res) => {
  res.send("Upskill via Pop-Blend Learning");
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}/home`)
);
