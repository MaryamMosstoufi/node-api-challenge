const Projects = require('../../data/helpers/projectModel.js');
const router = require('express').Router();

//Test API
router.get("/test", (req, res) => {
  res.status(200).json({ ProjectsAPI: "up" });
});

//Get
router.get('/', async(req, res) => {
  try {
    const getProjects = await Projects.get();
    if (getProjects.length >  0) {
      res.status(201).json(getProjects)
    } else {
      res.status(500).json({ message: "no projects yet" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Insert
router.post('/', validateProjectId, async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).json({message:"please provide a name"})
    } else if (!req.body.description) {
      res.status(400).json({message:"please provide a description"})
    } 
    const newProject = await Projects.insert(req.body);
    if (newProject) {
      res.status(201).json(newProject)
    } else {
      res.status(500).json({ message: "unable to add project" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Update
router.put('/:id', validateProjectId, async(req, res) => {
  try {
    const updateProject = await Projects.update(req.params.id, req.body);
    if (updateProject) {
      res.status(201).json(updateProject)
    } else {
      res.status(500).json({ message: "could not update project" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Remove
router.delete('/:id', validateProjectId, async(req, res) => {
  try {
    const deleteProject = await Projects.remove(req.params.id);
    if (deleteProject) {
      res.status(201).end()
    } else {
      res.status(500).json({ message: "could not delete project" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
//Get Project Actions
router.get('/:id', validateProjectId, async(req, res) => {
  try {
    const getProjectActions = await Projects.getProjectActions(req.params.id);
    if (getProjectActions.length >  0) {
      res.status(201).json(getProjectActions)
    } else {
      res.status(500).json({ message: "no projects actions" });
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


module.exports = router;