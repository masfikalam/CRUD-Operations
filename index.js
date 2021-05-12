// dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const handleTODO = require("./handlers/handleTODO");

// middlewares
const app = express();
app.use(express.json());

// connect to db
mongoose
  .connect(process.env.MONGOLINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(err));

// app routes
app.use("/todo", handleTODO);

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send(err.message);
});

// start server
app.listen(3000, () => console.log("Server listening on port 3000"));
