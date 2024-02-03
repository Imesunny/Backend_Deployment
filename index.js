const express = require("express");
const mongoDBConnection = require("./config/db");
const userRouter = require("./routes/user.routes");
const TodoModel = require("./models/tasks.model");
const todoRouter = require("./routes/task.routes");
const app = express();
require("dotenv").config();
const cors = require("cors");
const toggleRouter = require("./routes/toggle.routes");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

const PORT = parseInt(process.env.PORT);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the app!" });
});

app.use("/user", userRouter);
app.use("/todo", todoRouter);
app.use("/toggle", toggleRouter);

app.listen(PORT, async () => {
  try {
    await mongoDBConnection;
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.log("error while listening on port");
  }
});
