import { loadProjects } from "./modules/storage.js";
import Project from "./modules/project.js";
import Todo from "./modules/todo.js";
import "./modules/ui.js"; 
import "./styles.css";
import logo from "./assets/todologo.png";



document.getElementById("logo").src = logo;




let projects = loadProjects() || [];
if(projects.length==0){
    const defaultProject = new Project("My First Project");
    projects.push(defaultProject);
}

localStorage.setItem("todo-projects", JSON.stringify(projects));
