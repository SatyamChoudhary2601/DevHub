const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

//@route GET api/profile/me
//@desc Get current user profile
// access private

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route POST api/profile/
//@desc Post current user profile and update
// access private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is Required")
        .not()
        .isEmpty(),
      check("skills", "Skills is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const {
      company,
      website,
      location,
      status,
      bio,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // build profile object
    const profileFields = {};
    profileFields.user = req.user.id;

    if (company) profileFields.company = company;
    if (website) profileFields.website = company;
    if (location) profileFields.location = company;
    if (status) profileFields.status = status;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills)
      profileFields.skills = skills.split(",").map((skill) => skill.trim());

    // build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user._id });
      if (profile) {
        //update(if it found)
        profile = await Profile.findByIdAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      //create(if it not found)
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.send("Server Error");
    }
  }
);

//@route GET api/profile/
//@desc GET all the profile
// access public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    if (!profiles) {
      return res.status(400).json({ msg: "There is no profile" });
    }
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

//@route GET api/profile/user/:user_id
//@desc GET a particular user profile using user ID
// access public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    if (!profile) return res.status(400).json({ msg: "Profile Not Found" });
    res.json(profile);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile Not Found" });
    }
    console.error(err.message);
    res.send("Server Error");
  }
});

module.exports = router;
