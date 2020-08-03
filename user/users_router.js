const router = require("express").Router();
// restrict = require('../auth/restrict-mid')
const Users = require("./users_model.js");

router.get("/users",  (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => res.send(err));
});

module.exports = router;