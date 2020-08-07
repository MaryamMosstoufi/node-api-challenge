const Actions = require('../../data/helpers/actionModel.js');
const router = require('express').Router();

//Test API
router.get("/test", (req, res) => {
  res.status(200).json({ ActionsAPI: "up" });
});



module.exports = router;