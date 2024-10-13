const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const logger = require("morgan");
require("dotenv").config();
const notFound = require("./middleware/not_found");
const errorHandler = require("./middleware/error_handler");

const connectDB = require("./db/connect");

const port = process.env.PORT || 3000;

// middleware
app.use(logger("dev")); // log requests to the console using morgan
app.use(express.static("./public")); // serve static files
app.use(express.json()); // allow use of req.body

// routes
app.get("/", (req: any, res: any) => {
  res.redirect("/index.html");
});

app.use("/api/v1/tasks", tasks); // /api/v1/tasks route and controller

app.use(notFound); // not found middleware API
app.use(errorHandler); // error handling middleware

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
