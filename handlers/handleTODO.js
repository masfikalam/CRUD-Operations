const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const schemaTODO = require("../schemas/schemaTODO");
const TODO = new mongoose.model("Todo", schemaTODO);

// get all TODO
router.get("/", async (req, res) => {
  await TODO.find({}, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(data);
    }
  });
});

// get one TODO
router.get("/:id", async (req, res) => {
  await TODO.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send(data);
    }
  });
});

// add one TODO
router.post("/", async (req, res) => {
  const newTodo = new TODO(req.body);
  await newTodo.save((err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send("TODO added successfully");
    }
  });
});

// edit one TODO
router.put("/:id", async (req, res) => {
  await TODO.updateOne({ _id: req.params.id }, { $set: req.body }, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send("TODO updated successfully");
    }
  });
});

// delete one TODO
router.delete("/:id", async (req, res) => {
  await TODO.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send("TODO deleted successfully");
    }
  });
});

// delete all TODO
router.delete("/", async (req, res) => {
  await TODO.deleteMany((err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.send("Deleted all TODO");
    }
  });
});

// export the function
module.exports = router;
