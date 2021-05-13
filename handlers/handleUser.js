// dependencies
const bcrypt = require("bcrypt");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const mongoose = require("mongoose");
const schemaUser = require("../schemas/schemaUser");
const User = new mongoose.model("User", schemaUser);

// user signup
router.post("/signup", async (req, res) => {
  try {
    // hash password
    const hashed = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashed,
    });

    // save user data
    await newUser.save();
    res.send("Signup successful");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// user login
router.post("/login", async (req, res) => {
  try {
    // find user
    const user = await User.find({ username: req.body.username });
    if (user.length > 0) {
      // check password
      const valid = await bcrypt.compare(req.body.password, user[0].password);
      if (valid) {
        // generate token
        const token = jwt.sign(
          { _id: user[0]._id, username: user[0].username },
          process.env.SECRETKEY,
          {
            expiresIn: "1h",
          }
        );

        res.json({
          access: token,
          message: "Login successful",
        });
      } else {
        res.status(401).send("Login failed!");
      }
    } else {
      res.status(401).send("Login failed!");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// export the function
module.exports = router;
