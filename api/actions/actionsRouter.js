const Projects = require('../../data/helpers/projectModel.js');
const Actions = require('../../data/helpers/actionModel.js');
const router = require('express').Router();

//Test API
router.get("/test", (req, res) => {
  res.status(200).json({ ActionsAPI: "up" });
});

//Get
router.get('/:id', validateActionId, async(req, res) => {
  try {
    const getAction = await Actions.get(req.params.id);
    if (getAction) {
      res.status(201).json(getAction)
    } else {
      res.status(500).json({ message: "no actions yet" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Insert
router.post('/', validateActionId, async (req, res) => {
  try {
    if (!req.body.project_id) {
      res.status(400).json({message:"please provide a project ID"})
    } else if (!req.body.description) {
      res.status(400).json({message:"please provide a description"})
    } else if (!req.body.notes) {
      res.status(400).json({message:"please provide a note"})
    } 
    const newAction = await Actions.insert(req.body);
    if (newAction) {
      res.status(201).json(newAction)
    } else {
      res.status(500).json({ message: "unable to add action" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Update
router.put('/:id', validateActionId, async(req, res) => {
  try {
    const updateAction = await Actions.update(req.params.id, req.body);
    if (updateAction) {
      res.status(201).json(updateAction)
    } else {
      res.status(500).json({ message: "could not update action" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Remove
router.delete('/:id', validateActionId, async(req, res) => {
  try {
    const deleteAction = await Actions.remove(req.params.id);
    if (deleteAction) {
      res.status(201).end()
    } else {
      res.status(500).json({ message: "could not delete action" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Validations
async function validateProjectId(req, res, next) {
   try {
    const getProjectById = await Projects.get(req.params.id);
    if (getProjectById){
      next()
    } else {
      res.status(400).json({message: "no project with this id"})
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async function validateActionId(req, res, next) {
   try {
    const getActionById = await Actions.get(req.params.id);
    if (getActionById){
      next()
    } else {
      res.status(400).json({message: "no action with this id"})
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = router;