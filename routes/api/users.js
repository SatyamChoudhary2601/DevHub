const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
//@route POST users
//@desc Reggister User
// access public

router.post(
  "/",
  [
    check("name", "Name is Required")
      .not()
      .isEmpty(),

    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a atleast 6 minimum character").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      //User already exist

      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ error: [{ msgs: "User Already Exists" }] });
      }

      //get User Avatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      //Encrypt Password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      //retuen JsonWebToken
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("server Error");
    }
  }
);

module.exports = router;
