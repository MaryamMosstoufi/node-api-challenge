import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [projectList, setProjectList] = useState([])
  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(res => {
        setProjectList(res.data);
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  },[])
  return (
    <div className="App">
      Project List
      <ul>
        {projectList.map(project => 
          <li key={project.id}>
            <div>Name: {project.name} </div>
            <div>Description: {project.description} </div>
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
