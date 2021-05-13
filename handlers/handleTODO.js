// dependencies
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const schemaTODO = require("../schemas/schemaTODO");
const TODO = new mongoose.model("Todo", schemaTODO);

// get all TODO
router.get("/", (req, res) => {
  TODO.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(data);
    }
  });
});

// get one TODO
router.get("/:id", (req, res) => {
  TODO.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(data);
    }
  });
});

// add one TODO
router.post("/", (req, res) => {
  const newTodo = new TODO(req.body);
  newTodo.save((err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send("TODO added successfully");
    }
  });
});

// edit one TODO
router.put("/:id", (req, res) => {
  TODO.updateOne({ _id: req.params.id }, { $set: req.body }, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send("TODO updated successfully");
    }
  });
});

// delete one TODO
router.delete("/:id", (req, res) => {
  TODO.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send("TODO deleted successfully");
    }
  });
});

// delete all TODO
router.delete("/", (req, res) => {
  TODO.deleteMany((err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send("Deleted all TODO");
    }
  });
});

// export the function
module.exports = router;
