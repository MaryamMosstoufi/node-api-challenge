const actions = require('../../data/helpers/projectModel.js');
const router = require('express').Router();

router.get("/", (req, res) => {
  res.status(200).json({ ProjectsAPI: "up" });
});




module.exports = router;