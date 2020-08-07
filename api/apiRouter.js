const express = require("express");

//const Shouts = require("../shouts/shouts-model.js");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

const actionsRouter = require("./actions/actionsRouter");
const projectsRouter = require("./projects/projectsRouter");

router.use("/actions", actionsRouter);
router.use("/projects", projectsRouter);

// router.use(errorHandler);

// function errorHandler(error, req, res, next) {
//   // do something with error before responding
//   // like saving it to a database, sending a mail to the admin
//   // or using an external logging service
//   res.status(500).json(error.message);
// }

module.exports = router;
