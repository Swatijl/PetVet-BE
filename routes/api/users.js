const express = require("express");
const router = express.Router();

let User = require("../../models/users.model");

router.get("/", (req, res) => {
  var role = req.query.role;
  var category = req.query.category;
  if (role && category) {
    User.find({ role: role, specialization: category })
      .then((users) => res.json(users))
      .catch((err) => res.status(400).json("Error: " + err));
      return;
  }
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      result = result.toJSON();
      delete result._id;
      delete result.__v;
      res.status(200).send(result);
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

router.post("/", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.json("Signup Successful"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.patch("/:id", (req, res) => {
  User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then(() => {
      res.status(200).send("profile updated");
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
